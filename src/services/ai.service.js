const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});
async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents : contents,
    config:{
        systemInstruction : `
        You are an expert in caption writing.
        You generate single caption for the image.
        Your caption should be short and concise .
        You should not generate any other text.
        Make use of the hastags and emojis where ever you can
        `
    }
    
  });

  return response.text;
}

module.exports = generateCaption;
