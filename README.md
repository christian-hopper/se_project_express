# WTWR (What to Wear?) Backend

This repository contains the **backend for the WTWR (What to Wear) web application**, built using **Node.js, Express, and MongoDB**. The API provides endpoints to manage users and clothing items, supporting features like CRUD operations, liking/unliking items, and server-side validation.

---

## Table of Contents

- [Technologies](#technologies)
- [API Features](#api-features)
- [Error Handling](#error-handling)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)

---

## Technologies

- **Node.js** – JavaScript runtime environment
- **Express** – Web framework for building RESTful APIs
- **MongoDB** – NoSQL database for data storage
- **Mongoose** – ODM for MongoDB to define schemas and models
- **Validator** – Library for input validation
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication

---

## API Features

- User Management: Create accounts, login, and update user profiles.
- Items Management: Add, read, update, delete clothing items.
- Likes: Users can like or unlike items.
- Server-Side Validation: Ensures data integrity and security.

---

## Error Handling

- **400 Bad Request** – Invalid input or malformed ID
- **404 Not Found** – Resource does not exist
- **409 Conflict** - Duplicate resource
- **500 Internal Server Error** – Unexpected server errors

All errors return a JSON object with a `message` property explaining the issue.

---

## Deployment

- Base URL: [https://wtwr.spottt.com]
- Deployed Backend API: [https://api.wtwr.spottt.com]
- Frontend Application Repository: [https://github.com/christian-hopper/se_project_react]

---

## Project Pitch Video

Check out (Project Pitch)[https://drive.google.com/file/d/1U-ILJT4PB5aiiFfSqa-5xQr12UGtd62Q/view?usp=sharing], where I describe my project and some challenges I faced while building it.

## Future Improvements

- Add search and filtering for clothing items.
- Enhance authentication with refresh tokens.
- Add file uploads for user avatars and item images.

---
