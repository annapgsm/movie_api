//Import and Setup
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  morgan = require('morgan');

//Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));


//Data
const users = [
  {
    id: 1,
    name: "Kim",
    favoriteMovies: []
  },
  {
    id: 2,
    name: "Joe",
    favoriteMovies:["Psycho"]
  }
];

const movies = [
  { 
    "Id": 1, 
    "Title": "Psycho", 
    "Year": 1960,
    "Description": "A secretary on the run checks into a motel run by a disturbed man with deadly secrets.",
    "Director": {
      "Name": "Alfred Hitchcock",
      "Bio": "A master of suspense known for pioneering techniques in thriller and horror cinema.",
      "Born": "1899-08-13"
    },
    "Genre": {
      "Name": "Horror",
      "Description": "A genre designed to scare, shock, or unsettle the audience, often featuring supernatural or violent elements."
    }
  },
  { 
    "Id": 2, 
    "Title": "Nightcrawler", 
    "Year": 2014,
    "Description": "An ambitious man dives into the dark world of crime journalism in Los Angeles.", 
    "Director": {
      "Name": "Dan Gilroy",
      "Bio": "An American screenwriter and director known for exploring morally complex characters.",
      "Born": "1959-06-24"
    },
    "Genre": {
      "Name": "Thriller",
      "Description": "A genre focused on suspense, tension, and high-stakes situations that keep the audience on edge."
    }
  },
  { 
    "Id": 3, 
    "Title": "The First Omen", 
    "Year": 2024,
    "Description": "A young woman uncovers terrifying forces while confronting her own faith.", 
    "Director": {
      "Name": "Arkasha Stevenson",
      "Bio": "A contemporary filmmaker exploring horror and supernatural narratives.",
      "Born": "1985-03-10"
    },
    "Genre": {
      "Name": "Horror",
      "Description": "A genre designed to scare, shock, or unsettle the audience, often featuring supernatural or violent elements."
    }
  },
  { 
    "Id": 4, 
    "Title": "Oddity", 
    "Year": 2024,
    "Description": "After her twin's murder, a blind woman uses her psychic gift to uncover the truth.", 
    "Director": {
      "Name": "Damien McCarthy",
      "Bio": "A director focused on psychological horror and suspense-driven stories.",
      "Born": "1978-11-02"
    },
    "Genre": {
      "Name": "Horror",
      "Description": "A genre designed to scare, shock, or unsettle the audience, often featuring supernatural or violent elements."
    }
  },
  { 
    "Id": 5, 
    "Title": "Final Destination", 
    "Year": 2000,
    "Description": "A teenager cheats death, only for fate to claim his friends one by one.", 
    "Director": {
      "Name": "James Wong",
      "Bio": "A filmmaker known for horror films with creative death sequences and suspense.",
      "Born": "1959-05-20"
    },
    "Genre": {
      "Name": "Horror",
      "Description": "A genre designed to scare, shock, or unsettle the audience, often featuring supernatural or violent elements."
    }
  },
  { 
    "Id": 6, 
    "Title": "The Substance", 
    "Year": 2024,
    "Description": "A fading celebrity tries a mysterious substance that promises eternal youth—with horrific costs.", 
    "Director": {
      "Name": "Coralie Fargeat",
      "Bio": "A French director acclaimed for stylish and intense horror-thrillers.",
      "Born": "1980-11-15"
    },
    "Genre": {
      "Name": "Horror",
      "Description": "A genre designed to scare, shock, or unsettle the audience, often featuring supernatural or violent elements."
    }
  },
  { 
    "Id": 7, 
    "Title": "Prisoners", 
    "Year": 2013,
    "Description": "A desperate father takes matters into his own hands when his daughter goes missing.", 
    "Director": {
      "Name": "Denis Villeneuve",
      "Bio": "A Canadian director known for gripping thrillers and visually stunning storytelling.",
      "Born": "1967-10-03"
    },
    "Genre": {
      "Name": "Thriller",
      "Description": "A genre focused on suspense, tension, and high-stakes situations that keep the audience on edge."
    }
  },
  { 
    "Id": 8, 
    "Title": "Identity", 
    "Year": 2025,
    "Description": "Strangers stranded at a motel realize their fates are chillingly connected.", 
    "Director": {
      "Name": "James Mangold",
      "Bio": "An American filmmaker known for character-driven thrillers and dramas.",
      "Born": "1963-12-16"
    },
    "Genre": {
      "Name": "Thriller",
      "Description": "A genre focused on suspense, tension, and high-stakes situations that keep the audience on edge."
    }
  },
  { 
    "Id": 9, 
    "Title": "Parasite", 
    "Year": 2019,
    "Description": "A poor family infiltrates a wealthy household, leading to shocking consequences.", 
    "Director": {
      "Name": "Bong Joon-ho",
      "Bio": "A South Korean director celebrated for social commentary in suspenseful and genre-bending films.",
      "Born": "1969-09-14"
    },
    "Genre": {
      "Name": "Thriller",
      "Description": "A genre focused on suspense, tension, and high-stakes situations that keep the audience on edge."
    }
  },
  { 
    "Id": 10, 
    "Title": "The Visit", 
    "Year": 2015,
    "Description": "Two siblings visit their grandparents only to discover something deeply unsettling.", 
    "Director": {
      "Name": "M. Night Shyamalan",
      "Bio": "An American filmmaker famous for twist endings and supernatural thrillers.",
      "Born": "1970-08-06"
    },
    "Genre": {
      "Name": "Horror",
      "Description": "A genre designed to scare, shock, or unsettle the audience, often featuring supernatural or violent elements."
    }
  }
];



//Create
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('users need names')
  }
})

//Update
app.put('/users/:id', (re, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id); 

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('no such user');
  }
})

//Create
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);;
  } else {
    res.status(400).send('no such user');
  }
})

//Delete
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);;
  } else {
    res.status(400).send('no such user');
  }
})

//Delete
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);;
  } else {
    res.status(400).send('no such user');
  }
})

//Read
app.get('/', (req, res) => {
  res.send('Welcome to my Horror/Thriller Movie API!');
});

app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director');
  }
});

app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const moviesInGenre = movies.find( movie => movie.Genre === genreName ).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre');
  }
});

app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie')
  }
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