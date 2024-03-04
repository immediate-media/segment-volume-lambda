import { processor } from './processor';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {
    try {
        await processor();
    } catch (error) {
        console.error(error);
    }
})();
