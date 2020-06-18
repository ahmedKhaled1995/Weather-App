console.log("hello from the client script");

// Selectors
const weatherForm = document.querySelector("form");
const weatherSearchValue = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchPlace = weatherSearchValue.value;
    //url = "http://localhost:3000/weather?address=" + encodeURIComponent(searchPlace);
    url = "/weather?address=" + encodeURIComponent(searchPlace);    // note how we removed localhost:3000, because we have a port provided by heroku for us
    messageOne.innerHTML = "Loading...";
    messageTwo.innerHTML = "";
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.innerHTML = data.error;
            }else{
                messageOne.innerHTML = data.address;
                messageTwo.innerHTML = data.description + ", temperature is " + data.temp + " C";
            }
        });
    });
});