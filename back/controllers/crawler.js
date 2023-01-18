const rp = require('request-promise');
const cheerio = require('cheerio');

exports.crawler = (req, res, next) => {}
  //  var result = []
  //  var profileInfos = []
  // // var message = ""
  // // var options = {
  // //   url: 'https://api.crawlbase.com/?token=&device=desktop&scraper=generic-extractor&format=json&country=FR&url=https%3A%2F%2Fwww.malt.fr%2Fs%3Fq%3Druby+on+rails'
  // // };
  
  // // var getProfileInfos = (linksList) => {
  // //   for (var i = 0; i < linksList.length; i++) {
  // //     var encodeLink = encodeURI(linksList[i])
  // //     console.log(encodeLink)
  // //     var option = {
  // //       url: `https://api.crawlbase.com/?token=&device=desktop&scraper=generic-extractor&format=json&url=${encodeLink}`
  // //     }
  // //     request(option, infoscallback)
  // //   }
  // // }
  
  // // function infoscallback(error, response, body) {
  // //   if (!error && response.statusCode == 200) {
  // //     profileInfos.push(body)
  // //     var infosJSON = JSON.parse(body)
  // //     profileInfos.push(infosJSON.body.title, infosJSON.body.og_images, infosJSON.body.canonical, infosJSON.body.content)
  // //     message = 'Scraping complete'
  // //     //searchInfos(infosJSON.body)
  // //   }
  // //   return profileInfos
  // // }

  // // function searchInfos(link) {
  // //   console.log(link.body)
  // // }

  // // function callback(error, response, body) {
  // //   if (!error && response.statusCode == 200) {
  // //     message = 'Scraping in progress...'
  // //     response.status = 200
  // //     var resultJSON = JSON.parse(body)
  // //     profileLinks(resultJSON.body.links)
  // //   }
  // // }

  // // request(options, callback);
  // // "https://api.crawlbase.com/?token=&device=desktop&scraper=generic-extractor&format=json&country=FR&url=https%3A%2F%2Fwww.malt.fr%2Fs%3Fq%3Druby+on+rails"
  // "https://api.crawlbase.com/?token=&device=desktop&url=https%3A%2F%2Fwww.malt.fr%2Fs%3Fq%3Druby%2Bon%2Brails&ajax_wait=true&screenshot=true"
  // rp(`https://api.crawlbase.com/?token=&device=desktop&url=https%3A%2F%2Fwww.malt.fr%2Fs%3Fq%3Druby%2Bon%2Brails&ajax_wait=true&screenshot=true`)
  //   .then((response) => {
  //     //console.log(req.params.argument)
  //     //console.log(JSON.parse(response))
  //     var dataInfos = response
  //     //var resultJSON = JSON.parse(response)
  //     //var links = resultJSON.body.links
  //     // console.log(links)
  //     res.status(200).json({ message: 'Scraping done...', dataInfos })
  //     //profileLinks(links)
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   });

  // function profileLinks(links) {
  //   for(var i = 0; i < links.length; i++) {
  //     if (links[i].includes("/profile")){
  //       result.push(links[i]);
  //     }
  //   }
  //   console.log(result)
  //   //console.log(req.query.argument)
  //   getProfileInfos(result);
  // }

  // async function getProfileInfos(linksList) {
  //   for (var i = 0; i < linksList.length; i++) {
  //     var encodeLink = encodeURI(linksList[i])
  //     console.log(encodeLink)
  //     var url = `https://api.crawlbase.com/?token=&device=desktop&scraper=generic-extractor&format=json&url=${encodeLink}`
  //     while (true) {
  //         try {
  //         let response = await rp(url) 
  //         console.log(response)
  //         //profileInfos.push(response)
  //         var infosJSON = JSON.parse(response)
  //         console.log(infosJSON)
  //         profileInfos.push(infosJSON.body.title, infosJSON.body.og_images, infosJSON.body.canonical, infosJSON.body.content)
  //         break;
  //       } catch (error) {
  //         if (error.statusCode === 520) {
  //           console.log("error 520, retrying...")
  //           continue
  //         } else {
  //           throw error
  //         }
  //       }
  //     }
  //   }
  //   res.status(200).json({ message: 'Scraping done...', profileInfos })
  //   return
  // }

  // // var getProfileInfos = (linksList) => {
  // //   for (var i = 0; i <= linksList.length; i++) {
  // //     if (i + 1 < linksList.length + 2) {
  // //       var encodeLink = encodeURI(linksList[i])
  // //       console.log(encodeLink)
  // //       var url = `https://api.crawlbase.com/?token=&device=desktop&scraper=generic-extractor&format=json&url=${encodeLink}`
  // //       rp(url)
  // //         .then((response) => {
  // //           console.log(response)
  // //           //profileInfos.push(response)
  // //           var infosJSON = JSON.parse(response)
  // //           console.log(infosJSON)
  // //           profileInfos.push(infosJSON.body.title, infosJSON.body.og_images, infosJSON.body.canonical, infosJSON.body.content)
  // //         })
  // //         .catch((error) => {
  // //           console.error(error)
  // //         });
  // //     } else {
  // //       res.status(200).json({ message: 'Scraping done...', profileInfos })
  // //       return
  // //     }
  // //   }
  // // }
  
  // // function infoscallback(error, response, body) {
  // //   if (!error && response.statusCode == 200) {
  // //     profileInfos.push(body)
  // //     var infosJSON = JSON.parse(body)
  // //     profileInfos.push(infosJSON.body.title, infosJSON.body.og_images, infosJSON.body.canonical, infosJSON.body.content)
  // //     message = 'Scraping complete'
  // //     //searchInfos(infosJSON.body)
  // //   }
  // //   return profileInfos
  // // }

  // // function searchInfos(link) {
  // //   console.log(link.body)
  // // }
  //________________________________________________________________________________
//scraping with puppeteer or cheerio
//________________________________________________________________________________

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
