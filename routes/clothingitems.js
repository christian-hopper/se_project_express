const router = require("express").Router();
const {
  getClothingItems,
  deleteClothingItem,
  createClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingitems");

router.get("/items", getClothingItems);
router.post("/items", createClothingItem);
router.delete("/items/:itemId", deleteClothingItem);
router.put("/items/:itemId/likes", likeClothingItem);
router.delete("/items/:itemId/likes", unlikeClothingItem);

module.exports = router;
