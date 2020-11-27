const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.posts = functions.https.onRequest((request, response) => {
  // functions.logger.info("Hello logs!", {structuredData: true});
  // response.send("Hello from Firebase!");
  let posts = [
    {
      caption: "Cristo Redentor",
      location: "Rio de Janeiro , Brasil"
    },
    {
      caption: "Cataratas Falls",
      location: "Foz do Iguaçu, Brasil"
    }
  ];

  request.send(posts);
});
