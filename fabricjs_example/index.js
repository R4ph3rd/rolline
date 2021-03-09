const express = require("express");
const app = express();
const http = require("http").createServer(app)
const {join} = require("path");

const port = 3010;

app.use(express.static(join(__dirname,'public')));

http.listen(port, () => {
	console.log("App started on http://localhost:" + port);
});
