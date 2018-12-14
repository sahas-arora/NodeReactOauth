let express = require("express");
let app = express();
let PORT = 5000;

app.get("/", (request, response) => {
  response.send({ hello: "there" });
});

app.listen(PORT);
console.log("Your application is running on port number:", PORT);
