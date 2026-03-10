# 🚀 Quick Start Guide - Panda Store

## Step-by-Step Running Instructions

### Step 1: Start the Backend Server

```bash
# Navigate to server directory
cd my-server

# Install dependencies (if not already done)
npm install

# Start the server
npm start
```

**Expected Output:**
```
🐼 Panda Store API listening on http://localhost:3000
```

### Step 2: Start the Angular Frontend

```bash
# In a new terminal, navigate to frontend directory
cd my-app

# Install dependencies (if not already done)
npm install

# Start the development server
ng serve
```

**Expected Output:**
```
Application bundle generated successfully
✔ build succeeded.
⠙ Building...
✔ Compiled successfully.
```

### Step 3: Open in Browser

Open your browser and navigate to:
```
http://localhost:4200
```

## Testing the Application

### Test as Customer (Default)
1. Click "Login" button
2. Enter credentials:
   - **Username**: customer1
   - **Password**: 123456
3. Browse products
4. Add 2-3 products to cart
5. View cart and checkout
6. Click logout

### Test as Employee (Admin)
1. Click "Login" button
2. Enter credentials:
   - **Username**: emp01
   - **Password**: admin123
3. Navigate to "🛒 Cart" → "Revenue Statistics"
4. View revenue data and select year
5. Click "Load Top 10 Customers"
6. Navigate to "🛒 Cart" → "VIP Customers"
7. Adjust "Top N" and view VIP customers

## Test Scenarios

### Scenario 1: Price Search
1. Stay on Shopping page (no need to login)
2. Set Min Price: 20, Max Price: 35
3. Click "Search"
4. See only products in that price range

### Scenario 2: Add to Cart
1. Login as customer
2. Select quantity for "Classic White Tee"
3. Click "🛒 Buy"
4. See cart badge update
5. Try adding another product
6. Go to "🛒 Cart" → "Current Cart"

### Scenario 3: Cart Management
1. In cart, modify quantities
2. Remove a product
3. See updated totals
4. Click "Continue Shopping" to add more
5. Complete payment

### Scenario 4: Employee Features
1. Login as emp01
2. Click "📊 Manage" dropdown
3. Select "Revenue Statistics"
4. Change year and view monthly data
5. Load top customers
6. Go back, select "VIP Customers"
7. Change "Top N" value and update

## Common Issues & Solutions

### Issue: Cannot connect to server
**Solution**: 
- Check if `npm start` is running in my-server directory
- Verify port 3000 is not in use
- Check firewall settings

### Issue: "Cannot find module" error
**Solution**:
- Run `npm install` in both directories
- Delete node_modules and package-lock.json
- Run `npm install` again

### Issue: Login not working
**Solution**:
- Check if using correct credentials (case-sensitive)
- Look at browser console for error messages
- Verify server is running

### Issue: Products not loading
**Solution**:
- Check browser console for network errors
- Verify API endpoint in services is: http://localhost:3000/api
- Restart both server and frontend

## Project Features Checklist

- ✅ Q6: Student info moving up/down
- ✅ Q7: Products with nice UI
- ✅ Q8: Search by price
- ✅ Q9: Add to cart after login
- ✅ Q10: Cart management (change quantity, remove)
- ✅ Q11: Payment/Checkout
- ✅ Q12: Revenue statistics (employees)
- ✅ Q13: Top N VIP customers
- ✅ Q14: Login/Logout with welcome message
- ✅ Menu design with routing
- ✅ Role-based access control

## File Locations

| Feature | File |
|---------|------|
| Student Animation | src/app/app.css (line ~82) |
| Products Grid | src/app/products/ |
| Price Search | src/app/products/products.ts |
| Cart Logic | src/app/myservice/orderservice.ts |
| Auth Guard | src/app/guards/auth.guard.ts |
| Revenue Service | src/app/myservice/revenueservice.ts |
| API Server | my-server/index.js |
| Global Styles | src/app/app.css |

## Browser Developer Tools Tips

1. **Check Network Tab**:
   - See API calls to http://localhost:3000/api/...
   - Verify response status (200, 201, etc.)

2. **Check Console Tab**:
   - Look for error messages
   - Check localStorage for token

3. **Check Application Tab**:
   - localStorage has 'currentUser' and 'token' after login
   - localStorage has 'cart' after adding items

## Performance Notes

- In-memory database resets on server restart
- All user data is in localStorage on frontend
- No external database connection (ready for MongoDB)
- Images use placeholder URLs (fast loading)

## Next Steps

1. Test all features thoroughly
2. Add MongoDB integration if needed
3. Implement real image URLs
4. Add email verification
5. Deploy to cloud (Heroku, AWS, etc.)

---

**Version**: 1.0
**Last Updated**: March 10, 2026
