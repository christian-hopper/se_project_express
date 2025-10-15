const ClothingItem = require("../models/clothingitem");
const { OK, CREATED } = require("../utils/errors");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

// GET /items

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItems) => res.status(OK).send(clothingItems))
    .catch((err) => {
      next(err);
    });
};

// POST /items

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((clothingItem) => res.status(CREATED).send(clothingItem))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided for clothing item"));
      } else {
        next(err);
      }
    });
};

// DELETE /items/:itemId

const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .then((clothingItem) => {
      if (!clothingItem) {
        throw new NotFoundError("Clothing item not found");
      }
      if (clothingItem.owner.toString() !== userId) {
        throw new ForbiddenError(
          "You do not have permission to delete this clothing item"
        );
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((clothingItem) => {
      if (!clothingItem) {
        throw new NotFoundError("Clothing item not found");
      }
      return res
        .status(OK)
        .send({ message: "Clothing item deleted successfully" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid clothing item ID"));
      } else {
        next(err);
      }
    });
};

// PUT /items/:itemId/likes

const likeClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((clothingItem) => {
      if (!clothingItem) {
        throw new NotFoundError("Clothing item not found");
      }
      return res.status(OK).send(clothingItem);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid clothing item ID"));
      } else {
        next(err);
      }
    });
};

// DELETE /items/:itemId/likes

const unlikeClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((clothingItem) => {
      if (!clothingItem) {
        throw new NotFoundError("Clothing item not found");
      }
      return res.status(OK).send(clothingItem);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid clothing item ID"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
};
