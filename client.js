const grpc = require("grpc");
// Build nodejs schema aka compiler 
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];
const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure());
const readline_sync = require('readline-sync');

function update(x_o, location) {
      client.updateStatus({
            "chessKind": x_o,
            "location": location
      }, (err, res) => {
            console.log("Recieved from server, method createTodo " + JSON.stringify(res));
      })
}


function joinGameRequest(chessKind, id, compeletion) {

      const newPlayer = {
            "chessKind": chessKind,
            "id": id
      }

      client.joinGame({
            "chessKind": chessKind,
            "id": id
      }, (err, res) => {
            // console.log(res.description)
            // console.log(res);
            compeletion(res);
      });

}
joinGameRequest("O", "2", (data) => {});
console.log("Chon 1 ki tu va an enter de bat dau.");


const runAsync = () => {
      let x = readline_sync.question("What location of O (r: to refresh the board): ");
      client.setLocation({
            "location":`${x}`,
            "chessKind":"O"
      },(err,res)=>{
            client.getBoard({}, (err, res) => {
                  console.log(res.board);
            });
      });

      
      console.clear();
      setTimeout(() => {
            let v = runAsync();
      }, 1000)
}

runAsync();


