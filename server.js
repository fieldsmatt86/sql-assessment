const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , connectionString = (`postgres://fyrhoploqtsnca:6ded2a2e3fe5bb6f4aea88121f833d4a6aced58e7b7efa825cd8a21253c79fe8@ec2-107-20-188-239.compute-1.amazonaws.com:5432/dd1l1j9eoigor1?ssl=true`);


const mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json())
app.use(cors());

// You need to complete the information below to connect
// to the assessbox database on your postgres server.
massive( connectionString)
.then( db => {
  app.set('db', db);

  // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then( response => {
    console.log('User table init');
    db.init_tables.vehicle_create_seed().then( response => {
      console.log('Vehicle table init');
    })
  })

})


// ===== Build enpoints below ============
app.get('/api/users', mainCtrl.getUsers);
app.get('/api/vehicles', mainCtrl.getVehicles);
app.get('/api/user/:userID/vehiclecount', mainCtrl.vehicleCountByOwner);
app.get('/api/user/:userID/vehicle', mainCtrl.vehiclesByOwner);
app.get('/api/vehicle', mainCtrl.vehiclesByQuery);
app.get('/api/newervehiclesbyyear', mainCtrl.vehiclesByYear);

app.put('/api/vehicle/:vehicleID/user/:userID', mainCtrl.updateOwner);

app.delete('/api/user/:userID/vehicle/:vehicleID', mainCtrl.removeOwner);
app.delete('/api/vehicle/:vehicleID', mainCtrl.removeVehicle);

app.post('/api/users', mainCtrl.createUser);
app.post('/api/vehicles', mainCtrl.addVehicle);






// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
})
