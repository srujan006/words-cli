'use strict'
const request = require('request');
const chalk = require("chalk");
const clear = require('clear');


const apikey = process.env.apikey;
const mainURL = process.env.mainURL;
const basicURL = process.env.basicURL;

module.exports = {
  getDefinition : async (word) =>{
    return new Promise((resolve,reject)=>{
      request(  {
          method: "GET",
          url: mainURL+word+"/definitions?api_key="+apikey
        },
        function(error, response) {
          if(!error){
            // console.log(response.body);

            let definitions = JSON.parse(response.body) ;
            if(definitions.error){
              // console.log(chalk.yellow("Word not found"));
              reject(definitions.error);
            }
            resolve(definitions);
          }else{
            console.log(chalk.yellow('Error'));
            reject("error");
          }
        }
      )
    })
  },
  getRandomWord : async (word) =>{
    return new Promise((resolve,reject)=>{
      request(  {
          method: "GET",
          url: basicURL+"words/randomWord?api_key="+apikey,
        },
        function(error, response) {

          if(error){
            console.log(chalk.yellow('Error'));
            reject("Error");
          }else{
            let randomWord = JSON.parse(response.body) ;
            resolve(randomWord.word);
          }
        }
      )
    })
  },
  getExamples : async (word) =>{
    return new Promise((resolve,reject)=>{
      request(  {
          method: "GET",
          url: mainURL+word+"/examples?api_key="+apikey,
        },
        function(error, response) {
          if(!error){
            let examples = JSON.parse(response.body) ;
            // console.log(response.body);
            if(examples.error){
              console.log(chalk.yellow("Word not found"));
              // reject(examples.error);
            }
            resolve(examples);
          }else{
            console.log(chalk.yellow('Error'));
            reject("Error");
          }
        }
      )
    })
  },
  getSimilarWords :async (type,word) => {
    return new Promise((resolve,reject)=>{
      request(  {
          method: "GET",
          url: mainURL+word+"/relatedWords?api_key="+apikey,
        },
        function(error, response) {
          let res = JSON.parse(response.body) ;
          if(!error){
            if(res.error){
              // console.log(chalk.yellow('Word not found'));
              reject(res.error);
            }
              resolve(res);
          }else{
            // console.log(chalk.yellow('Error'));
            resolve("Error");
          }
        }
      )
    })
  },
  getAll: async (word) =>{
    Promise.all([module.exports.getDefinition(word),module.exports.getSimilarWords("all", word),module.exports.getExamples(word)])
        .then((results)=>{
          const definitions = results[0];

          console.log(chalk.yellow.bold("\nMeanings"));
          definitions.forEach((o, i) =>
            console.log("\n" + (i + 1) + ". " + o.text)
          );
          console.log(chalk.yellow.bold("\nsynonyms"));

          let synonyms = results[1].filter(o => o.relationshipType == "synonym");
          synonyms.length && synonyms[0].words.forEach(o => console.log(o));
          console.log(chalk.yellow.bold("\nantonyms"));

          let antonyms = results[1].filter(o => o.relationshipType == "antonym");
          antonyms.length && antonyms[0].words.forEach(o => console.log(o));

          let getExamples = results[2];

          console.log(chalk.yellow.bold("\nUsage examples"));
          getExamples.examples.forEach((o, i) =>
            console.log("\n" + (i + 1) + ". " + o.text)
          );
        })
        .catch(e=>{console.log(e)})

  }
}
