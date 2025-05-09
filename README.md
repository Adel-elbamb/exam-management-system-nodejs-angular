# 🎬 Movie App (React)

A modern movie and TV show browsing application built with **React**, powered by **The Movie Database (TMDb) API**. Users can explore trending content, view details, manage a personalized wishlist, and search movies or TV shows.

### 🌐 [Live Demo](https://react-movie-app-trial.vercel.app/)

---

## 📌 Features

- 🧾 **Browse Movies** – Display now-playing movies with pagination support.
- 🧠 **Search** – Find movies by name using TMDb search API.
- 📺 **TV Shows** – Browse popular TV shows and view detailed information.
- 📄 **Movie & TV Details** – View cast, reviews, recommendations, and more.
- ❤️ **Wishlist** – Add or remove movies and TV shows to/from a wishlist.
- 🌍 **Multilingual Support** – Supports `en`, `ar`, `fr`, and `zh` with dynamic layout direction (`LTR/RTL`).
- 📱 **Responsive Design** – Optimized for desktop and mobile viewing.

---

## 🧩 Pages

- Home (Movies List)
- Movie Details
- TV Shows
- TV Show Details
- Search Results
- Wishlist

---

## 🛠️ Tech Stack

- **React**
- **Redux** (for global state management)
- **React Router**
- **Axios** (for API calls and interceptors)
- **TMDb API**
- **Tailwind CSS** (or your styling framework)

---

## 🔗 APIs Used (from TMDb)

- Now Playing Movies:  
  `GET /movie/now_playing`
- Movie Details:  
  `GET /movie/{movie_id}`
- Recommendations:  
  `GET /movie/{movie_id}/recommendations`
- Reviews:  
  `GET /movie/{movie_id}/reviews`
- Popular TV Shows:  
  `GET /tv/popular`
- TV Show Details:  
  `GET /tv/{series_id}`
- Search:  
  `GET /search/movie?query={MovieName}`
- Image Base URL:  
  `https://image.tmdb.org/t/p/w500/${poster_path}`

---

## 📂 Folder Structure (Example)

src/
│
├── components/ # Reusable UI components
├── pages/ # Pages like Home, Details, Wishlist
├── store/ # Redux store setup
├── services/ # API services using Axios
├── App.js
└── index.js

---

## 🔄 Language Switching

Use query param `&language={lang}`  
Example:  
`GET /movie/now_playing?language=ar`

Also updates UI direction based on selected language:
- `ar` → RTL
- Others → LTR

---

## 📦 How to Run Locally

```bash
# Clone the project
git clone https://github.com/your-username/movie-app.git

# Navigate to the project
cd movie-app

# Install dependencies
npm install

# Start the development server
npm run dev
