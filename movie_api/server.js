// server.js

// Import modules
const http = require("http"); // Handles requests/responses
const fs = require("fs");     // Reads/writes files
const url = require("url");   // Parses request URLs

// Create server
http.createServer((request, response) => {
  let addr = request.url;                      // Get requested URL
  let q = new URL(addr, "http://localhost:8080"); // Parse full URL

  // Log request to log.txt
  fs.appendFile(
    "log.txt",
    `URL: ${addr}\nTimestamp: ${new Date()}\n\n`,
    (err) => {
      if (err) console.log(err);
      else console.log("Added to log.");
    }
  );

  // Decide which file to serve
  let filePath = "index.html";                 // Default file
  if (q.pathname.includes("documentation")) {
    filePath = "documentation.html";           // If URL contains "documentation"
  }

  // Read and return the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Internal Server Error");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    }
  });

}).listen(8080);

console.log("Server running at http://localhost:8080/");
