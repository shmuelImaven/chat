import api from 'api';
import { config } from '../config';
import logger from '../logger';

const sdk = api('@writesonic/v2.2#4enbxztlcbti48j');
sdk.auth(config.sonic_api_key);
async function chatSonicFunction(messege:string): Promise<void> {
  try {
    logger.info("chatSonicFunction - > messege",messege)

    const response = await sdk.chatsonic_V2BusinessContentChatsonic_post(
      {
        enable_google_results: 'true',
        enable_memory: false,
        input_text: messege
      }, 
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
