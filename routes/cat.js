
// routes for users
var Cat = require('../models/cat')

// listing all the users
exports.list = function(req, res){
  // get the list of users
  var cats = Cat.find({}).sort('-age').exec(function (err, docs) {
    if (err)
      return console.log("error", cats);
    // send it back
    res.render('cats', {cats: docs, title: "Amanda's cat app"});
  });
};

// creating a new user
exports.create = function(req, res){
  // create the user
  var names = new Array("MARY","PATRICIA","LINDA","BARBARA","ELIZABETH","JENNIFER","MARIA","SUSAN","MARGARET","DOROTHY","LISA","NANCY","KAREN","BETTY","HELEN","SANDRA","DONNA","CAROL","RUTH","SHARON","MICHELLE");
  var colored = new Array ("RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "INDIGO", "VIOLET");
  var first = new Cat({ name: names[Math.floor(Math.random()*20)], age: Math.floor(Math.random()*100)+1, color: colored[Math.floor(Math.random()*7)]});
  first.save(function (err) {
    if (err)
      return console.log("error we couldn't save bobby");
    // redirect to the list of users
    res.redirect('/cats');

  });
};

//delete a cat
exports.delete = function(req, res){
  var cats = Cat.find({}).sort('-age').exec(function (err,docs) {
    if (err)
      return console.log("UH OH");
    
    docs[0].remove();
    res.redirect('/cats');
    
  })
};

//find cats of a certain color
exports.color = function(req, res){
  var c = req.params.color;
  var cats = Cat.find({'color':c }).exec(function (err,docs) {
    if (err)
      return console.log("No cats of the color");
    
    res.render('cats', {cats: docs, title: 'Cat colors'});
  })
};






