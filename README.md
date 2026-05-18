# Festival & Event Kalender — Inge x Roan 2026

## Lokaal starten

```bash
npm install
npm run dev
```

## JSONBin instellen (gedeelde opslag)

1. Ga naar [jsonbin.io](https://jsonbin.io) en maak een gratis account aan
2. Klik op **+ Create Bin** en plak de volgende JSON als begininhoud:
   ```json
   { "events": [] }
   ```
3. Kopieer je **Bin ID** (staat in de URL: `https://api.jsonbin.io/v3/b/<BIN_ID>`)
4. Ga naar **API Keys** en kopieer je **Master Key**
5. Open `src/App.jsx` en vul bovenaan in:
   ```js
   const JSONBIN_BIN_ID = "jouw-bin-id";
   const JSONBIN_API_KEY = "$2a$10$...";
   ```
6. Deploy opnieuw naar Vercel — klaar!

## Deployen naar Vercel

1. Push deze map naar een GitHub repository
2. Ga naar [vercel.com](https://vercel.com) → **Add New Project** → importeer je repo
3. Vercel herkent Vite automatisch — klik op **Deploy**
4. Je krijgt een URL zoals `festival-planner-roan.vercel.app`

Elke keer dat je iets aanpast en naar GitHub pusht, herdeployt Vercel automatisch.
