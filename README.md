# Time Range SPA

This is a single-page application that calculates and displays the time difference between the current date and a user-defined past date. It also shows the same amount of time prior to that past date.

## Features

- Date selection using a date input.
- Adjustable date using a slider.
- Displays the time difference in a user-friendly format.

## Project Structure

```
time-range-spa
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── main.tsx           # Entry point for the React application
│   ├── App.tsx            # Main App component
│   ├── components          # Contains reusable components
│   │   ├── DatePicker.tsx  # Date picker component
│   │   ├── Slider.tsx      # Slider component for date adjustment
│   │   └── TimeDisplay.tsx  # Component to display time differences
│   ├── hooks               # Custom hooks
│   │   └── useTimeRange.ts  # Hook for calculating time ranges
│   ├── utils               # Utility functions
│   │   └── time.ts         # Functions for time calculations
│   └── styles              # CSS styles
│       └── app.css         # Styles for the application
├── package.json            # NPM configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd time-range-spa
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Use the date picker to select a past date.
- Adjust the date using the slider to see how the time difference changes.
- The application will display the time difference between the current date and the selected past date, as well as the same amount of time prior to that date.

## License

This project is licensed under the MIT License.