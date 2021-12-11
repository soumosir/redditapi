import chai from 'chai';
import redditApi from '../../src/api/v1/helpers/redditApi.js';

const { expect } = chai;
// eslint-disable-next-line no-undef
describe('TEST function redditApi:search() error handling', () => {
  // eslint-disable-next-line no-undef
  it('OK. submitted with hom ; error handled gracefully', (done) => {
    redditApi
      .search('hom', 10, 'relevance')
      .then((results) => {
        results.forEach((element) => {
          expect(element).to.contain.property('msg');
          expect(element).to.contain.property('status');
          expect(element.status).to.deep.equal(404);
          expect(element).to.contain.property('err');
        });
      })
      .then(done, done);
  });
  // eslint-disable-next-line no-undef
  it('OK. submitted with homnvkrvhbrjv ; error handled gracefully', (done) => {
    redditApi
      .search('hombkvsjf', 100, 'relevance')
      .then((results) => {
        results.forEach((element) => {
          expect(element).to.contain.property('msg');
          expect(element).to.contain.property('status');
          expect(element.status).to.deep.equal(404);
          expect(element).to.contain.property('err');
        });
      })
      .then(done, done);
  });
});
