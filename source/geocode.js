const request = require('Request')

const geocode = (address, callback) => {
     
    const geourl ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicmF2aTA5IiwiYSI6ImNrbmxvOTRobzBoOGkybnByOWN5eHZrejcifQ.5RX0XNcBZeTQcO6BSDj0vA'
request({url:geourl,json:true},(error,response)=>{
    if(error){
        console.log('unable to connect!')
    } else if (response.body.features.length === 0) {
        callback('Unable to find location. Try another search.', undefined)
    }else {
        callback(undefined, {
            latitude: response.body.features[0].center[0],
            longitude: response.body.features[0].center[1],
            location: response.body.features[0].place_name
        })
    }
})
 }

 module.exports = geocode