const express = require("express");
const app = express();
const http = require("http").createServer(app)
const {join} = require("path");

app.use(express.static(join(__dirname,'public')));

http.listen(3000, () => {
	console.log("App started on http://localhost:3000");
});
