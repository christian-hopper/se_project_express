const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  deleteClothingItem,
  createClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingitems");
const {
  validateClothingItemBody,
  validateId,
} = require("../middlewares/validation");

router.post("/", validateClothingItemBody, createClothingItem);
router.delete("/:itemId", validateId, deleteClothingItem);
router.put("/:itemId/likes", validateId, likeClothingItem);
router.delete("/:itemId/likes", validateId, unlikeClothingItem);

module.exports = router;
