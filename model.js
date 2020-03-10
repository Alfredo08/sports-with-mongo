const mongoose = require( 'mongoose' );

let sportCollection = mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    num_players : {
        type : Number,
        required : true
    } 
});

let personCollection = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    sport : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'sports'
    }
});

let SportModel = mongoose.model( 'sports', sportCollection );
let PersonModel = mongoose.model( 'persons', personCollection );

let Person = {
    addPerson : function( newPerson ){
        console.log( newPerson );
        return PersonModel
                .create( newPerson )
                .then( response => {
                    return response;
                })
                .catch( err => {
                    return err;
                })
    },
    getAllPeople : function(){
        return PersonModel
                .find()
                .populate('sport', ['name', 'num_players'])
                .then( allPeople => {
                    return allPeople;
                })
                .catch( err => {
                    return err;
                });
    },
};

let Sport = {
    addSport : function( newSport ){
        return SportModel
                .create( newSport )
                .then( response => {
                    return response;
                })
                .catch( err => {
                    return err;
                });
    },
    getAllSports : function(){
        return SportModel
                .find()
                .then( allSports => {
                    return allSports;
                })
                .catch( err => {
                    return err;
                });
    },
    getById : function( sportId ){
        return SportModel
                .findOne({id : sportId})
                .then( response => {
                    return response;
                })
                .catch( err => {
                    return err;
                });
    }

};

module.exports = {Sport, Person};