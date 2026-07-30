# 🎟️ EventNest

A production-ready full-stack event management and ticketing platform built using **Node.js, Express.js, MongoDB, Redis, Next.js, Razorpay, SendGrid, and Puppeteer**.

EventNest enables organizers to publish events, manage attendees, verify tickets through QR-based check-in, and provide a professional ticketing experience with downloadable PDF tickets.

---

# 📌 Project Status

> **Current Phase:** 🟢 Core Backend Development (Booking & Ticketing)

---

# 🏗️ Backend Architecture

```
backend/
│
├── configs/
├── controllers/
├── middleware/
├── models/
├── repositories/
├── routes/
├── services/
├── templates/
├── utils/
├── validators/
│
├── app.js
├── index.js
└── .env
```

---

# 🚀 Development Roadmap

## ✅ Phase 1 – Foundation

* [x] Express Server
* [x] Environment Configuration
* [x] MongoDB Connection
* [x] Project Architecture
* [x] Global Error Handling
* [x] Logging Middleware
* [x] Repository Pattern
* [x] Service Layer Pattern

---

## ✅ Phase 2 – Authentication

* [x] User Model
* [x] Register
* [x] Login
* [x] JWT Authentication
* [x] Refresh Tokens
* [x] Logout
* [x] Authentication Middleware
* [x] Role Authorization

### Planned Improvements

* [ ] Forgot Password
* [ ] Reset Password
* [ ] Email Verification

---

## ✅ Phase 3 – Event Management

* [x] Event Schema
* [x] Create Event
* [x] Update Event
* [x] Delete Event
* [x] Publish / Draft Events
* [x] Event Listing
* [x] Organizer Events

---

## ✅ Phase 4 – Booking System

* [x] Booking Schema
* [x] Book Event
* [x] Seat Validation
* [x] Booking Cancellation
* [x] Booking Retrieval
* [x] Organizer Booking Access

---

## 🚧 Phase 5 – Ticketing System (Current)

* [x] Ticket Reference Generation
* [x] QR Code Generation
* [x] Booking Confirmation Email
* [ ] Download Ticket Endpoint
* [ ] Dynamic PDF Ticket Generation (On Demand)
* [ ] QR Embedded PDF

---

## 🚧 Phase 6 – Check-in System

* [ ] QR Validation
* [ ] Organizer Check-in
* [ ] Prevent Duplicate Entry
* [ ] Check-in History

---

## 🚧 Phase 7 – Organizer Dashboard

* [ ] Booking Dashboard
* [ ] Event Analytics
* [ ] Attendance Statistics
* [ ] Revenue Overview

---

## 🚧 Phase 8 – Payment System

* [ ] Razorpay Integration
* [ ] Payment Verification
* [ ] Payment Webhooks
* [ ] Refund Handling

---

## 🚧 Phase 9 – Redis Optimization

* [ ] Redis Integration
* [ ] Seat Locking
* [ ] Booking TTL
* [ ] Concurrent Booking Protection

---

## 🚧 Phase 10 – Admin Module

* [ ] User Management
* [ ] Event Moderation
* [ ] Platform Analytics
* [ ] Reports

---

## 🚧 Phase 11 – Production Upgrade

* [ ] Cloudinary Integration
* [ ] Professional Email Templates
* [ ] Docker
* [ ] Swagger Documentation
* [ ] Unit Testing
* [ ] Integration Testing
* [ ] CI/CD
* [ ] Deployment

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Redis
* SendGrid
* Razorpay
* Puppeteer
* QRCode

## Frontend

* Next.js
* React
* Tailwind CSS

---

# 🎯 Backend Concepts Covered

* REST API Design
* Authentication & Authorization
* Repository Pattern
* Service Layer Pattern
* JWT Security
* Password Hashing
* MongoDB Relationships
* Validation
* Global Error Handling
* QR Code Generation
* Dynamic PDF Generation
* Email Services
* Payment Integration
* Redis Seat Locking
* Docker
* Production Architecture

---

# 🎫 Ticket Architecture

EventNest follows an **on-demand ticket generation** strategy.

```
Booking
      │
      ▼
Save Booking Data
      │
      ▼
Confirmation Email
      │
      ▼
Download Ticket Endpoint
      │
      ▼
Generate QR
      │
      ▼
Generate PDF
      │
      ▼
Stream PDF to Browser
```

No PDF files are stored on disk or in MongoDB.

Only booking information is persisted.

---

# 📖 Learning Goal

This project is being built from scratch using production-grade backend architecture.

The objective is not only to build a complete Event Management System but also to understand the design decisions behind scalable backend applications.

---

# 📄 License

This project is intended for learning and portfolio purposes.

---

# 👨‍💻 Author

**Shounak Pandit**

Full Stack Developer | MERN Stack Developer
