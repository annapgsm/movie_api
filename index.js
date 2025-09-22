//Import and Setup
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');
const passport = require('passport');

require('./passport');

const app = express();

//Auth
const auth = require('./auth')(app);

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/movieDB', 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });

//Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));

//Create
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.params.Username})
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists')
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Create
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), 
(req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $push: { FavoriteMovies: req.params.MovieID } },
    { new: true }
  )
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Update
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // CONDITION TO CHECK 
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
        { new: true }) // This line makes sure that the updated document is returned
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error: ' + err);
        })
});

//Delete
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), 
(req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true }
  )
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Delete
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), 
(req, res) => {
  Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(404).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Read
app.get('/', (req, res) => {
  res.send('Welcome to my Horror/Thriller Movie API!');
});

app.get('/movies', passport.authenticate('jwt', { session: false }),
 (req, res) => {
  Movies.find()
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
});

/*
app.get('/movies/directors/:directorName', (req, res) => {  
  Directors.findOne( { Name: req.params.name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
}); 
*/

app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), (req, res) => {
  const directorName = req.params.directorName;
  Movies.findOne({ 'Director.Name': new RegExp(directorName, 'i') })
    .then((movie) => {
      if (!movie) {
        return res.status(404).send('Director not found');
      }
      res.status(200).json(movie.Director); // only return director info
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false }), (req, res) => {
  const genreName = req.params.genreName;
  Movies.find({ 'Genre.Name': new RegExp(genreName, 'i') })
    .then((movies) => {
      if (movies.length === 0) {
        return res.status(404).send('No movies found for genre: ' + genreName);
      }
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/*
app.get('/movies/genre/:genreName', (req, res) => {
  Genres.findOne( { Name: req.params.genreName })
    .then((genre) => {
      res.json(genre.Description);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
*/

app.get('/movies/:title', passport.authenticate('jwt', { session: false }), 
(req, res) => {
  const title = req.params.title;
  Movies.findOne({ Title: new RegExp(title, 'i') })
    .then((movie) => {
      if (!movie) {
        return res.status(404).send('Movie not found');
      }
      res.status(200).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get('/users',  passport.authenticate('jwt', { session: false }), 
(req, res) => {
  Users.find()
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get('/documentation', (req, res) => {
  res.sendFile(__dirname + '/public/documentation.html');
});

app.get('/error', (req, res) => {
  throw new Error('This is a test error!');
});

//Error Handler
app.use((err, req, res, next) => {
  console.error('Error caught by middleware:', err.stack);
  res.status(500).send('Something went wrong! Please try again later.');
});

//Start Server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
