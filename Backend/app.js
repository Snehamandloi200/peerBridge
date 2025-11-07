require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const dbUrl = process.env.MONGO_URL;
const MongoStore = require("connect-mongo");
const Sell = require("./models/sellItem");
const LostAndFound = require("./models/lostAndFound");
const Hackathon = require("./models/hackathon");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendMail = require("./Util/mailer");
const generateToken = require("./Util/generateToken");
const { isLoggedIn } = require("./middleware/isLoggedIn");
const multer  = require('multer');
const { cloudinary,storage}=require("./cloudconfig");
const upload=multer({storage})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static("public"));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR IN MONGO SESSION STORE", err);
});

// app.get("/addSell",(req,res)=>{
//   const sellItem=[
//   {
//     title: "Data Structures and Algorithms – C Edition",
//     price: 250,
//     category: "Book",
//     location: "Indore, MP",
//     description: "A second-hand DSA book in good condition with handwritten notes and highlighted topics. Ideal for CSE students preparing for coding interviews.",

//       image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"

//   },
//   {
//     title: "Engineering Mathematics Handwritten Notes",
//     price: 120,
//     category: "Notes",
//     location: "Bhopal, MP",
//     description: "Complete handwritten notes with all formulas and solved examples. Lightly used and neatly written.",
//     image:
//        "https://images.unsplash.com/photo-1519681393784-d120267933ba"

//   },
//   {
//     title: "Operating System Concepts – Galvin",
//     price: 300,
//     category: "Book",
//     location: "Ujjain, MP",
//     description: "Used OS textbook with minimal markings and chapter highlights. Covers all core operating system concepts.",

//       image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"

//   },
//   {
//     title: "Database Management Systems – Navathe",
//     price: 280,
//     category: "Book",
//     location: "Indore, MP",
//     description: "Second-hand DBMS book with solved exercises and case studies. Good condition, perfect for semester exams.",

//       image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353"

//   },
//   {
//     title: "Software Engineering Project Notes",
//     price: 150,
//     category: "Notes",
//     location: "Khandwa, MP",
//     description: "Handwritten notes with SDLC diagrams and project documentation examples. Very helpful for theory and viva.",
//     image:

//        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"

//   },
//   {
//     title: "Engineering Drawing Scale Set",
//     price: 180,
//     category: "Tool",
//     location: "Indore, MP",
//     description: "Second-hand drawing scale set including mini drafter, compass, and ruler. Light scratches but fully usable.",

//       image: "https://images.unsplash.com/photo-1616627981666-1e0b9f4e6d0d"

//   },
//   {
//     title: "Technical Drawing Divider Set",
//     price: 100,
//     category: "Tool",
//     location: "Bhopal, MP",
//     description: "Divider and compass set for technical drawing and engineering graphics. Used but in excellent condition.",
//     image:
//       "https://images.unsplash.com/photo-1588776814546-85d0d5d6ff54"

//   },
//   {
//     title: "Scientific Calculator (Casio FX-991MS)",
//     price: 400,
//     category: "Tool",
//     location: "Khargone, MP",
//     description: "Fully functional Casio calculator in good condition. Includes protective cover. Perfect for all engineering branches.",
//     image:
//        "https://images.unsplash.com/photo-1612810806563-d388f3a675b7"

//   },
//   {
//     title: "Engineering Drawing Instruments Box",
//     price: 200,
//     category: "Tool",
//     location: "Indore, MP",
//     description: "Set of drawing instruments including compass, protractor, and pencils. Ideal for first-year students.",
//     image:
//        "https://images.unsplash.com/photo-1555967529-79de37d2d1a6"

//   },
//   {
//     title: "Physics Lab Manual – 1st Year",
//     price: 90,
//     category: "Notes",
//     location: "Ujjain, MP",
//     description: "Second-hand lab manual with complete experiment readings and diagrams. Good for quick revision.",
//     image:
//        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"

//   },
//   {
//     title: "C Programming Language by E. Balagurusamy",
//     price: 220,
//     category: "Book",
//     location: "Khandwa, MP",
//     description: "Used C programming textbook with practice examples and solved exercises. Suitable for beginners.",
//     image:
//        "https://images.unsplash.com/photo-1528207776546-365bb710ee93"

//   },
//   {
//     title: "Mini Drafter for Engineering Drawing",
//     price: 250,
//     category: "Tool",
//     location: "Indore, MP",
//     description: "Used mini drafter in good condition, smooth joint movement, and tight clamp. Perfect for mechanical students.",
//     image:
//        "https://images.unsplash.com/photo-1603791452906-bc3ba7bde016"

