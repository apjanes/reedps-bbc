var chai = require('chai');
var mocha = require('mocha');
var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;
var scorer = require('../lib/scorer');

describe('scorer.score', function() {
  it('should be 0 when there is no input', function() {
    var expected = 0;
    expect(scorer.score()).to.equal(expected);
  })

  it('should be 0 for a miss (-)', function() {
    var line = '-';
    var expected = 0;
    expect(scorer.score(line)).to.equal(expected);
  })

  it('should simply add scores when there are no strikes or spares', function() {
    var line = '112233445566778899--';
    var expected = 1 + 1 + 2 + 2 + 3 + 3 + 4 + 4 + 5 + 5 + 6 + 6 + 7 + 7 + 8 + 8 + 9 + 9 + 0 + 0;
    expect(scorer.score(line)).to.equal(expected);
  })

  it('should add the next roll to the score when a spare is rolled', function() {
    var line = '12/456789-';
    var expected = 1 + 10+4 + 4 + 5 + 6 + 7 + 8 + 9 + 0;
    expect(scorer.score(line)).to.equal(expected);
  })

  it('should add the next two rolls to the score when a stike is rolled', function() {
    var line = '1122X445566778899--';
    var expected = 1 + 1 + 2 + 2 + 10+4+4 + 4 + 4 + 5 + 5 + 6 + 6 + 7 + 7 + 8 + 8 + 9 + 9 + 0 + 0;
    expect(scorer.score(line)).to.equal(expected);
  })

  it('should calculate 10 pairs of 9 and miss as 90', function() {
    var line = '9­9­9­9­9­9­9­9­9­9­';
    var expected = 9 + 0 + 9 + 0 + 9 + 0 + 9 + 0  + 9 + 0 + 9 + 0 + 9 + 0 + 9 + 0 + 9 + 0 + 9 + 0;
    expect(scorer.score(line)).to.equal(expected);
  })

  it('should calculate 10 pairs of 5 and spare as 150', function() {
    var line = '5/5/5/5/5/5/5/5/5/5/5';
    var expected =
      10+5 + 10+5 + 10+5 + 10+5 + 10+5 +
      10+5 + 10+5 + 10+5 + 10+5 + 10+5
    expect(scorer.score(line)).to.equal(expected);
  })

  it('should calculate 12 stikes as a score of 300', function() {
    var line = 'XXXXXXXXXXXX';
    var expected =
      10+10+10 + 10+10+10 + 10+10+10 + 10+10+10 + 10+10+10 +
      10+10+10 + 10+10+10 + 10+10+10 + 10+10+10 + 10+10+10;

    expect(scorer.score(line)).to.equal(expected);
  })
})