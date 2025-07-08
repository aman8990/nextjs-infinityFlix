# 🎬 Next.js InfinityFlix App

A full-featured, modern streaming platform built with **Next.js 15**, delivering a complete experience with user authentication, video streaming, Stripe integration, and responsive design.

## 🚀 Live Demo

🔗 [Live Site](https://nextjs-infinity-flix.vercel.app)  

---

## 🧩 Features

- 🔐 User authentication (Email/Password via Credentials + Google & Github oAuth)
- 📺 HLS video streaming with multiple resolutions (144p–1080p)
- 🌐 Multi-audio streaming support (Hindi & English)
- 💳 Stripe payment integration (fully integrated with webhook)
- 📧 Email service with Nodemailer
- 📬 Email verification via otp
- 🧾 Responsive UI with Tailwind CSS
- 🔄 SWR for client-side data fetching
- 🔒 Protected routes using NextAuth and middleware
- 🧠 Zustand for global state management
- ⚙️ **Admin Panel** for managing videos, users, subscriptions, and more

---

## 🎥 Streaming Infrastructure

- 🎞️ **GitHub Pages as a CDN** to host HLS content
- 📂 All HLS video resolutions available: `144p`, `480p`, `720p`, `1080p`
- 🎧 Multiple audio tracks in **Hindi** and **English**
- 🧠 A dynamic `master.m3u8` playlist is streamed, which allows:
  - Automatic or manual resolution switching
  - Language (audio) selection
  - Adaptive streaming using **HLS.js**

---

## 🛠️ Tech Stack

### Frontend:
- **Next.js 15 (App Router)**
- **React 19**
- **Tailwind CSS**
- **SWR**

### Backend:
- **Next.js API Routes**
- **Prisma ORM with MongoDB**

### Auth & Payments:
- **NextAuth.js (Credentials + Google & GitHub providers)**
- **Stripe (Client-side + Webhook integration)**

### Tools & Utilities:
- **Axios** – API requests  
- **Bcrypt** – Password hashing  
- **Nodemailer** – Email service  
- **HLS.js** – HLS video playback  
- **React Icons** – Icon library  
- **React Hook Form** – Form management  
- **React Hot Toast** – Toast notifications  
- **Zustand** – Lightweight global state  
- **Date-fns** – Date utilities

---
