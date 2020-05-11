const express= require('express');
const app = express()
const apiRoutes = require('./routes');
const path = require('path');

app.set('port', process.env.PORT || 3000)

app.use(express.json())

app.use(
    express.urlencoded({
      extended: false
    })
);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(express.static(path.join(__dirname, 'angular')))
app.use("/api", apiRoutes);
app.use("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'angular', 'index.html'));
})
app.listen(app.get('port'), () => {
    console.log("started server "+ app.get('port'));
});
  