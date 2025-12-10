require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { cloudinary, storage } = require("./cloudconfig");
const upload = multer({ storage });

const Sell = require("./models/sellItem");
const LostAndFound = require("./models/lostAndFound");
const Hackathon = require("./models/hackathon");
const User = require("./models/User");
const { isLoggedIn } = require("./middleware/isLoggedIn");
const generateToken = require("./Util/generateToken");

const dbUrl = process.env.MONGO_URL;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(
  cors({
    origin: "http://localhost:5173", 
  })
);

app.use(express.static(path.join(__dirname, "/public")));

// ---------------- DATABASE ----------------
async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("SESSION STORE ERROR");
});

// ---------------------------------------------------
// ---------------------- ROUTES ---------------------
// ---------------------------------------------------

// ========== GET ALL ITEMS ==========
app.get("/allSells", isLoggedIn, async (req, res) => {
  const allSells = await Sell.find({}).populate("owner", "_id name email");
  res.status(200).json(allSells);
});

app.get("/allLostAndFounds", isLoggedIn, async (req, res) => {
  const allLostAndFounds = await LostAndFound.find({});
  res.json(allLostAndFounds);
});

app.get("/allHackathons", isLoggedIn, async (req, res) => {
  const allHackathons = await Hackathon.find({});
  res.json(allHackathons);
});

// ========== GET BY ID ==========
app.get("/hackathon/:id", async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id).populate("owner","name email");
    if (!hackathon)
      return res.status(404).json({ message: "Hackathon not found" });
    res.status(200).json(hackathon);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hackathon", error });
  }
});

app.get("/sell/:id", async (req, res) => {
  try {
    const sell = await Sell.findById(req.params.id);
    if (!sell) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(sell);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
});

app.get("/lostandfound/:id", async (req, res) => {
  try {
    const item = await LostAndFound.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
});

// =====================================================
// ===================== AUTH ==========================
// =====================================================

// SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, enroll, year, semester,address, profileLink } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({
      name,
      email,
      password,
      enroll,
      year,
      address,
      semester,
      profileLink,
    });

    await newUser.save();
    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
});

// =====================================================
// ================== ADD SELL ITEM ====================
// =====================================================
app.post("/addsell", upload.single("image"), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { title, price, category, location, description, contact,gmail,creator } =
      req.body;

    const imageUrl = req.file?.path;
    if (!imageUrl) return res.status(400).json({ message: "Image missing" });

    const newSell = new Sell({
      title,
      price,
      category,
      location,
      description,
      contact,
      gmail,
      image: imageUrl,
      creator,
      owner: userId,
    });

    await newSell.save();
    res.status(201).json({ message: "Item added", newSell });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
});

// =====================================================
// ============= ADD LOST AND FOUND ITEM ===============
// =====================================================
app.post("/addlostandfound", upload.single("image"), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { status, itemName, location, description, contact,creator } = req.body;

    const imageUrl = req.file?.path;
    if (!imageUrl) return res.status(400).json({ message: "Image missing" });

    const newLost = new LostAndFound({
      status,
      itemName,
      contact,
      location,
      description,
      contact,
      image: imageUrl,
      creator,
      owner: userId,
    });

    await newLost.save();
    res.status(201).json({ message: "Item added", newLost });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
});

// =====================================================
// =============== ADD HACKATHON TEAM ==================
// =====================================================
app.post("/addhackathon", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { project, name, skills, neededmembers, description, email, linkedin,creator } =
      req.body;

    const newHackathon = new Hackathon({
      project,
      name,
      skills,
      neededmembers,
      description,
      email,
      linkedin,
      creator,
      owner: userId,
    });

    await newHackathon.save();
    res.status(201).json({ message: "Hackathon posted", newHackathon });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
});

// =====================================================
// ================== DELETE SELL ======================
// =====================================================
app.delete("/sell/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const sell = await Sell.findById(req.params.id);
    if (!sell) return res.json({ message: "Item not found" });

    if (sell.owner.toString() !== decoded.id)
      return res.status(403).json({ message: "Unauthorized" });

    await Sell.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting item" });
  }
});


app.put("/selledit/:id", upload.single("image"), async (req, res) => {
  try {
    const sell = await Sell.findById(req.params.id);
    if (!sell) return res.status(404).json({ error: "Not found" });

    const imageUrl = req.file ? req.file.path : sell.image;

    sell.title = req.body.title || sell.title;
    sell.price = req.body.price || sell.price;
    sell.category = req.body.category || sell.category;
    sell.location = req.body.location || sell.location;
    sell.description = req.body.description || sell.description;
    sell.image = imageUrl;

    await sell.save();
    res.json({ message: "Updated", sell });
  } catch {
    res.status(500).json({ error: "Error" });
  }
});

// =====================================================
// =============== DELETE LOST & FOUND =================
// =====================================================
app.delete("/lostandfound/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const item = await LostAndFound.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    if (item.owner.toString() !== decoded.id)
      return res.status(403).json({ message: "Unauthorized" });

    await LostAndFound.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting" });
  }
});

app.put("/lostandfoundedit/:id",upload.single("image"),async(req,res)=>{
   
   try {
    const { id } = req.params;
    const lostandfound = await LostAndFound.findById(id);

    if (!lostandfound) {
      return res.status(404).json({ error: "Item not found" });
    }

    const imageUrl = req.file ? req.file.path : lostandfound.image; 
    lostandfound.title = req.body.title || lostandfound.title;
    lostandfound.price = req.body.price || lostandfound.price;
    lostandfound.category = req.body.category || lostandfound.category;
    lostandfound.location = req.body.location || lostandfound.location;
    lostandfound.description = req.body.description || lostandfound.description;
    lostandfound.image = imageUrl;

    await lostandfound.save();

    res.json({ message: "Item updated successfully", lostandfound });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Server error" });
  }
});


app.delete("/hackathon/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) return res.status(404).json({ message: "Item not found" });

    if (hackathon.owner.toString() !== decoded.id)
      return res.status(403).json({ message: "Unauthorized action" });

    await Hackathon.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete item" });
  }
});


app.put("/hackathonedit/:id",async(req,res)=>{
   
   try {
    const { id } = req.params;
    const hackathon = await Hackathon.findById(id);

    if (!hackathon) {
      return res.status(404).json({ error: "Item not found" });
    } 
    hackathon.name = req.body.name || hackathon.name;
    hackathon.project = req.body.project || hackathon.project;
    hackathon.neededmembers = req.body.neededmembers || hackathon.neededmembers;
   hackathon.skills = req.body.skills || hackathon.skills;
    hackathon.description = req.body.description || hackathon.description;
   
    await hackathon.save();

    res.json({ message: "Item updated successfully", hackathon });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/profile",isLoggedIn, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;  
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
});


app.put("/profileedit",async(req,res)=>{
   
   try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;  
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Item not found" });
    } 
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.enroll = req.body.enroll || user.enroll;
   user.year = req.body.year || user.year ;
    user.semester = req.body.semester || user.semester;
    user.address = req.body.address || user.address;
    user.profileLink = req.body.profileLink || user.profileLink;

   
    await user.save();

    res.json({ message: "Item updated successfully", user });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// ------------------- START SERVER --------------------
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
