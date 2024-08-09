# Education Game Server

## Table of Content

1. [Summary](#summary)
2. [Technology Used](#technology-used)
3. [Usage](#usage)
4. [Database](#database)
5. [Contributing](#contributing)
6. [License](#license)
7. [Contact Us](#contact-us)

## Summary

Welcome to the Quiz Academy! This game is designed for secondary school students to test their knowledge and have fun by answering multiple-choice questions across various subjects. Players can join the game, answer questions, and earn a final score based on their performance.

* **Featue 1: User Registration and Login: Students can create accounts and log in and do quizes and score points.**

* **Feature 2: Multiple Subjects: The game includes a variety of subjects such as History, Geography, and language.**

* **Feature 3: Interactive Quizzes: Players answers multiple-choice questions to test their knowledge.**

* **Feature 4: Score System: A score is displayed to showcase the total score of the quiz.**

The server is designed with a robust MVC architecture, this Quiz game API facilitates efficient management of users, quiz questions, and result scores.

## Technology Used

1. JavaScript
2. Node.js
3. Express
4. NPM
5. Postgresql
6. Express
7. Cors
8. JSON Web Token
9. dotenv


## Installation

Before installing any required packages make sure that ``node`` and ``npm`` is installed in your machine. [Node](https://nodejs.org/en/download/package-manager) this will install node and npm into your machine.

To install the required libraries, follow these steps:

Make sure you're within the api folder

```cd api```

Run npm install

``npm install``
``npm i -D nodemon``

Take a look at ``example.env`` and create your .env file and use the same paths.

Enable connection with Database. We suggest using [Supabase](https://supabase.com/)

Run npm run setup-db

``npm run setup-db``

Run npm run dev to run the app in development mode.

``npm run dev``

Run npm start to run the app in production mode.

``npm start``

This backend should be running and accessible on port 3000 (if you follow same port as our example.env)

ctrl + c to stop the server running

## Usage

* **Register/Login: Student can register an account or log in with an existing account.**
* **Populated questions stored and available to be retrieved.**
* **Score result saved accordingly, can display individual question score.**
* **Can return the total result for particular quiz group.**


## Database

Take a look at ``example.env`` and create your .env file and use the same paths.

Enable connection with Database. We suggest using [Supabase](https://supabase.com/)

Run npm run setup-db

``npm run setup-db``

You are free to look at the database [The SQL file](./db/setup.sql), to see what tables we are using.

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

* Clone the repository.
* Create a new branch for your feature or bug fix.
* Commit your changes and push them to your forked repository.
* Submit a pull request to the development repository.


## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact Us

For any questions or feedback, please contact any of these collaborators: 

* [antasprojects](https://github.com/antasprojects)
* [CustomHaven](https://github.com/CustomHaven)
* [JoyMeera](https://github.com/JoyMeera)
* [camycam89](https://github.com/camycam89)
