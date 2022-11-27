import http from 'node:http';

const form =`
  <h1>Contact form</h1>
  <form method="post" action="../page/contact.html">
    <label>Your Email:</label><br>
    <input type="email" name="email" required><br>
    <label>You message:</label><br>
    <input type="text" name="message" required></input><br>
    <input type="submit">
  </form>
`


const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.end(form);
  
  // custom body-parser for POST request starts
  // http request object is a readable stream,
  // i.e. data arrives in parts/chunks.

  let chunks = [];
  // 'data' event is emitted on every chunk received
  request.on("data", (chunk) => {
    // collecting the chunks in array
    chunks.push(chunk);
  });

  // when all chunks are received, 'end' event is emitted.
  request.on("end", () => {
    // joining all the chunks received
    const data = Buffer.concat(chunks);
    // data.toString() converts Buffer data to querystring format
    const querystring = data.toString();
    // URLSearchParams: takes querystring
    // & returns a URLSearchParams object instance.
    const parsedData = new URLSearchParams(querystring);
    const dataObj = {};
    // entries() method returns an iterator
    // allowing iteration through all key/value pairs
    for (var pair of parsedData.entries()) {
      dataObj[pair[0]] = pair[1];
    }
    // Now request data is accessible using dataObj
    console.log(dataObj); //Do what you want with your data (which is a JSON)
    response.end();
  });
  // custom body-parser for POST request ends
});

server.listen(9000, () => {
  console.log("Serveur is running at", "\x1b[36m","http://localhost:9000", "\x1b[0m");
});
