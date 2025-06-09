# Mini Music Player App

A simple mini music player web application with a Node.js backend serving song and genre data, and a vanilla JavaScript frontend for interactive UI.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Backend](#backend)  
  - [Controllers](#controllers)  
  - [Routes](#routes)  
  - [App Setup](#app-setup)  
  - [Server](#server)  
- [Frontend](#frontend)  
  - [HTML Structure](#html-structure)  
  - [CSS (Styles & Utilities)](#css-styles--utilities)  
  - [JavaScript](#javascript)  
- [How to Run](#how-to-run)  
- [Future Improvements](#future-improvements)  
- [License](#license)  

---

## Overview

This project is a mini music player app that allows users to browse genres and songs, play music with playback controls, and search for music. The backend is powered by Node.js and Express, serving static assets and providing REST APIs for songs and genres. The frontend is built with vanilla JavaScript, HTML, and CSS.

---

## Features

- Browse music by genres  
- View song details (title, artists, genre)  
- Play, pause, skip, and stop audio tracks  
- Search songs, artists, and genres  
- Responsive and clean UI  

---

## Backend

### Controllers

- **Songs Controller**: Handles all song data requests, filtering by genre (House, Amapiano, HipHop) and returning song lists with metadata (title, artists, source URL, image, genre).
- **Genres Controller**: Returns a list of available genres.

### Routes

- `/api/v1/songs` - Get all songs  
- `/api/v1/songs/house` - Get House genre songs  
- `/api/v1/songs/amapiano` - Get Amapiano genre songs  
- `/api/v1/songs/hiphop` - Get HipHop genre songs  
- `/api/v1/genres` - Get all genres  

### App Setup

- Uses Express.js for routing and middleware  
- Middleware includes `cors`, `body-parser`, `morgan` for logging, and static serving of assets  
- Favicon requests blocked to reduce noise  
- Basic error handling for unmatched routes  

### Server

- Handles uncaught exceptions and unhandled promise rejections gracefully  
- Listens on port 5000 by default  

---

## Frontend

### HTML Structure

- Main container with header, main content, and footer  
- Genre list sidebar  
- Song list section with search input and audio controls  
- Audio player with play/pause, next, previous, stop buttons, and song info toggle  

### CSS (Styles & Utilities)

- Clean, modern UI using CSS variables and flexbox  
- Separate utility CSS file for resets, typography, and layout containers  
- Genre section styled with distinct colors for easy recognition  
- Audio controls styled with hover effects and accessibility in mind  

### JavaScript

- Vanilla JavaScript with ES Modules  
- Dynamic fetching of genres and songs from backend API  
- Event listeners for genre clicks, song selection, search input, and audio controls  
- UI updates for current playing song, active genre, and search filtering  

---

## How to Run

### Backend

1. Clone the repo  
2. Run `npm install` to install dependencies  
3. Run `node server.js` or `nodemon server.js` to start the backend server  
4. Server listens on port 5000 by default  

### Frontend

1. Open `index.html` in a modern browser  
2. Ensure backend server is running and accessible  
3. Frontend fetches data from backend APIs  

---

## Future Improvements

- Use a database instead of static arrays for songs and genres  
- Add user authentication and playlist management  
- Improve search with fuzzy matching and better filtering  
- Add progress bar and volume controls for audio player  
- Make UI fully responsive and mobile-friendly  
- Add unit and integration tests  

---

## License

MIT License © [Your Name]

---

Feel free to update this README as you build and enhance your project!
