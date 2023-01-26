const rp = require('request-promise');
const cheerio = require('cheerio');

export default (req, res, next) => {
  const baseSelector = 'div.gig-card-layout:nth-child';

  const getPrice = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > footer:nth-child(5) > a:nth-child(2) > span:nth-child(2)`).html();
  }
  const getName = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)`).html();
  }
  const getDescription = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > h3:nth-child(3) > a:nth-child(1)`).html();
  }
  const getLink = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)`).map((i, el) => $(el).attr('href')).get();
  }
  const getImage = ($, i) => {
    return $(`${baseSelector}(${i+1})`).find('img').map((i, el) => $(el).attr('src')).get();
  }
  const getResultNumber = ($) => {
    return $(`.m-r-4`).html();
  }
  async function scrapeData() {
    let encodedSearch = req.query.argument
    let reEncodeSearch = encodeURIComponent(encodedSearch)
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Ffr.fiverr.com%2Fsearch%2Fgigs%3Fquery%3D${reEncodeSearch}%26source%3Dtop-bar%26ref_ctx_id%3De485ce60aee4ba1447ace1bacd7bec2c%26search_in%3Deverywhere%26search-autocomplete-original-term%3D${reEncodeSearch}`);
    let $ = cheerio.load(html);
    let data = []
    let resultNumber = getResultNumber($)

    for ( let i = 0; i < $('div.gig-card-layout').length; i++) {
      let childrenData = [];
      childrenData.push(
        ...[
          getPrice($, i), 
          getName($, i), 
          getDescription($, i), 
          getLink($, i), 
          getImage($, i), 
        ]
      )
      data.push(childrenData);
    }
    data.push(resultNumber)
    await res.setHeader("Access-Control-Allow-Origin", "https://free-engine.vercel.app").status(200).send(data)
    return data;
  }
  scrapeData()
}