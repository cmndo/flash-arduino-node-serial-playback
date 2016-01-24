/*
	Used globally
*/
var ip = require('ip').address();
var socket_port = 8080;
var server_port = 8124;

/*
	Socket Server for Flash (NO SOCKET IO)
*/
var net = require('net');
var i;
var fSplit;
var roles = {};

/*
	Flash Policy File
*/

var poli = '<?xml version="1.0"?>\n<!DOCTYPE cross-domain-policy SYSTEM \n"http://www.adobe.com/xml/dtds/cross-domain-policy.dtd">\n<cross-domain-policy>\n';
poli += '<site-control permitted-cross-domain-policies="master-only"/>\n';
poli += '<allow-access-from domain="*" to-ports="*"/>\n';
poli += '</cross-domain-policy>\n';

/*
	Socket Server

	MESSAGING

  //Identify Role of Streams
	!identify:presentation
	!identify:remote

  //message a role with roleName^method|argument(s)...
	presentation^forward
	presentation^backward|fast
	presentation^backward|arg1|arg2
*/
var server = net.createServer(function(stream) {
	//set encoding
	stream.setEncoding('utf8');

	//on connect
	stream.on('connect', function() {
		console.log('Connnection Established. Please use !identify:role to set your role');
	});

	/*
	Flash sends a '<policy-file-request/>\0' request when it wants to know what
	is acceptable. It expects to get back the xml content of the policy file.
  */
	stream.on('data', function(data) {
		if (data == '<policy-file-request/>\0') {
			stream.end(poli + '\0');
		} else {
			//IDENTIFY
			//check if the first character is an !
			if (data.charAt(0) === '!') {
				//set role
				var r = data.split('identify:')[1];
				roles[r] = stream;
				console.log('Identified roles[' + r + ']');
				return;
			}

			//PRIVATE MESSAGING
			if (data.indexOf('^') === -1) {
				//if it doesn't follw the socket format
				return;
			}

			//seperate it into "who gets it", and the message
			fSplit = data.split('^');

			//if "who gets it" isn't undefined, send it to that socket
			if (roles[fSplit[0]] !== undefined) {
				console.log('Sending to roles[' + fSplit[0] + '] data [' + fSplit[1] + ']');

				//use SocketIO?
				if (roles[fSplit[0]].hasOwnProperty('io')) {
					roles[fSplit[0]].socket.emit('write', fSplit[1]);
				} else {
					//Naw biatch!
					roles[fSplit[0]].write(fSplit[1]);
				}
			}
		}

	});

	//When disconnecting
	stream.on('end', function() {
		stream.end();

		//remove identity;
		for (i in roles) {
			if (roles[i] == stream) {
				roles[i] = undefined;
				console.log('Removed roles[' + i + '] Goodbye :_(');
			}
		}

	});
});

server.listen(socket_port);
console.log('FANS Socket server online. (' + ip + ':' + socket_port + ')');




/*
	Express Web Server
*/
var express = require('express');
var exphbs = require('express-handlebars');
var spawn = require('child_process').spawn;
var app = express();

app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('home', {
		ip: ip,
		port: socket_port,
		serverPort: server_port
	});
});

app.listen(server_port, function() {
	console.log('FANS Communication Server online. (' + ip + ':' + server_port + ')');
	console.log('Launching browser.');
	spawn('open', ['http://' + ip + ':' + server_port + '/']);
});

/*
	Arduino Serial Communiction
*/
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

//connect to port
var portName = process.argv[2];
var myPort;

if (portName === undefined) {
	// list serial ports:
	serialport.list(function(err, ports) {
		console.log('    COMM Port Scan - Quit server and run again $ node host /dev/modemxxx');
		ports.forEach(function(port) {
			console.log('        ' + port.comName);
		});
	});

} else {
	serialConnect();
}

function serialConnect() {
	myPort = new SerialPort(portName, {
		baudRate: 9600,
		parser: serialport.parsers.readline('\n')
	});
	myPort.on('open', showPortOpen);
	myPort.on('data', sendSerialData);
	myPort.on('close', showPortClose);
	myPort.on('error', showError);
}

/*
	Serial Communication Callbacks
*/
function sendSerialData(data) {
	console.log('Serial data received');
	/*
			Split at ^ and check which button is being pressed
	*/
	var button = data.split('^')[1];
	if (button === '1') {
		//run command associated with button 1
		console.log('button 1 pressed');
		roles.presentation.write('forward');
	} else if (button === '2') {
		//run command associated with button 2
		console.log('button 2 pressed');
		roles.presentation.write('backward');
	}
}

//the other stuff
function showPortOpen() {
	console.log('port open. Data rate: ' + myPort.options.baudRate);
}

function showPortClose() {
	console.log('port closed.');
}

function showError(error) {
	console.log('Serial port error: ' + error);
}
