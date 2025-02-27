const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();
const port =  4000;

const serviceAccount = require("./firebaseSDK.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
app.locals.db = db;
const auth = admin.auth();
app.locals.auth = auth;

db.settings({ ignoreUndefinedProperties: true })

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


//Routes
const userRouter = require("./routes/user.js");
const activitiesRouter = require("./routes/activities.js");
const recommenderRouter = require("./routes/recommender.js");
const friendsRouter = require("./routes/friends.js");

app.use("/api/user", userRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/recommender", recommenderRouter);
app.use("/api/friends", friendsRouter);


// app.listen(port,'0.0.0.0' ,() => {
// 	console.log(`Server is running on port ${port}`
// 	);
// });

// exports.api = functions.https.onRequest(app);

module.exports = app;