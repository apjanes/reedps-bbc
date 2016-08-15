function parseScore(roll) {
  switch(roll) {
    case '-':
      return 0;                   // no score for a miss
    case '/':
    case 'X':
      return 10;                  // ten for a strike or a spare
    default:
      var score = parseInt(roll); // parse the score from the roll
      if (isNaN(score)) return 0; // if for any reason the score does not parse, treat it as zero
      return score;
  }
}

function calculateBonus(rolls, index) {
  var roll = rolls[index];
  if(roll === '/') {
    // for a spare the bonus is the value of the next roll
    return parseScore(rolls[index + 1]);
  }

  if(roll === 'X') {
    // for a strike the bonus is the value of the next two rolls
    return parseScore(rolls[index + 1]) + parseScore(rolls[index + 2]);
  }
  return 0;
}

function calculateFrameCount(frameCount, frameRollIndex) {
  if (frameRollIndex > 0) {
    // if this is not the first roll so it is the end of the frame, increase the frame count by one.
    return frameCount + 1;
  }

  // otherwise do not increase the frame count.
  return frameCount;
}

function calculateFrameRollIndex(frameRollIndex, rolls, index) {
  if (frameRollIndex === 0 || rolls[index] === 'X') {
    // if this is the first roll of the frame or a strike has been rolled,
    // indicate that this is now the second roll (index 1);
    return 1;
  }

  // otherwise, consider this to be the first roll of the frame
  return 0;
}

function calculateScore(rolls, index) {
  if(rolls[index + 1] === '/')
    return 0; // treat as a 0 as the next roll will include the 10 point spare
  var roll = rolls[index];
  return parseScore(roll);
}

function score(rolls) {
  var frameCount = 0;
  var frameRollIndex = 0;
  var total = 0;
  if (rolls) {
    for (var index = 0; index < rolls.length; index++) {
      frameCount = calculateFrameCount(frameCount, frameRollIndex);
      frameRollIndex = calculateFrameRollIndex(frameRollIndex, rolls, index);

      if (frameCount === 10 && frameRollIndex == 1)
        // we have reached the last frame and have completed the last roll
        // of the frame, finish scoring
        break;

      var score = calculateScore(rolls, index, frameCount);
      var bonus = calculateBonus(rolls, index);
      total += score + bonus;
    }
  }
  return total;
}


module.exports = {
  score: score
};