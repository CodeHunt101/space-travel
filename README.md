# Space Travel - Frontend Application

Welcome to the **Space Travel** frontend application! This project is a sleek and interactive web application designed to let users explore various space travel destinations, learn about the crew members, and discover the latest technology used in space exploration.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Building the Application](#building-the-application)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Demo

Check out the live version of the Space Travel application [here](https://spacetravel-fe.vercel.app/).

## Features

- **Interactive Navigation:** Explore different sections (Home, Destination, Crew, and Technology) using a responsive and accessible navigation menu.
- **Dynamic Content:** Each section dynamically loads content, such as destinations with detailed descriptions and travel information.
- **Accessible Components:** Designed with accessibility in mind, including ARIA attributes and semantic HTML.
- **Responsive Design:** Optimized for various screen sizes and devices.
- **Smooth Animations:** Page transitions and component interactions include subtle animations for a polished user experience.

## Getting Started

### Installation

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/space-travel.git
cd space-travel
```

Install the necessary dependencies:

```bash
npm install
```

### Running the Application

To run the application locally, use:

```bash
npm run dev
```

This command will start a development server at `http://localhost:3000/`.

### Building the Application

To create an optimized production build, run:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure

Here's a brief overview of the project's structure:

```plaintext
space-travel/
├── public/                # Public assets (images, icons, etc.)
├── src/
│   ├── app/               # Main application components and pages
│   │   ├── components/    # Reusable UI components
│   │   ├── styles/        # Global and modular SCSS styles
│   │   ├── utils/         # Utility functions and type definitions
│   │   ├── data.json      # Static data for destinations, crew, and technology
│   │   └── ...            # Other application-specific files
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Files and directories to be ignored by git
├── package.json           # Project metadata and npm scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

### Key Components

- **NavBar:** A responsive navigation menu that adapts to screen sizes and offers an accessible user experience.
- **Crew, Destination, Technology Pages:** Pages that fetch and display information about space destinations, crew members, and technologies.
- **Reusable Components:** Dots, Numbers, Tabs, and LargeButton components enhance interactivity across the app.

## Testing

This project uses [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/) to ensure reliability and correctness. 

To run tests (includes coverage reports):

```bash
npm test
```

To clear the Jest cache:

```bash
npm run test:clearCache
```

## Technologies Used

- **React**: Library for building user interfaces.
- **Next.js**: Framework for server-rendered React applications.
- **TypeScript**: Provides static typing to JavaScript, improving code quality.
- **SCSS**: For modular and reusable styles.
- **Jest**: Testing framework with a focus on simplicity.
- **Testing Library**: For testing React components in a way that closely resembles how they are used.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch-name`).
6. Create a new Pull Request.

