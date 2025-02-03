const express = require('express');
const router = express.Router();

// Login Route (POST only)
router.post('/login', (req, res) => {
    const { identifier, password } = req.body;

    if (identifier === "test@example.com" && password === "password123") {
        return res.json({ userId: "abc123", message: "Login successful!" });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
});

module.exports = router;
