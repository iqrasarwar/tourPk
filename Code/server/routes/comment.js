const express = require("express");
const router = express.Router();
const { addComment, deleteComment, commentByBlogPostId, updateComment } = require("../controllers/comment");

router.post("/addComment", addComment);
router.get("/:blogId", commentByBlogPostId);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
module.exports = router;