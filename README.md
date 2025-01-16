# PMall - Ecommerce Project(React JS)

![overallHomepage](src/assets/overallHomepage.gif)

## Introduction

This project is an e-commerce website designed to support two user roles: user and admin.

### Main Features for Users:

- Users can log in and register on the website.
- They can view, search, and filter products based on text, price, and category.
- Users can add products to their cart and complete the checkout process using Stripe payment integration.
- Users can view their purchase history, including details of past orders.

### Main Features for Admins:

- Admins can add new product categories to the website.
- They can manage the product inventory by adding new products.
- Admins have the ability to manage users on the platform (enable/disable user accounts).
- They can also oversee and manage customer orders.

## Tool I used

![tech In this Project](src/assets/Techs.png)

- Front-end: React
- Back-end: Node.js with Express.js
- Database: Supabase (online PostgreSQL database)
- ORM: Prisma
- Authentication & Authorization: JWT (token management for login - authorization)
- Media Management: Cloudinary (for photo uploading)
- State Management: Zustand (global state management)
- Styling: Tailwind CSS (for UI design and decoration)
- UI Animation: Framer (for smooth transitions and animations)
- Payment Integration: Stripe
- Date & Time Management: Moment.js

## Feature

### User

#### Search products

![search in shop page](src/assets/shopSearch.gif)

- Users can search for products using text, product category, or price.
- In the shopping cart, users can adjust the quantity of items or remove them as needed.

#### Checkout order

![checkout order](src/assets/Usercheckout2.gif)

- Users must provide their address before proceeding to checkout.
- use stripe component in payment integration

#### Order history

![order history](src/assets/orderHistory.png)

- Orders that have been paid will initially have a status of "Not Processed."
- The status will be updated by the admin to reflect progress, such as after verifying or shipping the order.

![transaction result](src/assets/stripeResultInWeb.png)

- All transactions will be stored on the Stripe platform.

### Admin

#### Disable/Enable users in website

![mange user](src/assets/adminMangeUser.gif)

#### Add or Remove Category

![add or remove category](src/assets/addOrRemoveCategory.gif)

#### Add product

![add product](src/assets/addProduct.gif)

- Admins are required to fill in the product details, including the name, description, price, and quantity, and select a category for the product.
- Admins must upload a product image before adding the product to the inventory.

#### Edit or Remove product

![edit or remove product](src/assets/editOrDeleteProduct.gif)

- In the Edit menu, users can upload or remove product images and change the product's category.

#### Order Management

![update order](src/assets/OrderManange.gif)

- Any updates made by the admin to an order will be reflected in the user's order history as well.

![history](src/assets/historyDropdown.gif)

## Acknowledgment

This project could not have been completed without the guidance and support of **AJ Tam** and the valuable tutorials on his [รอยไถ พัฒนา](https://www.youtube.com/@roitai-dev)
