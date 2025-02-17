module.exports = {
  'users-permissions': {
    config: {
      register: {
        enabled: true,
      },
      email_confirmation: true, 
      email_confirmation_redirection: 'http://192.168.80.95:5173/email-confirmation',
    },
  },

  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: process.env.SMTP_HOST || 'mail.yourdomain.com',
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || 'your-email@yourdomain.com',
          pass: process.env.SMTP_PASS || 'your-email-password',
        },
      },
      settings: {
        defaultFrom: process.env.SMTP_FROM || 'your-email@yourdomain.com',
        defaultReplyTo: process.env.SMTP_FROM || 'your-email@yourdomain.com',
        emailConfirmation: {
          redirection: process.env.URL|| 'http://192.168.80.95:5173/email-confirmation',
        },
      },
    },
  },
};
