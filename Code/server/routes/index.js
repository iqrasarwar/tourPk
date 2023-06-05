const router = require("express").Router();
const authRoutes = require("./authUser");
const commentRoutes = require("./comment");
const blogRouter = require("./Blogs");
const helpRouter = require("./Help");
const paymentRouter = require("./Payment");
const restaurantRouter = require("./restaurant");

router.use("/blog", blogRouter);
router.use("/auth", authRoutes);
router.use("/comment", commentRoutes);
router.use("/help", helpRouter);
router.use("/payment", paymentRouter);
router.use("/restaurant", restaurantRouter);

module.exports = router;