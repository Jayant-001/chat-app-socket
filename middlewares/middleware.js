const fs = require("fs");

function logRequest(filename) {
    return (req, res, next) => {
        const data =
            req.url + " - " + req.method + " - " + new Date().toString() + "\n";
        fs.appendFile(filename, data, (err, data) => {
            if (err) return res.send(err);
            else next();
        });
    };
}

module.exports = { logRequest };
