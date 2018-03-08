const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');


const expect = chai.expect;

chai.use(chaiHttp);

describe('Blog Posts', function() {
	
	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	//test for GET endpoint
	it('should list blog posts on GET', function() {
		return chai.request(app)
			.get('/blog-posts')
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				//expect(res).to.be.a(array);

				expect(res.body.length).to.be.at.least(1);

				const expectedKeys = ['title', 'content', 'author'];
				res.body.forEach(function(item) {
					expect(item).to.be.a('object');
					expect(item).to.include.keys(expectedKeys);
				});
			});
	});

	//test for POST endpoint
	it('should create new blog post on POST', function() {
		const newItem = {
			title: 'Test Book', 
			content:'description for test book', 
			author:'Testy McTester',
		};
		const expectedKeys = ['id', 'publishDate'].concat(Object.keys(newItem));

		return chai.request(app)
			.post('/blog-posts')
			.send(newItem)
			.then(function(res) {
				expect(res).to.have.status(201);
				expect(res).to.be.json;
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.all.keys(expectedKeys);
		        expect(res.body.title).to.equal(newItem.title);
		        expect(res.body.content).to.equal(newItem.content);
		        expect(res.body.author).to.equal(newItem.author)
			});
	});

	//test for PUT endpoint
	it('should update blog post on PUT', function() {
		const updateData = {
		title: 'What is a blog post',
		content: 'this post will describe what a book is',
		author: 'Mo Salah'
		};
		return chai.request(app)
		.get('/blog-posts')
		  .then(function(res) {
		    updateData.id = res.body[0].id;
		    return chai.request(app)
		      .put(`/blog-posts/${updateData.id}`)
		      .send(updateData);
		  })
		  .then(function(res) {
		    expect(res).to.have.status(204);
		  });
	});

	//test for DELETE endpoint
	it('should delete blog post on DELETE', function() {
	  	return chai.request(app)
	      .get('/blog-posts')
	      .then(function(res) {
	        return chai.request(app)
	          .delete(`/blog-posts/${res.body[0].id}`);
	      })
	      .then(function(res) {
	        expect(res).to.have.status(204);
	      });
	});
});