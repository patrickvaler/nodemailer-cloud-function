const nodemailer = require('nodemailer');
const isEmail = require('validator/lib/isEmail');

/**
 * Validates request body and sends email with nodemailer
 *
 * @param {Object} req request object
 * @param {Object} res response object
 */
function handlePOST(req, res) {
  const { name, from, message } = req.body;
  const { EMAIL_SUBJECT, EMAIL_TO, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER, SMTP_SECURE } = process.env;

  if (!(name && name.length >= 3)) {
    res.status(400).send({ error: 'Please enter a Name with at least 3 characters' });
  }

  if (!isEmail(from)) {
    res.status(400).send({ error: "Please enter your email address in format: 'yourname@example.com'" });
  }

  if (!(message && message.length >= 10)) {
    res.status(400).send({ error: 'Please enter a Message with at least 10 characters' });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD
    }
  });

  const options = {
    from: `${name} <${from}>`,
    to: EMAIL_TO,
    subject: EMAIL_SUBJECT,
    text: message
  };

  transporter.sendMail(options, error => {
    if (error) {
      res.status(422).send({ error: 'E-Mail delivery is failed' });
    }

    res.sendStatus(200);
  });
}

/**
 * Enables CORS headers
 *
 * @param {Object} req request object
 * @param {Object} res response object
 */
function cors(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');

  if (req.method == 'OPTIONS') {
    res.sendStatus(204);
  }
}

/**
 * Exposed mailHttp cloud function
 *
 * @param {Object} req request object
 * @param {Object} res response object
 */
exports.mailHttp = (req, res) => {
  cors(req, res);

  switch (req.method) {
    case 'POST':
      handlePOST(req, res);
      break;
    default:
      res.sendStatus(405); // Method Not Allowed
      break;
  }
};
