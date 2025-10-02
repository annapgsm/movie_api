
# MyFlix Movie API

MyFlix (Movie API) is the backend for a full-stack web application that provides thriller/ horror-movie enthusiasts with information about films, directors, genres etc. Users can sign up, update their profiles, and manage a personal list of favorite movies. 

This project demonstrates the creation of a RESTful API using **Node.js**, **Express**, and **MongoDB**, with business logic modeled through **Mongoose**. Authentication and authorization are implemented using JWT, ensuring data security and controlled access.  

The project forms the backend of the full-stack **myFlix application**, with a React client to follow in the next phase.


## Tools & Technologies  

### Core Stack  
- **Node.js** – Runtime environment for executing JavaScript on the server.  
- **Express** – Web application framework for building the REST API.  
- **MongoDB Atlas** – Cloud-hosted NoSQL database service used to store movie and user data. 
- **Mongoose** – Object Data Modeling (ODM) library for modeling and interacting with MongoDB.  

### Middleware & Utilities  
- **body-parser** – Parses incoming request bodies (e.g., JSON).
- **morgan** – HTTP request logger used for debugging and monitoring API activity.  
- **cors** – Enables cross-origin resource sharing, allowing requests from different domains.  
- **express-validator** – Provides request validation and sanitization for secure data handling.  
- **uuid** – Generates unique identifiers for resources where needed.  

### Authentication & Security  
- **passport** – Authentication middleware for handling login and protected routes.  
- **passport-jwt** – Strategy for authenticating users using JSON Web Tokens (JWT).  
- **jsonwebtoken** – Creates and verifies JWTs for user authentication.  

### Development & Deployment  
- **Postman** – Used for API testing and debugging during development.  
- **Render** – Cloud hosting platform for deploying the API.  
- **dotenv** – Loads environment variables from a `.env` file for secure configuration.
## Features
- Return a list of **all movies**
- Return detailed data about a **single movie** by title
- Return data about a **genre** by name
- Return data about a **director** by name
- Allow new users to **register**
- Allow users to **update their profile** (username, password, email, date of birth)
- Allow users to **add or remove movies** from their favorites
- Allow existing users to **deregister**


## Set up instructions

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/myFlix-server.git
   cd myFlix-server
2. **Install dependencies** 
   ```bash
   npm install
3. **Set up environment variables (.env file)**
  ```bash
 - PORT=8080
 - DATABASE_URL=your-mongodb-connection-string
 - JWT_SECRET=your-secret-key
```
- Replace `<db_password>` with the password you set for your MongoDB Atlas user `myFlixDBAdmin`.
- Replace `your-secret-key` with a secure key for JWT authentication.



4. **Run the server locally**
 ```bash
   npm start

```
## Deployment
The API is deployed on Render and publicly accessible here:

https://movie-api-o14j.onrender.com/



## API Endpoints

| HTTP Method | Endpoint | Description | Authentication |
|-------------|----------|-------------|----------------|
| **GET** | `/movies` | Returns a list of all movies | Required |
| **GET** | `/movies/:title` | Returns data about a single movie by title | Required |
| **GET** | `/genres/:name` | Returns data about a genre by name | Required |
| **GET** | `/directors/:name` | Returns data about a director by name | Required |
| **POST** | `/users` | Registers a new user | Not required |
| **PUT** | `/users/:id` | Updates user info by ID | Required |
| **POST** | `/users/:id/movies/:movieId` | Adds a movie to a user’s favorites | Required |
| **DELETE** | `/users/:id/movies/:movieId` | Removes a movie from a user’s favorites | Required |
| **DELETE** | `/users/:id` | Deregisters a user | Required |

## Example Requests & Responses

**GET /movies**  
_Returns a list of all movies in JSON format._

```json
[
  {
    "Title": "Inception",
    "Description": "A skilled thief is offered a chance to erase his criminal history...",
    "Genre": {
      "Name": "Sci-Fi",
      "Description": "Speculative fiction dealing with futuristic concepts."
    },
    "Director": {
      "Name": "Christopher Nolan",
      "Bio": "British-American film director, producer, and screenwriter.",
      "Birth": "1970"
    },
    "ImageURL": "https://link-to-image.jpg",
    "Featured": true
  }
]
```


## Authentication

- Most endpoints require a valid **JWT token**.  
- Obtain a token by logging in with your credentials.  
- Include the token in your request header:  
  ```bash
  Authorization: Bearer <your_token>
