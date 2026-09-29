# SAURABHYA — Where Memories Become Fragrance

SAURABHYA is a modern Indian-inspired perfume e-commerce website built using the MERN stack.

The application provides a complete basic e-commerce workflow, including product browsing, user authentication, shopping cart management, checkout, simulated payment processing, order creation, and order history.

## ✨ Features

- Modern luxury perfume storefront
- Browse perfume collection
- Product details and images
- Add products to cart
- Increase, decrease, and remove cart items
- Live cart item-count badge
- User registration and login
- JWT-based authentication
- Protected account and checkout pages
- Shipping information
- Simulated payment gateway
  - UPI
  - Credit / Debit Card
  - Cash on Delivery
- Order creation and storage in MongoDB
- Order confirmation
- My Orders
- Logout with confirmation

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Vite
- JavaScript

### Backend
- Node.js
- Express.js
- Mongoose
- JWT
- bcryptjs

### Database
- MongoDB

## 🔄 Application Workflow

```text
Home
  ↓
Shop
  ↓
Product Details
  ↓
Add to Cart
  ↓
Cart
  ↓
Login / Register
  ↓
Checkout
  ↓
Shipping Information
  ↓
Payment Method
  ├── UPI
  ├── Credit / Debit Card
  └── Cash on Delivery
  ↓
Order Created
  ↓
Order Confirmation
  ↓
My Account
  ↓
My Orders
````

## 📁 Project Structure

```text
SAURABHYA/
│
├── public/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── features/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── .env
│   └── server.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## ⚙️ Requirements

Before running the project, install:

* Node.js
* npm
* MongoDB
* Git

## 🚀 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/FineFur/Saurabhya-A-perfume-project.git
```

```bash
cd Saurabhya-A-perfume-project
```

### 2. Install frontend dependencies

From the project root:

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Configure environment variables

Create:

```text
server/.env
```

Add:

```env
JWT_SECRET=your_secret_key
```

### 5. Start MongoDB

Make sure your local MongoDB server is running.

The application uses:

```text
mongodb://127.0.0.1:27017/saurabhya
```

### 6. Start the backend

From the `server` directory:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

### 7. Start the frontend

Open another terminal in the project root:

```bash
npm run dev
```

Open the URL provided by Vite, normally:

```text
http://localhost:5173
```

## 💳 Payment

The project includes a **basic simulated payment gateway** for academic demonstration.

Available methods:

* UPI
* Credit / Debit Card
* Cash on Delivery

No real financial transaction takes place, and real payment credentials should not be used.

## 🗄️ Database

MongoDB stores the application's:

* Users
* Products
* Orders

User authentication uses JWT, while passwords are hashed using bcryptjs.