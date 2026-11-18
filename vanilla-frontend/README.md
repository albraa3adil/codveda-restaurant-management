# Vanilla JavaScript Frontend

The vanilla frontend is part of the Restaurant Management System developed for the Codveda Technology Full-Stack Development Internship.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript (ES Modules)
- Fetch API

## Features

- View menu categories retrieved from the REST API.
- Create new categories.
- Edit existing categories.
- Delete categories with confirmation.
- Display loading, success, and error messages.
- Responsive dashboard layout.

## Prerequisites

- Node.js and npm installed.
- Backend application configured and running.
- Visual Studio Code with the Live Server extension.

## Running the Application

1. Start the backend from the project root:

   ```bash
   npm --prefix backend run dev
   ```

2. Open the project in Visual Studio Code.

3. Open `vanilla-frontend/index.html`.

4. Right-click the file and select **Open with Live Server**.

5. The frontend should open in your browser.

## API Configuration

The backend API base URL is configured in `js/config.js`:

```javascript
export const API_BASE_URL = 'http://localhost:4000/api';
```

Ensure this URL matches the address and port used by your backend.

## Current Scope

This frontend currently implements menu category management through the backend REST API.

Data persistence is handled by the backend. The current backend implementation uses temporary in-memory storage.