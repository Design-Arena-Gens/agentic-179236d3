## Soundscapes Studio

A web-based ambient sound mixer for crafting personalized background soundtracks. Layer serene loops, fine-tune volumes, and keep your favorite soundscapes running directly in the browser.

### Tech Stack

- Next.js App Router (TypeScript)
- Tailwind CSS with custom gradients
- Client-side audio controls with the HTML Audio API

### Local Development

```bash
npm install
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) and start layering sounds.

### Available Scripts

- `npm run dev` – start the local development server
- `npm run lint` – run ESLint
- `npm run build` – create an optimized production build
- `npm start` – serve the production build locally

### Deployment

The app is optimized for Vercel. Deploy with:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-179236d3
```

After deployment, verify the production URL with:

```bash
curl https://agentic-179236d3.vercel.app
```
