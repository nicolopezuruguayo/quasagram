/*
  dependencies
*/

const express = require("express");

const admin = require("firebase-admin");
let inspect = require("util").inspect;
let Busboy = require("busboy");
let path = require("path");
let os = require("os");
let fs = require("fs");

/*
  config - express
*/

const app = express();

/*
  config - firebase
*/

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://quasagram-8c4b2.appspot.com"
});

const db = admin.firestore();
let bucket = admin.storage().bucket();

/*
  endpoint - posts
*/

app.get("/posts", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let posts = [];
  db.collection("posts")
    .orderBy("date", "desc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        posts.push(doc.data());
      });
      response.send(posts);
    });
});

/*
  endpoint - createPost
*/

app.post("/createPost", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  var busboy = new Busboy({ headers: request.headers });

  let fields = {};

  busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
    console.log(
      "File [" +
        fieldname +
        "]: filename: " +
        filename +
        ", encoding: " +
        encoding +
        ", mimetype: " +
        mimetype
    );
    file.on("data", function(data) {
      console.log("File [" + fieldname + "] got " + data.length + " bytes");
    });
    file.on("end", function() {
      console.log("File [" + fieldname + "] Finished");
    });
  });

  busboy.on("field", function(
    fieldname,
    val,
    fieldnameTruncated,
    valTruncated,
    encoding,
    mimetype
  ) {
    fields[fieldname] = val;
  });

  busboy.on("finish", function() {
    db.collection("posts")
      .doc(fields.id)
      .set({
        id: fields.id,
        caption: fields.caption,
        location: fields.location,
        date: parseInt(fields.date),
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/quasagram-8c4b2.appspot.com/o/5tUZBEy.jpg?alt=media&token=ca614ade-6685-499c-a445-649f177238f6"
      });
    response.send("done parsing form");
  });

  request.pipe(busboy);
});

/*
  listen
*/

app.listen(process.env.PORT || 3000);
