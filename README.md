# JLine Documentation

This repository contains the documentation website for [JLine](https://github.com/jline/jline3), a Java library for handling console input.

## Website

The documentation website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

You can visit the live website at [https://jline.github.io](https://jline.github.io).

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Local Development

```bash
# Navigate to the Docusaurus project directory
cd jline-docs

# Install dependencies
npm install

# Start the development server
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
# Navigate to the Docusaurus project directory
cd jline-docs

# Build the website
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the `main` branch, using GitHub Actions.

If you want to deploy manually:

```bash
# Navigate to the Docusaurus project directory
cd jline-docs

# Deploy to GitHub Pages
npm run deploy
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the same license as JLine - see the [LICENSE](https://github.com/jline/jline3/blob/master/LICENSE.txt) file for details.
