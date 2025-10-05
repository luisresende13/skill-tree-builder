<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/14farFnu2gZnjnxj7Zlg7YsFC6iX63oVb

## Run Locally with Docker

This is the recommended way to run the application locally as it closely mirrors the production deployment environment.

**Prerequisites:**
*   [Node.js](https://nodejs.org/)
*   [Docker](https://www.docker.com/get-started)

1.  **Build the Docker image:**
    ```bash
    docker build -t skill-tree-builder-local .
    ```

2.  **Run the Docker container:**
    Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key.
    ```bash
    docker run -d -p 8080:8080 -e GEMINI_API_KEY="YOUR_GEMINI_API_KEY" --name skill-tree-builder-container skill-tree-builder-local
    ```

3.  Open your browser and navigate to `http://localhost:8080`.

## Local Development (Frontend Only)

If you only need to work on the frontend UI and don't need to connect to the Gemini API, you can run the Vite development server.

**Prerequisites:** Node.js

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the frontend dev server:**
    ```bash
    npm run dev
    ```

3.  Open your browser and navigate to `http://localhost:3000`. Note that API calls will fail in this mode.

## Deployment

For instructions on how to deploy the application to Google Cloud Run, please see the [Cloud Run Deployment Guide](./docs/deploy/cloud-run.md).
