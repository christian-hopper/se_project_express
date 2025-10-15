const router = require("express").Router();
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const clothingRouter = require("./clothingitems");
const { createUser, loginUser } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");
const { getClothingItems } = require("../controllers/clothingitems");
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

// Public routes (signup & signin)
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, loginUser);
router.get("/items", getClothingItems);

// Protected routes
router.use(auth);
router.use("/users", userRouter);
router.use("/items", clothingRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Resource not found" });
});

module.exports = router;
