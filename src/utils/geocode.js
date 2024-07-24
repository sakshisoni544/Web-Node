const request = require('postman-request');
const access_token = 'pk.eyJ1Ijoic2Frc2hpc29uaSIsImEiOiJjbHlvNzA1dnYwYWVvMnVwbGhpaGNtdmFyIn0.gmmdoMW6exUMph6d1DKkRA';

const geocode = (address, callback) =>{
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&access_token=${access_token}&limit=1`;
    request({url, json: true}, (error, {body}) =>{
    if(error){
    callback('Unable to connect to location service', undefined);
    }
    else if(body.features.length === 0){
        callback('No macthes found bylocation service', undefined);
    
    }
    else{
        callback(undefined, {
            latitude: body.features[0].geometry.coordinates[1],
            longitude: body.features[0].geometry.coordinates[0] ,
            placeName: body.features[0].properties.full_address 
        })
    }
    });
    
};

module.exports = geocode