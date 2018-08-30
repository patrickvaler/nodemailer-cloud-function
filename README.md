# nodemailer-cloud-function

Serverless NodeJS cloud function to send emails with [nodemailer](https://github.com/nodemailer/nodemailer).

Run this cloud function with [Google Cloud Function](https://cloud.google.com/functions/)

# Environment Variables

| Environment Variable | Example                 |
| -------------------- | ----------------------- |
| `EMAIL_TO`           | example@mail.com        |
| `EMAIL_SUBJECT`      | Message from Nodemailer |
| `SMTP_USER`          | my-username             |
| `SMTP_PASSWORD`      | my-secure-password      |
| `SMTP_HOST`          | smtp.gmail.com          |
| `SMTP_PORT`          | 465                     |
| `SMTP_SECURE`        | true                    |