//   }
// ];
// sellItem.forEach((item)=>{
//   let newSellItem=new Sell({
//     title: item.title,
//     price:item.price,
//     category:item.category,
//     location:item.location,
//     description: item.description,
//     image:item.image,

//   });
//   newSellItem.save();
// })
// res.send("Done");

// })

// app.get("/addLostAndFound",async(req,res)=>{
//   const allLostAndFound= [
//   {
//     status: "Lost",
//     itemName: "Scientific Calculator",
//     location: "Library, 2nd Floor",
//     description: "Casio fx-991ES calculator, grey color, left on the study table near the window.",
//     image: "https://example.com/images/calculator.jpg"
//   },
//   {
//     status: "Found",
//     itemName: "Water Bottle",
//     location: "Canteen Area",
//     description: "Blue steel bottle with a sticker that says 'Renuka'.",
//     image: "https://example.com/images/bottle.jpg"
//   },
//   {
//     status: "Lost",
//     itemName: "Notebook",
//     location: "Computer Lab",
//     description: "Brown spiral notebook with handwritten notes on Data Structures and Algorithms.",
//     image: "https://example.com/images/notebook.jpg"
//   },
//   {
//     status: "Found",
//     itemName: "ID Card",
//     location: "Main Gate",
//     description: "JIT student ID card found near gate security, name partially visible.",
//     image: "https://example.com/images/idcard.jpg"
//   },
//   {
//     status: "Lost",
//     itemName: "Divider Set",
//     location: "Classroom 204",
//     description: "Geometry box containing divider, compass, and pencil — divider with black grip.",
//     image: "https://example.com/images/divider.jpg"
//   },
//   {
//     status: "Found",
//     itemName: "Scale (Ruler)",
//     location: "Drawing Hall",
//     description: "Transparent 30cm scale with slight crack on one edge.",
//     image: "https://example.com/images/scale.jpg"
//   },
//   {
//     status: "Lost",
//     itemName: "Earphones",
//     location: "Hostel Common Room",
//     description: "White realme wired earphones, last seen on sofa near the TV.",
//     image: "https://example.com/images/earphones.jpg"
//   },
//   {
//     status: "Found",
//     itemName: "Drawing Kit",
//     location: "Mechanical Workshop",
//     description: "Complete drawing instrument box including compass, divider, and protractor.",
//     image: "https://example.com/images/drawing-kit.jpg"
//   },
//   {
//     status: "Lost",
//     itemName: "Pen Drive",
//     location: "Lab 3, Computer Department",
//     description: "16GB SanDisk pen drive with blue cap, contains project files.",
//     image: "https://example.com/images/pendrive.jpg"
//   },
//   {
//     status: "Found",
//     itemName: "Sweater",
//     location: "College Ground",
//     description: "Grey woolen sweater found on the bench near basketball court.",
//     image: "https://example.com/images/sweater.jpg"
//   }
// ];

// allLostAndFound.forEach((item)=>{
//   let newItem=new LostAndFound({
//     status: item.status,
//     itemName:item.itemName,
//     location:item.location,
//     description: item.description,
//     image:item.image,

//   });
//   newItem.save();
// })
// res.send("Done");

// })

