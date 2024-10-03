# [OpenLAKE-V2](https://openlake-ecbz.onrender.com)
## A Blog Website Project

This project is a full-stack blog website where users can read, create, and manage blog posts. It is built using **React** for the frontend and **Node.js** with **PostgreSQL** for the backend.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Frontend Components](#frontend-components)
- [Database Schema](#database-schema)
- [Acknowledgments](#acknowledgments)

## Features

- **Infinite Scroll for Blogs**: Blogs are loaded in chunks using infinite scrolling, allowing users to load more content on demand.
- **Search by Tags**: Users can search for blogs based on tags.
- **Authentication**: User registration, login, and logout features with hashed passwords and session management.
- **Profile Picture Upload**: Users can upload a profile picture during registration, which is resized and stored in the database.
- **Blog Creation**: Authenticated users can create and publish blog posts.
- **Image Resizing**: Images uploaded for blog posts and profile pictures are automatically resized before being stored.

## Tech Stack

- **Frontend**: React, Axios, React Router, React Quill (for rich text editing), Vite (For building static files and React development)
- **Backend**: Node.js, Express.js, PostgreSQL
- **Database**: PostgreSQL
- **Authentication**: Passport.js, bcrypt
- **Image Processing**: Sharp (for resizing images)

## Setup Instructions

### 1. Clone the repository:
    ```bash
    
    git clone https://github.com/your-username/blog-website.git
    cd blog-website

### 2. Install dependencies:
For the frontend (inside the ``/client`` folder):

    ```bash
    
    npm install

### 3. Set up the PostgreSQL database:
Create a database and a users and blogs table using the schema in the Database Schema section.

### 4. Start the backend server:
    bash
    npm run dev

### 5. Start the frontend server:
In the `/client` folder, run:

    ```bash
    
    npm run dev

## API Endpoints
### Authentication

  POST /auth/register: Register a new user
  POST /auth/login: Log in a user
  GET /auth/logout: Log out a user

### Blogs
  GET /bloglists/blogs: Get a list of blogs with infinite scrolling (supports pagination with `limit` and `offset`)
  GET /blogcrud/read/
  : Get details of a single blog post by ID
  POST /blogcrud/create: Create a new blog post
  PUT /blogcrud/update/
  : Update an existing blog post
  DELETE /blogcrud/delete/
  : Delete a blog post

## Database Schema

The following table outlines the structure of the database used in the project:

`Users` Table

| **Table Name** | **Column Name**   | **Data Type**     | **Description**                                          |
|----------------|-------------------|-------------------|----------------------------------------------------------|
| `users`        | `id`              | `SERIAL`          | Primary key, auto-incremented                             |
|                | `username`        | `VARCHAR(100)`    | Unique username of the user                               |
|                | `email`           | `VARCHAR(100)`    | Unique email address                                      |
|                | `password_hash`   | `VARCHAR`         | Hashed password                                           |
|                | `created_at`      | `TIMESTAMP`       | Timestamp of when the user was created                    |
|                | `profile_photo`   | `TEXT`            | Base64-encoded image for user profile photo (64x64 pixels)|

`Blogs` Table

| **Table Name** | **Column Name**   | **Data Type**     | **Description**                                          |
|----------------|-------------------|-------------------|----------------------------------------------------------|
| `blogs`        | `id`              | `SERIAL`          | Primary key, auto-incremented                             |
|                | `title`           | `VARCHAR(255)`    | Title of the blog                                         |
|                | `subtitle`        | `VARCHAR(255)`    | Short description of the blog                             |
|                | `content`         | `TEXT`            | Blog content in HTML format                               |
|                | `tags`            | `VARCHAR[]`       | Array of tags related to the blog                         |
|                | `image_url`       | `TEXT`            | URL of the blog's associated image                        |
|                | `created_at`      | `TIMESTAMP`       | Timestamp of when the blog was created                    |
|                | `author_id`       | `INTEGER`         | Foreign key linking to the `users` table                  |


## Acknowledgments

### Special thanks to:

  React for making frontend development smooth and efficient.
  Node.js and Express for powering the backend.
  PostgreSQL for being a reliable database solution.
  Sharp for easy image processing.
