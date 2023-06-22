import nodemailer from 'nodemailer'
import config from '.';
export const transporter = nodemailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
        user: config.emailUser,
        pass: config.emailPassword
    },
});