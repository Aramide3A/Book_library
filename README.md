# 📚 Library Management System API

Welcome to the **Library Management System API**, a comprehensive backend service designed to manage interactions between users and a digital library. This API allows users to explore, borrow, and return books, manage accounts, and for administrators, to efficiently oversee inventory and user activities.

## 🚀 Features

### User Management
- **Sign Up & Login**: Users can register with an email and password, and log in securely.
- **Multi-Factor Authentication (MFA)**: Enhanced security with optional MFA support.
- **Profile Management**: Users can view and edit their personal details such as name, address, and contact information.

### Book Catalog & Search
- **Browse Books**: Explore the library’s catalog with detailed information including title, author, genre, and availability.
- **Search & Filter**: Search for books by title, author, or genre with filters to narrow down results.

### Borrowing & Reservations
- **Borrow Books**: Borrow books that are available for checkout.
- **Return Books**: Return books to update their availability in the system.
- **Reserve Books**: Reserve books that are currently unavailable.
- **Renew Books**: Renew books two days before the due date, ensuring fair access.

### User Activity & Fines
- **Borrowing History**: View a history of borrowed, returned, and overdue books.

### Administrator Features
- **Book Management**: Add, update, and remove books from the library’s catalog.
- **User Management**: Manage user accounts, reset passwords, and handle inquiries.

---

## 📋 API Endpoints Overview

### 🔐 User Management
- `POST /signup` – Register a new user.
- `POST /login` – Authenticate a user and issue a JWT.
- `GET /profile` – Retrieve the user's profile.
- `PUT /profile` – Update the user's profile.

### 📚 Book Management (Admin Only)
- `POST /books` – Add a new book to the catalog.
- `GET /books` – Get a list of all books.
- `GET /books/:id` – Retrieve details of a single book.
- `PUT /books/:id` – Update book details.
- `DELETE /books/:id` – Remove a book from the catalog.

### 🔄 Borrowing & Reservations
- `POST /:id/borrow` – Borrow a book.
- `POST /borrow/:id/return` – Return a borrowed book.
- `POST /:id/reserve` – Reserve a book.
- `DELETE /:id/reserve/delete` –Delete reserve for a book.
- `POST /borrow/:id/renew` – Renew a borrowed book.

### 📝 History
- `GET /history` – View the user’s borrowing history.

---

## 💻 Technology Stack

- **Backend**: Node.js with Express.
- **Database**: MongoDB for storing users, books, and transaction data.
- **Authentication**: JSON Web Tokens (JWT) for secure authentication.
- **Validation**: Input validation with Joi.
- **API Documentation**: Swagger or similar tools for clear API documentation.

---
