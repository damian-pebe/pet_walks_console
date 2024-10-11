const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

exports.helloWorld = onRequest((request, response) => {
  logger.info("Starting logs:", { structuredData: true });
  response.send("This is the first function of PetWalks Console Dashboard");
});

