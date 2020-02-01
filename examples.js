const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/native-example';

MongoClient.connect(url, function(err, db) {

    db.collection('cars')
        .insertOne({
            make: 'Ford',
            model: 'Focus',
            year: 2017
        })
        .then(response => {
            console.log('Inserted a car');
            const insertedCar = response.result;
        })
        .catch(console.error);

        // reading a single document 
        db.collection('cars')
            .findOne({_id: '5e30d259e23ab22624e9eefe' })
            .then(car => {
                console.log('Found the requested car');
            })
            .catch(console.error);

            // Querying several documents
            db.collection('cars')
                .find({ make: 'Ford' })
                .toArray()
                .then(cars => {
                    console.log(`Found ${cars.length} cars`);
                })
                .catch(console.error);

            //updating a single document
            db.collection('cars')
                .updateOne({ _id: '5e30d259e23ab22624e9eefe' }, { $set: { year: 2018 }})
                .then(response => {
                    console.log(`Updated ${response.upsertedCount}`);
                });

                // updating sevral documnets
                db.collection('cars')
                    .update({ make: 'Datsun'}, { $set: { make: 'Nissan' } })

                .then(result => {
                    console.log('Updated all Datsuns to be a Nissan');
                })
                .catch(console.error);

                // Deleting a single document
                db.collection('cars')
                    .removeOne({ _id: '5e30d259e23ab22624e9eefe' })
                    .then(response => { 
                        console.log('Removed a record')
                    });

                    //Deleting Several Documents
                    db.collection('cars')
                        .remove({ make: 'Rover' })
                        .then(result => {
                            console.log(`Removed ${result.result.n} cars`);
                        })
                        .catch(console.error);


                //express example
                const app = require('express')();
                const { MongoClient } = require('mongodb');
                
                const url = 'mongodb://localhost:27017/node200-mongodb-express-example';
                
                app.get('/api/cars', (req, res) => {
                    MongoClient.connect(url, (err, db) => {
                        if(err) {
                            return res.status(500).send('An internal server error has occured');
                        }
                
                        db.collection('cars')
                            .find()
                            .then(cars => res.status(200).json(cars))
                            .catch(error => res.status(500).send('An internal server error has occured'));
                    });
                });
                
                module.exports = app;

    db.close()
})
