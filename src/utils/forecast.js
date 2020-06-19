const axios = require("axios").default;

const forecast = (coordsObjectArray, callback) => {
    let lat = "";
    let long="";
    let url = "";
    let tempObjArray = [];
    for(let i = 0; i<coordsObjectArray.length; i++){
        lat = coordsObjectArray[i].latitude;
        long = coordsObjectArray[i].longitude;
        url = "https://api.openweathermap.org/data/2.5/weather?lat=" + encodeURIComponent(lat) +"&lon=" + encodeURIComponent(long) + "&appid=85caaea334840dade639704a72cb3441&units=metric";
        axios.get(url).then((response) => {
            tempObjArray.push({
                location: coordsObjectArray[i].location,
                temp: response.data.main.temp,
                description:response.data.weather[0].description
               
            });
            if(tempObjArray.length === coordsObjectArray.length){
                callback(undefined, tempObjArray);
            }
            
        }).catch((error) => {
            callback("Invalid input or location doesn't exist!", undefined);
            return;
        });
        
    }
};

module.exports = forecast;
