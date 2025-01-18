var http = require("http");
var formidable = require("formidable");

var errors = formidable.formidableErrors;

const server = http.createServer(async (req, res)=>{
    if (req.url === '/api/upload' && 
        req.method.toLowerCase() ==='post'
    ){
    //parsing file upload

    const form = new formidable.IncomingForm();
    let fields;
    let files;

    try {
        [fields, files] = await form.parse(req);
    } catch (err) {
        res.writeHead(err.httpCode || 400, {
            'Content-Type' : 'text/plain'
        });
        res.end(String(err));
        return;
    }
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({fields, files }, null, 2));
    return;
}
res.writeHead(200, {"content-type": "text/html"});
res.end(`
    <h2>With Node.js <code>"http"</code> module</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
    <div>Text field title: <input type="text" name="title" /></div>
    <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
    <input type="submit" value="Upload" />
    </form>
 `);
});

server.listen(5000, ()=>{
    console.log("Server listening on port 5000");
    
});