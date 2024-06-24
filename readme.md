# Upute

## DEMO

Demo aplikacije možete pronaći ovdje: <https://pwa-js-todo.netlify.app/>

## Baza

Registrirati se ili prijaviti na Firebase i postaviti Realtime Database čiji će se URL koristiti za spremanje podataka s Todo liste. Upute: <https://firebase.google.com/docs/database/>

## PWA Web Manifest

Web Manifest je JSON datoteka koja omogućuje korisnicima da spreme vašu web aplikaciju na njihov početni zaslon, čime se postiže slično iskustvo kao kod native aplikacija. Da biste dodali Web Manifest u svoju aplikaciju, slijedite ove korake:

1. Kreirajte datoteku `manifest.json` u korijenu vaše web aplikacije.
2. Dodajte sljedeći sadržaj u `manifest.json`, prilagodite ga prema potrebama vaše aplikacije:

```json
{
    "name": "Todo",
    "short_name": "Todo",
    "icons": [
        {
            "src": "/favicon/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/favicon/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#ffffff",
    "background_color": "#ffffff",
    "display": "standalone"
}
```

U `<head>` dio vaše HTML datoteke dodajte sljedeći link:
`<link rel="manifest" href="site.webmanifest" />`

## Favicon

Odabrati ikonu koju želimo koristiti za našu aplikaciju. Prezueti ju i generirati favicon elemente. Ja sam koristio ovu stranicu: <https://realfavicongenerator.net/>
Zatim dodajte sljedeći kod u HTML:

```html
 <link
   rel="apple-touch-icon"
   sizes="180x180"
   href="favicon/apple-touch-icon.png"
  />
  <link
   rel="icon"
   type="image/png"
   sizes="32x32"
   href="favicon/favicon-32x32.png"
  />
  <link
   rel="icon"
   type="image/png"
   sizes="16x16"
   href="favicon/favicon-16x16.png"
  />
  <link
   rel="mask-icon"
   href="favicon/safari-pinned-tab.svg"
   color="#5bbad5"
  />
  <link rel="manifest" href="site.webmanifest" />
  <meta name="msapplication-TileColor" content="#2b5797" />
  <meta name="theme-color" content="#ffffff" />
```

## Quick start

```bash
npm install
npm start
```

## Deploy

Napravite deploy aplikacije. Ja sam aplikaciju objavio na <https://www.netlify.com/>.

## "Instalacija" aplikacije na mobilni uređaj

Korisnici vašu aplikaciju mogu preuzeti na uređaj na način da na pregledniku mobilnog uređaja otvore poveznicu na vašu web aplikaciju. Nakon toga odu na "meni" web preglednika i kliknu "Dodaj na početni zaslon" | "Dodaj na telefon".
