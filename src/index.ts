import processor from './Controller/processingController';
import * as dotenv from 'dotenv';

dotenv.config();

export const handler = async () => {
    try {
        await processor.process();
    } catch (error) {
        console.error(error);
    }
};
