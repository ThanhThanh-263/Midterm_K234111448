# 🐼 Panda Store - E-Commerce Platform Implementation Guide

## Project Overview

This is a complete e-commerce platform built with Angular (Frontend) and Express.js (Backend) with MongoDB integration capability. The platform includes features for both customers and employees with role-based access control.

## Project Structure

```
my-app/          → Angular Frontend Application
  ├── src/app/
  │   ├── guards/        → auth.guard.ts - Authentication guard
  │   ├── myservice/      → Services for API calls
  │   ├── products/       → Product listing & search
  │   ├── cart/          → Shopping cart management
  │   ├── login/         → User authentication
  │   ├── register/      → User registration
  │   ├── revenue/       → Revenue statistics (employees only)
  │   ├── vip/           → VIP customers (employees only)
  │   ├── about/         → Student info with animation
  │   ├── app.ts         → Main app component
  │   ├── app.html       → Main layout
  │   └── app.css        → Global styles with animations
  │
my-server/       → Express.js REST API Server
  └── index.js   → API endpoints & in-memory database
```

## Features Implemented

### Q6: Student Information Display with Animation ✅
- **Location**: Part A (Left Sidebar)
- **Animation**: Continuous up/down bounce animation (2.6s cycle)
- **Elements**:
  - Student ID: K234112E
  - Student Name: Nguyen Van A
  - Profile Picture with hover effects
  - Student Class: SE1234

### Q7: Product Display with Nice UI ✅
- **Location**: Shopping page (Part C via routing)
- **Features**:
  - Grid layout with card design
  - Product image with hover zoom effect
  - Product details (name, model, brand, stock)
  - Price display with special formatting
  - Responsive grid (auto-fill, minmax)

### Q8: Search Products by Price ✅
- **Location**: Products page - Filter Section
- **Features**:
  - Min/Max price input fields
  - Real-time search via REST API
  - Dynamic product filtering
  - Form validation

### Q9: Add to Cart (After Login) ✅
- **Features**:
  - Login required check
  - Quantity selector input
  - "Buy" button with shopping cart icon
  - Automatic cart updates via OrderService
  - Cart badge showing item count

### Q10: Cart Management ✅
- **Location**: Current Cart page (accessible after login)
- **Features**:
  - Change quantity (increase/decrease)
  - Remove items from cart
  - Add more products (link to shopping)
  - Real-time subtotal calculation
  - Table view for clear presentation

### Q11: Payment/Checkout ✅
- **Features**:
  - "Proceed to Payment" button
  - Order creation with status 'paid'
  - Cart clearing after successful payment
  - Success message & redirect
  - Error handling

### Q12: Revenue Statistics (Employees Only) ✅
- **Location**: Revenue page (Part C via dropdown menu)
- **Features**:
  - Only employees can access (role check)
  - Summary cards (Total Revenue, Orders, Average, Customers)
  - Year selection filter
  - Monthly breakdown view
  - Top customers button
  - All data from paid orders only

### Q13: Top N VIP Customers ✅
- **Location**: VIP Customers page (Part C via dropdown menu)
- **Features**:
  - Adjustable "Top N" input
  - VIP cards with ranking
  - Customer details (name, email, phone)
  - Purchase statistics (Total Spent, Orders, Avg Order)
  - Gold/Silver/Bronze badges for top 3
  - Employee-only access

### Q14: Login/Logout with Welcome Message ✅
- **Login Features**:
  - Username/Email & Password fields
  - Error handling
  - Demo accounts provided
  - Redirect to shopping after login
  
- **Welcome Message**:
  - Shows "Welcome [Name]" after login
  - Click username to logout
  - Cart badge visible when logged in
  - Persistent user state

### Menu Design ✅
- **Navigation Items**:
  - 🛍️ Shopping → Products page
  - 🛒 Cart → Current Cart (requires login)
  - 📊 Manage → Revenue & VIP (employees only)
  
- **Design Features**:
  - Dropdown menus with smooth animation
  - Hover effects with underline animation
  - Welcome message/Login button
  - Cart badge with item count

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm (v6+)
- Angular CLI (optional but recommended)

### 1. Install Server Dependencies
```bash
cd my-server
npm install
npm start
```
Server will run on: **http://localhost:3000**

