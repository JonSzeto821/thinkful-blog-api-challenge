const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {blogPost} = require('./models');

//Dummy posts


//Create GET and POST requests for /blog-posts

  //GET request
router.get('/', (req, res) => {
  res.json(blogPost.get());
});

  //POST request
router.post('/', jsonParser, (req, res) => {
  //ensure 'title', 'content', 'author', 'pubDate (optional)' are in the request body
  const requireFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in Req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = blogPost.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});

//Create DELETE and PUT requests for /blog-posts/:id

  //DELETE request
router.delete('/:id', (req, res) => {
  blogPost.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.ID}\``);
  res.status(204).end();
});

  //PUT request
/*router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.log(message);
      return res.status(400).send(message);
    }
  }
    if (req.params.id !== req.body.id) {
      const message = (
        `Request path id (${req.params.id}) and request body id `
        `(${req.body.id}) must match`);
      console.error(message);
      return res.status(400).send(message);
    }


    console.log(`Updating bolg post id \`${req.params.id}\``);
    const updatedItem =blogPost.update({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    });
    res.status(204).end();

})*/


router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post id \`${req.params.id}\``);
  const updatedItem = blogPost.update({
  id: req.params.id,
  title: req.body.title,
  content: req.body.content,
  author: req.body.author
  });
  res.status(204).end();
})

module.exports = router;