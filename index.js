require("dotenv").config();

const program = require("commander");
const words = require('./lib/words');


program
  .command("defn <word>")
  .alias("a")
  .description("defination of a word")
  .action(async word => {
    await words.getDefinition(word);
  });

// program
//   .command("random")
//   .alias("b")
//   .description("any random word")
//   .action( async () => {
//     await words.getRandomWord();
//   });
program
  .command("ex <word>")
  .alias("c")
  .description("examples of a word")
  .action(word => {
    words.getExamples(word);
  });

program
  .command("syn <word>")
  .alias("d")
  .description("synonyms of a word")
  .action(word => {
    words.getSimilarWords("syn", word);
  });

program
  .command("ant <word>")
  .alias("e")
  .description("antyonoms of a word")
  .action(word => {
    words.getSimilarWords("ant", word);
  });


// console.log(process.argv);

program.parse(process.argv);
