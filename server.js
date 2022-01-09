const http = require("http");
const qs = require("querystring");

const server = http.createServer((request, response) => {
  const chunks = [];
  request.on("data", (chunk) => {
    chunks.push(chunk);
  });
  request.on("end", () => {
    console.log("all parts/chunks have arrived");
    const data = Buffer.concat(chunks);
    console.log("Data: ", data);
    const stringData = data.toString();
    console.log("stringData: ", stringData);
    const parsedData = qs.parse(stringData);
    console.log("parsedData: ", parsedData);
  });
});

server.listen(9000, () => {
  console.log("Server is running on Port 9000");
});
