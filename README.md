# segment-volume-lambda
This lambda is used to push data from Segment's events api into Datadog so that the number of requests being made can be tracked. 

## How it works
The lambda is triggered via CRON using AWS EventBridge. The lambda then makes a request to Segment's events api to get the number of requests made in the past hour. This data is then sent to Datadog using the Datadog API.

## Development setup
1. Clone the repository
2. Run `yarn install` to install the dependencies
3. Add the following environment variables to your machine: 

    `SEGMENT_API_KEY` - The API key for the Segment public api
    
    `DD_API_KEY` - The API key for the Datadog workspace

4. Run `yarn dev` to start the lambda locally.

Warning: Because there is no staging/preprod environment for Segment or Datadog, running the lambda locally WILL send data to the production Datadog workspace.

### Development commands
- `yarn dev` - Start the lambda locally
- `yarn test` - Run the tests
- `yarn test:integration` - Run the integration tests
