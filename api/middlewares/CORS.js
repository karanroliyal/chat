const cors = require('cors');

// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:4200'] // Whitelist the domains you want to allow
};

const CORS = cors(corsOptions);

module.exports = CORS