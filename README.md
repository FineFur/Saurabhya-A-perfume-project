Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   # SAURABHYA — Where Memories Become Fragrance  SAURABHYA is a modern Indian-inspired perfume e-commerce website built using the MERN stack.  The project provides a complete e-commerce workflow where users can explore fragrances, view product details, manage their shopping cart, create an account, save delivery information, complete checkout, place orders, and download purchase receipts.  The website combines a contemporary luxury design with subtle Indian-inspired elements to create a refined digital fragrance experience.  ---  ## ✨ Features  ### 🛍️ Product Browsing  - Modern perfume storefront  - Browse the complete fragrance collection  - Product categories  - Product images  - Product descriptions  - Product pricing  - Individual product detail pages  ### 🛒 Shopping Cart  - Add products to cart  - Select product quantity  - Increase product quantity  - Decrease product quantity  - Remove products from cart  - Live cart item-count badge  - Cart total calculation  - Add-to-cart notification  ### 👤 User Authentication  - User registration  - User login  - JWT-based authentication  - Protected routes  - Persistent login using local storage  - Logout confirmation  - Account dropdown in navigation  ### 📍 Account & Delivery Information  Users can save their delivery information in their account:  - Full name  - Phone number  - Address  - City  - State  - Pincode  Users can update their delivery information from the **My Account** section.  The saved delivery information is automatically displayed during checkout, avoiding the need to enter the same information repeatedly.  ### 💳 Checkout & Payment  The checkout system includes:  - Saved delivery information  - Update delivery information option  - UPI payment  - Credit / Debit Card payment  - Cash on Delivery  - Payment validation  - Order total calculation  - Simulated payment processing  > **Note:** Payment processing is simulated for academic demonstration purposes. No real financial transaction takes place.  ### 📦 Orders  - Create orders  - Store orders in MongoDB  - Server-side price calculation  - Order status  - Order confirmation  - My Orders section  - Order date  - Order total  - Payment method  - Ordered products and quantities  ### 🧾 Receipt Generation  Users can generate and download a PDF receipt after placing an order.  Receipts contain:  - SAURABHYA branding  - Order number  - Order date  - Customer information  - Delivery address  - Products purchased  - Product quantities  - Product prices  - Total amount  - Payment method  - Order status  Receipts can be downloaded:  - Immediately after checkout  - From the My Orders section  PDF receipts are generated using **jsPDF**.  ---  ## 🛠️ Tech Stack  ### Frontend  - React.js  - React Router  - Tailwind CSS  - Vite  - JavaScript  - jsPDF  ### Backend  - Node.js  - Express.js  - Mongoose  - JWT  - bcryptjs  ### Database  - MongoDB  ---  ## 🔄 Application Workflow  ```text                      HOME                        │                        ▼                      SHOP                        │                        ▼                PRODUCT DETAILS                        │                        ▼                   ADD TO CART                        │                        ▼                      CART                        │                        ▼               LOGIN / REGISTER                        │                        ▼                    CHECKOUT                        │                ┌───────┴────────┐                │                │                ▼                ▼        Saved Delivery      Update Info          Information            │                │                ▼                │             ACCOUNT                │                │                │                ▼                │          Save Changes                │                ▼            PAYMENT                │         ┌──────┼──────┐         │      │      │        UPI   CARD    COD         │      │      │         └──────┼──────┘                │                ▼            ORDER CREATED                │                ▼         ORDER CONFIRMATION                │          ┌─────┴─────┐          │           │          ▼           ▼     DOWNLOAD      MY ORDERS      RECEIPT          │                      ▼               DOWNLOAD RECEIPT   `

📁 Project Structure
--------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   SAURABHYA/  │  ├── public/  │   └── images/  │       ├── hero.png  │       └── products/  │  ├── src/  │   ├── components/  │   │   ├── auth/  │   │   ├── home/  │   │   └── layout/  │   │  │   ├── context/  │   │   ├── AuthContext.jsx  │   │   └── CartContext.jsx  │   │  │   ├── features/  │   │   ├── orders/  │   │   └── products/  │   │  │   ├── pages/  │   │   ├── About/  │   │   ├── Account/  │   │   ├── Cart/  │   │   ├── Checkout/  │   │   ├── Home/  │   │   ├── Login/  │   │   ├── OrderConfirmation/  │   │   ├── Product/  │   │   ├── Register/  │   │   └── Shop/  │   │  │   ├── utils/  │   │   └── generateReceipt.js  │   │  │   ├── App.jsx  │   ├── main.jsx  │   └── index.css  │  ├── server/  │   ├── config/  │   │   └── db.js  │   │  │   ├── middleware/  │   │   └── authMiddleware.js  │   │  │   ├── models/  │   │   ├── Product.js  │   │   ├── User.js  │   │   └── Order.js  │   │  │   ├── routes/  │   │   ├── productRoutes.js  │   │   ├── authRoutes.js  │   │   └── orderRoutes.js  │   │  │   ├── seed/  │   │   ├── products.js  │   │   └── seedProducts.js  │   │  │   ├── .env  │   └── server.js  │  ├── .gitignore  ├── package.json  ├── package-lock.json  ├── README.md  └── vite.config.js   `

⚙️ Requirements
---------------

Before running the project, install:

*   Node.js
    
*   npm
    
*   MongoDB
    
*   Git
    

🚀 Installation & Setup
-----------------------

### 1\. Clone the repository

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   git clone https://github.com/FineFur/Saurabhya-A-perfume-project.git   `

