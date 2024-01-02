const express=request('express');
const path=require('path');
const app=express();
app.use(express.static(__dirname+'/dist/Angular-Miage'));
app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/Angular-Miage/index.html'));
}); 
app.listen(process.env.PORT || 8081);