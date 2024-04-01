const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost/newsletter", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define a schema for email addresses
const emailSchema = new mongoose.Schema({
  email: String,
});
const Email = mongoose.model("Email", emailSchema);

app.use(bodyParser.json());

// Route to subscribe users
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  // Save the email address to the database
  const newEmail = new Email({ email });
  await newEmail.save();

  res.status(200).json({ message: "Subscribed successfully" });
});

// Route to unsubscribe users
app.post("/unsubscribe", async (req, res) => {
  const { email } = req.body;

  // Remove the email address from the database
  await Email.findOneAndDelete({ email });

  res.status(200).json({ message: "Unsubscribed successfully" });
});

// Serve the unsubscribe page
app.get("/unsubscribe", (req, res) => {
  res.sendFile(path.join(__dirname, "unsubscribe.html"));
});

// Remove the email address from the database
await Email.findOneAndDelete({ email });

res.status(200).json({ message: "Unsubscribed successfully" });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
