# Discogs

Record collection viewer using Discogs API.
Powered by Remix and TypeScript.
This project uses helpers fetch methods to interact with the Discogs API, and it also incorporates key features like search, and currency conversion using ExchangeRate API.

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```sh
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## TODO

- Implement more unit tests
- Integrate code formatter and linter, use codium to generate comments for stuff
- Add support for "Wantlist" endpoint API from Discogs
- Add "more info" button about a record, use LLM to generate record info
