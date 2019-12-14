'use strict'
const request = require('request');
const chalk = require("chalk");
const clear = require('clear');


const apikey = process.env.apikey;
const mainURL = process.env.mainURL;
const basicURL = process.env.basicURL;

module.exports = {
  getDefinition : async (word) =>{
    request(  {
        method: "GET",
        url: mainURL+word+"/definitions?api_key="+apikey

      },
      function(error, response) {
        if(!error){
          // console.log(response.body);

          let definitions = JSON.parse(response.body) ;
          if(definitions.error){
            console.log(chalk.yellow("Word not found"));
            return;
          }
          console.log(chalk.yellow.bold("Meanings of ",word));
          definitions.forEach((o,i)=>console.log("\n"+(i+1)+". "+o.text))
          return;
        }else{
          console.log(chalk.yellow('Error'));
          return;
        }
      }
    )
  },
  getRandomWord : async (word) =>{
    request(  {
        method: "GET",
        url: basicURL+"words/randomWord?api_key="+apikey,
      },
      function(error, response) {

        if(error){
          console.log(chalk.yellow('Error'));
          return;
        }else{
          let randomWord = JSON.parse(response.body) ;
          console.log("Word of the day : ", randomWord.word);
          return randomWord.word;
        }
      }
    )
  },
  getExamples : async (word) =>{
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
            return;
          }
          console.log(chalk.yellow.bold("Usage examples of ",word));
          examples.examples.forEach((o,i)=>console.log("\n"+(i+1)+". "+o.text))
          return;
        }else{
          console.log(chalk.yellow('Error'));
          return;
        }
      }
    )
  },
  getSimilarWords :async (type,word) => {
    request(  {
        method: "GET",
        url: mainURL+word+"/relatedWords?api_key="+apikey,
      },
      function(error, response) {
        let res = JSON.parse(response.body) ;
        if(!error){
          if(res.error){
            console.log(chalk.yellow('Word not found'));
            return;
          }
          if(type == "ant"){
            console.log(chalk.yellow.bold('Antonyms of ',word,'\n'));
            let antonyms = res.filter(o=> o.relationshipType ==  'antonym');
            antonyms.length && antonyms[0].words.forEach(o=>console.log(o));
            return;
          }else if(type=="syn"){
            console.log(chalk.yellow.bold('Synonyms of',word,'\n'));

            let synonyms = res.filter(o=> o.relationshipType ==  'synonym');
            synonyms.length && synonyms[0].words.forEach(o=>console.log(o));
            return;
          }else{
            console.log(chalk.yellow.bold('Antonyms of',word,'\n'));

            let antonyms = res.filter(o=> o.relationshipType ==  'antonym');
            antonyms.length && antonyms[0].words.forEach(o=>console.log(o));

            console.log(chalk.yellow.bold('Synonyms of',word,'\n'));

            let synonyms = res.filter(o=> o.relationshipType ==  'synonym');
            synonyms.length && synonyms[0].words.forEach(o=>console.log(o));
            return;
          }
        }else{
          console.log(chalk.yellow('Error'));
          return;
        }


      }
    )
  }
}
