# Project Name
Vascomm

## Features
- User can register account, login, login via goole OAuth 2.0, and logout
- User can view all user, user by id
- User only can Update user if the user id is the same as updated user
- Delete user can only be done by the admin
- User can create product, view all product, view product by id, and update product
- Delete product can only be done by the admin

## Technologies Used
- Node.js
- Express.js
- Sequelize ORM
- Passport

## Installation
1. Clone this repository: `git clone https://github.com/Shendy1567/Vascomm.git`
2. Open terminal / CMD and direct to this project directory
3. Copy `.env.example` and rename it to `.env` open the file and adjust the environment variables
4. Run `npm install` to install all dependencies
5. Run `npx sequelize-cli db:create` to generate mysql database
6. Run `npx sequelize-cli db:migrate` to migrate mysql database
7. Run `npx sequelize-cli db:seed:all` to generate seeders on mysql database
8. Run `npm run dev` to start the development server
