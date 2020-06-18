const path = require("path");           // core lib
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for express config
const publicStaticPathDirectory = path.join(__dirname, "../public");                 // C:\Node js\Weather Server\Web Server\public
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");                                                     //app.set("view engine", "TEMPLATE_ENGINE_NAME");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicStaticPathDirectory));           // used to set the default path for index.html             
                                                              // use it anyway even if you are using template engine, without it css and javascripts
                                                              // files will not load duo to MIME type error
app.get("/", (req, res) =>{
    res.render("index", {
        title: "Weather App",
        name: "Ahmad Khaled"
    });
});

app.get("/about", (req, res) =>{
    res.render("about", {
        title: "Created by Ahmad Khaled ",
        name: "Ahmad Khaled"
    });
});

app.get("/help", (req, res) =>{
    res.render("help", {
        title: "Search a location for info about its weather.",
        name: "Ahmad Khaled"
    });
});

app.get("/title", (req, res) =>{
    res.render("title", {
        title: "Weather App",
        body: "Checking the wather never has been any easier!",
        name: "Ahmad Khaled"
    });
});

app.get("/weather", (req, res) =>{
    const address = req.query.address;
    if(!address){
        res.send({
            error: "You must provide and address"
        });
        return;
    }
    geoCode(address, (error, coordObj) => {
        if(error){
            res.send({
                error
            });
            return;
        }
        forecast(coordObj.latitude, coordObj.longitude, (error, tempObj) => {
            if(error){
                res.send({
                    error
                });
                return;
            }
            res.send({
                temp: tempObj.temp,
                description: tempObj.description,
                address: coordObj.location
                //name: "Ahmad Khaled"
            });
        });
    });
});


// Error handling
app.get("/help/*", (req, res) =>{
    res.render("error", {
        title: "404 Not Found! help does't have this directory"
    });
});

app.get("/*", (req, res) =>{
    res.render("error", {
        title: "404 Not Found!"
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
