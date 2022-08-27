# Materialism

This is a Next.js application using TypeScript to help users find public art in New York City.
The frontend is Next.js with TypeScript and Styled Components.
The map UI is powered by a Mapbox API with custom configuration.
The backend is powered by Sanity utilizing GROQ querying.

---

## Features

- Location fetching
- Location based data queries
- Searchbar

---

## Setup

Clone this repo to your desktop and run `npm install` to install all the dependencies.

Access to Sanity database and Mapbox API is restricted. You will have to set up your own accounts and put the keys and Sanity endpoints into a .env file.

---

## Usage

After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run `npm run dev` within the root folder to start the application. You will then be able to access it at localhost:3000

To run the Sanity server: from the root directory `cd studio` then `sanity start`
Note: you will need to set up and configure your own Sanity backend

There is a helper file in `Utils/GetGeos.tsx` that converts geo data to street addresses and updates the backend database. ArtWork street addresses are not currently used in the app, this helper only exists to compile data for a possible future use.

---

## License

This project is licensed under the terms of the **MIT** license.
