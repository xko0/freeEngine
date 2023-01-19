const rp = require('request-promise');
const cheerio = require('cheerio');

exports.scrapeFreelanceComData = (req, res, next) => {
  const baseSelector = 'a.w-full:nth-child';

  const getPrice = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(5) > span:nth-child(1) > span:nth-child(1)`).html();
  }
  const getName = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)`).html();
  }
  const getDescription = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > span:nth-child(3)`).html();
  }
  const getLink = ($, i) => {
    return $(`${baseSelector}(${i+1})`).map((i, el) => $(el).attr('href')).get();
  }
  const getImage = ($, i) => {
    return $(`${baseSelector}(${i+1})`).find('img').map((i, el) => $(el).attr('src')).get();
  }
  const getCity = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(2)`).html();
  }
  async function scrapeData() {
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fplateforme.freelance.com%2Fs%3Fq%3D${req.query.argument}`);
    let $ = cheerio.load(html);
    let data = []

    for ( let i = 0; i < $('a.w-full').length; i++) {
      let childrenData = [];
      childrenData.push(
        ...[
          getPrice($, i), 
          getName($, i), 
          getDescription($, i), 
          getLink($, i), 
          getImage($, i), 
          getCity($, i)
        ]
      )
      data.push(childrenData)
    }
    await res.status(200).send(data)
    return data;
  }
  scrapeData()
}

  async function scrapeFiverrData() {
    let encodedSearch = req.query.argument
    let reEncodeSearch = encodeURIComponent(encodedSearch)
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Ffr.fiverr.com%2Fsearch%2Fgigs%3Fquery%3D${reEncodeSearch}%26source%3Dtop-bar%26ref_ctx_id%3De485ce60aee4ba1447ace1bacd7bec2c%26search_in%3Deverywhere%26search-autocomplete-original-term%3D${reEncodeSearch}`);
    let $ = cheerio.load(html);
    let data = []
  
    for ( let i = 0; i < $('div.py-0').length; i++) {
      let childrenData = [];
      childrenData.push($(``));
      data.push(childrenData)
    }
    await res.status(200).send(data)
    return data;
  }

exports.scrapeMaltData = (req, res, next) => {
  const baseSelector = 'section.profile-card:nth-child';

  const getPrice = ($, i) => {
    return $(`${baseSelector}(${i+1}) > a:nth-child(1) > div:nth-child(2) > 
      div:nth-child(1) > p:nth-child(1) > span:nth-child(1) > strong:nth-child(1)`).html();
  }
  const getName = ($, i) => {
    return $(`${baseSelector}(${i+1}) > a:nth-child(1) > div:nth-child(1) > 
      div:nth-child(4) > p:nth-child(1)`).html();
  }
  const getDescription = ($, i) => {
    return $(`${baseSelector}(${i+1}) > a:nth-child(1) > div:nth-child(2) > 
      div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h2:nth-child(1)`).html();
  }
  const getLink = ($, i) => {
    return $(`${baseSelector}(${i+1}) > a:nth-child(1)`).map((i, el) => $(el).attr('href')).get();
  }
  const getImage = ($, i) => {
    return $(`${baseSelector}(${i+1})`).find('img').map((i, el) => $(el).attr('src')).get();
  }
  const getCity = ($, i) => {
    return $(`${baseSelector}(${i+1}) > a:nth-child(1) > div:nth-child(1) > div:nth-child(4) > 
      div:nth-child(2) > div:nth-child(1) > p:nth-child(1) > span:nth-child(2)`).html();
  }

  async function scrapeData() {
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fwww.malt.fr%2Fs%3Fq%3D${req.query.argument}&ajax_wait=true`);
    let $ = cheerio.load(html);
    let data = []
    for ( let i = 0; i < $('section.profile-card').length; i++) {
      let childrenData = [];
      childrenData.push(
        ...[
          getPrice($, i), 
          getName($, i), 
          getDescription($, i), 
          getLink($, i), 
          getImage($, i), 
          getCity($, i)
        ]
      )
      data.push(childrenData);
    }
    await res.status(200).send(data)
    return data;
  }
  scrapeData()
}
