# WTWR (What to Wear?) Backend

This repository contains the **backend for the WTWR (What to Wear) web application**, built using **Node.js, Express, and MongoDB**. The API provides endpoints to manage users and clothing items, supporting features like CRUD operations, liking/unliking items, and server-side validation.

---

## Table of Contents

- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Clothing Items](#clothing-items)
- [Error Handling](#error-handling)
- [Getting Started](#getting-started)
- [Future Improvements](#future-improvements)

---

## Technologies

- **Node.js** – JavaScript runtime environment
- **Express** – Web framework for building RESTful APIs
- **MongoDB** – NoSQL database for data storage
- **Mongoose** – ODM for MongoDB to define schemas and models
- **Validator** – Library for input validation

## API Endpoints

### Users

| Method | Endpoint     | Description         | Request Body                          |
| ------ | ------------ | ------------------- | ------------------------------------- |
| GET    | `/users`     | Get all users       | None                                  |
| GET    | `/users/:id` | Get a specific user | None                                  |
| POST   | `/users`     | Create a new user   | `{ "name": "John", "avatar": "URL" }` |

---

### Clothing Items

| Method | Endpoint               | Description                        | Request Body                                               |
| ------ | ---------------------- | ---------------------------------- | ---------------------------------------------------------- |
| GET    | `/items`               | Get all clothing items             | None                                                       |
| POST   | `/items`               | Create a new clothing item         | `{ "name": "Shirt", "weather": "hot", "imageUrl": "URL" }` |
| DELETE | `/items/:itemId`       | Delete a clothing item             | None                                                       |
| PUT    | `/items/:itemId/likes` | Like a clothing item               | None                                                       |
| DELETE | `/items/:itemId/likes` | Remove a like from a clothing item | None                                                       |

---

## Error Handling

- **400 Bad Request** – Invalid input or malformed ID
- **404 Not Found** – Resource does not exist
- **500 Internal Server Error** – Unexpected server errors

All errors return a JSON object with a `message` property explaining the issue.
