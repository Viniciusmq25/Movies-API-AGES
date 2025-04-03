Collecting workspace information

# Movie API

This is a simple REST API for managing movies and their ratings built with Express.js.

## Project Structure

```
.
├── .gitignore
├── controllers/
│   ├── movieController.js
│   └── notaController.js
├── index.js
├── movies.json
├── package.json
└── routes/
    ├── movieRoutes.js
    └── notaRoutes.js
```

## Features

- CRUD operations for movies
- Add, view, update, and delete ratings for movies
- In-memory data storage

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The server will run on http://localhost:5000

## API Endpoints

### Movies

- `GET /movies` - Get all movies
- `POST /movies` - Add a new movie
- `GET /movies/:id` - Get a specific movie
- `DELETE /movies/:id` - Delete a movie
- `PATCH /movies/:id` - Update a movie

### Ratings

- `GET /movies/:id/notas` - Get all ratings for a movie
- `POST /movies/:id/notas` - Add a rating to a movie
- `GET /movies/:id/notas/:notaId` - Get a specific rating
- `DELETE /movies/:id/notas/:notaId` - Delete a rating
- `PATCH /movies/:id/notas/:notaId` - Update a rating

## Technologies Used

- Node.js
- Express.js
- Nodemon (for development)

## License

ISC