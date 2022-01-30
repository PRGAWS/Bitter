# Bitter
Bitter is a serverless twitter clone
## Backend Deployment of the application:
npm run deploy:backend
Choose bitter-backend as stack name
Store url value
==> https://xbuh6ifalh.execute-api.eu-central-1.amazonaws.com/Prod/
## Frontend Deployment of the application:
Before proceeding with deployment, make sur the previous api url is used in de frontend ajax calls
### Create S3 bucket for UI
npm run deploy:s3ui
Choose bitter-frontend as stack name
Store the values of the output
==> d2nk9a16y0fv2i.cloudfront.net
    http://bitter-frontend-s3bucket-6iwad4o9v4c1.s3-website.eu-
### Deploy static website
Deploy the static content in S3    
cd src && aws s3 sync ui s3://bitter-frontend-s3bucket-1dz35c6o9x6rn
