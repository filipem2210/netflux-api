const Mail = require('../lib/Mail');

module.exports = {
  key: 'RegistrationMail',
  options: {
    priority: 1,
  },
  async handle({ data }) {
    const { email } = data;

    await Mail.sendMail({
      from: 'Netflux <netflux@netflux.com>',
      to: `User <${email}>`,
      subject: 'Cadastro de usuário',
      html: 'Cadastro efetuado com sucesso',
    });
  },
};
