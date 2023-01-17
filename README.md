# Smart-brain-api

> Backend api for `Smart Brain App` deployed at: https://smartbrainapi-u3ff.onrender.com

* It uses docker compose to create images for: 
    - server with node
    - postgress
    - redis 

> Steps to run the Api locally: 
## Method 1
(with redis and postgress installed locally)
1. npm install
2. Setup the .env file
3. Add the clarifai Api key
4. npm start

## Method 2
(with docker installed locally)

1. Add the clarifai Api key
2. docker-compose up --build
 
