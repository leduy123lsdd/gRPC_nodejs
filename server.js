const grpc = require("grpc");
// Build nodejs schema aka compiler 
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());
server.addService(todoPackage.Todo.service, {
      "joinGame": joinGame,
      "getBoard": getBoard,
      "setLocation": setLocation
});

server.start();

const amountOfPlay = [];
function joinGame(call, callback) {
      console.clear();

      var exited = false;
      var i = 0;
      for (i = 0; i < amountOfPlay.length; i++) {
            if (amountOfPlay[i].id == call.request.id) {
                  exited = true;
                  console.log("\nUser id exited !!!\n");
            }
      }
      if (exited == false) {
            const newPlayer = {
                  "chessKind": call.request.chessKind,
                  "id": call.request.id
            }
            amountOfPlay.push(newPlayer);
      }



      if (amountOfPlay.length == 2) {
            callback(null, {
                  "description": "Start the game now.",
                  "gameStatus": "playing"
            })
      } else {
            callback(null, {
                  "description": "You had join the game, wait for another people",
                  "gameStatus": "stoping"
            })


      }
      amountOfPlay.forEach(a => {
            console.log(a);
      })
}

var a = " "
var b = " "
var c = " "
var d = " "
var e = " "
var f = " "
var g = " "
var h = " "
var k = " "



function getBoard(call, callback) {
      callback(null, {
            "board": `\n|${a}|${b}|${c}|\n|${d}|${e}|${f}|\n|${g}|${h}|${k}|\n`
      });
}

function setLocation(call, callback) {
      let location = call.request.location;
      let kind = call.request.chessKind

      console.log(location);
      console.log(kind);
      switch (location) {
            case "1":
                  a = call.request.chessKind;
                  break;
            case "2":
                  b = call.request.chessKind;
                  break;
            case "3":
                  c = call.request.chessKind;
                  break;
            case "4":
                  d = call.request.chessKind;
                  break;
            case "5":
                  e = call.request.chessKind;
                  break;
            case "6":
                  f = call.request.chessKind;
                  break;
            case "7":
                  g = call.request.chessKind;
                  break;
            case "8":
                  h = call.request.chessKind;
                  break;
            case "9":
                  k = call.request.chessKind;
                  break;
            case "n":
                  a = " "
                  b = " "
                  c = " "
                  d = " "
                  e = " "
                  f = " "
                  g = " "
                  h = " "
                  k = " "
                  break;
      }
      callback(null, {
            "status": `\n|${a}|${b}|${c}|\n|${d}|${e}|${f}|\n|${g}|${h}|${k}|\n`
      })
}