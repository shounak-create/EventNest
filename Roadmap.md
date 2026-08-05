# 🚀 EventNest Backend Roadmap

## ✅ Completed

### Authentication

- [x] Email & Password Authentication
- [x] Google OAuth Login
- [x] JWT Access & Refresh Tokens
- [x] Refresh Token Rotation
- [x] Role-Based Authorization

---

### User Module

- [x] User Schema
- [x] Role Management
- [x] Authentication Middleware

---

### Event Module

- [x] Event CRUD
- [x] Publish / Draft Workflow
- [x] Organizer Event Management

---

### Booking Module

- [x] Booking Creation
- [x] Booking Retrieval
- [x] Booking Cancellation
- [x] Booking Authorization
- [x] Organizer Booking Access

---

### Ticketing Module

- [x] Unique Ticket Reference
- [x] Dynamic QR Code Generation
- [x] Booking Confirmation Email
- [x] Secure JWT Ticket Links
- [x] Dynamic PDF Ticket Generation
- [x] QR Embedded in PDF
- [x] On-Demand Ticket Download
- [x] No PDF Storage
- [x] No QR Storage

---

## 🚧 Phase 1 — Organizer Check-in System (Current)

- [ ] QR Ticket Validation
- [ ] Organizer Check-in Endpoint
- [ ] Prevent Duplicate Check-ins
- [ ] Store Check-in Timestamp
- [ ] Organizer Scanner Flow
- [ ] Invalid / Expired Ticket Detection

---

## 🚧 Phase 2 — Dashboards

### Organizer

- [ ] Dashboard Overview
- [ ] Event Statistics
- [ ] Booking Analytics
- [ ] Attendance Analytics
- [ ] Revenue Summary

### Attendee

- [ ] My Bookings
- [ ] Booking History
- [ ] Upcoming Events
- [ ] Download Tickets

---

## 🚧 Phase 3 — Payments (Razorpay)

- [ ] Razorpay Integration
- [ ] Order Creation
- [ ] Payment Verification
- [ ] Webhooks
- [ ] Booking After Successful Payment
- [ ] Automatic Seat Deduction
- [ ] Refund Flow

---

## 🚧 Phase 4 — Redis Optimization

- [ ] Redis Integration
- [ ] Seat Locking
- [ ] Booking Expiration (TTL)
- [ ] Concurrent Booking Protection

---

## 🚧 Phase 5 — Admin Module

- [ ] User Management
- [ ] Event Moderation
- [ ] Platform Analytics
- [ ] Reports

---

## 🚧 Phase 6 — Production Upgrade

- [ ] Cloudinary Integration
- [ ] Professional Email Templates
- [ ] Docker
- [ ] Swagger / OpenAPI
- [ ] Unit Testing
- [ ] Integration Testing
- [ ] CI/CD
- [ ] Production Deployment

---

## ⭐ Stretch Goals

- [ ] AI Event Description Generator
- [ ] AI Event Recommendations
- [ ] Live Check-in Dashboard
- [ ] Seat Selection
- [ ] Multi-Organizer Support
- [ ] Google Calendar Integration
- [ ] Push Notifications
- [ ] Event Waitlist
- [ ] Coupons & Discounts
- [ ] Reviews & Ratings