### 2. Install Frontend Dependencies
```bash
cd my-app
npm install
ng serve
```
Frontend will run on: **http://localhost:4200**

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search/price?minPrice=X&maxPrice=Y` - Search by price
- `GET /api/products/category/:categoryId` - Get products by category

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/customer/:customerId` - Get customer orders
- `PUT /api/orders/:orderId` - Update order status

### Revenue (Employees Only)
- `GET /api/revenue/stats` - Get revenue statistics
- `GET /api/revenue/year/:year` - Get monthly revenue
- `GET /api/revenue/top-customers?limit=N` - Get top N customers

## Demo Accounts

### Customer Account
- **Username**: customer1
- **Password**: 123456
- **Email**: customer1@gmail.com

### Employee Account
- **Username**: emp01
- **Password**: admin123
- **Email**: admin@panda.com

## Technology Stack

### Frontend (Angular 21)
- Angular Core & Router
- RxJS for state management
- HttpClientModule for API calls
- FormsModule for two-way binding
- CSS3 with animations & grid layout

### Backend (Express.js)
- Express.js 5.2
- CORS for cross-origin requests
- Morgan for request logging
- In-memory database (JSON objects)

## Key Components & Services

### Services
1. **AuthService** - User authentication & authorization
2. **ProductService** - Product data & filtering
3. **CategoryService** - Category management
4. **OrderService** - Cart management & orders
5. **RevenueService** - Revenue analytics

### Components
1. **App** - Main layout, navigation, login state
2. **Login** - User login form
3. **Register** - User registration form
4. **Products** - Product listing & search
5. **Cart** - Shopping cart view
6. **Revenue** - Revenue statistics
7. **VIP** - VIP customers display

## Authentication & Authorization

### Guards
- **AuthGuard** - Protects routes requiring login
- Applied to: Cart, Revenue, VIP routes

### Roles
- **customer** - Can shop, view cart
- **employee** - Can also view Revenue & VIP stats

## Styling & Design

### Design System
- **Color Scheme**: 
  - Primary: #c9873e (Panda Brown)
  - Background: #f5f0e8 (Cream)
  - Dark: #2c1f0f (Dark Brown)
  - Accent: #f5dab5 (Light Tan)

- **Typography**:
  - Headings: Playfair Display (serif)
  - Body: Crimson Pro (serif)
  - Letter spacing & italics for elegant feel

### Animations
- **Bounce Animation**: Student info card
- **Dropdown Animation**: Navigation menu
- **Hover Effects**: Product cards, buttons, links
- **Fade-up Animation**: Page transitions

## Features to Extend

### Future Enhancements
1. Add MongoDB integration
2. Implement JWT tokens
3. Add product reviews/ratings
4. Email notifications
5. Admin dashboard
6. Inventory management
7. Payment gateway integration
8. Order tracking
9. Wishlist feature
10. Product recommendations

## Troubleshooting

### CORS Issues
- Make sure the server is running on port 3000
- Check CORS configuration in server/index.js

### Products Not Loading
- Verify API endpoint in services (http://localhost:3000/api)
- Check browser console for errors

### Login Not Working
- Ensure correct credentials are used
- Check browser localStorage for token storage

## File Modifications Summary

- **app-module.ts** - Added HttpClientModule, FormsModule, CommonModule
- **app-routing-module.ts** - Added routing with guards
- **auth.guard.ts** - Implemented authentication guard
- **app.ts** - Added login state management
- **app.html** - Updated with dynamic welcome message
- **authservice.ts** - Full authentication implementation
- **productservice.ts** - Product API calls
- **orderservice.ts** - Cart & order management
- **revenueservice.ts** - Revenue analytics
- **All component files** - Complete implementations
- **app.css** - Global styling + component styles (900+ lines)
- **my-server/index.js** - Complete REST API
- **my-server/package.json** - Added cors dependency

## Notes

- All data is currently stored in memory (will reset on server restart)
- Ready for MongoDB integration by replacing in-memory arrays
- Student info is hardcoded (can be dynamic)
- Product images use placeholder URLs (can use real image URLs)

---
**Created**: March 10, 2026
**Version**: 1.0
**Author**: Nguyen Thanh Thanh