Navigate into the project:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd Saurabhya-A-perfume-project   `

### 2\. Install frontend dependencies

From the project root:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm install   `

### 3\. Install backend dependencies

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd server  npm install   `

### 4\. Configure environment variables

Create a file:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   server/.env   `

Add:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   JWT_SECRET=your_secret_key   `

Do not commit the .env file to GitHub.

### 5\. Start MongoDB

The project uses a local MongoDB database:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   mongodb://127.0.0.1:27017/saurabhya   `

### 6\. Start the backend

From the server directory:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   node server.js   `

The backend will run on:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   http://localhost:5000   `

### 7\. Start the frontend

Open another terminal and return to the project root:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd ..   `

Run:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm run dev   `

The frontend will usually run on:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   http://localhost:5173   `

🔐 Authentication
-----------------

SAURABHYA uses JWT-based authentication.

The authentication workflow is:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Register     ↓  Password hashed using bcryptjs     ↓  User stored in MongoDB     ↓  Login     ↓  JWT generated     ↓  Token stored on client     ↓  Protected API requests   `

Protected features include:

*   Account
    
*   Checkout
    
*   My Orders
    
*   Order creation
    

🗄️ Database
------------

MongoDB is used as the application's database.

The main collections are:

### Users

Stores:

*   Name
    
*   Email
    
*   Password hash
    
*   Phone
    
*   Address
    
*   City
    
*   State
    
*   Pincode
    

### Products

Stores:

*   Product name
    
*   Category
    
*   Price
    
*   Description
    
*   Product image
    

### Orders

Stores:

*   User
    
*   Products
    
*   Quantity
    
*   Product price snapshot
    
*   Total amount
    
*   Payment method
    
*   Shipping address
    
*   Order status
    
*   Creation date
    

💳 Payment Disclaimer
---------------------

The payment system included in this project is a **simulated payment gateway** designed for academic demonstration.

Supported payment methods:

*   UPI
    
*   Credit / Debit Card
    
*   Cash on Delivery
    

No real payment transaction is performed.

The application does not store:

*   Card numbers
    
*   CVV
    
*   Card expiry details
    
*   UPI credentials
    

Only the selected payment method is stored with the order.

🧾 Receipt System
-----------------

After an order is successfully created, users can download a PDF receipt.

The receipt is generated using:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   jsPDF   `

The receipt is generated from the stored order information, ensuring that the receipt represents the order that was actually placed.

Users can download receipts from:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Order Confirmation          │          └── Download Receipt  My Account          │          └── My Orders                  │                  └── Download Receipt   `

📱 Main Routes
--------------

### Frontend Routes

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   /                       Home  /shop                   Product collection  /about                  About SAURABHYA  /cart                   Shopping cart  /product/:id            Product details  /login                  Login  /register               Registration  /account                User account  /checkout               Checkout  /order-confirmation     Order confirmation   `

### Backend API Routes

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   GET    /api/products  GET    /api/products/:id  POST   /api/products  POST   /api/auth/register  POST   /api/auth/login  GET    /api/auth/me  PUT    /api/auth/profile  POST   /api/orders  GET    /api/orders/my-orders   `

🎨 Design Philosophy
--------------------

SAURABHYA follows a modern luxury visual direction inspired by contemporary Indian aesthetics.

The design focuses on:

*   Warm neutral tones
    
*   Ivory and stone backgrounds
    
*   Charcoal typography
    
*   Elegant serif headings
    
*   Generous whitespace
    
*   Minimal layouts
    
*   Editorial-style presentation
    
*   Subtle Indian-inspired visual identity
    

The goal is to create an Indian-inspired fragrance brand without relying heavily on traditional visual elements.

📌 Project Status
-----------------

**Completed — Web Programming Academic Project**

SAURABHYA demonstrates a complete basic full-stack e-commerce workflow using the MERN stack, including authentication, product management, shopping cart functionality, account management, checkout, simulated payments, order management, and PDF receipt generation.