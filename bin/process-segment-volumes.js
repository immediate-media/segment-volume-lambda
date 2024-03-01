const { processor } = require('../lib/processor');

require('dotenv').config();

(async () => {
    try {
        await processor();
    } catch (error) {
        console.error(error);
    }
})();
