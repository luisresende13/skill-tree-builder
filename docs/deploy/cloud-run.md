# Cloud Run Deployment

This document provides instructions on how to build and deploy the application to Google Cloud Run.

### Prerequisites

1.  **Install and Initialize the Google Cloud CLI:**
    If you haven't already, [install the gcloud CLI](https://cloud.google.com/sdk/docs/install) and initialize it by running:
    ```bash
    gcloud init
    ```

2.  **Enable Required APIs:**
    Enable the Cloud Build and Cloud Run APIs for your project:
    ```bash
    gcloud services enable cloudbuild.googleapis.com run.googleapis.com
    ```

### Deployment Steps

1.  **Set your Project ID:**
    Replace `YOUR_PROJECT_ID` with your actual Google Cloud project ID.
    ```bash
    gcloud config set project YOUR_PROJECT_ID
    ```

2.  **Build the Docker Image with Cloud Build:**
    This command builds your Docker image using Google Cloud Build and pushes it to the Google Container Registry (GCR). Replace `YOUR_PROJECT_ID` and `YOUR_SERVICE_NAME` (e.g., `skill-tree-builder`).
    ```bash
    gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/YOUR_SERVICE_NAME
    ```

3.  **Deploy to Cloud Run:**
    This command deploys your container image from GCR to Cloud Run.
    *   Replace `YOUR_SERVICE_NAME` with the name you chose in the previous step.
    *   Replace `YOUR_PROJECT_ID` with your project ID.
    *   Replace `YOUR_REGION` with the desired region (e.g., `us-central1`).
    *   The `--allow-unauthenticated` flag makes your service publicly accessible.

    ```bash
    gcloud run deploy YOUR_SERVICE_NAME \
      --image gcr.io/YOUR_PROJECT_ID/YOUR_SERVICE_NAME \
      --platform managed \
      --region YOUR_REGION \
      --set-env-vars=API_KEY="YOUR_GEMINI_API_KEY" \
      --allow-unauthenticated
    ```
    > **Note:** Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key. For better security, it is highly recommended to use [Secret Manager](https://cloud.google.com/secret-manager) to handle your API key.

After running these commands, your application will be deployed and accessible at the URL provided by Cloud Run.
