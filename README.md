# Tourist App - Frontend

This is the **React Native frontend** for the Tourist App. Users can search for restaurants and accommodations, add favourites, and view details on a map (mobile only).

## Features

- Search for restaurants and hotels by area or city.
- Debounced search input with suggestions.
- Add/remove favourites across tabs (Restaurants, Accommodations, Favourites).
- View location on map (mobile only).
- Bottom navigation with icons (no top tabs).
- Responsive UI for mobile devices using React Native + Expo.

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation (Tabs)
- React Native Paper (UI components)
- Geoapify API (places & location)
- Axios (API requests)

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
git clone https://github.com/KhangLeThanh/tourist-app
cd frontend
npm install

### Running the App
npx expo start
# Scan QR code with Expo Go (iOS/Android)

### Notes

Map functionality is only available on mobile platforms (iOS/Android).

Search input uses debounce to reduce API requests.

Favourites are synced across tabs using Context API.
```
