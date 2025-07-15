⸻

# Auth System 

This is a full-featured authentication starter built using the mongodb, express, node.js, zod with TypeScript on the backend. It provides a complete login system using JSON Web Tokens (JWT), cookie-based sessions, secure account verification, and password reset via email.

---

## 🔧 Tech Stack

- **Backend**: Node.js + Express + MongoDB + TypeScript, zod
- **Auth**: JWT (access/refresh), HTTP-only cookies
- **Email**: Resend (for transactional flows)

---

## ✨ Core Features

- User registration and email verification
- Login and logout (token-based session)
- Password reset with tokenized links
- View & manage user profile
- Auto-refresh access token logic (frontend)
- Secure cookie storage (HTTP-only, SameSite)

---

## 🗂️ Backend Structure

| Layer     | Description |
|-----------|-------------|
| **Routes** | Entry point for all API endpoints |
| **Controllers** | Validate input, handle request/response logic |
| **Services** | Core business logic — handles database + tokens |
| **Models** | Mongoose schemas with typed data access |
| **Utils** | Token generators, email functions, async wrappers |
| **Middleware** | Auth guards, error handlers, validation filters |

Each controller is wrapped with a custom async error catcher to ensure consistent error handling across the entire API.

---

## 🔐 Authentication Flow

The backend issues **two tokens** on login:

- **Access Token** — short-lived, used for API auth
- **Refresh Token** — long-lived, used only at `/refresh` to renew the access token

Tokens are delivered via secure, HTTP-only cookies. If the access token expires, the frontend silently calls the refresh endpoint and retries the original request.

If the refresh fails (expired/invalid), the user is automatically logged out.

---

## 🚀 Getting Started (Local Setup)

> Prerequisites: Node.js, MongoDB (local or Atlas), Resend account

### 🔨 Clone & Install

```bash
git clone https://github.com/pk-ryptic/Auth-Starter-Template.git
cd Auth-Starter_Template

🛠️ Backend Setup

cd backend
npm install
cp sample.env .env  # Add your config
npm run dev         # Starts server on http://localhost:4004


🔁 Dev Workflow
	•	Backend: http://localhost:4004

Use the pre-configured Postman collection to manually test auth flows.

⸻

⚙️ Build for Production

# backend
npm run build

# Run compiled backend code
npm run start


⸻

📬 Email Delivery (Resend)

Resend is used in sandbox mode locally. You can test emails using your Resend dashboard.

Configure:

EMAIL_SENDER=you@yourdomain.com
RESEND_API_KEY=your-api-key


⸻

📁 Project Highlights
	•	Modular folder structure for scale
	•	Error-first architecture
	•	Easy to extend with roles or multi-tenancy
	•	Clear separation of concerns: UI, logic, transport, persistence

⸻