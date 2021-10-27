const express = require("express");
const bodyParser = require("body-parser");
const http = require('https');

const app = express();
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.post('/getweather', (req, res) => {
    let city = req.body.city.toString();
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=3777119a46a20889689700ac3cd6bff3';
    http.get(url, (response) => {
        response.on("data", (data) => {
            let result = JSON.parse(data);
            if (result.main) {
                res.render('view', {
                    name: result.name,
                    icon: "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png",
                    temp: result.main.temp,
                    temp_min: result.main.temp_min,
                    temp_max: result.main.temp_max,
                    desc: result.weather[0].description,
                    wind_speed: result.wind.speed,
                    humidity: result.main.humidity
                });
            } else {
                res.send(result.message);
            }
        })
    })
});





app.listen("5000", (err) => {
    if(err)conaole.log(err);
    console.log("Server is Up on 5000");
})