const ClothingItem = require("../models/clothingitem");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// GET /items

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => res.status(OK).send(clothingItems))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// POST /items

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((clothingItem) => res.status(CREATED).send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// DELETE /items/:itemId

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .then((clothingItem) => {
      if (!clothingItem) {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found" });
      }
      return res
        .status(OK)
        .send({ message: "Clothing item deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid clothing item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// PUT /items/:itemId/likes

const likeClothingItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((clothingItem) => {
      if (!clothingItem) {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found" });
      }
      return res.status(OK).send(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid clothing item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// DELETE /items/:itemId/likes

const unlikeClothingItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((clothingItem) => {
      if (!clothingItem) {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found" });
      }
      return res.status(OK).send(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid clothing item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
};
