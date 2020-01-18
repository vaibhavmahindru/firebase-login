const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var admin = require("firebase-admin");

var serviceAccount = require("./form-a26fd-firebase-adminsdk-2rgi7-0fb0e48abe.json");

app.use(bodyParser.urlencoded({extended:true}));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://form-a26fd.firebaseio.com"
});

var db = admin.database();

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/form.html');
})
 


app.post('/signup', function (req, res) {

  db.ref('user').push().set({
    email: req.body.email,
    password: req.body.password,
  })
  res.send("user created");
})

app.get('/login', function(req,res,next){
   var user = admin.auth().currentUser;
  
  if (user) {
      next();
      window.location.replace("loggedin.html");
  } else {
      res.send("invalid");
  }

})

app.get('/logout', function(req, res){
  admin.User.logOut().then(() => {
   var currentUser = admin.User.current(); 
   });
       res.redirect('/login');
  });
app.listen(3000)