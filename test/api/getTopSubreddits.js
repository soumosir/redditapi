// const expect = require('chai').expect;
// const request = require('supertest');
import chai from 'chai';
import request from 'supertest';
// const app = require('../../server.js');
import app from '../../server.js';

const { expect } = chai;

// eslint-disable-next-line no-undef
describe('GET /api/trendingSubreddits', () => {
  // eslint-disable-next-line no-undef
  it('OK. getting top trending Subreddits', (done) => {
    request(app)
      .get('/api/trendingSubreddits')
      .then((res) => {
        const { body } = res;
        body.forEach((element) => {
          expect(element).to.contain.property('title');
        });
        done();
      });
  });
});
