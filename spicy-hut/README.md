# Spicy Hut
### Landing Page
![Landing Page](spicy-hut/Screenshots/Landingpage.png)

### Menu And Locations
![Menu](spicy-hut/Screenshots/Menu.png)

### Order Page
![Order Page](spicy-hut/Screenshots/Order.png)
Restaurant landing page + working order form, backed by a small Node.js/Express server.



## Project structure

```
spicy-hut/
├── package.json
├── server.js          # Express server: serves the site + handles order submissions
├── orders.json         # created automatically once the first order comes in
└── public/
    ├── index.html      # landing page
    ├── order.html      # order form
    ├── css/
    │   └── style.css
    └── media/
        ├── hut.jpg     #landing page background
        └── hut2.jpg    # order page background
```

## 1. Add your images

Drop your restaurant photos into `public/media/` as `hut.jpg` and `hut2.jpg`
(referenced by the CSS). The site will still work without them, just without
the background images.

## 2. Install dependencies

```bash
cd spicy-hut
npm install
```

## 3. Run it

```bash
npm start
```

Then open **http://localhost:3000** in your browser.

- `index.html` is served at `/`
- `order.html` is served at `/order.html`
- Order submissions POST to `/order` (handled by `server.js`)
- All received orders are also viewable as JSON at `/orders`

## How the order flow works

1. Customer fills out the form on `order.html` and clicks **Submit Order**.
2. The page sends a `POST /order` request with their details.
3. `server.js` validates the fields, saves the order to `orders.json`, and
   sends back a confirmation message.
4. The form shows that confirmation (or an error) without reloading the page.

## Deploying

This is a standard Node/Express app, so it will run on most Node hosts
(Render, Railway, Fly.io, a VPS, etc.). Since `order.html` now calls the
**relative** path `/order` instead of `http://localhost:3000/order`, it will
keep working correctly once deployed — no code changes needed, as long as
the frontend and backend are served from the same app/origin.

If you'd rather host the frontend and backend separately (e.g. frontend on
Netlify, backend on Railway), you'll need to point the `fetch()` call in
`order.html` at your backend's full URL, and enable CORS in `server.js`
(`npm install cors` and `app.use(require('cors')())`).

## Notes

- Orders are currently stored in a local `orders.json` file, which is fine
  for getting started but won't survive on most hosting platforms with
  ephemeral filesystems (e.g. some serverless hosts). For production, swap
  this out for a real database (e.g. SQLite, MongoDB, Postgres) when you're
  ready.
- There's no admin authentication on `/orders` — anyone with the URL can see
  all submitted orders. Add auth before deploying publicly if that matters
  to you.
