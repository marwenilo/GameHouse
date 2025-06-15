# GameHouse Frontend Technical Assessment

## 👋 Introduction

Thank you for the opportunity to complete this Frontend Engineer assessment for GameHouse. This project simulates a real-world frontend task using mobile-first, fullscreen responsive designs with seamless transitions and interactivity.

---

## 🚀 Project Overview

This project includes 4 interactive steps:

1. **Connect Your Account** – User enters their email to receive a code.
2. **Get Verified!** – User enters the verification code.
3. **Choose your plan** – User selects either Monthly or Yearly subscription.
4. **Congrats! You are now a subscriber!** – Final confirmation screen with celebratory animation.

Each screen transitions smoothly to the next, mimicking a complete onboarding user flow.

---

## 📦 Tech Stack

- **React 19**
- **React Router v7**
- **React Query v5** for data fetching and caching
- **TypeScript** for type safety
- **Vite** for build tooling
- **Motion** for button ripple effects and animations
- **Canvas-confetti** for celebration effect
- **Custom CSS Modules** – No frameworks used

---

## 🧩 Features Implemented

- ✅ Mobile-first responsive design (portrait and landscape)
- ✅ Seamless transitions between steps
- ✅ Animated ripple effects on buttons using `motion`
- ✅ Confetti animation on subscription confirmation
- ✅ Form validation and error handling with user feedback
- ✅ Debounced "Resend Code" with a 30-second countdown
- ✅ Plan selection with visual feedback
- ✅ Support for both **USD** and **EUR** currencies
- ✅ Full API integration with provided REST endpoints
- ✅ Self-contained and modular component structure

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js >= 18
- npm or pnpm installed


### 1. Unzip the project

Extract the contents of the ZIP file you received:
marwen-magri-frontend-2025-main.zip

- Navigate into the project folder inside marwen-magri-frontend-2025-main folder:

- cd client

### 2. Install dependencies

- npm install

### 3. Start the local development server

- npm run dev

This will launch the app at http://localhost:5173.

# Ensure the Backend Server are also running on localhost.

## 🌐 API Endpoints Used

All API requests assume the backend is hosted locally.

| Method | Endpoint                                    | Purpose                       |
| ------ | ------------------------------------------- | ----------------------------- |
| GET    | `/api/send-email-validation-code?email=...` | Request verification code     |
| POST   | `/api/validate-email`                       | Verify code and get user ID   |
| GET    | `/api/products`                             | Fetch pricing data            |
| POST   | `/api/start-trial`                          | Start trial for selected plan |

## 🧪 Error Handling

All inputs are validated before any API call

Meaningful error messages are shown (invalid email, wrong code, etc.)

All API errors are gracefully handled and logged

Buttons are disabled during API activity to prevent race conditions

## 📱 Responsive Design

Layout is optimized for mobile-first with support for both portrait and landscape orientations

Flexbox and media queries were used for responsive adjustments

Each page adapts to the screen size to maintain usability and aesthetic

## 🙌 Thank You!

I appreciate the opportunity to take part in this assessment and look forward to your feedback!****
