const express = require('express')
const request = require('request')
const bodyparser = require('body-parser')


const app = express();
const apikey = '9fc4a122d07fe8a3d526609899d9e144'

app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs')

app.get('/',(req,res) =>{
  res.render('index',{weather:null,error:null});
})

app.post('/',(req,res) =>{
  let city = req.body.city;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
  request(url,(err,response,body) => {
    if(err){
      res.render('index',{weather:null,error:"Error"});
    }else{
      let weather = JSON.parse(body);
      console.log(weather)
      if(weather.main == undefined){
       res.render('index',{weather:null,error:"Error Please Recheck And Try Again"});
      }else{
        let w = `Degrees: ${weather.main.temp} ${weather.weather[0].main} in ${weather.name}`
        res.render('index',{weather:w,error:null});
      }
    }
  })  
})

app.listen(8000,() => {
  console.log("server running on 8000");
})
