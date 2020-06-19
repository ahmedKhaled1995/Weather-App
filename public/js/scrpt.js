console.log("Client Script loaded successfully!");

// Selectors
const weatherForm = $("form");
const weatherSearchValue = $("input");

function clearPage(){
    const weatherInfoContainer = $(".weather-display");
    weatherInfoContainer.empty();
}


// Adding event to the form
weatherForm.on("submit", (e) => {
    e.preventDefault();
    const searchPlace = weatherSearchValue.val();
    url = "/weather?address=" + encodeURIComponent(searchPlace);    // note how we removed localhost:3000, because we have a port provided by heroku for us
    clearPage();
    $(".weather-display").append("<p>Loading...</p>")
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                clearPage();
                $(".weather-display").append("<p>"+ data.error +"</p>")
            }else{
                clearPage();
                data.forEach((obj) => {
                    $(".weather-display").append("<p>" + obj.location + "</p>");
                    $(".weather-display").append("<p>" + obj.description + ", temperature is " + obj.temp + " C" + "</p>");
                    $(".weather-display").append("<hr>");
                });
            }
        });
    });
});
