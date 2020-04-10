require('dotenv').config();
require('./lib/utils/connect')();
const request = require('request-promise');
const cheerio = require('cheerio');
const makeFish = require('./common/scrapeUtils');

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


