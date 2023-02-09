const rp = require('request-promise');
const cheerio = require('cheerio');

exports.scrapeMeetlawData = (req, res, next) => {
  const baseSelector = 'div.annuaireFicheMini:nth-child';

  const getInfoSupp = ($, i) => {
    // div.annuaireFicheMini:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(4) > a:nth-child(3)
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(3) > div:nth-child(4) > a:nth-child(3)`).html();
  }
  const getName = ($, i) => {
    //div.annuaireFicheMini:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h4:nth-child(1) > a:nth-child(1) (+plusieurs children)
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(2) > h4:nth-child(1) > a:nth-child(1)`).html();
  }
  const getDescription = ($, i) => {
    // div.annuaireFicheMini:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(4) > ul:nth-child(2) (+plusieurs children)
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(3) > div:nth-child(4) > ul:nth-child(2)`).html();
  }
  const getLink = ($, i) => {
    // div.annuaireFicheMini:nth-child(1)
    return $(`${baseSelector}(${i+1})`).map((i, el) => $(el).attr('href')).get();
  }
  const getImage = ($, i) => {
    // div.annuaireFicheMini:nth-child(1)
    return $(`${baseSelector}(${i+1})`).find('img').map((i, el) => $(el).attr('src')).get();
  }
  const getAddress = ($, i) => {
    // div.annuaireFicheMini:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) (+2 children)
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2)`).html();
  }

  async function scrapeData() {
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fwww.meetlaw.fr%2Fannuaire-meetlaw.htm%3FfrmAnnuaire_pageid%3D72%26frmAnnuaire_departement%3D%26frmAnnuaire_ville%3D${req.query.city}%26frmAnnuaire_nomavocat%3D%26frmAnnuaire_domaine%3D%26frmAnnuaire_ok%3D`);
    let $ = cheerio.load(html);
    let data = []

    for ( let i = 0; i < $('div.annuaireFicheMini').length; i++) {
      let childrenData = [];
      childrenData.push(
        ...[
          getInfoSupp($, i), 
          getName($, i), 
          getDescription($, i), 
          getLink($, i), 
          getImage($, i), 
          getAddress($, i)
        ]
      )
      data.push(childrenData)
    }
    await res.status(200).send(data)
    return data;
  }
  scrapeData()
}

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
  const getResultNumber = ($) => {
    return $(`.block`).html();
  }
  async function scrapeData() {
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fplateforme.freelance.com%2Fs%3Fq%3D${req.query.argument}`);
    let $ = cheerio.load(html);
    let data = []
    let resultNumber = getResultNumber($)

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
    data.push(resultNumber)
    await res.status(200).send(data)
    return data;
  }
  scrapeData()
}



// well written scrapper with timeout and intervals but site not scrapable:

