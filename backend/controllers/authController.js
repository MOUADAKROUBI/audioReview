require('dotenv').config();
const axios = require('axios');

const lfClientID = process.env.LF_CLIENT_ID;
const lfClientSecret = process.env.LF_CLIENT_SECRET;
const backendURL = process.env.BACKEND_URL;

const auth = (req, res) => {
    const consentScreen = `https://app.lightfunnels.com/admin/oauth?client_id=${lfClientID}&redirect_uri=${backendURL}/auth/redirect&scope=funnels`

    return res.redirect(consentScreen);
}

const redirect = async (req, res) => {
    const code = req.query.code; // assuming the authorization code is passed as a query parameter

    try {
        const response = await axios.post('https://api.lightfunnels.com/oauth/access', {
            client_id: lfClientID,
            client_secret: lfClientSecret,
            code: code
        });

        const accessToken = response.data.access_token;
        console.log(accessToken);
        res.redirect(process.env.FRONTEND_URL);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving access token');
    }
}

module.exports = {
    auth,
    redirect
};
