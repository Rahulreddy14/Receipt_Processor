# Receipt Processor API

This is a Node.js Application. 

This is a Simple Receipt Processing Application built with Node.js 

Features
Process Receipts: Accepts receipt data and assigns a unique ID for tracking.
Retrieve Points: Returns the points awarded for a given receipt ID based on specific rules.
Containerized Setup: Fully Dockerized application for easy setup and deployment.


API ENd Points :

1. Process Receipts
Path: /receipts/process
Method: POST

2. Get Points
Path: /receipts/{id}/points
Method: GET


Note:

- Data is stored in the memory and will not persist between the restarts 
- Dockerized setup is added. 

## Prerequisities

- Ensure docker is installed
- Port 8080 is used 

Steps to build and run 

1. Clone the repository
2. Build the docker image

```
docker build -t receipt-processor .
```


3. Run the Docker Container

docker run -p 8080:8080 receipt-processor

4. Test the application. 

Open the Browser or Postman and test the application


