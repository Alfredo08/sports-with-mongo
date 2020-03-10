const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const {Sport, Person} = require( './model' );

const jsonParser = bodyParser.json();
const app = express();

app.get( '/api/getSports', ( req, res ) => {

    Sport
        .getAllSports()
        .then( listOfSports => {
            return res.status(200).json( listOfSports );
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with getting the sport list";
            return res.status( 400 ).end();
        });
});

app.post( '/api/createSport', jsonParser, ( req, res ) => {
    let {id, name, num_players} = req.body;

    let newSport = {
        id, 
        name, 
        num_players
    };

    Sport
        .addSport( newSport )
        .then( createdSport => {
            return res.status( 201 ).json( createdSport );
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with creating the sport.";
            return res.status( 400 ).end();
        });
});

app.post( '/api/createPerson', jsonParser, ( req, res ) => {
    let {firstName, lastName, sportId} = req.body;

    Sport
        .getById( Number(sportId) )
        .then( response => {
            console.log( response );
            let newPerson = {
                firstName, 
                lastName, 
                sport : response._id
            };

            Person
                .addPerson( newPerson )
                .then( createdPerson => {
                    return res.status( 201 ).json( createdPerson );
                })
                .catch( err => {
                    res.statusMessage = "Something went wrong with creating the person.";
                    return res.status( 400 ).end();
                });
        })

    
});

app.get( '/api/getPeople', ( req, res ) => {

    Person
        .getAllPeople()
        .then( listOfPersons => {
            return res.status(200).json( listOfPersons );
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with getting the persons list";
            return res.status( 400 ).end();
        });
});

app.listen( 8080, () => {

    return new Promise( ( resolve, reject ) => {
        mongoose.connect( 'mongodb://localhost/sportsdb', { useNewUrlParser: true, useUnifiedTopology: true }, (errResponse) => {
            if ( errResponse ){
                return reject(errResponse);
            }
            else{
                return resolve();
            }
        })
    })
    .then( response => {
        console.log( "App runing on port 8080.");
    })
    .catch( errResponse => {
        mongoose.disconnect();
        console.log( errResponse );
    });

        


    
})