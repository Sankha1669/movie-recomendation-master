import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const { Schema, model } = mongoose; // Destructure Schema and model

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors("*"));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/feedbackdb")
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const feedbackSchema = new Schema({
  email: String,
  subject: String,
  message: String,
});

const FeedbackModel = model("Feedback", feedbackSchema); //  destructured model

app.post("/submit-feedback", async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    const feedback = new FeedbackModel({ email, subject, message });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
