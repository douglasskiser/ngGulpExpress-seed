'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/features', function() {
	it('should respond with a JSON array', function(cb) {
		request(app)
			.get('/api/features')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				if (err) return cb(err);
				res.body.should.be.instanceOf(Array);
				cb();
			});
	});
});