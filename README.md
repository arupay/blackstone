# Room-Link

<img src="https://user-images.githubusercontent.com/96318127/280200179-3f2b5d5b-e902-4e46-8775-8ea008692203.png" alt="YumTruckLogo" width="400"/>

Coding challenge where you build a Meeting Room Booking App client that interacts with a RESTful API using React.

## Important Links

- [Deployed Api Server](https://blackstone-backend.adaptable.app/api)
- [Deployed FrontEnd](https://room-link.netlify.app/)
- [AWS RDS] Coming Soon...

## Local Set Up

If you'd like to run the project locally, please read the following stems

### Frontend Setup

Prerequisites are Git and Node.js

```bash

# clone the repository to your local machine.

git clone git@github.com:arupay/blackstone.git

# navigate to the front-end directory

cd blackstone/front-end

# create a .env file to allow the front-end to access the back-end locally

echo "REACT_APP_API_URL=http://localhost:8080" >>.env



# install the required node modules

npm install

# start the server

npm start
```

### Backend Setup

Prerequisites are Git, Node.js, and Postgres

```bash

# navigate to the back-end directory
cd blackstone/front-end

# create a .env file to access the database locally
echo "PORT=3333\nPG_HOST=localhost\nPG_PORT=5432\nPG_DATABASE=saucesource" >> .env

echo "MAP_API_KEY=INSERTKEYHERE">> .env

# install the required node modules
npm i
npm i -g nodemon

# initialize and seed the database
npm run db:init
npm run db:seed

# start the server
nodemon server.js
```

### Screenshots (Desktop)

![All Rooms & Find Room](https://user-images.githubusercontent.com/96318127/280202041-4f525b28-2911-4424-a6b6-803066834481.png)
![Book Room](https://user-images.githubusercontent.com/96318127/280201420-c8e347f3-b5f3-4f92-b651-ba59238271fc.png)
![Add Room (Add)](https://user-images.githubusercontent.com/96318127/280201419-1ec85dfc-9b7c-4bc5-88e4-7ff882e8dc87.png)
![Meetings](https://user-images.githubusercontent.com/96318127/280201417-2b609dbd-318b-4982-8578-3328db350451.png)

