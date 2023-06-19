# Vue js 3 Minimal Starter

Look at the [Vue 3 documentation](https://vuejs.org/) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```
#### Then you need to create a .env.production file name (for building project) and .env.development file name (for developing project) file in root of the project and add these keys and your values

```
API_BASE=xxx    => api url
COOKIE_NAME=x_hyper_x => just a name
VERSION=0.0.9
```
## Development Server

Start the development server on `http://localhost:9000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```