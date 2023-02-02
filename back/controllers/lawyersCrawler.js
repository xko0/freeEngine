const rp = require('request-promise');
const cheerio = require('cheerio');

exports.scrapeConsultationAvocatData = (req, res, next) => {
  // const wordsToSearch = [
  //   1 = "Avocat généraliste",
  //   2 = "Droits de la famille, des personnes, et de la consommation",
  //   3 = "Droit immobilier, baux, construction, voisinage",
  //   4 = "Droit du travail et droit de la sécurité sociale",
  //   5 = "Droit des affaires des contrats, et des sociétés commerciales",
  //   6 = "Droit du numérique et des communications",
  //   7 = "Droit fiscal, impôts, taxes",
  //   8 = "Droit des assurances, du dommage corporel et de la santé",
  //   9 = "Droit pénal, droit routier et droit des étrangers",
  //   10 = "Droit public, urbanisme et droit de l'environnement",
  //   11 = "Droit international et de l'Union européenne",
  //   12 = "Procédure civile, procédure d'appel",
  //   13 = "Droit des enfants",
  //   14 = "Droit rural"
  // ]
  const wordsToSearch = [  
    "Avocat généraliste",  
    "famille personnes consommation",  
    "immobilier baux construction voisinage",  
    "travail sécurité sociale",  
    "affaires contrats sociétés commerciales",  
    "numérique communications",  
    "fiscal impôts taxes",  
    "assurances dommage corporel santé",  
    "pénal routier étrangers",  
    "public urbanisme environnement",  
    "international Union européenne",  
    "Procédure civile procédure d'appel",  
    "enfants",  
    "rural"
  ];

  let wordIndex;
  for (let i = 0; i < wordsToSearch.length; i++) {
    if (wordsToSearch[i].includes(req.query.argument)) {
      wordIndex = i + 1;
      break;
    } else {
      wordIndex = 1
    }
  }

  const baseSelector = 'a.lawyerprofilebox:nth-child';

  const getName = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(4) > h3:nth-child(1)`).html();
  }

  const getField = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(4) > div:nth-child(3) > span:nth-child(1) > span:nth-child(2)`).html();
  }

  const getField2 = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(4) > div:nth-child(3) > span:nth-child(2) > span:nth-child(2)`).html();
  }

  const getBaseField = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(4) > div:nth-child(3) > span:nth-child(3) > span:nth-child(2)`).html();
  }

  const getLink = ($, i) => {
    return $(`${baseSelector}(${i+1})`).map((i, el) => $(el).attr('href')).get();
  }
  const getImage = ($, i) => {
    // a.lawyerprofilebox:nth-child(1) > div:nth-child(2)  ou a.lawyerprofilebox:nth-child(1) > div:nth-child(2) > div:nth-child(1) ou a.lawyerprofilebox:nth-child(1) > div:nth-child(2) > div:nth-child(1) > img:nth-child(1)
    return $(`${baseSelector}(${i+1})`).find('img').map((i, el) => $(el).attr('src')).get();
  }
  const getAddress = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(4) > div:nth-child(2)`).html();
  }
  const getResultNumber = ($) => {
    return $(`div.lawyerfinder-nb-results`).html();
  }

  async function scrapeData() {
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fconsultation.avocat.fr%2Favocats%2Fcarte.php%3Fconsultingclass%3D%26page%3D1%26source%3Dsearch%26namesearch%3D0%26competencepublic1%3D2%26name%3D%26address%3D%26specialists%3D0%26language%3D%26from%3D%26`);
    let $ = cheerio.load(html);
    let data = []
    let resultNumber = getResultNumber($)

    for ( let i = 0; i < $('a.lawyerprofilebox').length; i++) {
      let childrenData = [];
      childrenData.push(
        ...[
          getName($, i), 
          getField($, i),
          getField2($, i),
          getBaseField($, i),
          getLink($, i), 
          getImage($, i), 
          getAddress($, i)
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
