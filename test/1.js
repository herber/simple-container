require("http").Server((req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("HI!!!");
}).listen(process.env.port);
