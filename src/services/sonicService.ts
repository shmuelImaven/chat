import api from 'api';
import { config } from '../config';
import logger from '../logger';

const sdk = api('@writesonic/v2.2#4enbxztlcbti48j');
sdk.auth(config.sonic_api_key);
async function chatSonicFunction(messege:any): Promise<void> {

  try {
    logger.info("chatSonicFunction")
    const data = {
      prompt: config.sonic_directive,
      max_tokens: 500,
      temperature: 0.8,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop_sequences: ["\n"],
      instructions: {
          task: "product_recommendation",
          criteria: "best_fit",
          no_references: true
      },
      enable_google_results: true,
      enable_memory: false,
      input_text: messege
  };
  //test
    const response = await sdk.chatsonic_V2BusinessContentChatsonic_post(
      data,
      {
        engine: 'premium',
        language: 'en',
        headers: {
            Authorization: `${config.sonic_api_key}`
          }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export { chatSonicFunction };
