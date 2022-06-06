const QuestionsRepository = require('../src/repositories/questions');
const { getImageFromLetter } = require('../src/helpers/sign-language-images');

const getAlphabet = () => {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  return alphabet;
};

// Get randomizd integer from 0 to number-1
const getRandomizedIntegerFromZero = (number) => Math.floor(Math.random() * number);

const generateChoices = (correctAlphabetIdx) => {
  let correctChoiceIdx = getRandomizedIntegerFromZero(4);
  const isChoicesSelected = [false, false, false, false];
  isChoicesSelected[correctChoiceIdx] = true;
  const choices = [];
  for (let i = 0; i < 4; i += 1) {
    let index = correctAlphabetIdx - correctChoiceIdx;
    if (index > 25) index = 0 - correctChoiceIdx;
    else if (index < 0) index = 26 - correctChoiceIdx;
    choices.push(index);
    correctChoiceIdx -= 1;
  }
  return choices;
};

const generateQuestions = () => {
  const questions = [];
  const alphabet = getAlphabet();
  for (let i = 0; i < alphabet.length; i += 1) {
    const choices = generateChoices(i);
    const questionWithImage = {
      text: 'Huruf apa yang direpresentasikan oleh gambar bahasa isyarat ini?',
      image: getImageFromLetter(alphabet[i]),
      first_choice: alphabet[choices[0]],
      second_choice: alphabet[choices[1]],
      third_choice: alphabet[choices[2]],
      fourth_choice: alphabet[choices[3]],
      correct_answer: alphabet[i],
    };

    const questionWithoutImage = {
      text: `Gambar mana yang merupakan huruf ${alphabet[i]}?`,
      image: null,
      first_choice: getImageFromLetter(alphabet[choices[0]]),
      second_choice: getImageFromLetter(alphabet[choices[1]]),
      third_choice: getImageFromLetter(alphabet[choices[2]]),
      fourth_choice: getImageFromLetter(alphabet[choices[3]]),
      correct_answer: getImageFromLetter(alphabet[i]),
    };

    questions.push(questionWithImage);
    questions.push(questionWithoutImage);
  }
  return questions;
};

const questionsRepository = new QuestionsRepository();
questionsRepository.createBatch(generateQuestions());
