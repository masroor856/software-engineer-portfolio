# Expense Tracker

A responsive personal finance web application built with HTML, CSS, and JavaScript.

The Expense Tracker allows users to record, manage, edit, delete, search, and filter income and expenses while automatically calculating their total income, total expenses, and current balance.

Transaction data is stored in the browser using LocalStorage, so the data remains available after refreshing the page.

---

## Features

- Add income transactions
- Add expense transactions
- Edit transactions
- Delete individual transactions
- Clear all transactions
- Automatically calculate total income
- Automatically calculate total expenses
- Automatically calculate balance
- Search transactions
- Filter transactions by income or expense
- Categorize transactions
- Record transaction dates
- Display transaction count
- Display expense percentage
- Store data using LocalStorage
- Responsive design
- Input validation
- Nigerian Naira (₦) currency formatting

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- DOM Manipulation
- LocalStorage API
- Responsive Web Design

---

## Project Structure

```text
ExpenseTracker/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── README.md

How It Works

Users can add financial transactions by entering:

Description
Amount
Transaction type
Category
Date

The application automatically calculates the financial summary.

Balance Calculation
Balance = Total Income - Total Expenses

Example:

Total Income     ₦200,000
Total Expenses    ₦30,000
--------------------------
Balance          ₦170,000
Transaction Management
Add Transaction

Users can add either an income or an expense.

Edit Transaction

Existing transactions can be edited when information needs to be changed.

Delete Transaction

Individual transactions can be deleted.

Clear All

All transactions can be removed after confirmation.

Search and Filtering

Users can search transactions by description or category.

Transactions can also be filtered by:

All Transactions
Income
Expenses
LocalStorage

The application uses the browser's LocalStorage API to save transaction data.

This means transactions remain available after refreshing the browser.

The application stores the data using:

expenseTransactions
Responsive Design

The application is responsive and works across:

Desktop
Laptop
Tablet
Mobile devices

CSS media queries are used to adapt the interface to different screen sizes.

Validation

The application validates user input before saving transactions.

For example:

Description cannot be empty
Amount must be greater than zero
Date must be selected
What I Learned

This project helped me improve my practical frontend development skills.

I practiced:

HTML5 structure
CSS styling
Responsive design
JavaScript
DOM manipulation
Event handling
Arrays and objects
Form handling
Input validation
LocalStorage
CRUD operations
Search and filtering
Dynamic content rendering
Future Improvements

Future versions may include:

User authentication
Backend API
Database integration
User accounts
Expense charts
Monthly financial reports
Export to Excel or CSV
Budget management
Cloud data synchronization
Financial analytics
Purpose of the Project

This project was developed as part of my Software Engineering learning journey.

The goal was to build a practical interactive web application that demonstrates frontend development, JavaScript programming, data management, and responsive UI design.

Author
Alaka Masroor Ahmad

Software Engineer

Email:
ahmadmasroor856@gmail.com

GitHub:
https://github.com/masroor856

LinkedIn:
https://www.linkedin.com/in/masroor-ahmad-402845322/

License

This project is created for educational and portfolio purposes.
