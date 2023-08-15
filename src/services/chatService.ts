import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { config } from '../config';
import * as redis from 'redis';
import logger from '../logger';

const configuration = new Configuration({
  apiKey: config.api_key,
});

const openai = new OpenAIApi(configuration);

// Create a Redis client
const client = redis.createClient();

client.on("connect", () => {
  console.error(`Redis connected`);
});


client.on("error", (error) => {
  console.error(`Redis error: ${error}`);
});

const getMessagesForUser = async (userId: string): Promise<Array<object>> => {
  try {
    console.log(`No data found for userId: ${userId}`);
    const data = await client.get(userId);
    console.log(`No data found for userId: ${userId}`);
    if (!data) {
      console.log(`No data found for userId: ${userId}`);
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    console.log(`No data found for userId:}`);

    console.error(err);
    throw err;
  }
};

const saveMessagesForUser = async (userId: string, messages: Array<object>) => {
  try {
    await client.set(userId, JSON.stringify(messages));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteMessagesForUser = async (userId: string): Promise<void> => {
  try {
      await client.del(userId);
  } catch (err) {
      console.error(err);
      throw err;
  }
};

const getResponseFromGPT = async (userId: string, userMessage: string): Promise<string> => {
  try {
    if (client.isReady)
      logger.info("redis is ready")
    else {
      await client.connect();
    }


    const existingMessages = await getMessagesForUser(userId);
    const newMessageList = [...existingMessages, { role: "user", content: userMessage }] as ChatCompletionRequestMessage[];

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ "role": "system", "content": config.gpt_directice_v1 }, ...newMessageList],
    });

    const response = completion.data.choices[0].message;

    newMessageList.push({ role: response?.role || "assistant", content: response?.content });
    await saveMessagesForUser(userId, newMessageList);

    if(response?.content){
      deleteMessagesForUser(userId);
    }
    return response?.content || "There is error in our service please try again later";
  } catch (error) {
    logger.error("Error processing job:", error);
    throw error;
  }
};

export { getResponseFromGPT };
