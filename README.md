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

## 📂 Project Structure

```bash
project/
  ├── middleware.js        # Middleware for route protection (auth guard)
  ├── prisma/
  │   └── schema.prisma    # Prisma schema for MongoDB

  app/
    ├── api/               # API endpoints (auth, checkout, etc.)
    ├── _actions/          # Next.js Server Actions (getMovies, getWishlist, getEpisode etc.)
    ├── _context/          # React Contexts (e.g. Auth context, Toast context)
    ├── _components/       # Reusable UI components (buttons, input, header etc.)
    ├── _utils/            # Utility/helper functions
    ├── _hooks/            # Custom hooks (usePayments, useWishlistStore)
    ├── _libs/             # Core libraries (prismadb, emailSender, fetcher etc.)
    ├── account/           # User account info and settings
    ├── (site)/            # App Homepage
    ├── login/             # Login page
    ├── search/            # Movie search
    ├── hollywood/         # Hollywood movie page
    ├── video/          
    │   └── [videoId]/     # Video player page
    ├── adminPanel/          
    │   └── dashboard/     # Admin panel dashboard
    │   └── createMovie/   # Create new movie
    │   └── updateMovie/   # Update movie
    │   ||                 # More routes
    ├── layout.js          # Root layout for the app
    ├── globals.css        # Global Tailwind styles
    └── not-found.js       # Custom 404 error page
```

---


# 🧪 Getting Started

Follow these steps to set up the project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/aman8990/nextjs-infinityFlix.git
cd nextjs-infinityFlix
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Set Up Environment Variables

```bash
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

EMAIL_USERNAME=your_name@service.com
EMAIL_PASSWORD=your_password
EMAIL_FROM=your_email@gmail.com

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_key
```

## 4. Generate Prisma Client

```bash
npx prisma generate
```

## 5. Start Development Server

```bash
npm run dev
```

---

## 📬 Contact

Created by [Aman Kumar](https://github.com/aman8990)  
📧 Email: [amandalal899@gmail.com](mailto:amandalal899@gmail.com)

