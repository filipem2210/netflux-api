<h1 align="center">Netflux API</h1>

<p align="center">Netflux clone with backend, frontend and mobile using Node.js, ReactJS and React Native</p>

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Netflux&uri=https%3A%2F%2Fgithub.com%2Ffilipem2210%2Fnetflux-api%2Fblob%2Fmaster%2Finsomnia-netflux-button.json)

## :computer: Technologies

* [Node.js](https://nodejs.org/en/)
* [Express](https://www.npmjs.com/package/express)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [Bull](https://www.npmjs.com/package/bull)
* [Celebrate](https://www.npmjs.com/package/celebrate)
* [Compression](https://www.npmjs.com/package/compression)
* [Connect Redis](https://www.npmjs.com/package/connect-redis)
* [Cors](https://www.npmjs.com/package/cors)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Express Session](https://www.npmjs.com/package/express-session)
* [Helmet](https://www.npmjs.com/package/helmet)
* [JWT](https://www.npmjs.com/package/jsonwebtoken)
* [Morgan](https://www.npmjs.com/package/morgan)
* [MySQL](https://www.npmjs.com/package/mysql2)
* [Nodemailer](https://www.npmjs.com/package/nodemailer)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Rate Limiter Flexbile](https://www.npmjs.com/package/rate-limiter-flexible)
* [Redis](https://www.npmjs.com/package/redis)
* [Sentry](https://www.npmjs.com/package/@sentry/node)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [VS Code](https://code.visualstudio.com/) with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Docker](https://www.docker.com/products/docker-desktop) and [Yarn v1.22.4](https://yarnpkg.com/) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/filipem2210/netflux-api

# Go into the repository
$ cd netflux-api

# Rename .env.example file to .env and change the environment variables
# Install OpenSSL (https://chocolatey.org/packages/OpenSSL.Light)
# Run the commands below, with the same SECRET_KEY from .env file:
$ openssl genrsa -des3 -out private.pem 2048
$ openssl rsa -in private.pem -outform PEM -pubout -out public.pem

# Run the app
$ yarn dev
```

## :memo: License

This project is under the MIT license. See the [LICENSE](https://github.com/filipem2210/netflux-api/blob/master/LICENSE) for more information.

## :mortar_board: Author

| [<img src="https://avatars0.githubusercontent.com/u/47154367?s=115&u=193d66853bbf18dc0536b05ad10740931fa68642&v=4"><br><sub>@filipem2210</sub>](https://github.com/filipem2210) |
| :---: |
