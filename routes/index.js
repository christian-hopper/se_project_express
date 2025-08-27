const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothingitems");
const { NOT_FOUND } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Resource not found" });
});

module.exports = router;
