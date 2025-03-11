# WanderWorld

WanderWorld is a project designed to help users explore and discover new destinations. It provides a platform for users to sign up, log in, and explore various listings of travel destinations.

## Features

- User Authentication: Sign up, log in, and log out functionalities.
- Explore Listings: Browse through various travel destinations.
- Responsive Design: Accessible on various devices.

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/Omdeep-Tyagi/WanderWorld.git
    ```

2. Navigate to the project directory:

    ```sh
    cd WanderWorld
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

4. Create a `.env` file in the root directory and add the necessary environment variables. Refer to the sample `.env` file below for the required variables.



5. Start the development server:

    ```sh
    node app.js
    ```

6. Open your browser and go to `http://localhost:3000`.


## Usage

- Visit the homepage to explore the featured travel listings.
- Sign up for a new account or log in with your existing credentials.
- Browse through the listings and find your next travel destination.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## Acknowledgements

- [Express](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [Mongoose](https://mongoosejs.com/)
- [Passport](http://www.passportjs.org/)

## Contact

For any inquiries or questions, please contact:

- GitHub: [Kunj-Tyagi](https://github.com/Kunj-Tyagi)
- LinkedIn: [Kunj-Tyagi](https://www.linkedin.com/in/kunj-tyagi-07688423b/)
- Mail: kunjtyagi24@gmail.com



## Sample .env File

```dotenv
# Sample .env file for WanderWorld

# Port number for the server
PORT=3000

# MongoDB connection URI
ATLASDB_URL=mongodb://localhost:27017/wanderworld

# Session secret for express-session
SECRET_CODE=your_secret_code

# Cloudinary configuration
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