// app.get("/addHackathon",async(req,res)=>{
//   const allHackathons=[
//   {
//     name: "CodeCrafters",
//     neededmembers: 2,
//     skills: "React.js, Node.js, MongoDB",
//     project: "College Placement Portal",
//     description: "We’re building a full-stack placement management system for college students. Need frontend developers with React experience."
//   },
//   {
//     name: "AI Pioneers",
//     neededmembers: 1,
//     skills: "Python, Machine Learning, TensorFlow",
//     project: "AI Chatbot for Student Queries",
//     description: "Looking for an ML enthusiast to help train and deploy a chatbot that answers college-related FAQs using NLP."
//   },
//   {
//     name: "TechTitans",
//     neededmembers: 3,
//     skills: "HTML, CSS, JavaScript",
//     project: "E-Cell Event Registration Website",
//     description: "We are creating a responsive website for our E-Cell events. Need UI designers and frontend developers to join the team."
//   },
//   {
//     name: "DataDynamos",
//     neededmembers: 2,
//     skills: "SQL, Power BI, Excel",
//     project: "College Data Analytics Dashboard",
//     description: "Looking for members skilled in data visualization to help create a dashboard that shows academic and placement statistics."
//   },
//   {
//     name: "CyberGuard",
//     neededmembers: 1,
//     skills: "Networking, Cybersecurity",
//     project: "Network Threat Detection System",
//     description: "Need a team member with cybersecurity knowledge to help analyze network data and implement intrusion detection."
//   },
//   {
//     name: "SmartBuilders",
//     neededmembers: 2,
//     skills: "IoT, Arduino, C++",
//     project: "Smart Energy Saving System",
//     description: "Working on a system that monitors electricity usage using sensors. Need IoT hardware experts to join our project."
//   },
//   {
//     name: "WebWizards",
//     neededmembers: 1,
//     skills: "Express.js, MongoDB",
//     project: "Doctor-Patient Appointment System",
//     description: "Our web app is nearly complete, but we need a backend developer to handle database integration and authentication."
//   },
//   {
//     name: "VisionTech",
//     neededmembers: 2,
//     skills: "Python, OpenCV, Deep Learning",
//     project: "Real-Time Face Mask Detection System",
//     description: "We’re working on an AI model that detects face masks in real time. Need help in dataset collection and model optimization."
//   },
//   {
//     name: "EcoCoders",
//     neededmembers: 1,
//     skills: "Android Studio, Firebase",
//     project: "E-Waste Recycling App",
//     description: "Our mobile app promotes e-waste recycling. Need an Android developer to work on UI and Firebase integration."
//   },
//   {
//     name: "CodeSquad",
//     neededmembers: 3,
//     skills: "JavaScript, Firebase, React",
//     project: "Real-Time College Chat Application",
//     description: "Looking for frontend developers and UI designers to help us finish our real-time chat application for college students."
//   },
//   {
//     name: "AlgoMasters",
//     neededmembers: 1,
//     skills: "Java, DSA, Algorithms",
//     project: "Coding Practice Platform",
//     description: "We are developing an online coding portal for college-level practice. Need someone skilled in DSA question creation."
//   },
//   {
//     name: "HealthHub",
//     neededmembers: 2,
//     skills: "HTML, CSS, JavaScript, API Integration",
//     project: "Fitness and Diet Tracking Website",
//     description: "A web project for tracking calories and workouts. Need members who can integrate APIs for food and exercise data."
//   }
// ];

// allHackathons.forEach((item)=>{
//   let newHackathon=new Hackathon({
//     name:item.name,
//     neededmembers:item.neededmembers,
//     skills:item.skills,
//     project: item.project,
//     description: item.description,

//   });
//   newHackathon.save();
// })
// res.send("Done");

// })

app.get("/allSells", isLoggedIn, async (req, res) => {
  const allSells = await Sell.find({});
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

app.get("/hackathon/:id", async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
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
    if (!sell) return res.status(404).json({ message: "item not found" });
    res.status(200).json(sell);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
});

app.get("/lostandfound/:id", async (req, res) => {
  try {
    const item = await LostAndFound.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, enroll, year, semester, profileLink } =
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
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password) {
      return res
        .status(500)
        .json({ message: "User password missing in database" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      // user: {
      //   username: user.username,
      //   email: user.email,
      // },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addsell", upload.single("image"), async (req, res) => {
  try {
    // Access the file uploaded to Cloudinary
    const imageUrl = req.file?.path; // multer-storage-cloudinary adds this
    const { title, price, category, location, description ,_id } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image upload failed!" });
    }

    const newSell = new Sell({
      title,
      price,
      category,
      location,
      description,
      image: imageUrl,
      owner: _id,
     
    });

    await newSell.save();
    res.status(201).json({ message: "Item added successfully", newSell });
  } catch (error) {
    console.error("Error adding sell item:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/addlostandfound", upload.single("image"), async (req, res) => {
  try {
    
    const imageUrl = req.file?.path;
    const { status, itemName, location, description } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image upload failed!" });
    }

    const newLostAndFound = new LostAndFound({
     status,
      itemName,
      
      location,
      description,
      image: imageUrl,
    });

    await newLostAndFound.save();
    res.status(201).json({ message: "Item added successfully", newLostAndFound });
  } catch (error) {
    console.error("Error adding sell item:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


app.post("/addhackathon", async (req, res) => {
  try {
    
   
    const { project, name, skills,neededmembers, description } = req.body;

    

    const newHackathon = new Hackathon({
    project,
    name,
      description,
      skills,
      neededmembers,
      description
    });

    await newHackathon.save();
    res.status(201).json({ message: "Item added successfully", newHackathon });
  } catch (error) {
    console.error("Error adding sell item:", error);
    res.status(500).json({ message: "Server error", error });
  }
});
app.delete("/sell/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const sell = await Sell.findById(req.params.id);
    if (!sell) return res.status(404).json({ message: "Item not found" });

    if (sell.userId.toString() !== decoded.id)
      return res.status(403).json({ message: "Unauthorized action" });

    await Sell.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete item" });
  }
});

app.listen(8080, () => {
  console.log("Listening at port 8080");
});
