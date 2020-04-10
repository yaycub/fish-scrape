const Fish = require('../lib/models/Fish');

const makeTime = (timeString) => {
  const keyArray = timeString.replace(/\s+/g, '').split('-');
  const timeIndex = {
    '4AM': 4,
    '9AM': 9,
    '4PM': 16,
    '9PM': 21
  };

  if(timeString === 'All day') {
    return {
      start: 0,
      end: 24
    };
  } else {
    return {
      start: timeIndex[keyArray[0]],
      end: timeIndex[keyArray[1]]
    };
  }
};

const makeMonth = (monthString) => {
  const months = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'Aug': 8,
    'Sept': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
  };

  return months[monthString];
};

function makeFish(arr, name, seasonArr, location, rawTime, price) {
  if(seasonArr.length === 3){
    const tableRow = {
      name,
      season: {
        start: makeMonth(seasonArr[0]),
        end: makeMonth(seasonArr[2])
      },
      location,
      time: makeTime(rawTime), 
      price
    };

    arr.push(tableRow);
    Fish.create(tableRow);

  } else if(seasonArr.length === 2){
    const tableRow = {
      name,
      season: {
        start: 1,
        end: 12
      },
      location,
      time: makeTime(rawTime), 
      price
    };

    arr.push(tableRow);
    Fish.create(tableRow);

  } else if(seasonArr.length === 1){
    const tableRow = {
      name,
      season: {
        start: 9,
        end: 9
      },
      location,
      time: makeTime(rawTime), 
      price
    };

    arr.push(tableRow);
    Fish.create(tableRow);
  } else {
    const tableRowOne = {
      name,
      season: {
        start: makeMonth(seasonArr[0]),
        end: makeMonth(seasonArr[2])
      },
      location,
      time: makeTime(rawTime), 
      price
    };

    const tableRowTwo = {
      name,
      season: {
        start: makeMonth(seasonArr[3]),
        end: makeMonth(seasonArr[5])
      },
      location,
      time: makeTime(rawTime), 
      price
    };

    arr.push(tableRowOne);
    arr.push(tableRowTwo);
    Fish.create(tableRowOne);
    Fish.create(tableRowTwo);
  }
}

module.exports = makeFish;
