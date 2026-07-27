# ThetaFlicks

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![HTML](https://img.shields.io/badge/HTML-99.2%25-e34c26.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-0.8%25-f7df1e.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

ThetaFlicks is a A free to use app to stream movies, series, and sports.

**Download**: [thetaflicks.web.app](https://thetaflicks.web.app)

---

## Features

- Movies and TV series streaming with metadata from TMDB.
- Live sports streaming section.
- Search functionality with real-time suggestions.
- Watchlist feature using `localStorage`.

---

## Getting Started

### Prerequisites

- An edge computing platform (e.g., Cloudflare Workers, Vercel Edge).
- An API key from [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api).

### Installation & Deployment

1. **Clone the repository**
   ```bash
   git clone https://github.com/Volzeur/ThetaFlicks.git
   cd ThetaFlicks
   ```

2. **Deploy the Edge Worker**
   - Deploy the `api/worker.js` file to your edge platform.
   - Set the following environment variables in your worker's configuration:
     ```env
     TMDB_KEY_1=your_first_tmdb_api_key
     TMDB_KEY_2=your_second_tmdb_api_key
     ```

3. **Configure the Frontend**
   - Open `index.html` and locate the `tmdbFetch` function.
   - Update the fetch URL to point to your deployed worker endpoint:
     ```javascript
     const url = `https://your-worker-url.workers.dev?path=${encodeURIComponent(path)}&query=${encodeURIComponent(queryParams)}`;
     ```

4. **Host the Static Files**
   - Deploy the files to Vercel or any other hosting service provider

---

## How It Works

### 1. API Proxy (`api/worker.js`)
The frontend requests data through the edge worker to avoid exposing TMDB API keys. The worker:
- Accepts `path` and `query` parameters.
- Iterates through configured `TMDB_KEY` environment variables.
- Bypasses keys that return `401 Unauthorized` or `429 Too Many Requests`.
- Returns the response with a `Cache-Control` header (`max-age=60`).

### 2. Media Playback
- **Movies/Series**: The inline player loads iframe embeds from third-party providers. Users can switch servers if one fails.
- **Sports**: The `sports.html` page fetches live match data from an external sports API, renders match cards, and opens streams in a fullscreen modal.

### 3. Local Storage Watchlist
Media items saved via the "Save" button are serialized and stored in the browser's `localStorage` under the `savedMedia` key.

---

## Tech Stack

| Category       | Technology |
|----------------|------------|
| **Frontend**   | HTML5, CSS3, Vanilla JavaScript |
| **Backend**    | Edge Runtime (Cloudflare Workers compatible) |
| **APIs**       | TMDB (Metadata), Streamed.st (Sports) |
| **Styling**    | Custom CSS Variables, Flexbox, CSS Grid, Lexend Font, Font Awesome |
| **Hosting**    | Vercel (Main App), Firebase (Landing Page) |
| **App building**    | Kodular (Android) Electron.js (Windows & Linux) |

---

## How the App works

To see how the app works check this repo
[ThetaFlicks-Desktop](https://github.com/Volzeur/ThetaFlicks-Desktop)
[ThetaFlicks-Android](https://github.com/Volzeur/ThetaFlicks-Android)

---

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the **GNU AGPLv3 License**. See `LICENSE` for more information.

---

## Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/)
- [Font Awesome](https://fontawesome.com/)
- [Disable DevTool](https://github.com/theajack/disable-devtool)

---

Created by [Nicodemus Gurning](https://github.com/Volzeur)
