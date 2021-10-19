const request = require('request')

const geocode=(address,callback)=>{

const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+  '.json?access_token=pk.eyJ1IjoieW9nZWV0YXBhcnlhbmkiLCJhIjoiY2t1bmxybzVyMHVyZTJucGZrYjkyeTJsNCJ9.b31PalOOqj1jPK0-WSUu6A&limit=1'
request({url:url,json:true},(error,{body})=>{
     

    if(error){
        callback('Unable to connect to network',undefined)

    }
    else if(body.features.length===0)
    {
        callback('This location does not exist',undefined)
    }
    else{
        callback(undefined,{latitude:body.features[0].center[0],
          longitude:body.features[0].center[1],
          location:body.features[0].place_name
        
        })

        }

})
}

module.exports=geocode