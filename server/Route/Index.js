const auth = require("./Auth");
const analysis = require('./Analysis');
const LogicalAnalysis = require('./LogicalAnalysis');
const Payment = require('./Payment');

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.send(`<h1>Hey Developer!!!</h1>`)
    });
    app.use("/api/auth", auth);
    app.use("/api/data",analysis);
    app.use("/api/logical",LogicalAnalysis);
    app.use("/api/pay",Payment);
}; 