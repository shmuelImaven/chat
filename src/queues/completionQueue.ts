import Queue from 'bull';
import { Configuration, OpenAIApi } from 'openai';
//import redis from 'redis';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
//const redisClient = redis.createClient();

const completionQueue = new Queue('completions');

completionQueue.process(async (job, done) => {
  try {
    if (!job.data || !job.data.message) {
      console.error("Job data is invalid:", job.data);
      return done(new Error("Job data is invalid"));
    }
    
    const userMessage = job.data.message;
    console.log("Processing message:", userMessage);

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: userMessage,
      max_tokens: 50,
    });

    const response = completion.data.choices[0]?.text?.trim() ?? "Default response";
    console.log("Response from OpenAI:", response);

    // Uncomment the line below when you want to use Redis for caching
    // redisClient.setex(userMessage, 3600, JSON.stringify(response));

    done(null, response);
  } catch (error) {
    console.error("Error processing job:");
    done(error as Error);
  }
});

export default completionQueue;