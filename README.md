# 🔑 Vought: Serverless Password Manager

Vought is a lightweight, secure, and fully responsive password management dashboard. Built with a "No-Build" philosophy, it utilizes native web technologies (HTML, CSS, Vanilla JS) integrated with a modern serverless backend (Supabase).

This project demonstrates how to build a production-quality, secure vault interface without the overhead of heavy JavaScript frameworks, relying on database-level Row Level Security (RLS) to ensure data privacy.

---

## ✨ Features

- **Serverless Architecture:** Powered by Supabase for authentication and PostgreSQL database management.
- **Robust Security:** Utilizes Row Level Security (RLS) to guarantee users can only access, edit, or delete their own encrypted credentials.
- **Real-Time Synchronization:** Dashboard updates instantly across all active sessions without manual page reloads.
- **Zero-Framework Frontend:** Built purely with HTML5, CSS3, and Vanilla JavaScript for blazing-fast load times.
- **Modern UI/UX:**
  - Persistent Dark Mode using CSS Custom Properties.
  - Fully responsive CSS Flexbox/Grid layout (Desktop, Tablet, Mobile).
  - Staggered CSS `@keyframes` animations for a polished, app-like feel.
  - Seamless modal-based CRUD (Create, Read, Update, Delete) operations.
- **Quick Actions:** One-click clipboard copying, password visibility toggling, and URL integration.

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5 (Semantic Structure)
- CSS3 (Flexbox/Grid, Custom Properties, Animations)
- Vanilla JavaScript (ES6+ Modules, DOM Manipulation)

**Backend (Backend-as-a-Service):**
- [Supabase](https://supabase.com/)
- PostgreSQL (Database & RLS)
- Supabase Auth (JWT Session Management)
