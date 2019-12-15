require("dotenv").config();

const program = require("commander");
const words = require('./lib/words');
const inquirer = require('inquirer');
const chalk = require('chalk');



// inquirer.prompt(questions)

program
  .command("defn <word>")
  .alias("a")
  .description("definition of a word")
  .action(async (word) => {
    try{
      const definitions = await words.getDefinition(word);
      console.log(chalk.yellow.bold("Meanings"));
      definitions.forEach((o,i)=>console.log("\n"+(i+1)+". "+o.text))
    }catch(e){console.log(chalk.yellow("Word not found"))}

  });

program
  .command("play")
  .alias("b")
  .description("any random word")
  .action( async () => {
    try{
      let word = await  words.getRandomWord();
      console.log(word);
      await words.getDefinition(word);
      await words.getSimilarWords("all",word);
      await words.getExamples(word);
    }catch(e){
        console.log(e)
    }

  });


program
  .command("ex <word>")
  .alias("c")
  .description("examples of a word")
  .action(async (word) => {
    try{
      const examples =await words.getExamples(word);
      console.log(chalk.yellow.bold("Usage examples"));
      examples.examples.forEach((o,i)=>console.log("\n"+(i+1)+". "+o.text))
    }catch(e){console.log(chalk.yellow("Word not found"))}


  });

program
  .command("syn <word>")
  .alias("d")
  .description("synonyms of a word")
  .action(async (word) => {
    try{
      const similarWords = await words.getSimilarWords("syn", word);
      let synonyms = similarWords.filter(o=> o.relationshipType ==  'synonym');
      synonyms.length && synonyms[0].words.forEach(o=>console.log(o));
    }catch(e){console.log(chalk.yellow("Word not found"))}


  });

program
  .command("ant <word>")
  .alias("e")
  .description("antyonoms of a word")
  .action(word => {
    try{
      const similarWords = similarWords.getSimilarWords("ant", word);
      let antonyms = res.filter(o=> o.relationshipType ==  'antonym');
      antonyms.length && antonyms[0].words.forEach(o=>console.log(o));
    }catch(e){console.log(chalk.yellow("Word not found"))}




  });


// console.log(process.argv);

program.parse(process.argv);
