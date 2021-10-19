const request = require('request')

const forecast=(latitude,longitude,callback)=>{
    
     const url='http://api.weatherstack.com/current?access_key=bb0fe9994209df3eead844636dfe2248&query='+ latitude+','+longitude
     request({url:url,json:true},(error,{body})=>{
         
        if(error){
            callback('Unable to connect to network',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,'weather is '+ body.current. weather_descriptions[0]+'with '+ body.current.humidity+' humidity and temperature is '+body.current.temperature)
        }


     })




}

module.exports=forecast