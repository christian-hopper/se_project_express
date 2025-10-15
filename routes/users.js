const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateUserBody } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateUserBody, updateCurrentUser);

module.exports = router;
