const express = require('express');
const router = express.Router();

// Dummy Posts Route (Replace with DB logic)
router.get('/', (req, res) => {
    res.json([
        { id: 1, title: "First Post", content: "This is the first post!" },
        { id: 2, title: "Second Post", content: "This is the second post!" }
    ]);
});

module.exports = router;
