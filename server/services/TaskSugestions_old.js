const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

const suggestTask = async (userId) => {
  const interests = ['Fitness', 'Gaming', 'Yoga'];
  const prompt = `Generate task suggestions based on user interests. Interests are ${interests}. Provide a short title and a brief description (50 words max) for each task. Format the output as a JSON array of objects with "title" and "description" properties.`;

  console.log("Generating task suggestions...");

  try {
    const completion = await openai.chat.completions.create({
      model: "nvidia/llama-3.1-nemotron-70b-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1024,
      stream: true,
    });

    let responseContent = '';

    for await (const chunk of completion) {
      const chunkContent = chunk.choices[0]?.delta?.content || '';
      responseContent += chunkContent;
      process.stdout.write(chunkContent); // Optionally log streaming content
    }

    console.log("\nFinal response content:", responseContent);

    // Clean and parse the response
    const cleanAndParseTaskSuggestions = (responseContent) => {
      const match = responseContent.match(/\[.*?\]/s); // Extract JSON array portion
      if (!match) {
        console.error("No valid JSON array found in the response.");
        return [];
      }
      const jsonArrayString = match[0];
      try {
        const parsedData = JSON.parse(jsonArrayString);
        if (Array.isArray(parsedData)) {
          return parsedData;
        } else {
          throw new Error("Invalid format: Expected an array.");
        }
      } catch (error) {
        console.error("Error parsing JSON string:", error.message);
        return [];
      }
    };

    const parsedData = cleanAndParseTaskSuggestions(responseContent);
    console.log("Parsed task suggestions:", parsedData);

    return parsedData;
  } catch (error) {
    console.error("Error during OpenAI API call:", error.message);
    return [];
  }
};

module.exports = {
  suggestTask,
};