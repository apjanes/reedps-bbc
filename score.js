var scorer = require('./lib/scorer');
var score = scorer.score(process.argv[2]);
console.log('Your score is: ' + score);
