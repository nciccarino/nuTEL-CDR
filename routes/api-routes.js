//Requiring models directory, our passport configuration, and imdb-api package
var db = require('../models');
var passport = require("../config/passport");
// Sequelize = require('sequelize'); 

module.exports= function(app){


//PASSPORT ROUTES
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/home");
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {

      console.log("ERROR: " + err)
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get('/api/reports', function(req, res){
    db.Report.findAll({}).then(function(data){
      console.log(data);
      res.json(data);
    })
  });

  app.post("/api/reports", function(req, res) {
    console.log(req.body);

    db.Report.create({
      title: req.body.title,
      client: req.body.client,
      date: req.body.date,
      notes: req.body.notes,
      table: req.body.table,
      category: req.body.category
      
    }).then(function(data) {
      res.json(data);
    }).catch(function(err){
      console.log(err);
    });
  }); 

  app.put("/api/reports/title", function(req, res){

    db.Report.update({
      title: req.body.title
    },
      {
        where: {
          id: req.body.id
        }
      }).then(function(data){
        res.json(data);
      })
  });

  app.put("/api/reports/client", function(req, res){

    db.Report.update({
      client: req.body.client
    },
      {
        where: {
          id: req.body.id
        }
      }).then(function(data){
        res.json(data);
      })
  });

  app.put("/api/reports/date", function(req, res){

    db.Report.update({
      date: req.body.date
    },
      {
        where: {
          id: req.body.id
        }
      }).then(function(data){
        res.json(data);
      })
  });

  app.put("/api/reports/notes", function(req, res){

    db.Report.update({
      notes: req.body.notes
    },
      {
        where: {
          id: req.body.id
        }
      }).then(function(data){
        res.json(data);
      })
  });

  app.put("/api/reports/category", function(req, res){

    db.Report.update({
      category: req.body.category
    },
      {
        where: {
          id: req.body.id
        }
      }).then(function(data){
        res.json(data);
      })
  });

  app.delete("/api/reports/delete", function(req, res) {
    console.log("handle delete hit")

    db.Report.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(data) {
      res.json(data); 
    });
  });

  app.get("/info/:table", function(req, res) {
    db.sequelize.query("SELECT * FROM " + req.params.table, function(err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        var obj = doc; 

        res.json(obj)
      }
    })
  })
}//end module.exports