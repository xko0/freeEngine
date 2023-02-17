// const rp = require('request-promise');
// const cheerio = require('cheerio');

// exports.scrapeCodementorData = (req, res, next) => {
//   const baseSelector = 'section.profile-card:nth-child';

//   const getPrice = ($, i) => {
//     return $(`${baseSelector}(${i+1}) > a:nth-child(1) > div:nth-child(2) > 
//       div:nth-child(1) > p:nth-child(1) > span:nth-child(1) > strong:nth-child(1)`).html();
//   }
//   const getName = ($, i) => {
//     // .mentors-list > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > a:nth-child(1) > b:nth-child(1)
//     return $(`${baseSelector}(${i+1}) > a:nth-child(1) > div:nth-child(1) > 
//       div:nth-child(4) > p:nth-child(1)`).html();
//   }
//   const getDescription = ($, i) => {
//     // .mentors-list > div:nth-child(1) > div:nth-child(2) > div:nth-child(3)
//     return $(`${baseSelector}(${i+1}) > a:nth-child(1) > div:nth-child(2) > 
//       div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h2:nth-child(1)`).html();
//   }
//   // descrption 2 (text): .mentors-list > div:nth-child(1) > div:nth-child(2) > div:nth-child(4)
//   // description 3 (stacks): .mentors-list > div:nth-child(1) > div:nth-child(2) > div:nth-child(5)
//   const getLink = ($, i) => {
//     return $(`${baseSelector}(${i+1}) > a:nth-child(1)`).map((i, el) => $(el).attr('href')).get();
//   }
//   const getImage = ($, i) => {
//     // .mentors-list > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)
//     return $(`${baseSelector}(${i+1})`).find('img').map((i, el) => $(el).attr('src')).get();
//   }

//   // rating (stars): div.sc-e651acec-0:nth-child(3) > div:nth-child(2) > div:nth-child(2) > span:nth-child(1) > b:nth-child(2)
//   const getCity = ($, i) => {
//     return $(`${baseSelector}(${i+1}) > a:nth-child(1) > div:nth-child(1) > div:nth-child(4) > 
//       div:nth-child(2) > div:nth-child(1) > p:nth-child(1) > span:nth-child(2)`).html();
//   }
//   const getResultNumber = ($) => {
//     return $(`.search-header-query__title`).html();
//   }
//   async function scrapeData() {
//     let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fwww.codementor.io%2Ffreelance%2F${req.query.argument}`);
//     let $ = cheerio.load(html);
//     let data = []
//     let resultNumber = getResultNumber($)

//     for ( let i = 0; i < $('section.profile-card').length; i++) {
//       let childrenData = [];
//       childrenData.push(
//         ...[
//           getPrice($, i), 
//           getName($, i), 
//           getDescription($, i), 
//           getLink($, i), 
//           getImage($, i), 
//           getCity($, i),
//         ]
//       )
//       data.push(childrenData);
//     }
//     data.push(resultNumber)
//     await res.status(200).send(data)
//     return data;
//   }
//   scrapeData()
// }