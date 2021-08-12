# Scytale Backend demo

Scytale Backend server handles uploading and fetching pull requests.

## Features

- Add a new pull request.
- Fetch pull requests with customizing filtering.

## Instructions:

- "git clone" the repo.
- "npm install" in root dir.
- connect to your own mongo db database.
- "npm start" in root dir.

## Side notes:

- The method I used to fetch all labels and send them to the user is not the most efficient way, but consider the limit of the 2 routes instruction and the size and use of the app it was a more elegant way.- "git clone" the repo.

- You can add new pull requests by sending POST requests to the server http://localhost:5000
  example = { "title": "Added tsconfig.tjson file", "description": "Added new random words and description", "author": "Tal piven", "status": "open", "labels": ["work"]}
