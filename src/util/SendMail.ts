import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';

dotenv.config();
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    service: process.env.MAIL_SERVICE,
    port: 587,
    secure: true,
    auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASSWORD,
    },
});

const handlebarOptions = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.resolve('src/view/template'),
      defaultLayout: false,
    },
    viewPath: path.resolve('src/view/template'),
    extName: '.hbs',
};
export const testSendMail = async (email: string, subject = 'TEST', title = 'LONG'):Promise<boolean> => {
    try {
        const mailOptions = {
            from: `"${title}" <${process.env.MAIL_ACCOUNT}>`,
            to: email,
            subject,
            template: 'test',
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transporter.use('compile', hbs(handlebarOptions as any));
        await transporter.sendMail(mailOptions);
        return true;
    } catch(error) {
        console.error(error);
        return false;
    }
};