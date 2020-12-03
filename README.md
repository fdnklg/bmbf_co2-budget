# BMBF Prototypes

This Repo contains prototypes that do

## Get started

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

## Docs

### Setup a new Embed that listens to Waypoints

- don't forget to set the class `embed`
- and add the `data-embed-id` tag to the wrapping container with a key that exists in the data.js object`

### Deliver Isochrone Data

- Szenarien expect the number of way points to match with the `sets` array
- if the number of waypoints updates, the `sets` array has to update as well

## TODO

- remove personal mapbox access token before launch
