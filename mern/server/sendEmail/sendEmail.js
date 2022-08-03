const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const express = require("express");
const Routes = express.Router();

// These id's and secrets should come from .env file.
const CLIENT_ID = '273943404806-d02c8o3t8digk1bjq15hifdl8e6fbkm3.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//049q-gbjL1CR0CgYIARAAGAQSNwF-L9IrYXz9Rff91SVFtEnAOQxGRD9rndAQxIfalIT83TCOTFX_wg1TkpZWIpiqBoVtAmzQlGU';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail({username, password, email, mobile, InitialAmount}) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'nehora20@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: email,
      to: 'nehora20@gmail.com',
      subject: 'Request for create Account',
      text:`user Name: ${username}
            password: ${password}
            mobile: ${mobile}
            Initial Amount: ${InitialAmount} $
            go to our site to accept this request!`,

    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }

}
Routes.route('/email/').post(function (req, res) {
  console.log(req.body.email);
  sendMail(req.body)
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));
});

module.exports = Routes;



