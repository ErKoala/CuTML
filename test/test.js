var expect  = require('expect.js')
  , cheerio = require('cheerio')
  , CuTML   = require('../');

describe('#CuTML', function() {
  it('should generate a string', function() {
    var fin = CuTML('<a>Ehi, I love ya!</a>', {maxSize: 5, reminder: '...'});
    expect(fin).to.be.a('string');
  });

  it('should cut the string inside the tags', function() {
    var str = '<img src="http://www.sample.it/durr.png" /><a>Ehi, I love ya!</a><span>yess</span>';
    var fin = CuTML(str, {maxSize: 10, reminder: '...'});
    $ = cheerio.load(fin);
    expect($('a').text()).to.have.length(10);
  });

  it('should leave the string equal', function() {
    var str = '<a>Ehi, I love ya!</a>';
    var fin = CuTML(str, {maxSize: 10, reminder: '...', saveTags: ['a']});
    expect(fin).to.equal(str);
  });

  it('should catch an error', function() {
    var str = '<span>Ehi, I love ya!</div>';
    var err = new Error('HTML error.');
    var fin = function() { CuTML(str, {maxSize: 50, reminder: '...'}) };
    expect(fin).to.throwError();
  });
});