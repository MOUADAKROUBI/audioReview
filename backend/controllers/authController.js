require("dotenv").config();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { db } = require("../firebase.js");
const { collection, getDocs, query, where, addDoc } = require("firebase/firestore");

const lfClientID = process.env.LF_CLIENT_ID;
const lfClientSecret = process.env.LF_CLIENT_SECRET;
const backendURL = process.env.BACKEND_URL;

// request the account id from the LightFunnels
const getAccountIDFromLightfunnles = async (accessToken) => {
  try {
    // add authorization header to the request
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const response = await axios.post(
      "https://services.lightfunnles.com/api2",
      {
        query: `
          query accountQuery {
              account {
                  id
              }
          }
        `,
      }
    );

    return response.data.data.account.id;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving account ID from Lightfunnles");
  }
};

const auth = async (req, res) => {
  const consentScreen = `https://app.lightfunnels.com/admin/oauth?client_id=${lfClientID}&redirect_uri=${backendURL}/auth/redirect&scope=funnels`;

  return res.redirect(consentScreen);
};

const redirect = async (req, res) => {
  const code = req.query.code; // assuming the authorization code is passed as a query parameter

  try {
    const response = await axios.post(
      "https://api.lightfunnels.com/oauth/access",
      {
        client_id: lfClientID,
        client_secret: lfClientSecret,
        code: code,
      }
    );

    const accessToken = response.data.access_token;
    if (accessToken) {
      // const lfAccountID = await getAccountIDFromLightfunnles(accessToken);
      // check if the account is already in the database
      const q = query(collection(db, "accounts"), where("lf_token", "==", accessToken));

      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 0) {
        // if the account is not in the database, add it
        await addDoc(collection(db, "accounts"), {
          lf_id: response.data.account_id,
          audios: [],
          lf_token: accessToken,
          status: "INSTALLED",
        });     
      }
    }

    // create a jwt access token
    const jwtAccessToken = jwt.sign(
      { account_id: response.data.account_id },
      process.env.JWT_SECRET
    );

    // redirect to the frontend with the jwt access token
    return res.redirect(`${process.env.FRONTEND_URL}/?token=${jwtAccessToken}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving access token");
  }
};

module.exports = {
  auth,
  redirect,
};
