/*
  Todo: Make multiple roles
  2 controllers, for instance
*/
var net = require("net"),
i,
fSplit,
roles = {},
localIP = "192.168.1.119"; //make this whatever your computer's local network IP address is


//THIS IS SPARTA!!!!!
var server = net.createServer(function (stream) {
  //set encoding
  stream.setEncoding("utf8");

  //on connect
  stream.on("connect", function () {
    console.log("Connnection Established. Please use !identify:role to set your role");
  });
  /*

    MESSAGING

  //Identify Role of Streams
    !identify:sensor
    !identify:simulation
    !identify:controller

  //message a role with roleName^method|argument(s)...
    simulation^setPointHere
    simulation^changeCamera|camera
    simulation^doWhatever|arg1|arg2

  //sensor skeleton -> simulation data
    simulation^skeleton|<xml>...</xml>

  */
  stream.on("data", function (data) {

    //IDENTIFY
    //check if the first character is an !
    if(data.charAt(0) === "!"){
      //set role
      var r = data.split("identify:")[1];
      roles[r] = stream;
      console.log('Identified roles[' + r + ']');
      return;
    }

    //PRIVATE MESSAGING
    if(data.indexOf("^") === -1){
      //if it doesn't follw the socket format
      return;
    }

    //seperate it into "who gets it", and the message
    fSplit = data.split("^");

    //if "who gets it" isn't undefined, send it to that socket
    if(roles[fSplit[0]] !== undefined){
      console.log("Sending to roles[" + fSplit[0] +"] data [" + fSplit[1] +"]");

      //use SocketIO?
      if(roles[fSplit[0]].hasOwnProperty('io')){
         roles[fSplit[0]].socket.emit('write', fSplit[1]);
      }else{
        //Naw biatch!
        roles[fSplit[0]].write(fSplit[1]);
      }
    }
  });

  //When disconnecting
  stream.on("end", function () {
    stream.end();

    //remove identity;
    for(i in roles){
    	if(roles[i] == stream){
    		roles[i] = undefined;
        console.log('Removed roles[' + i + '] Goodbye :_(');
    	}
    }

  });
});

console.log("Server's running on "+localIP+":8080");
server.listen(8080);



//SocketIO portion
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    path = require('path');

io.set('log level', 0);

app.listen(8888);
console.log("Socket.io on "+localIP+":8888"); // edit this ip address so your other roles know where to connect

function handler (req, res) {

  var filePath = req.url;

  if (filePath == '/') {
    filePath = __dirname + '/front/index.html';
  }else{
    filePath = __dirname + filePath;
  }

  var extname = path.extname(filePath).substr(1);

  var contentTypesByExtention = {
    'html': 'text/html',
    'js':   'text/javascript',
    'css':  'text/css'
  };
  var contentType = contentTypesByExtention[extname] || 'text/html';

  fs.exists(filePath, function(exists) {

    if (exists) {
        fs.readFile(filePath, function(error, content) {
            if (error) {
                res.writeHead(500);
                res.end();
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
  });
}



io.sockets.on('connection', function (socket) {
  //confirm connection
  socket.emit('connected', {val:true});

  //prep for disconnect
  socket.on('disconnect', function () {
    //remove identity;
    for(i in roles){
      if(roles[i] && roles[i].hasOwnProperty("io")){
        if(roles[i].socket === socket){
          roles[i] = undefined;
          console.log('Removed roles[' + i + '] "Goodbye"');
        }
      }
    }
  });

  //process identity
  socket.on('!identify', function (role) {
    roles[role] = {socket:socket, io:true};
    console.log('Identified roles[' + role + ']');
    socket.emit('write', "connected|Welcome");
    return;
  });
  //process write
  socket.on('write', function (data){
     //seperate it into "who gets it", and the message
    fSplit = data.split("^");

    //if "who gets it" isn't undefined, send it to that socket
    if(roles[fSplit[0]] !== undefined){
      console.log("Sending to roles[" + fSplit[0] +"] data [" + fSplit[1] +"]");

      //use SocketIO?
      if(roles[fSplit[0]].hasOwnProperty('io')){
         roles[fSplit[0]].socket.emit('write', fSplit[1]);
      }else{
        //Naw biatch!
        roles[fSplit[0]].write(fSplit[1] + "");
      }
    }
  });
});

var stdin = process.openStdin();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

var loggedin = false;
var password = "admin";

var abilities = {
  runMe: function (){
    console.log("Internal method for controlling the server");
  },
  showUsers: function(){
    //show all connected users
    console.log(roles);
  }
}
// on any data into stdin
//log in with .login ninja
stdin.on( 'data', function( key ){
  key = key.replace(/(\r\n|\n|\r)/gm,"");
  console.log(">" + key +"<");
  if(!loggedin){
      if(key.indexOf(".login") !== -1){
        var pass = key.split(" ")[1];
        if(pass === password){
          loggedin = true;
          console.log("you are logged in. for a list of commands type .abilities");
        }else{
         console.log("password not recognized");
        }
        return;
      }
   console.log("You are not logged in");
  }else{
    if(key.charAt(0) != "."){
      if(abilities.hasOwnProperty(key)){
        abilities[key]();
      } else {
       console.log("command not found. ask an admin");
      }
      return;
    }
    //
    if(key.indexOf(".abilities") !== -1){
      console.log("list of abilities");
      for(var i in abilities){
        console.log(i);
      }
      return;
    }
  }
});
