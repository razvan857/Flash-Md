const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUhMYUpmdTRJMFM2RXE3azdlSzBvTC9zS1VWUjl2MFpNN0x3cVRkZHVIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK05nZlluRVRnKzFZR3QrTzRUajhVQ29heWZCQml1NVNOY25ncER3UVVuQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXS29pVGFaL3lFZ1Fyc1M1UUZNb2VqekpXbHRNTUF1aHROb1BRK0RqWFVjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrdEJIbG5USEh3dFl3dFcrZm9jc2hBTTVxcmpzNlV5R2pqaktCVDBNWkFzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFGM3RsSjhEZTQ0WDVZcS9FS2N6VE8wKzhCMzZjYmdsWWNuVyttYVlmMjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFsVm44T1ZSclNVcG5VS2piL1NMb01VNWRVVm9hVnIwUFYvUnlYdGJSQVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0JBOVpOYnlKdVVhS2dTenNreXp5OEF0Ymx4QkVDaURCYVFRNWFrRCtHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkxaclZ3WG9iT0RzVGFJVHVnVGR3dE9Qajk0Zjd2cFBKZExUdVFrS1BGWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBRWUo5WHJoTUhJT2VRNklZcnpRMk9nVjkzS2ZMT2R6UHlQVkZjZkF1TWxlMVlLZ2RrWGN1VmwxUFNZQm94L1RJU1N2N3hlMkdnMlpSQmZVNCtISkN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIsImFkdlNlY3JldEtleSI6IlBWbmRETVFGbEFmb2V2YVArVC8yOXQ1WXJIeHpzdTNFM0dycWE1eUpobU09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNjI4MjEyMDQ2MDYyM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUU2NjA4OTEyNThENzQzOEYzRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM5NDcyNzkwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnRU42T1pFYlRqU3p0eUVPcmNKSlZnIiwicGhvbmVJZCI6IjNiNDRkMjQzLTQ0NTktNGE4ZC05ODhhLWM3MjlmNWY5ZjllMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4M0lUNmFpV3JOQTJGTkNZMC9BeTh5V21BeUE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNHNkRUN5N21hSFZRczVHdHVqQkowVUhGYUFnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRBTTE0RjFOIiwibWUiOnsiaWQiOiI2MjgyMTIwNDYwNjIzOjYzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkJ5dGVHaG9zdCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUC9TMDVZRUVJYi91TDBHR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoiaklwd2E4ZXh0SE5adGIzZlFIUmZkd1J3NVU3bXBWSkRwNEJNZXBMa2trdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMit4YlpoSDB5KzZKbm1Vb2JqRVZOK3o4NEltdXl0QlBmajAvSVV4S0xVVkp3MUh4MGt6bTlhRlBaWEtJS0xSZTNhNnZwK1dPWERMYzJuQWEvdldYQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6Ik5pTGVCaFdVZFAwbCtLUDdPZWRHNDZySGt1T2ZzOTMxN1JLY05CZGM1VWx1cWc3ZDAvMGhLdkh1L2gzOWJNNGtRYmZMVUlqRHZTSmpvK05jTi9kWENnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNjI4MjEyMDQ2MDYyMzo2M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZeUtjR3ZIc2JSeldiVzkzMEIwWDNjRWNPVk81cVZTUTZlQVRIcVM1SkpNIn19XSwicGxhdGZvcm0iOiJzbWJpIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM5NDcyNzg2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBXayJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "ByteGhost",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "6282120460623",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
