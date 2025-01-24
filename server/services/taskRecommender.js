const importDynamic = new Function("modulePath", "return import(modulePath)");

async function taskRecommender(userId, Db) {
  const { Client } = await importDynamic("@gradio/client");

  // --- Fetch user activities ---
  const activitiesRef = Db.collection("activities");
  let activities = [];
  try {
    const snapshot = await activitiesRef.where("user_id", "==", userId).get();
    snapshot.forEach((doc) => activities.push(doc.data()));
  } catch (error) {
    throw new Error(`Error fetching activities: ${error.message}`);
  }

  // Format past tasks
  const pastTasks = activities.map((activity) => ({
    title: activity.title,
    description: activity.description,
  }));
  const limitedTasks = pastTasks.length > 3 ? pastTasks.slice(0, 3) : pastTasks;
  const pastTasksString = JSON.stringify(limitedTasks);

  // --- Fetch user interests ---
  let userInterests = [];
  try {
    const userDoc = await Db.collection("users").doc(userId).get();
    const userData = userDoc.data();
    userInterests = userData?.interests || [];
  } catch (error) {
    throw new Error(`Error fetching user interests: ${error.message}`);
  }
  const userInterestsString = JSON.stringify(userInterests);

  // --- Construct prompt ---
  const prompt = `{"user_interests": ${userInterestsString}, "past_tasks": ${pastTasksString}}`;

  // --- Generation parameters ---
  const genParams = {
    prompt,
    seed: 0,
    randomize_seed: true,
    max_new_tokens: 100,
    temperature: 0.8,
    top_p: 0.85,
  };

  // --- Gradio inference with retry ---
  let inferenceResult = null;
  try {
    inferenceResult = await runInferenceWithRetry(genParams);
  } catch (error) {
    throw new Error(`Error during inference: ${error.message}`);
  }

  // --- Parse JSON with retry ---
  let parsedResponse = [];
  try {
    parsedResponse = await parseResponseWithRetry(inferenceResult, genParams);
  } catch (error) {
    throw new Error(`Error parsing response after multiple attempts: ${error.message}`);
  }

  return parsedResponse;
}

/**
 * Helper to run inference with decreasing temperature on failures.
 */
async function runInferenceWithRetry(params) {
  const { Client } = await importDynamic("@gradio/client");
  let temperature = params.temperature;
  const client = await Client.connect("raduqus/llm_test2", {
    hf_token: process.env.HF_API_TOKEN,
  });

  while (temperature > 0.1) {
    try {
      return await client.predict("/infer", params);
    } catch (err) {
      console.error(`Inference failed at temperature ${temperature}. Retrying...`);
      temperature -= 0.1;
      params.temperature = temperature;
    }
  }
  throw new Error("All inference retries failed.");
}

/**
 * Helper to parse possibly malformed JSON with retry by re-inference at lower temperature.
 */
async function parseResponseWithRetry(inferenceResult, params) {
  let temperature = params.temperature;
  while (temperature > 0.1) {
    try {
      const correctedData = fixMalformedJSON(inferenceResult.data[0]);
      return JSON.parse(correctedData);
    } catch (err) {
      console.error(`Parsing failed at temperature ${temperature}. Retrying inference...`);
      temperature -= 0.1;
      params.temperature = temperature;

      // Re-run inference at lower temperature
      const { Client } = await importDynamic("@gradio/client");
      const client = await Client.connect("raduqus/llm_test2", {
        hf_token: process.env.HF_API_TOKEN,
      });
      inferenceResult = await client.predict("/infer", params);
      console.log(`Inference successful at temperature ${temperature}.`);
    }
  }
  throw new Error("All parse retries failed.");
}

/**
 * Fix simple formatting issues in the JSON string.
 */
function fixMalformedJSON(jsonStr) {
  // Add missing commas before "description"
  return jsonStr.replace(/," *"description"/g, ',"description"');
}

module.exports = {
  taskRecommender,
  importDynamic,
};
