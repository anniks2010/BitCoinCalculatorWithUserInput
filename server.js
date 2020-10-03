const express =require('express');
const ejs=require('ejs');
const bodyParser = require('body-parser');
const axios=require('axios');
const app=express();


app.set('view engine',ejs);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/", function(req, res){
    res.render('index.ejs', { currency : "" , number: "", code: ""});
 });

 app.post('/',(req, res)=>{
    let url=`https://api.coindesk.com/v1/bpi/currentprice/eur.json`;
    let currency=req.body.currency;
    let number =req.body.number;
    axios.get(url).
    then(function(response){
        console.log(response.data);
        let rate;
        let code;
        let calculations;
        if(currency==='EUR'){
            rate = response.data.bpi.EUR.rate_float;
            code=response.data.bpi.EUR.code;
            calculations = (rate * number).toFixed(2);
            
        }
        else{
            rate=response.data.bpi.USD.rate_float;
            code=response.data.bpi.USD.code;
            calculations = (rate * number).toFixed(2);
            
        }
        res.render('index.ejs',{currency: calculations,
        code: code});
        
    }).
    catch(function(error){
        console.log(error);
        
    });      
        

});

/*app.listen(3000, ()=>{
    console.log('Server is running on Port 3000');
    });*/

    app.listen(process.env.PORT || 3000, function(){
        console.log("Server has started.");
    });
    