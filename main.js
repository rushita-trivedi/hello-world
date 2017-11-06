/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var http=require('http');
var url=require('url');
var cp=require('child_process');

function onRequest(request,response){
    var pathname=url.parse(request.url).pathname;
    if(pathname=='/wait'){
        cp.exec('node blocking.js',myCallback);
    }
    else{
        response.writehead(200,{'Content-Type':'text/plain'});
        response.write('hello\n');
        response.end();
    }
    
    console.log('new connection');
    
    function myCallback(){
        response.writehead(200,{'Content-Type':'text/plain'});
        response.write('Thanks for waiting');
        response.end();
    }
}
http.createServer(onRequest).listen(8080);
console.log('Server Started');
