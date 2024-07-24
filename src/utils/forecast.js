const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=5333c25795f34cd699294246241707&q=${latitude},${longitude}`
        request({url, json: true}, (error, {body}) =>{
            if(error){
                callback('Unable to connect to weather service', undefined);
                }
                else if(body.error){
                    callback('No macthes found by weathers service', undefined);
                
                }
                else{
                callback(undefined, {text: body.current.condition.text + '. It is currently ' + body.current.temp_c});
                }
                
        });
    }

module.exports = forecast    