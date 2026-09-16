# Portfolio Builder Studio

Make me a portfolio website, i am a full stack web developer, I also an automation developer using n8n, and i want to easily update the projects/works i made through nocodb(local)

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cbfd857f-e8af-4bf1-8c2e-616fb623469f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Self-hosted NocoDB setup

The projects page reads NocoDB from a server-only function, so the API token is
never sent to the browser. The production build targets Node.js and can run on
the same personal server as NocoDB, or on another machine that is connected to
the same Tailscale network.

1. Copy `.env.example` to `.env` on the server.
2. Set `NOCODB_BASE_URL` to the NocoDB URL reachable from that server (for
   example, `http://100.x.y.z:8080` or a MagicDNS hostname). Do not use a
   browser-only `localhost` URL unless NocoDB runs on the same machine.
3. Set `NOCODB_TABLE_ID` to the table ID from NocoDB and
   `NOCODB_API_TOKEN` to a NocoDB API token with read access to that table.
4. Build and start the app:

```sh
npm install
npm run build
npm start
```

If NocoDB is unavailable or the variables are missing, the site deliberately
shows the bundled sample projects instead of exposing an API error or secret.
