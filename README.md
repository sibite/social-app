[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/sibite/social-app">
    <img src="public/logo192.png" alt="Logo" width="80" height="80">
  </a>
<h2 align="center">Social App</h3>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

Inspired by Facebook

[![App Screen Shot][product-screenshot]](https://social.davrostek.com)

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- Node.js

### Preparation

1. Clone the repo
   ```sh
   git clone https://github.com/sibite/social-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Development

1. Start the React app
   ```sh
   npm start
   ```
2. Start the server in watch mode
   ```sh
   npm run server
   ```

### Production

1. Create your own ACCESS_TOKEN_SECRET in <a href="#configuration">configuration file</a>
2. Build the app and server
   ```sh
   npm run build
   ```
3. Start the app
   ```sh
   npm run start-build
   ```

<a name="configuration"></a>

### Configuration

1. Copy file `server/config/config.default.ts` and rename it to `config.dev.ts` or `config.prod.ts` depending on which config you want to create
2. Edit variables to match your needs

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/sibite/social-app.svg?style=for-the-badge
[contributors-url]: https://github.com/sibite/social-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/sibite/social-app.svg?style=for-the-badge
[forks-url]: https://github.com/sibite/social-app/network/members
[stars-shield]: https://img.shields.io/github/stars/sibite/social-app.svg?style=for-the-badge
[stars-url]: https://github.com/sibite/social-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/sibite/social-app.svg?style=for-the-badge
[issues-url]: https://github.com/sibite/social-app/issues
[license-shield]: https://img.shields.io/github/license/sibite/social-app.svg?style=for-the-badge
[license-url]: https://github.com/sibite/social-app/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: readme/screenshot.png
