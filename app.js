const express = require('express');
const fs = require('fs');

const app = express();

app.get('/mean', function(req, res, next) {
  let nums = req.query.nums.split(',');
  let total = 0;

  for (let num of nums) {
    total += parseInt(num);
  }

  let resultString = `The mean of ${req.query.nums} is ${total /
    nums.length}\n`;
  writeToTextFile(resultString);
  return res.send(resultString);
});

app.get('/median', function(req, res, next) {
  let nums = req.query.nums.split(',').map(Number);

  nums.sort((a, b) => a - b);

  let middle;
  let median;

  if (nums.length % 2 === 0 && nums.length > 2) {
    middle = nums.length / 2;
    let medianLower = Math.floor(middle);
    let medianHigher = medianLower + 1;
    median = (Number(nums[medianLower]) + Number(nums[medianHigher])) / 2;
  } else if (nums.length % 2 === 0 && nums.length === 2) {
    median = (nums[0] + nums[1]) / 2;
  } else {
    middle = Math.floor(nums.length / 2);
    median = nums[middle];
  }

  let resultString = `The median of ${req.query.nums} is ${median}\n`;
  writeToTextFile(resultString);
  return res.send(resultString);
});

app.get('/mode', function(req, res, next) {});

function writeToTextFile(data) {
  fs.appendFile('results.txt', data, function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('File written successfully.');
    }
  });
}

app.get('/results', function(req, res, next) {
  let result;
  try {
    result = fs.readFileSync('results.txt', 'utf8');
  } catch (error) {
    console.error(error);
  }
  return res.send(result);
});

app.listen(3000, () => console.log('App on port 3000'));
