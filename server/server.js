const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const functions = require("firebase-functions");
var admin = require("firebase-admin");

const port = process.env.PORT || 4000;

var serviceAccount = require("./firebaseSDK.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
app.locals.db = db;
const auth = admin.auth();
app.locals.auth = auth;



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


//Routes
const userRouter = require("./routes/user.js");
app.use("/api/user", userRouter);


app.listen(port, () => {
	console.log(`Server is running on port ${port}`
	);
});

exports.api = functions.region("europe-west1").https.onRequest(app);
