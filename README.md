# flat-starterkit

Creates a simple one page website or landing page. The starterkit includes Sass and ES6 compilation, as well as Browsersync for a local server and hot-reloading.

## Installing / Getting started

This is the bare minimum to get the project running in development mode. For a more detailed explanation, [see below](#development).

```shell
npm install
npm run debug
```

The first command will install all the necessary dependencies for the project. The second command will build your project to the `./dist` directory and display it in the browser in development mode.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/) - v7.6.0+

### Setup

```shell
cd to/target/directory
git clone https://github.com/skycatchfire/flat-starterkit.git .
npm install
```

### Running Local Server

Spin up a local development server with Browsersync.

```shell
npm run debug
```

## Deployment

Using NPM scripts, the website can be deployed to GitHub Pages:

```shell
npm run deploy
```

This will push the current `dist` directory to the gh-pages branch.
# globe
