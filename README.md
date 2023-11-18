# basic-blog-app
A Basic blog application which uses ExpressJS, NodeJS, ReactJS with CRA and MongoDB for data storage.

# About the Project

Welcome to my first MERN stack project! I am uploading this lately but this is the first ever project that I created using MERN Stack in my highschool. This basic blog application allows users to create accounts, log in using JWT tokens, create blog posts with thumbnail picture uploads, and view posts on the home page.

## Technologies I Used

- MongoDB: Database for storing user information and blog posts.
- Express.js: Backend framework for handling server-side logic.
- React.js: Frontend library for building user interfaces.
- Node.js: JavaScript runtime for executing server-side code.
- JWT (JSON Web Tokens): Used for user authentication and authorization.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- MongoDB: [Install MongoDB](https://docs.mongodb.com/manual/installation/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ishanjarwal/basic-blog-app.git
2. Install the dependencies :
   ```bash
   cd client
   npm install
   cd api
   npm install
3. Create a .env file
   ```.env
   MONGO_URI="Your mongo atlas/local database url with password"
   JWT_SECRET="Your JWT Secret (can be anything)"
4. Run the project
   - Run the server
   ```bash
   npm start
   ```
   - Run the React Server
   ```bash
   npm run dev
   ```
And you are good to go.
Happy Coding 👍
