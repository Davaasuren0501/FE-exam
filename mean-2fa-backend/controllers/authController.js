const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if( !email || !password ) {
        return res.status(400).json(
            { 
                success: false
                , message: "User email and password are required" 
            }
        );
    }

    const userExist = await User.findOne({ email });
    if( userExist ) {
        return res.status(401).json(
            {
                success: false
                , message: "Email is already registered."
            }
        );
    }

    try {
        const userCreated = await User.create({ email, password });
        
        const tokenUser = userCreated.getJWToken();
        res.status(200).json(
            {
                success: true
                , user: userCreated
                , token : tokenUser 
            }
        );
    } catch (error) {
        return res.status(500).json(
            { 
                success: false
                , message: error.message 
            }
        );
    }
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
        return res.status(400).json(
            { 
                success: false
                , message: "User email and password are required" 
            }
        );
    }
  
    const userLogin = await User.findOne({ email });
  
    if (!userLogin) {
        return res.status(401).json(
            {
                success: false
                , message: "User undefined. Check email and try again"
            }
        );
    }
  
    const ok = await userLogin.checkPassword(password);
  
    if (!ok) {
        return res.status(401).json(
            {
                success: false
                , message: "Please enter your email and password correctly"
            }
        );
    }
  
    const tokenUser = userLogin.getJWToken();

    res.status(200).json({
        success: true
        , token : tokenUser 
        , user: userLogin
    });
});

exports.setup2FA = asyncHandler(async (req, res) => {
    try {
        // console.log('====================================');
        // console.log( "setup2FA" );
        // console.log( req.user );
        // console.log('====================================');

        const user = await User.findById( req.user.id );
        const secret = speakeasy.generateSecret();
        
        user.twoFactorSecret = secret.base32;
        user.twoFactorEnabled = true;

        await user.save();
        console.log( secret.otpauth_url );
        const otpauthUrl = secret.otpauth_url;

        const qrCode = await QRCode.toDataURL(otpauthUrl);

        const transporter = nodemailer.createTransport(
            {
                service: 'gmail'
                , auth: {
                    user: process.env.EMAIL_USER
                    , pass: process.env.EMAIL_PASS
                }
            }
        );

        const qrCodeBuffer = Buffer.from(qrCode.split(",")[1], "base64");

        let info = await transporter.sendMail(
            {
                from: process.env.EMAIL_USER
                , to: user.email
                , subject: 'Your 2FA QR Code'
                , html: `
                    <div>
                        <img src="cid:qr_otp" />
                    </div>
                `,
                attachments: [
                    {
                        filename: "qrcode.png" 
                        , content: qrCodeBuffer
                        , cid: "qr_otp" 
                    }
                ]
            }
        );

        console.log( info.messageId );

        res.status(200).json(
            {
                success: true
                , message: "Email sent"
            }
        );
    } catch (error) {

        console.log( error );

        res.status(500).json(
            {
                success: false
                , message: "Error setting up 2FA"
            }
        );
    }
});

exports.verifyOTP = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    const user = await User.findById(req.user.id);

    const verified = speakeasy.totp.verify(
        {
            secret: user.twoFactorSecret
            , encoding: 'base32'
            , token: otp
        }
    );

    console.log( verified );
    if (verified) {
        res.status(200).json({ message: '2FA verified successfully.' });
    } else {
        res.status(400).json({ error: 'Invalid OTP davaa.' });
    }
});