# 🩺 Medicare Pro Dashboard

A stylish and responsive Admin Dashboard built using **Next.js**, **Axios**, and **Tailwind CSS**. This dashboard provides an overview of subscription statuses for users and doctors in the **Medicare Pro** platform.

---

## 🚀 Features

- ✅ View Total Users and Total Doctors
- 📊 Monitor Active, Expired, and Expiring Subscriptions (within 7 days)
- 🌐 API Integration with Authorization Token
- 🎨 Fully Responsive UI with modern card layout
- ⚡ Built with performance and simplicity using `useEffect` and `useState`

---

## 📁 Project Structure

```
/admin
└── dashboard
└── page.jsx          # Main dashboard overview page
/components
└── Card.jsx               # Reusable card component for metrics
/public
/styles
└── globals.css            # Tailwind styles
README.md

````

---

## 🧑‍💻 Tech Stack

- **Framework**: [Next.js](https://nextjs.org)
- **UI**: [Tailwind CSS](https://tailwindcss.com)
- **HTTP Client**: [Axios](https://axios-http.com)
- **Deployment**: Vercel (Backend assumed to be on Vercel)

---

## 🔐 Authentication

This app uses a **JWT token stored in `localStorage`** for accessing protected API routes.

> Make sure you're logged in and have a valid token saved in `localStorage` under the key: `token`

---

## 🔄 API Endpoint Used

- **GET** `/api/v1/admin/users`  
  Fetch all users with their roles and subscription data.

---

## 🛠 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/medicare-admin-dashboard.git

# 2. Navigate into the project
cd medicare-admin-dashboard

# 3. Install dependencies
npm install

# 4. Run locally
npm run dev
```
---

## 📃 License

MIT License. Free for personal and commercial use.

---

## 👨‍💻 Author

**Kamrul Islam Apurba**
Frontend Developer | React & Next.js Specialist
[GitHub](https://github.com/kamrul2006) 

---
