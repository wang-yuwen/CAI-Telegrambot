const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');
const fs = require('fs');
const {HarmBlockThreshold, HarmCategory} = require('@google/generative-ai')
const {GoogleAiToken, language} = require('../settings');

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GoogleAiToken);  


// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

const GeminiPrompt = function() {
  if (language == 'en') 
  {return `Describe this picture in detail`}
  else if (language == 'ru') 
  {return `Что на этом изображении? Предоставь подробное описание`}}    
          
const GeminiError = function() {
  if (language == 'en') {return `No words can describe what you see. Or what you think you see.`}
  else if (language == 'ru') {return 'Никакие слова не могут описать того, что вы видите. Или того, что вы думаете, что видите.'}} 


async function run(outputpath) {
try {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision", safetySettings: safetySettings});
  const imageParts = [fileToGenerativePart(outputpath, "image/jpeg")];
  const result = await model.generateContent([GeminiPrompt(), ...imageParts]);
  const response = await result.response;
  const text = response.text();
return text}
catch {return GeminiError()}
}


const downloadImage = async (imageUrl, outputPath) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    response.data.pipe(fs.createWriteStream(outputPath));

    return new Promise((resolve, reject) => {
      response.data.on('end', () => {
        resolve();
      });

      response.data.on('error', (err) => {
        reject(err);
      });
    });
  } catch (error) {
    throw new Error(`Error downloading the image: ${error}`);
  }
};

var numb = (function(n) {
  return function() {
    n += 1;
    return n;
  }
}(0));

async function askgemini(prompt1) {
try {
  const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });
  const prompt = `${prompt1}`;
  const result = await model.generateContent([prompt]);
  const response = await result.response;
  const text = `${response.text()}`
return `${text}`}
catch {return 'Error'}
}




module.exports = {run, downloadImage, numb, askgemini}