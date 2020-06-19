const axios = require("axios").default;

//callback(error, dataObj);

const geoCode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=pk.eyJ1IjoiYWhtZWRraGFsZWQyMDgiLCJhIjoiY2tiZmdvYTJ3MHZsYjJ4bTIxbXRzMTMzOCJ9.VJhkyvLUxQJuGErnZBUsOg&limits=1";
    axios.get(url).then( (response) => {
        if(response.data.features.length === 0){
            callback("Invalid location!", undefined);
            return;
        }
        let locationsOblectsArray = [];
        for(let i = 0; i<response.data.features.length; i++){
            locationsOblectsArray.push({
                latitude: response.data.features[i].center[1],
                longitude: response.data.features[i].center[0],
                location: response.data.features[i].place_name
            });
        }
        callback(undefined, locationsOblectsArray);
        return;
    }).catch((error) => {
        callback(error, undefined);
        return;
    });
};

module.exports = geoCode;
