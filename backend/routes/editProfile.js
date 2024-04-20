const express = require("express");
const router = express.Router();
const fetchUserId = require("../middleware/fetchUserId");
const User = require("../models/User");

// Route: Update or edit user profile.
router.post("/edit-profile", fetchUserId, async (req, res) => {
  try {
    const { name, picture } = req.body;

    const userDocument = await User.findById(req.userId);

    if (!userDocument) {
      return res.status(404).send("No such user exists!");
    }

    // Update user profile fields if they exist in the request
    if (name) {
      userDocument.name = name;
    }
    if (picture) {
      userDocument.picture = picture;
    }

    await userDocument.save();

    // Send back only the updated fields, not the entire user document
    res.send({ name: userDocument.name, picture: userDocument.picture });
  } catch (error) {
    // Log the error for debugging
    console.error("Error updating user profile:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
