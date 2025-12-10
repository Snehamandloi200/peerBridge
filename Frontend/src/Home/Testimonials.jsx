import React from "react";
import "./Testimonials.css";

function Testimonials() {
  const reviews = [
    {
      name: "Sneha",
      details: "3rd Year CSE",
      text: "This platform helped me buy books at very low prices!",
    },
    {
      name: "Aarav",
      details: "2nd Year IT",
      text: "Smooth experience, and the Lost & Found system is awesome.",
    },
    {
      name: "Riya",
      details: "1st Year ECE",
      text: "Very useful for selling old gadgets inside campus.",
    },
    {
      name: "Kabir",
      details: "4th Year CSE",
      text: "Love the clean UI and easy posting!",
    },
    {
      name: "Rohit Patel",
      details: "1st Year CSE",
      text: "This website helped me find my lost water bottle, and I could also get reference books easily!",
    },
  ];

  return (
    <div className="testimonial-container">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#dbe1e7ff" }}>
        What Students Say 
      </h2>

      <div className="testimonial-slider">
        {reviews.concat(reviews).map((review, index) => (
          <div className="testimonial-card" key={index}>
            <p className="review-text">“{review.text}”</p>
            <h5 className="review-name">— {review.name}</h5>
            <p className="review-details">{review.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
