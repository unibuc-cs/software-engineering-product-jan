const importDynamic = new Function("modulePath", "return import(modulePath)");

async function taskRecommender() {
    const { Client } = await importDynamic("@gradio/client");

    const prompt = '{"user_interests": ["fitness", "food", "community"], "past_tasks": [{"title": "Led group runs", "description": "Organized weekly jogs."}, {"title": "Tried meal prep", "description": "Cooked for a full week."}, {"title": "Joined charity walks", "description": "Helped fundraise for causes."}]}';

    const client = await Client.connect("raduqus/llm_test2");
    const result = await client.predict("/infer", { 		
        prompt: prompt, 		
        seed: 0, 		
        randomize_seed: true, 		
        max_new_tokens: 150, 		
        temperature: 0.4, 		
        top_p: 0.1, 
    });

    // Parse the response
    let parsedResponse = [];
    try {
        // The result.data contains a stringified array; we first parse it as JSON
        parsedResponse = JSON.parse(result.data[0]);
    } catch (error) {
        console.error("Error parsing response:", error);
    }

    console.log(parsedResponse); // Logs the parsed array of task objects
    return parsedResponse;
}

module.exports = {
    taskRecommender,
    importDynamic
};
