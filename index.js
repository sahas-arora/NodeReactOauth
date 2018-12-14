let express = require("express");
let app = express();
const PORT = process.env.PORT || 5000; //environment variables.

app.get("/", (request, response) => {
  response.send({ hello: "there" });
});

app.listen(PORT);
console.log("Your application is running on port number:", PORT);
