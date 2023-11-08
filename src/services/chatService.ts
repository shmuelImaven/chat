import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { config } from '../config';
import logger from '../logger';
import { redisClient } from '../app';

const configuration = new Configuration({
  apiKey: config.api_key,
});

const openai = new OpenAIApi(configuration);

const getMessagesForUser = async (userId: string): Promise<Array<object>> => {
  try {
    logger.info(`try to get messeges for  ${userId}`);
    const data = await redisClient.get(userId);
    if (!data) {
      logger.info(`No data found for userId: ${userId}, adding new key`);
      return [];
    }

    return JSON.parse(data);
  } catch (err) {
    logger.error('--------'+err);
    throw err;
  }
};

const saveMessagesForUser = async (userId: string, messages: Array<object>) => {
  try {
    logger.info('try reddis use: ' + userId);
    await redisClient.set(userId, JSON.stringify(messages));
  } catch (err) {
    logger.error('=========',err);
    throw err;
  }
};

const deleteMessagesForUser = async (userId: string): Promise<void> => {
  try {
      await redisClient.del(userId);
  } catch (err) {
      logger.error('!!!!!!!',err);
      throw err;
  }
};

const getResponseFromGPT = async (userId: string, userMessage: string): Promise<string> => {
  try {
    if (redisClient.isReady)
      logger.info("redis is ready")
    else {
      await redisClient.connect();
    }

    const existingMessages = await getMessagesForUser(userId);
    
    const newMessageList = [...existingMessages, { role: "user", content: userMessage }] as ChatCompletionRequestMessage[];
    logger.info("send messege for openai")

    const completion = await openai.createChatCompletion({
      model: "gpt-4-1106-preview",
      messages: [{ "role": "system", "content": config.gpt_directive }, ...newMessageList],
    });
    logger.info("sent messege for openai")

    const response = completion.data.choices[0].message;

    logger.info(completion.data.choices[0].message)
    newMessageList.push({ role: response?.role || "assistant", content: response?.content });
    await saveMessagesForUser(userId, newMessageList);

    if(response?.content?.includes("[qtype: Summary]")){
      deleteMessagesForUser(userId);
    }
    return response?.content || "There is error in our service please try again later";
  } catch (error) {
    logger.error("Error processing job:", error);
    throw error;
  }
};

export { getResponseFromGPT };
  export function createConversation(userId: any, recommendation?: any) {
    throw new Error('Function not implemented.');
  }

