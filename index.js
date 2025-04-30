const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// Endpoint to send emails
app.post("/send-email", async (req, res) => {
  const { caregiverEmail, medicationName, suggestedTime } = req.body;

  const emailData = {
    service_id: "service_ggrl8rl", // Replace with your EmailJS Service ID
    template_id: "template_mflj4wc", // Replace with your EmailJS Template ID
    user_id: "ezPMMnwEBE9U4ypEH", // Replace with your EmailJS Public Key
    template_params: {
      to_email: caregiverEmail,
      medication_name: medicationName,
      suggested_time: suggestedTime,
    },
  };

  try {
    const response = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      emailData,
      { headers: { "Content-Type": "application/json" } }
    );
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.response.data);
    res.status(500).send("Failed to send email.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));