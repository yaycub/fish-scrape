require('dotenv').config();
require('./lib/utils/connect')();
const request = require('request-promise');
const cheerio = require('cheerio');
const Fish = require('./lib/models/Fish');

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

async function main() {
  const result = await request.get('https://www.gamespot.com/articles/animal-crossing-new-horizons-fish-guide-how-to-cat/1100-6474887/');

  const $ = cheerio.load(result);

  const scrapedData = [];
  
  $('#default-content > div.primary-content.js-seamless-content__page.t-container > div > article > section.article-body.typography-format.typography-format--large > div.js-content-entity-body.content-entity-body > table:nth-child(7) > tbody > tr')
    .each((index, element) => {
      const tds = $(element).find('td');
      const name = $(tds[0]).text();
      const seasonArr = $(tds[1]).text().replace(',', '').split(' ');
      const location = $(tds[2]).text();
      const time = $(tds[3]).text();
      const price = Number($(tds[4]).text().replace(',', ''));

      makeFish(scrapedData, name, seasonArr, location, time, price);
    });

  console.log(scrapedData, 'done');
}

main();

function makeFish(arr, name, seasonArr, location, time, price) {
  if(seasonArr.length === 3){
    const tableRow = {
      name,
      season: {
        start: makeMonth(seasonArr[0]),
        end: makeMonth(seasonArr[2])
      },
      location,
      time, 
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
      time, 
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
      time, 
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
      time, 
      price
    };

    const tableRowTwo = {
      name,
      season: {
        start: makeMonth(seasonArr[3]),
        end: makeMonth(seasonArr[5])
      },
      location,
      time, 
      price
    };

    arr.push(tableRowOne);
    arr.push(tableRowTwo);
    Fish.create(tableRowOne);
    Fish.create(tableRowTwo);
  }
}
