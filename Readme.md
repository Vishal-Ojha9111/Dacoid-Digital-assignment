# Dacoid Quiz Assignment

This is a quiz web-app developed for the Dacoid digital assignment. The application allows users to take a quiz, view their results, and see their quiz history. The app is built using React, Vite, and Tailwind CSS for the frontend, and Express.js for the backend.

## Features

- Fetches quiz questions from an API.
- Displays multiple-choice questions and text input questions.
- Countdown timer for each question.
- Stores user answers and verifies them against the correct answers.
- Displays the quiz results and the user's score.
- Stores quiz results in IndexedDB and displays quiz history.
- Responsive design using Tailwind CSS.

## Instructions to Run the App Locally

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd Dacoid-Digital-assignment
   ```
2. Navigate to the backend directory:

   ```sh
   cd backend
   ```

3. Install the backend dependencies:

   ```sh
   npm install
   ```

4. Create a .env file in the backend directory and add the following environment variables:

   ```
   PORT=3000
   ORIGIN=http://localhost:5173
   ```

5. Start the backend server:

   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd ../frontend
   ```

2. Install the frontend dependencies:

   ```sh
   npm install
   ```

3. Create a .env file in the frontend directory and add the following environment variable:

   ```
   VITE_API_URL=http://localhost:3000
   ```

4. Start the frontend development server:

   ```sh
   npm run dev
   ```

5. Open your browser and navigate to http://localhost:5173 to view the app.

### Linting

To run the linter and check for code quality issues, use the following command:

   ```sh
   npm run lint
   ```

### Building for Production

To build the frontend for production, use the following command:

   ```sh
   npm run build
   ```

This will create a dist directory with the production build of the app.

### License

This project is licensed under the ISC License

