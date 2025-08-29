const express = require('express');
const morgan = require('morgan');
const app = express();

const topMovies = [
  { id: 1, title: "Psycho", year: 1960 },
  { id: 2, title: "Nightcrawler", year: 2014 },
  { id: 3, title: "The First Omen", year: 2024 },
  { id: 4, title: "Oddity", year: 2024 },
  { id: 5, title: "Final Destination", year: 2000 },
  { id: 6, title: "The Substance", year: 2024 },
  { id: 7, title: "Prisoners", year: 2013 },
  { id: 8, title: "Identity", year: 2025 },
  { id: 9, title: "Parasite", year: 2019 },
  { id: 10, title: "The Visit", year: 2015 },
];

app.use(morgan('dev'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my Horror/Thriller Movie API!');
});

app.get('/movies', (req, res) => {
  res.json({ movies: topMovies });
});

app.get('/documentation', (req, res) => {
  res.sendFile(__dirname + '/public/documentation.html');
});

app.get('/error', (req, res) => {
  throw new Error('This is a test error!');
});

app.use((err, req, res, next) => {
  console.error('Error caught by middleware:', err.stack);
  res.status(500).send('Something went wrong! Please try again later.');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
