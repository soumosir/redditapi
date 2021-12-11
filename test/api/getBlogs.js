import chai from 'chai';
import request from 'supertest';
import app from '../../server.js';
import blog from '../config/getBlogsStructure.js';

const { expect } = chai;

// eslint-disable-next-line no-undef
describe('GET /api/blogs/home', () => {
  // eslint-disable-next-line no-undef
  it('OK. getting blogs work', (done) => {
    request(app)
      .get('/api/blogs/home')
      .then((res) => {
        const { body } = res;
        body.forEach((element) => {
          // eslint-disable-next-line no-restricted-syntax
          for (const key of Object.keys(blog)) {
            expect(element).to.contain.property(key);
          }
        });
        done();
      });
  });
});

// eslint-disable-next-line no-undef
describe('GET /api/blogs/hom', () => {
  // eslint-disable-next-line no-undef
  it('OK. Blogs with non-existing subreddit work', (done) => {
    request(app)
      .get('/api/blogs/hom')
      .then((res) => {
        const { body } = res;
        expect(body).to.contain.property('msg');
        done();
      });
  });
});
// eslint-disable-next-line no-undef
describe('GET /api/blogs/hombjhwbh', () => {
  // eslint-disable-next-line no-undef
  it('OK. Blogs with non-existing subreddit work', (done) => {
    request(app)
      .get('/api/blogs/hom')
      .then((res) => {
        const { body } = res;
        expect(body).to.contain.property('msg');
        done();
      });
  });
});
