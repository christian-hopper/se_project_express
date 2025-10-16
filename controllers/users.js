const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const { OK, CREATED, DUPLICATE_KEY_ERROR } = require("../utils/errors");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");

// GET /users/:id

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID"));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me
const updateCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(OK).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID"));
      } else {
        next(err);
      }
    });
};

// POST /users

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;

      res.status(CREATED).send({ user: userWithoutPassword, token });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else if (err.code === DUPLICATE_KEY_ERROR) {
        next(new ConflictError("Email already in use"));
      } else {
        next(err);
      }
    });
};

// POST /users/login

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(OK).send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Incorrect email or password"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  updateCurrentUser,
  createUser,
  loginUser,
};
