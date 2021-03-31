const grpc = require("grpc");
// Build nodejs schema aka compiler 
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];
const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure());

// const call = client.readTodosStream();
const readline_sync = require('readline-sync');




function joinGameRequest(chessKind, id, compeletion) {
      const newPlayer = {
            "chessKind": chessKind,
            "id": id
      }

      client.joinGame({
            "chessKind": chessKind,
            "id": id
      }, (err, res) => {
            compeletion(res);
      });

}
joinGameRequest("X", "1", (data) => {});
console.log("Chon 1 ki tu va an enter de bat dau.");


const runAsync = () => {
      let x = readline_sync.question("What location of X (r: to refresh the board): ");
      client.setLocation({
            "location":`${x}`,
            "chessKind":"X"
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


