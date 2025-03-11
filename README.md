WanderLust
WanderLust is a fullstack web application designed for users to list and rent spaces, featuring user authentication, listing management, and a clean, responsive interface. Built with Node.js, Express.js, MongoDB, and JavaScript, it allows users to create, manage, and view rental listings, complete with image uploads.

Table of Contents
Features
Installation
Usage
Technologies Used
Contributing
License
Features
User Authentication
Sign up, log in, log out
Password encryption
Listing Management
Create, update, delete rental listings
Image upload for listings
Responsive Interface
Mobile-friendly design
Clean and intuitive UI
Search and Filter
Search listings by keywords
Filter listings by various criteria
Installation
Clone the repository:

bash
git clone https://github.com/Kunj-Tyagi/WanderLust.git
cd WanderLust
 Public code references from 1 repository
Install dependencies:

bash
npm install
Set up environment variables:

Create a .env file in the root directory
Add the following variables:
Code
PORT=3000
DATABASE_URL=<your-mongodb-connection-string>
SESSION_SECRET=<your-session-secret>
Start the application:

bash
npm start
Usage
Open your browser and navigate to http://localhost:3000
Sign up for a new account or log in if you already have one
Create, manage, and view rental listings
Technologies Used
Node.js: JavaScript runtime environment
Express.js: Web framework for Node.js
MongoDB: NoSQL database
JavaScript: Programming language
EJS: Embedded JavaScript templating
CSS: Styling
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create a new branch (git checkout -b feature-branch)
Make your changes
Commit your changes (git commit -m 'Add new feature')
Push to the branch (git push origin feature-branch)
Open a pull request
License
This project is licensed under the MIT License. See the LICENSE file for details.

