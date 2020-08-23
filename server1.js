var express = require('express');
var app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');

const sqlite3 = require('sqlite3');


let db = new sqlite3.Database('./resturaurant', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else
        console.log('connected to the resturaurant database');
});


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.get('/menu1', (req, res) => {
    var sql = "SELECT * from menu";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        res.set('Context-Type', 'application/json');
        res.send(rows);

    });
});
app.post('/submitform',(req, res) =>{
    console.log(req.body);
    var sql = "INSERT INTO feedback(first_name , last_name ,email ,area_code ,number ,comment) VALUES (null,'" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.email + "'," + req.body.areacode + "," + req.body.phone + ",'" + req.body.comment + "')";
    db.query(sql, [], (err, result) => {
        if (err) {
            console.log(err.message);
        }
        // res.render('index', {
        //     title: 'data saved',
        //     message: 'data saved successfully'
        // })
    });
});


router.get('/about',function(req,res){
 res.sendFile(path.join(__dirname+'/aboutus.html'));
  // app.use(express.static(__dirname + '/aboutus.html'));
  });
router.get('/menu',function(req,res){
    res.sendFile(path.join(__dirname+'/menu.html'));
  });
  router.get('/contact',function(req,res){
    res.sendFile(path.join(__dirname+'/contactus.html'));
  });
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});
//add the router
app.use('/', router);
app.listen(process.env.port || 3000);
//app.listen(6200);
console.log("web server is running on localhost:3000/");