//exports.scrapeConsultationAvocatData = (req, res, next) => {
  //   // const wordsToSearch = [
  //   //   1 = "Avocat généraliste",
  //   //   2 = "Droits de la famille, des personnes, et de la consommation",
  //   //   3 = "Droit immobilier, baux, construction, voisinage",
  //   //   4 = "Droit du travail et droit de la sécurité sociale",
  //   //   5 = "Droit des affaires des contrats, et des sociétés commerciales",
  //   //   6 = "Droit du numérique et des communications",
  //   //   7 = "Droit fiscal, impôts, taxes",
  //   //   8 = "Droit des assurances, du dommage corporel et de la santé",
  //   //   9 = "Droit pénal, droit routier et droit des étrangers",
  //   //   10 = "Droit public, urbanisme et droit de l'environnement",
  //   //   11 = "Droit international et de l'Union européenne",
  //   //   12 = "Procédure civile, procédure d'appel",
  //   //   13 = "Droit des enfants",
  //   //   14 = "Droit rural"
  //   // ]
  //   const wordsToSearch = [  
  //     "Avocat généraliste",  
  //     "famille personnes consommation",  
  //     "immobilier baux construction voisinage",  
  //     "travail sécurité sociale",  
  //     "affaires contrats sociétés commerciales",  
  //     "numérique communications",  
  //     "fiscal impôts taxes",  
  //     "assurances dommage corporel santé",  
  //     "pénal routier étrangers",  
  //     "public urbanisme environnement",  
  //     "international Union européenne",  
  //     "Procédure civile procédure d'appel",  
  //     "enfants",  
  //     "rural"
  //   ];
  
  //   let wordIndex;
  //   for (let i = 0; i < wordsToSearch.length; i++) {
  //     if (wordsToSearch[i].includes(req.query.argument)) {
  //       wordIndex = i + 1;
  //       break;
  //     } else {
  //       wordIndex = 1
  //     }
  //   }
  
  //   const baseSelector = 'a.lawyerprofilebox:nth-child';
  
  //   const getName = ($, i) => {
  //     return $(`${baseSelector}(${i+1}) > div:nth-child(4) > h3:nth-child(1)`).html();
  //   }
  
  //   const getField = ($, i) => {
  //     return $(`${baseSelector}(${i+1}) > div:nth-child(4) > div:nth-child(3) > span:nth-child(1) > span:nth-child(2)`).html();
  //   }
  
  //   const getField2 = ($, i) => {
  //     return $(`${baseSelector}(${i+1}) > div:nth-child(4) > div:nth-child(3) > span:nth-child(2) > span:nth-child(2)`).html();
  //   }
  
  //   const getBaseField = ($, i) => {
  //     return $(`${baseSelector}(${i+1}) > div:nth-child(4) > div:nth-child(3) > span:nth-child(3) > span:nth-child(2)`).html();
  //   }
  
  //   const getLink = ($, i) => {
  //     return $(`${baseSelector}(${i+1})`).map((i, el) => $(el).attr('href')).get();
  //   }
  //   const getImage = ($, i) => {
  //     // a.lawyerprofilebox:nth-child(1) > div:nth-child(2)  ou a.lawyerprofilebox:nth-child(1) > div:nth-child(2) > div:nth-child(1) ou a.lawyerprofilebox:nth-child(1) > div:nth-child(2) > div:nth-child(1) > img:nth-child(1)
  //     return $(`${baseSelector}(${i+1})`).find('img').map((i, el) => $(el).attr('src')).get();
  //   }
  //   const getAddress = ($, i) => {
  //     return $(`${baseSelector}(${i+1}) > div:nth-child(4) > div:nth-child(2)`).html();
  //   }
  //   const getResultNumber = ($) => {
  //     return $(`div.lawyerfinder-nb-results`).html();
  //   }
  
  //   async function scrapeData() {
  //     let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fconsultation.avocat.fr%2Favocats%2Fcarte.php%3Fconsultingclass%3D%26page%3D1%26source%3Dsearch%26namesearch%3D0%26competencepublic1%3D2%26name%3D%26address%3D%26specialists%3D0%26language%3D%26from%3D%26`);
  //     let $ = cheerio.load(html);
    
  //     const selector = "a.lawyerprofilebox:nth-child(1)";
    
  //     // Set a timeout for 10 seconds
  //     const timeout = 25000;
  //     let start = new Date();
    
  //     // Keep checking for the selector until it appears or the timeout is reached
  //     while (!$(selector).length && (new Date() - start) < timeout) {
  //       await new Promise(resolve => setTimeout(resolve, 500));
  //       $ = cheerio.load(await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fconsultation.avocat.fr%2Favocats%2Fcarte.php%3Fconsultingclass%3D%26page%3D1%26source%3Dsearch%26namesearch%3D0%26competencepublic1%3D2%26name%3D%26address%3D%26specialists%3D0%26language%3D%26from%3D%26`));
  //     }
    
  //     // If the selector was not found, return an error
  //     if (!$(selector).length) {
  //       throw new Error(`Selector "${selector}" not found after ${timeout}ms`);
  //     }
    
  //     // Proceed with scraping the data
  //     let data = []
  //     let resultNumber = getResultNumber($)
    
  //     for ( let i = 0; i < $('a.lawyerprofilebox').length; i++) {
  //       let childrenData = [];
  //       childrenData.push(
  //         ...[
  //           getName($, i), 
  //           getField($, i),
  //           getField2($, i),
  //           getBaseField($, i),
  //           getLink($, i), 
  //           getImage($, i), 
  //           getAddress($, i)
  //         ]
  //       )
  //       data.push(childrenData)
  //     }
  //     data.push(resultNumber)
  //     await res.status(200).send(data)
  //     console.log(data)
  //   }  
  //   scrapeData()
// }
