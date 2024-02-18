# My List - API

This is the repository for the My List API, a simple to-do list application. The API was developed using Node.js and Express, with integration to a MySQL database using the Sequelize ORM. Authentication is performed using JWT tokens.


## Setup

1. Clone the repository:

```bash
    git clone https://github.com/jessoliveiradev/my-list.git
    cd my-list/api
```

2. Install dependencies:

```bash
    npm install
```

3. Database Configuration:

- Configure the credentials for your MySQL database and JWT secret key in the `config.js` file.
- Make sure to create a database in MySQL for your project.

4. Run the project:

```bash
    npm start
```

By default, the API will be available at `http://localhost:3000`.

## Project Structure

- `app.js`: main file of the Node.js application
- `config.js`: configuration file for database credentials
- `routes/`: routes files
- `models/`: database models

## Authentication

The API uses JWT token-based authentication. To access protected routes, the client must include the JWT token in the request header with the format `Authorization: Bearer <token>`.

# My List - WebApp

This is the repository for the My List WebApp, a simple to-do list application. The WebApp was developed using React.js and Material-UI.

## Setup

1. Clone the repository:

```bash
    cd my-list/webapp
```

2. Install dependencies:

```bash
    npm install
```

3. Run the project:

```bash
    npm start
```

## Technologies Used

- React.js
- Material-UI