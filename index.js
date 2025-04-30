const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { caregiverEmail, medicationName, suggestedTime } = req.body;

  if (!caregiverEmail || !medicationName || !suggestedTime) {
    return res.status(400).json({
      error: "Missing required fields: caregiverEmail, medicationName, or suggestedTime.",
    });
  }

  try {
    const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
      service_id: "service_ggrl8rl",
      template_id: "template_mflj4wc",
      user_id: "ezPMMnwEBE9U4ypEH",
      template_params: {
        caregiver_email: caregiverEmail,
        medication_name: medicationName,
        suggested_time: suggestedTime,
      },
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send email:", error.message);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
