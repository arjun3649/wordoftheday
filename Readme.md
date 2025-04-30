# Word of the Day App

A React Native mobile application that displays a random word and its definition each day. The app allows users to explore new vocabulary and keeps a history of previously viewed words.

## Features

- **Random Word Generation**: Fetches a random word from a public API
- **Word Definitions**: Retrieves and displays word definitions
- **Word History**: Saves viewed words and their definitions for later reference
- **Tab Navigation**: Easy navigation between Home and History screens

## API Integrations

- **Random Word API**: `https://random-word-api.herokuapp.com/word` - For fetching random words
- **Dictionary API**: `https://api.dictionaryapi.dev/api/v2/entries/en/` - For fetching word definitions

> **Note**: The API requests may take a few moments to complete. Please be patient while the app fetches new words and their definitions.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine
- Expo CLI: `npm install -g expo-cli`
- For iOS: MacOS with Xcode installed
- For Android: Android Studio with an emulator set up

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/word-of-the-day-app.git
cd word-of-the-day-app
```

2. Install dependencies
```
npm install
```

### Running the App

#### Using Expo Go on a physical device:
1. Start the development server:
```
npx expo start
```
2. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

#### On iOS Simulator:
1. Start the development server:
```
npx expo start
```
2. Press `i` in the terminal or click "Run on iOS simulator" in the Expo developer tools

#### On Android Emulator:
1. Make sure your Android emulator is running
2. Start the development server:
```
npx expo start
```
3. Press `a` in the terminal or click "Run on Android device/emulator" in the Expo developer tools

## Usage

### Home Screen
- View the random Word of the Day and its definition
- Press "New Word" to get a different random word
- Each viewed word is automatically saved to history

### History Screen
- Browse through all previously viewed words
- Words are displayed in chronological order with their definitions