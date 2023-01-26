const rp = require('request-promise');
const cheerio = require('cheerio');

export default (req, res, next) => {
  const baseSelector = 'ul.grid-listServices:nth-child';
  const childSelector = 'li:nth-child';

  const getPrice = ($, i, j) => {
    return $(`${baseSelector}(${i}) > ${childSelector}(${j+1}) > div:nth-child(1) > 
      div:nth-child(2) > div:nth-child(3)`).html();
  }
  const getName = ($, i, j) => {
    return $(`${baseSelector}(${i}) > ${childSelector}(${j+1}) > div:nth-child(1) > 
      div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > em:nth-child(2)`).html();
  }
  const getDescription = ($, i, j) => {
    return $(`${baseSelector}(${i}) > ${childSelector}(${j+1}) > div:nth-child(1) > 
      div:nth-child(2) > a:nth-child(1)`).html();
  }
  const getLink = ($, i, j) => {
    return $(`${baseSelector}(${i}) > ${childSelector}(${j+1}) > div:nth-child(1) > 
      div:nth-child(2) > a:nth-child(1)`).first().attr('href');
  }
  const getImage = ($, i, j) => {
    return $(`${baseSelector}(${i}) > ${childSelector}(${j+1}) > div:nth-child(1)`).find('img').first().attr('src');
  }
  const getResultNumber = ($) => {
    return $(`h2.title-L:nth-child(3)`).html();
  }
  
  async function scrapeData() {
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fcomeup.com%2Frecherche%3Fq%3D${req.query.argument}`);
    let $ = cheerio.load(html);
    let data = []
    let resultNumber = getResultNumber($)

    for ( let i = 0; i <= 3 ; i++) {
      if ( i = 1 ) {
        for ( let j = 0; j < 6; j++) {
          let childrenData = [];
          childrenData.push(
            ...[
              getPrice($, i, j), 
              getName($, i, j), 
              getDescription($, i, j), 
              getLink($, i, j), 
              getImage($, i, j), 
            ]
          )
          data.push(childrenData);
        }
      } if ( i = 3 ) {
        for ( let j = 0; j < 30; j++) {
          let childrenData = [];
          childrenData.push(
            ...[
              getPrice($, i, j), 
              getName($, i, j), 
              getDescription($, i, j), 
              getLink($, i, j), 
              getImage($, i, j), 
            ]
          )
          data.push(childrenData);
        }
      }
    }
    data.push(resultNumber)
    await res.setHeader("Access-Control-Allow-Origin", "https://free-engine.vercel.app").status(200).send(data)
    return data;
  }
  scrapeData()
}