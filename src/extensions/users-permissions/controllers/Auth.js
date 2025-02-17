// path: src/extensions/users-permissions/controllers/Auth.js

module.exports = {
    async register(ctx) {
      const { email, username, password } = ctx.request.body;
  
      // Generate a random token
      const token = require('crypto').randomBytes(20).toString('hex');
  
      // Create user with token
      const user = await strapi.query('user', 'users-permissions').create({
        username,
        email,
        password,
        confirmed: false,
        confirmationToken: token,
      });
  
      // Send confirmation email
      await strapi.plugins['email'].services.email.send({
        to: email,
        subject: 'Konfirmasi Email',
        text: `Silakan klik link berikut untuk mengkonfirmasi email Anda: http://localhost:1337/auth/email-confirmation?token=${token}`,
      });
  
      ctx.send({ message: 'Registrasi berhasil! Silakan cek email untuk konfirmasi.' });
    },
  
    async confirmEmail(ctx) {
      const { token } = ctx.query;
  
      const user = await strapi.query('user', 'users-permissions').findOne({ confirmationToken: token });
  
      if (!user) {
        return ctx.badRequest('Token tidak valid.');
      }
  
      // Confirm user
      await strapi.query('user', 'users-permissions').update({ id: user.id }, { confirmed: true, confirmationToken: null });
  
      ctx.send({ message: 'Email berhasil dikonfirmasi.' });
    },
  };