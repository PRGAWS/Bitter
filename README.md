# Bitter
Bitter is a serverless twitter clone
## Backend Deployment of the application:
Execute following script:

npm run deploy:backend

Choose bitter-backend as stack name

Store url value from the output in the terminal
==> https://${ServerlessRestApi}.execute-api.${AWS::Region}1.amazonaws.com/Prod/

## Frontend Deployment of the application:
Before proceeding with deployment, make sure the previous api url is stored in "PROD_API" (path = src/ui/configuration.js).

### Local vs Live settings
If you want to test the app locally, make sure "IS_PRODUCTION" constant in the configuration file of the ui is set to false.

### Create S3 bucket for UI
Execute following script:

npm run deploy:s3ui

Choose bitter-frontend as stack name

Store the values from the output in the terminal
==> ${CloudFrontName}.cloudfront.net
    http://${S3BucketName}.s3-website.${AWS::Region}.amazonaws.com
### Deploy static website
Deploy the static content in S3    

cd src 

aws s3 sync ui s3://${S3BucketName}

cd ..