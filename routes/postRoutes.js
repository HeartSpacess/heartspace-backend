const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { check, validationResult } = require("express-validator");

// ✅ Fetch All Posts (Latest First)
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json({ success: true, posts });
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

// ✅ Create a New Post (With Validation)
router.post(
    "/",
    [
        check("userId", "User ID is required").not().isEmpty(),
        check("content", "Post content cannot be empty").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const { userId, content, name, profilePic } = req.body;

            const newPost = new Post({ userId, content, name, profilePic });
            await newPost.save();

            res.status(201).json({ success: true, message: "Post created successfully", post: newPost });
        } catch (error) {
            console.error("Error creating post:", error.message);
            res.status(500).json({ success: false, message: "Server Error", error: error.message });
        }
    }
);

// ✅ Get Posts of a Specific User (Latest First)
router.get("/:userId", async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json({ success: true, posts });
    } catch (error) {
        console.error("Error fetching user posts:", error.message);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

module.exports = router;
