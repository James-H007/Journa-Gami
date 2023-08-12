
# Journa-Gami

A web application where users can journal and take care of a virtual pet at the same time. This app was created to encourage journaling with some sense of responsibility. Inspired by Tamagotchi. 


## Getting started

1. Clone the repository

   ```
   https://github.com/James-H007/Journa-Gami.git
   ```

2. Install dependencies

   ```bash
   npm install
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

   Should look like this:

   ```bash
   SECRET_KEY= notSecret
   DATABASE_URL=sqlite:///dev.db
   SCHEMA=journa_schema
   ```

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, first enter the following code below in the terminal to start the back-end:

   ```
   pipenv run flask run
   ```

8. Then run the front-end in a seperate split terminal, enter:

   ```
   npm start
   ```

9. Then navigate to http://localhost:3000
