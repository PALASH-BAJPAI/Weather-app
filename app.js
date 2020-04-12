const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req, res){

	res.sendFile(__dirname+ "/index.html");
});






app.post("/", function(req,res){
	const query=req.body.cityName;

const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=730a353909016f48ec16128379b1c17d&units=metric";

https.get(url,function(response){

response.on("data",function(data){

const weatherData=JSON.parse(data);
const temp=weatherData.main.temp;
const icon=weatherData.weather[0].icon;
const name=weatherData.name;
const imgURL="https://openweathermap.org/img/wn/"+ icon+ "@2x.png";

res.write("<h1> weather in your city "+ query+ " is "+temp+ " degree celsius</h1>");
res.write("<img src="+ imgURL + ">");
res.send();
})
})
})



app.listen(3000,function(){
	console.log("server is running on port 3000");
})

