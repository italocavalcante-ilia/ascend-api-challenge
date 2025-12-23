# Ascend API Challenge

A Node.js project to show the essencial operations using AscendOS API with Ilia Sandbox Environment

## Technologies

- Node.js
- NPM ou Yarn
- Typescript
- Fastify
- Ascend SDK
- Zod

## How to run the project

### Requirements

- Node.js (18 or latest version)
- NPM / Yarn
- Insomnia HTTP Client

### Step by step

1. Clone the repository:
   ```bash
   git clone https://github.com/italocavalcante-ilia/ascend-api-challenge.git

2. Access the project folder:
    cd ascend-api-challenge

3. Install dependencies :
    npm install / yarn

4. Run the project:
    npm run dev

5. Import the collection ( ./collection/insomnia_ascend_api.yaml ) and import on insomnia app


### How to tests the routes

1. Start creating a Person and following these next routes :
 - Create Legal Person
 - Create Account 
 - Enroll Account
 - Create Upload Link
 - Upload Document
 - Affirm agreements
 - Upload Legal Person

2 - Bank Relationship
 - Add Account Relationship
 - Get Micro Deposits 
 - Verify Relationship
 - Get Bank Relationship Status ( To check if it works or not)

3 - Fundings
 - Create New Deposit
 - Get Deposit ( Check if it works)

4 - Orders
 - Create Order
 - Order (check the state of the order)

5 - Markets
 - Stock Prices ( Check using an Symbol of a stock that you want to check the price , For example : AAPL)



### IMPORTANT!
You need to get all credentials to use this API Project , credentials such as apikey and serviceAccountCreds need to be set up on .env file (You need to create a new one based on .env.example). 

Do you have questions to use this SDK ? Check the SDK Typescript Documentation with the link bellow :
https://developer.apexclearing.com/apex-fintech-solutions/docs/sdk-typescript