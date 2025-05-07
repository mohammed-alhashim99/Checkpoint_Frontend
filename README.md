# 🎮 Checkpoint Frontend - Game Tracker SPA

This is the frontend for the **Checkpoint** app, a game tracking platform built with **React**. Users can:
- Search games using the RAWG API
- Add games to their personal list
- Track playtime and completion status
- Submit and manage reviews
- Switch between dark and light modes
- Register and log in via JWT authentication

---

## 🛠️ Tech Stack

- React (Hooks + Router)
- JWT Auth (localStorage)
- RAWG API Integration
- Custom Styling with CSS
- RESTful backend (Django DRF)

---

## 🚀 Features

- 🔍 **Search & Explore**: Search for any game via the RAWG API or browse featured ones.
- 🎮 **My Games**: Track your game list with completion status and playtime hours.
- ✍️ **Reviews**: Leave detailed reviews and ratings for each game.
- 🌓 **Dark Mode**: Toggle between light and dark themes.
- 🔐 **Auth**: Sign up and log in with secure JWT tokens.

---

## 📁 Main Structure

- `App.jsx` - Sets routes and manages user state.
- `components/` - Reusable components like Navbar, GameCard, ThemeToggle, etc.
- `pages/` - Page-level components like HomePage, MyGamesPage, ReviewFormPage.
- `utilities/` - API utilities and authentication helpers.

---

## 🔐 Auth Flow

JWT tokens are stored in `localStorage`. After login or signup:
```js
localStorage.setItem('token', token)
localStorage.setItem('user', user)
```

---

## 📦 Pages & Components

| Component | Description |
|----------|-------------|
| `Navbar` | Navigation bar with dynamic links based on login state |
| `GameCard` | Reusable card component for showing game info |
| `UserGameCard` | Shows user's tracked game with update/delete options |
| `ReviewCard` | Displays a single review with edit/delete if user owns it |
| `ThemeToggle` | Switch between dark and light UI modes |
| `SearchBar` | Input and button to search games |
| `GameDetails` | Detailed info about a selected game, including reviews |
| `ReviewFormPage` | Add/edit/delete a review |
| `HomePage` | Home route with featured and search results |
| `MyGamesPage` | User's tracked games |
| `ReviewsPage` | All reviews grouped by game |
| `LoginPage` | User login form |
| `SignupPage` | New user registration |

---

## 🔍 API Integration

- `GET /search/?q=` — Search from RAWG
- `GET /games/` — Backend sync to match game records
- `POST /usergames/` — Add to personal list
- `PATCH /usergames/:id/` — Update playtime/status
- `POST /reviews/` — Create review
- `PUT /reviews/:id/` — Edit review
- `DELETE /reviews/:id/` — Delete review

---

## 🧪 Validation & Feedback

- Forms use basic validation (min length, matching passwords, etc.)
- Error messages and success states are displayed to the user
- Conditional rendering for actions based on ownership and login status

---

## 🌈 Styling

- Custom CSS in `styles.css`
- Dark mode based on `localStorage` and applied to `body.className`

---

## 🧠 Best Practices

- API errors are caught and displayed
- All authenticated routes are protected
- Game and review data is normalized and cached
- Navigation uses `react-router-dom` with `useNavigate`

---

## 📌 To Do

- Improve responsive layout for mobile
- Add loading spinners and UI feedback
- Optimize image loading

---

## 🧭 Navigation Flow

```txt
HomePage ─→ GameDetails ─→ Add Review
         └→ MyGames ─→ Edit Status, Playtime, Delete
                  └→ ReviewForm ─→ Submit/Edit/Delete
```

