import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  scrict: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, scrict, { expiresIn });
};

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'hasansanim562@gmail.com',
      pass: 'hory tbtc xvjh ldmr',
    },
  });

  await transporter.sendMail({
    from: 'hasansanim562@gmail.com', // sender address
    to,
    subject: 'please reset your password in 8 minit', // Subject line
    text: '', // plain text body
    html,
  });
};
cloudinary.config({
  cloud_name: 'dap77vbim',
  api_key: '248535154519181',
  api_secret: '<your_api_secret>', // Click 'View API Keys' above to copy your API secret
});
export const sendImageToCloudinary = (imageName: string, path: string) => {
  console.log(imageName, path);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName,
      },
      function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
  // Upload an image
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
