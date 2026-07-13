# 🎟️ EventNest

A production-ready full-stack event management and ticketing platform built with **Node.js, Express, MongoDB, Redis, Next.js, and Stripe**.

EventNest allows organizers to create and manage events while attendees can discover events, reserve seats, purchase tickets securely, and check in using QR codes.

---

# 📌 Project Status

> **Current Phase:** 🟢 Phase 2 – Authentication Module

---

# 🏗️ Project Architecture

```
EventNest/
│
├── backend/
│   │
│   ├── src/
│   │   │
│   │   ├── configs/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── helpers/
│   │   ├── constants/
│   │   ├── jobs/
│   │   ├── sockets/
│   │   ├── emails/
│   │   ├── pdf/
│   │   ├── qr/
│   │   ├── app.js
│   │   │
│   │   └── ...
│   │
│   ├── tests/
│   ├── .env
│   ├── package.json
│   └── index.js
│
├── frontend/
│
└── README.md
```

---

# 🚀 Development Roadmap

## ✅ Phase 1 – Project Foundation

- [x] Initialize Git Repository
- [x] Connect GitHub Repository
- [x] Setup Express Server
- [x] Configure Environment Variables
- [x] Connect MongoDB
- [x] Configure Project Structure
- [x] Setup Logging Middleware
- [x] Health Check Endpoint

---

## 🟢 Phase 2 – Authentication

- [ ] User Schema
- [ ] Password Hashing (bcrypt)
- [ ] Register API
- [ ] Login API
- [ ] JWT Authentication
- [ ] Refresh Tokens
- [ ] Logout
- [ ] Authentication Middleware
- [ ] Role Authorization
- [ ] Forgot Password
- [ ] Reset Password
- [ ] Email Verification

---

## ⏳ Phase 3 – Venue Management

- [ ] Venue Schema
- [ ] Seat Schema
- [ ] Create Venue
- [ ] Update Venue
- [ ] Delete Venue
- [ ] Seat Categories
- [ ] Venue Images

---

## ⏳ Phase 4 – Event Management

- [ ] Event Schema
- [ ] Event CRUD
- [ ] Categories
- [ ] Event Schedule
- [ ] Speakers
- [ ] Event Gallery
- [ ] Organizer Events

---

## ⏳ Phase 5 – Ticket Management

- [ ] Ticket Types
- [ ] Pricing
- [ ] Ticket Availability
- [ ] Order Schema
- [ ] Ticket Generation

---

## ⏳ Phase 6 – Redis Seat Reservation

- [ ] Redis Integration
- [ ] Seat Locking
- [ ] TTL Expiration
- [ ] Automatic Unlock
- [ ] Concurrent Booking Protection

---

## ⏳ Phase 7 – Payments

- [ ] Stripe Checkout
- [ ] Payment Verification
- [ ] Stripe Webhooks
- [ ] Refund API
- [ ] Order Confirmation

---

## ⏳ Phase 8 – QR Ticket System

- [ ] QR Code Generation
- [ ] Ticket PDF
- [ ] Email Ticket
- [ ] Download Ticket

---

## ⏳ Phase 9 – Event Check-in

- [ ] QR Scanner API
- [ ] Ticket Validation
- [ ] Prevent Duplicate Entry
- [ ] Check-in History

---

## ⏳ Phase 10 – Organizer Dashboard

- [ ] Revenue Analytics
- [ ] Ticket Sales
- [ ] Attendance Statistics
- [ ] Charts
- [ ] Reports

---

## ⏳ Phase 11 – Admin Panel

- [ ] User Management
- [ ] Organizer Approval
- [ ] Event Moderation
- [ ] Reports
- [ ] Platform Analytics

---

## ⏳ Phase 12 – Production Ready

- [ ] Docker
- [ ] Unit Testing
- [ ] Integration Testing
- [ ] Swagger API Documentation
- [ ] CI/CD
- [ ] Deployment

---

# 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- JWT
- bcrypt
- Stripe
- Cloudinary
- Nodemailer / SendGrid
- Puppeteer
- QRCode

### Frontend

- Next.js
- React
- Tailwind CSS

### DevOps

- Docker
- Git
- GitHub

---

# 🎯 Backend Concepts Covered

- REST API Design
- Authentication & Authorization
- Repository Pattern
- Service Layer Pattern
- JWT Security
- Password Hashing
- MongoDB Relationships
- Redis Caching
- Distributed Locking
- Payment Integration
- QR Code Generation
- PDF Generation
- Email Services
- File Uploads
- Logging
- Validation
- Error Handling
- Docker

---

# 📖 Learning Goal

This project is being built from scratch using production-level backend architecture. Every feature is implemented step by step to understand not only **how** it works but also **why** it is designed that way.

---

# 📄 License

This project is intended for learning and portfolio purposes.

---

# 👨‍💻 Author

**Shounak Pandit**

Backend Developer | MERN Stack Developer