
# MyFlix Movie API

MyFlix Movie API is a backend service for a movie application focused on thriller and horror films. It provides access to movie, genre, and director data, along with user registration, authentication, profile management, and favorite movies.

Built with Node.js, Express, and MongoDB, the API follows RESTful principles and uses JWT-based authentication to protect user-specific routes. It is designed to handle both content delivery and user account management in a scalable and maintainable way.


## Tech Stack 
### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Authentication & Security
- Passport
- Passport-JWT
- JSON Web Token
- express-validator

### Tooling & Deployment
- Postman
- Render
- dotenv
- morgan
- cors

## Key Features
- Return a list of all movies
- Return details for a single movie by title
- Return genre information by name
- Return director information by name
- Register new users
- Authenticate users with JWT
- Update user profile information
- Add and remove movies from a user’s favorites
- Deregister existing users

## Architecture Highlights
- Designed as a RESTful API with clearly separated routes and business logic  
- Modeled relationships between users, movies, directors, and genres using Mongoose  
- Protected sensitive routes with JWT-based authentication  
- Implemented input validation to improve reliability and security  
- Used environment variables for configuration and secret management  
- Deployed as a cloud-based service for public access and testing  

## Setup 

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



4. **Start the development server**
 ```bash
   npm start
```
## Deployment
The API is deployed on Render:

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
  ```

## Learnings

- Designed a RESTful API with clear and consistent endpoint structure  
- Implemented JWT-based authentication and route protection using middleware  
- Modeled data relationships in MongoDB with Mongoose (users, movies, favorites)  
- Improved input validation and error handling for more reliable APIs  
- Learned how backend decisions impact scalability and maintainability  
