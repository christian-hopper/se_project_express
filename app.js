const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const auth = require("./middlewares/auth");
const { createUser, loginUser } = require("./controllers/users");

const app = express();

app.use(cors());

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

app.use(express.json());

// Signup and Signin routes
app.post("/signup", createUser);
app.post("/signin", loginUser);

//GET /items
app.use("/items", mainRouter);

// Protected routes
app.use(auth);
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
