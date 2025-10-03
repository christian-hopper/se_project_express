const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getClothingItems,
  deleteClothingItem,
  createClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingitems");

router.get("/", getClothingItems);

router.post("/", createClothingItem);
router.delete("/:itemId", deleteClothingItem);
router.put("/:itemId/likes", likeClothingItem);
router.delete("/:itemId/likes", unlikeClothingItem);

module.exports = router;
