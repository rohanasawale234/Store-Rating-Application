# 🏪 Store Rating Web Application

This is a full-stack web application that allows users to submit ratings for stores registered on the platform.  
The application supports role-based access with different features for **Admin**, **Normal Users**, and **Store Owners**.

This project was built as part of a **Full-Stack Internship Coding Challenge**, focusing on clean architecture, security, and real-world application behavior.

---

## 🚀 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router
- React Toastify

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MySQL

---

## 👥 User Roles & Features

### 1️⃣ System Administrator
- Secure login using JWT authentication
- Create:
  - Normal users
  - Store owners
  - Stores
- Dashboard with:
  - Total users
  - Total stores
  - Total ratings
- View all users with:
  - Name
  - Email
  - Address
  - Role
- View all stores with:
  - Name
  - Email
  - Address
  - Average rating
- Access protected by role-based authorization

---

### 2️⃣ Normal User
- Sign up and log in
- Update password
- View all registered stores
- Search stores by name or address
- Submit ratings (1–5 stars)
- Update previously submitted ratings
- View:
  - Average store rating
  - Their own rating
- Interactive star rating UI with toast notifications

---

### 3️⃣ Store Owner
- Secure login
- Dashboard showing:
  - Store name
  - Average rating
  - List of users who rated the store
- Read-only access to ratings

---

## 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (ADMIN, USER, STORE_OWNER)
- Protected routes on frontend and backend
- Secure password hashing using bcrypt

---

## 🗄️ Database Design

Main tables:
- `users`
- `stores`
- `ratings`

Key points:
- Each store belongs to a store owner
- Each user can rate a store only once
- Foreign keys ensure data integrity
- Average ratings are calculated dynamically

---

## 🎨 UI Highlights
- Clean and minimal design
- Star-based rating system
- Toast notifications instead of browser alerts
- Search and filter functionality
- Responsive dashboards and tables

---

## 🛠️ How to Run the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone <your-repository-url>
cd store_rating_app




### Backend Setup 
```bash
cd backend
npm install

###.env 
```.dotenv
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_app
JWT_SECRET=your_secret_key


### frontend setup
cd frontend
npm install
npm run dev



💡 What I Learned from This Project

Implementing JWT authentication and role-based authorization

Designing relational database schemas

Connecting frontend and backend securely

Building reusable React components

Handling real-world UI states (loading, success, error)

Debugging and fixing production-style issues

🧑‍💻 Author

Rohan Asawale
Full-Stack Developer (Fresher)
Built as part of an Internship Assignment


✅ Final Notes

This project demonstrates:

End-to-end full-stack development

Clean and maintainable code

Real-world application logic

Secure authentication and authorization

