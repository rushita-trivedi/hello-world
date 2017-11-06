/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express=require('express');
app=express();
var fs=require('fs');
var bodyParser=require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

var user={
        "user4" : {
            "name" : "mahesh",
            "password" : "password4",
            "profession" : "teacher",
            "id": 4
        }
    };

app.post('/addUsers',function(request,response){
    
    var user={
        "user4" : {
            "name" : "mahesh",
            "password" : "password4",
            "profession" : "teacher",
            "id": 4
        }
    };
    
    var newdata=JSON.stringify(user);
    fs.writeFile('users.json',newdata,function(err,data){
        console.log(newdata);
       if(err){
           return response.status(500).send("There is a problem");
       }
       else{
           return response.status(200).send(user);
       }
    });

});

app.put('/updateUsers',function(request,response){
    console.log(request.body.id);
    var user={
        "userid" : {
            "name" : "mahesh",
            "password" : "password4",
            "profession" : "teacher",
            "id": 4
        }
    };
    var userid=request.body.id;
    
    
    fs.writeFile('users.json',userid,function(err,data){
        if(err){
            return response.status(500).send("Sorry! We can not update.");
        }
        else{
            return response.status(200).send(userid);
        }
    });
    
});


app.delete('/deleteUsers',function(request,response){
    fs.readFile('users.json',function(err,data){
        var users=JSON.parse(data);
        var userid=request.body.id;
        delete users[userid];
    
    
        var newdata=JSON.stringify(user);
        fs.writeFile('users.json',newdata,function(err,data){
        console.log(newdata);
        if(err){
           return response.status(500).send("There is a problem");
        }
        else{
           return response.status(200).send(user);
        }
    });   
    });
});

app.get('/listUsers',function(request,response){
    fs.readFile('users.json',function(err,data){
        console.log(data);
        response.json(JSON.parse(data));
    });
});

app.listen(8081);
