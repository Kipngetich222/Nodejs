var express = require("express");
var app = express();
var fs= require("fs");

//to display content of corresponding user

app.get('/:id', function(req, res){
    fs.readFile(__dirname + "/" + "users.json", "utf8",
        function(err, data){
            var users = JSON.parse(data);
            var user = users["users" + req.params.id]
            res.end(JSON.stringify(user));
        }
    );
});

var server = app.listen(5000, function(){
    console.log("App running at port 5000");
    
})