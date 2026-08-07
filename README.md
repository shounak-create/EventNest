# 🎟️ EventNest

A production-ready full-stack event management and ticketing platform built using **Node.js, Express.js, MongoDB, Redis, Next.js, Razorpay, SendGrid, and Puppeteer**.

EventNest enables organizers to publish events, manage attendees, track bookings and revenue, verify tickets through QR-based check-in, and provide a professional ticketing experience with downloadable PDF tickets.

---

# 📌 Project Status

> **Current Phase:** 🟢 Frontend Development

The core backend infrastructure is implemented, including authentication, event management, bookings, ticketing, QR check-in, payments, Redis seat locking, organizer dashboards, admin management, and Swagger API documentation.

The project is now moving into **Next.js frontend development**, with the remaining Razorpay checkout and payment edge cases being integrated alongside the frontend.

---

# 🏗️ Backend Architecture

```text
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

## ✅ Phase 1 – Backend Foundation

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
* [x] Google OAuth
* [x] JWT Authentication
* [x] Access & Refresh Tokens
* [x] Refresh Token Rotation
* [x] Logout
* [x] Authentication Middleware
* [x] Role-Based Authorization

### Future Improvements

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
* [x] Organizer Event Management
* [x] Event Moderation

---

## ✅ Phase 4 – Booking System

* [x] Booking Schema
* [x] Book Event
* [x] Seat Validation
* [x] Booking Cancellation
* [x] Booking Retrieval
* [x] Booking Authorization
* [x] Organizer Booking Access

---

## ✅ Phase 5 – Ticketing System

* [x] Unique Ticket Reference
* [x] QR Code Generation
* [x] Booking Confirmation Email
* [x] Secure Ticket Links
* [x] Download Ticket Endpoint
* [x] Dynamic PDF Ticket Generation
* [x] QR Embedded PDF
* [x] On-Demand Ticket Generation
* [x] No PDF Storage
* [x] No QR Storage

---

## ✅ Phase 6 – Check-in System

* [x] QR Ticket Validation
* [x] Organizer Check-in
* [x] Prevent Duplicate Entry
* [x] Check-in Timestamp
* [x] Invalid / Expired Ticket Detection

---

## ✅ Phase 7 – Payment Backend

* [x] Razorpay Order Creation
* [x] Payment Verification
* [x] Booking Creation After Successful Payment
* [x] MongoDB Transaction Support

### Remaining Integration

* [ ] Razorpay Checkout Integration
* [ ] Payment Failure Handling
* [ ] Automatic Seat Release
* [ ] Razorpay Webhooks
* [ ] Refund Management

---

## ✅ Phase 8 – Redis Optimization

* [x] Redis Integration
* [x] Seat Locking
* [x] Booking TTL
* [x] Concurrent Booking Protection

---

## ✅ Phase 9 – Organizer Dashboard Backend

* [x] Dashboard Overview
* [x] Event Statistics
* [x] Booking Analytics
* [x] Attendance Analytics
* [x] Revenue Analytics
* [x] Payment Statistics

---

## ✅ Phase 10 – Admin Module

### User Management

* [x] Manage Users
* [x] Manage Organizers
* [x] Suspend / Activate Accounts

### Event Moderation

* [x] Review Events
* [x] Approve / Reject Events
* [x] Remove Events

### Platform Analytics

* [x] Total Users
* [x] Total Events
* [x] Revenue Analytics
* [x] Booking Statistics

---

## ✅ Phase 11 – API Documentation

* [x] Swagger / OpenAPI Integration
* [x] Authentication API Documentation
* [x] Event API Documentation
* [x] Booking API Documentation
* [x] Payment API Documentation
* [x] Check-in API Documentation
* [x] Ticket API Documentation
* [x] Reusable API Schemas

---

# 🚧 Phase 12 – Frontend Development

### Foundation

* [ ] Next.js Application Setup
* [ ] TypeScript Configuration
* [ ] Tailwind CSS Setup
* [ ] API Client
* [ ] Authentication State
* [ ] Protected Routes
* [ ] Global UI Components

### Public Pages

* [ ] Landing Page
* [ ] Event Listing
* [ ] Event Details
* [ ] Login
* [ ] Registration

### Attendee

* [ ] Attendee Dashboard
* [ ] My Bookings
* [ ] Booking Details
* [ ] Upcoming Events
* [ ] Ticket Download
* [ ] Booking Cancellation
* [ ] Razorpay Checkout

### Organizer

* [ ] Organizer Dashboard UI
* [ ] Event Management
* [ ] Create Event
* [ ] Edit Event
* [ ] Event Statistics
* [ ] Booking Analytics
* [ ] Attendance Analytics
* [ ] Revenue Analytics

### Admin

* [ ] Admin Dashboard UI
* [ ] User Management
* [ ] Account Suspension / Activation
* [ ] Event Moderation
* [ ] Platform Analytics

---

# 🚧 Phase 13 – Production Readiness

* [ ] Docker Compose
* [ ] Cloudinary Integration
* [ ] Professional Email Templates
* [ ] Rate Limiting
* [ ] Logging & Monitoring
* [ ] Unit Testing
* [ ] Integration Testing
* [ ] CI/CD Pipeline
* [ ] Production Deployment

---

# ⭐ Stretch Goals

* [ ] AI Event Description Generator
* [ ] AI Event Recommendations
* [ ] Seat Selection System
* [ ] Live Check-in Dashboard
* [ ] Event Waitlist
* [ ] Coupons & Discounts
* [ ] Reviews & Ratings
* [ ] Google Calendar Integration
* [ ] Push Notifications
* [ ] Multi-Organizer Support
* [ ] Event Insights & Reports

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
* Swagger / OpenAPI

## Frontend

* Next.js
* React
* TypeScript
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
* MongoDB Transactions
* Redis Seat Locking
* TTL-Based Reservations
* Role-Based Access Control
* API Documentation with Swagger
* Dashboard Analytics
* Admin Management
* Production-Oriented Backend Architecture

---

# 🎫 Ticket Architecture

EventNest follows an **on-demand ticket generation** strategy.

```text
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

Only booking information is persisted, while the QR code and PDF are generated when the ticket is requested.

---

# 📖 Learning Goal

This project is being built from scratch using production-oriented backend and frontend architecture.

The objective is not only to build a complete Event Management System, but also to understand the design decisions behind scalable applications, including authentication, authorization, transactions, caching, seat reservation, payments, API documentation, analytics, and full-stack integration.

---

# 📄 License

This project is intended for learning and portfolio purposes.

---

# 👨‍💻 Author

**Shounak Pandit**

Full Stack Developer | MERN Stack Developer
