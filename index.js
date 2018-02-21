var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var port=process.env.PORT||3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/dist'));

app.get('/',function(req,res){
	res.sendFile(__dirname+'/dist/index.html');
});

app.listen(port,function(err){
	if(err){
		console.log('Error in starting server: '+err);
	}else{
		console.log('Server successfully started on port: '+port);
	}
});
