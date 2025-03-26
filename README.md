# PokéOS: A Dynamic Pokémon Web Application

PokéOS is a dynamic and engaging Pokémon web application that integrates the Pokémon API to provide an optimized and accessible experience. The project features a dynamic Pokédex, a Pokémon comparison tool, a favorites tracker with persistent state and an interactive guessing game. Built with React, Tailwind CSS and TypeScript. PokéOS demonstrates proficiency in state management, memoization, debounced input handling and modern UI design practices.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Challenges & Solutions](#challenges-and-solutions)
- [Future Improvements](#future-improvements)

## Overview

PokéOS is designed to deliver a comprehensive Pokémon experience directly in your browser. This application leverages:

- **React & TypeScript:** Building a robust and type-safe interface with reusable components.
- **Tailwind CSS:** Creating a modern and responsive design that adapts to various screen sizes.
- **Pokémon API Integration:** Dynamically fetching Pokémon data, including stats, images and types.
- **State Management & Persistence:** Utilizing Context API and local storage to manage favorites and user interactions.
- **Optimized Interactions:** Employing memoization and debounced input handling to ensure smooth performance.

## Features

- **Dynamic Pokédex:** Explore a vast collection of Pokémon with detailed stats, images, and type information.
- **Pokémon Comparison:** Select and compare two Pokémon side-by-side to analyze their strengths and weaknesses.
- **Favorites Tracker:** Easily add and remove Pokémon from your favorites list with persistent state across sessions.
- **Interactive Guessing Game:** Test your knowledge by guessing a random Pokémon based on its Pokédex number, with real-time feedback.
- **Optimized Performance:** Use of memoization and debounced input to reduce unnecessary re-renders and improve responsiveness.
- **Modular Component Architecture:** Clean and maintainable code structure with components separated by functionality.
- **Responsive Design:** Fully responsive interface built with Tailwind CSS, ensuring a seamless experience on any device.

## Installation & Setup

1. **Clone the Repository:**

   ```jsx
   git clone https://github.com/yourusername/taskly.git
   cd taskly

   ```

2. **Install Dependencies:**

   Make sure you have Node.js installed. Then run:

   ```jsx
   npm install
   ```

3. **Run the Application:**

   ```jsx
   npm start
   ```

   This command starts the development server. Open http://localhost:3000 to view the application in your browser.

## Usage

**Navigating the Application**
**Pokédex:**

- **Browse through the extensive list of Pokémon.**
- **Use the search bar to quickly find your favorite Pokémon.**
- **Filter Pokémon by type using the button.**

**Comparison Tool:**

- **Select two Pokémon to view a side-by-side comparison of their stats and characteristics.**
- **Compare attributes such as height, weight and key battle statistics.**

**Favorites Tracker:**

- **Add Pokémon to your favorites for quick access.**
- **Favorites are saved in your local storage, ensuring persistence across sessions.**
- **Navigate to the favorites page to view all your saved Pokémon.**

**Guessing Game:**

- **Challenge yourself by guessing the Pokémon based on its Pokédex number.**
- **Receive instant feedback on whether the target Pokémon's number is higher or lower than your guess.**
- **The game tracks the number of guesses and provides clear visual feedback.**

## Challenges and Solutions

### 1. Efficient Data Fetching from the Pokémon API

**Problem:**
Fetching data for 1000 Pokémon in one go can lead to performance issues and rate limiting.

**Solution:**
Implemented batch processing and introduced delays between fetches to minimize rate limiting. The application fetches Pokémon data in manageable batches, ensuring a smoother data loading experience.

**Example:**

```jsx
// Processing in batches to reduce rate limiting issues.
for (let i = 0; i < data.results.length; i += batchSize) {
  // Fetch each batch and delay the subsequent requests.
  await new Promise((resolve) => setTimeout(resolve, 200));
}
```

### 2. Optimized Rendering with Memoization and Debounced Inputs

**Problem:**
Frequent re-renders during user searches and Pokémon filtering could impact performance.

**Solution:**
Utilized React's memoization with useMemo to cache filtered results and a custom debounced hook to manage search inputs. This minimizes unnecessary computations and re-renders, providing a smooth user experience.

**Example:**

```jsx
// Custom hook for debouncing input values
function useDebounce<T>(value: T, delay: number): T {
const [debouncedValue, setDebouncedValue] = useState(value);
useEffect(() => {
const timer = setTimeout(() => setDebouncedValue(value), delay);
return () => clearTimeout(timer);
}, [value, delay]);
return debouncedValue;
}
```

### 3. State Persistence with Local Storage

**Problem:**
Keeping track of user favorites across sessions without a backend can be challenging.

**Solution:**
Implemented a custom hook using local storage to persist the favorites list. This ensures that even after a page refresh, the user's favorite Pokémon remain accessible.

**Example:**

```jsx
const [storedValue, setStoredValue] =
  useState <
  T >
  (() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
```

### 4. Creating an Accessible and Responsive UI

**Problem:**
Ensuring the application is both visually appealing and accessible to all users, including those using assistive technologies.

**Solution:**
Adopted best practices in accessibility by using semantic HTML, proper ARIA attributes, and a fully responsive design with Tailwind CSS. The interface adapts gracefully to different device sizes and interaction methods.

## Future Improvements

- **Enhanced Animations:** Incorporate advanced animations using libraries like GSAP for smoother transitions and interactive feedback.
- **Advanced Search and Filters:** Introduce more granular search options, such as filtering by multiple types, abilities or generation.
