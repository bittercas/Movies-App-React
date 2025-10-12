# 🎬 React Movie Finder App
![App Screenshot](public/ui.png)

This is a movie search web application built with **React** as part of a course project. It integrates with the **TMDb API** to fetch and display movie data, and uses **Appwrite** to store and track trending searches.

## 🚀 Features

- 🔍 **Search Movies** — Search thousands of movies using the TMDb API.
- 🕓 **Debounced Input** — API calls are optimized with debounce to avoid unnecessary requests.
- 📊 **Trending Movies** — Top 5 trending search terms stored and retrieved via Appwrite.
- 🖼️ **Dynamic UI** — Movie cards display title, rating, language, and release year.
- 🔄 **Loading States & Error Handling** — Friendly feedback when loading or when errors occur.
- 🌐 **Responsive & Clean Layout** — Simple, user-friendly interface built with modern styling.

## 🧰 Technologies Used

- **React** (Functional Components, Hooks)
- **TMDb API** – for movie data
- **Appwrite** – for backend database (tracking searches)
- **react-use** – for debounced search functionality
- **Vite** – for fast development environment


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
