// Import required modules
const http = require("http"); // Handles HTTP requests and responses
const fs = require("fs");     // Reads and writes files
const url = require("url");   // Parses request URLs
require("dotenv").config();   // Loads environment variables from .env into process.env

// Get HOST and PORT values from environment variables
// Fallback to "localhost" and 8080 if not defined
const HOST = process.env.HOST || "localhost";  
const PORT = Number(process.env.PORT) || 8080; 

// Create and configure the HTTP server
http.createServer((request, response) => {
  let addr = request.url;                        // Get requested URL (e.g., "/documentation")
  let q = new URL(addr, `http://${HOST}:${PORT}`); // Build full URL including host and port

  // Log each request into log.txt with timestamp
  fs.appendFile(
    "log.txt",
    `URL: ${addr}\nTimestamp: ${new Date()}\n\n`,
    (err) => {
      if (err) console.log(err);
      else console.log("Added to log.");
    }
  );

  // Decide which file to serve based on URL
  let filePath = "index.html";                   // Default file
  if (q.pathname.includes("documentation")) {
    filePath = "documentation.html";             // Serve documentation page if URL contains "documentation"
  }

  // Read and return the file content
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" }); // Error response
      response.end("Internal Server Error");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });  // Success response
      response.end(data);                                         // Send HTML content to browser
    }
  });

}).listen(PORT, HOST); // Server listens on the chosen HOST and PORT

// Confirmation message in the console
console.log(`Server running at http://${HOST}:${PORT}/`);
