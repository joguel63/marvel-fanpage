# Marvel Fan Website

Welcome to the Marvel Fan Website! This project is a single-page application built using React, TypeScript, and GSAP. It serves as a fan site for the Marvel Universe, showcasing iconic characters and popular movies.

## Features

- **Animated Header**: A welcoming title and subtitle that animate into view using GSAP.
- **Characters Section**: A responsive grid displaying cards for 6 iconic Marvel characters, each with hover effects.
- **Featured Movies Section**: A horizontally scrollable slider featuring popular Marvel movie posters, complete with navigation buttons.
- **Smooth Scrolling**: A "See More" button that smoothly scrolls to the lower sections of the page.
- **Footer**: A footer with social media links, copyright information, and a contact section, all animated for a smooth entrance.
- **Theme Toggle**: Switch between dark and light themes with a smooth transition effect.
- **Loading Spinner**: A sleek loading animation while the site content is being prepared.
- **Lazy Image Loading**: Images load progressively with placeholders to improve performance.
- **Performance Optimizations**: Optimized animations based on device capabilities.
- **Accessibility Features**: Support for reduced motion preferences and improved screen reader compatibility.
- **Multilingual Support**: Support for English and Spanish languages with a context-based language switcher.

## Project Structure

```
marvel-fan-website
├── src
│   ├── App.tsx
│   ├── index.tsx
│   ├── components
│   │   ├── Header
│   │   │   ├── Header.tsx
│   │   │   └── Header.module.css
│   │   ├── CharactersSection
│   │   │   ├── CharactersSection.tsx
│   │   │   ├── CharactersSection.module.css
│   │   │   └── CharacterCard.tsx
│   │   ├── MoviesSection
│   │   │   ├── MoviesSection.tsx
│   │   │   ├── MoviesSection.module.css
│   │   │   └── MovieSlider.tsx
│   │   ├── SeeMoreButton
│   │   │   ├── SeeMoreButton.tsx
│   │   │   └── SeeMoreButton.module.css
│   │   ├── Footer
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.module.css
│   │   ├── ThemeToggle
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── ThemeToggle.module.css
│   │   ├── Spinner
│   │   │   ├── Spinner.tsx
│   │   │   └── Spinner.module.css
│   │   └── LanguageSelector
│   │       ├── LanguageSelector.tsx
│   │       └── LanguageSelector.module.css
│   ├── context
│   │   └── LanguageContext.tsx
│   ├── i18n
│   │   ├── en.ts
│   │   ├── es.ts
│   │   └── index.ts
│   ├── types
│   │   └── index.ts
│   ├── styles
│   │   ├── global.css
│   │   └── variables.css
│   └── assets
│       └── images
├── public
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd marvel-fan-website
npm install
```

## Running the Application

To run the application in development mode, use the following command:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create an optimized production build:

```bash
npm run build
```

To analyze the bundle size:

```bash
npm run analyze
```

To serve the production build locally:

```bash
npm run serve
```

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **GSAP**: A powerful JavaScript library for creating high-performance animations.
- **Context API**: Used for state management for theme and language.
- **CSS Modules**: For component-scoped styling.
- **i18n**: Internationalization support for multiple languages.

## Performance Features

- **Optimized Animations**: Animations are tuned for performance with reduced effects on mobile devices.
- **Lazy Loading**: Images are loaded only when needed to reduce initial load time.
- **Accessibility**: Includes support for reduced motion preferences and keyboard navigation.
- **Theme Support**: Customizable dark and light themes with user preference storage.

## Contributing

Contributions are welcome! If you have suggestions for improvements or features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.