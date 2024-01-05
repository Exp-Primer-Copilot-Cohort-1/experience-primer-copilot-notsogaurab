// Create web servervar express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var PORT = 3001;

// Set up CORS
app.use(cors());

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up static files
app.use(express.static('public'));

// Set up routes
app.get('/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/comments', function(req, res) {
  var newComment = req.body;
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var comments = JSON.parse(data);
      comments.push(newComment);
      fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
          console.log(err);
        } else {
          res.json(comments);
        }
      });
    }
  });
});

app.delete('/comments/:id', function(req, res) {
  var id = req.params.id;
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var comments = JSON.parse(data);
      comments = comments.filter(function(comment) {
        return comment.id !== id;
      });
      fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
          console.log(err);
        } else {
          res.json(comments);
        }
      });
    }
  });
});

// Start server
app.listen(PORT, function() {
  console.log('Server listening on port ' + PORT);
});