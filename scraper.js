const request = require('request-promise');
const cheerio = require('cheerio');



async function main() {
  const result = await request.get('https://www.gamespot.com/articles/animal-crossing-new-horizons-fish-guide-how-to-cat/1100-6474887/');

  const $ = cheerio.load(result);

  const scrapedData = [];
  
  $('#default-content > div.primary-content.js-seamless-content__page.t-container > div > article > section.article-body.typography-format.typography-format--large > div.js-content-entity-body.content-entity-body > table:nth-child(9) > tbody > tr').each((index, element) => {
    if(index === 0) return true;
    const tds = $(element).find('td');
    const fish = $(tds[0]).text();
    const season = $(tds[1]).text();
    const location = $(tds[2]).text();
    const time = $(tds[3]).text();
    const price = $(tds[4]).text();

    const tableRow = { fish, season, location, time, price };

    scrapedData.push(tableRow);
  });

  console.log(scrapedData);
}

main();
