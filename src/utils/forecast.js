const axios = require("axios").default;

// callback(error, dataObj)

const forecast = (lat, long, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + encodeURIComponent(lat) +"&lon=" + encodeURIComponent(long) + "&appid=85caaea334840dade639704a72cb3441&units=metric";
    //axios.get(url).then((response) => {
    axios.get(url).then(({data}) => {
        const dataObj = {
            //temp: response.data.main.temp,
            temp: data.main.temp,
            //description: response.data.weather[0].description
            description: data.weather[0].description
        };
        callback(undefined, dataObj);
    }).catch((error) => {
        callback("Invalid input or location doesn't exist!", undefined);
    });
};

module.exports = forecast;
