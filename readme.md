# SMS service with twilio

## Steps
* Pull the image from [here](https://hub.docker.com/r/ajaix/twilio-node)
* Sample CURLs to import in postman
    * send api
    ```
    curl --location --request POST 'localhost:3000/v1/send' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "phone": "917550008849",
        "message": "final test3"
    }'
    ```
    * status api
    ```
    curl --location --request POST 'localhost:3000/v1/status' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "sid": "SMdb5b53b4d47f4b8a8e2e1d3ef255b0b4"
    }'
    ```
