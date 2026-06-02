# ❤ U Festival 2026 — Progressive Web App

Een interactieve en offline-beschikbare Progressive Web App (PWA) voor het fictieve **U Festival 2026** op het Strijkviertel in Utrecht. Dit project is ontworpen als een moderne, mobiel-vriendelijke festivalgids waarmee bezoekers ter plekke (en onderweg) alle praktische en programma-informatie direct bij de hand hebben.

De app is volledig client-side gebouwd met een sterke focus op performance, een vloeiende gebruikerservaring en native-achtige mobiele functionaliteit zonder zware frameworks.

---

## 🎨 Belangrijkste Functionaliteiten

- **Dynamisch Programma & Line-up**
  - Volledig overzicht van de artiesten, gesorteerd per festivaldag en podium.
  - Uitgebreide detailpagina's per act met biografieën, tags en geïntegreerde video-trailers/clips.
- **Persoonlijk Blokkenschema (Favorieten)**
  - Bezoekers kunnen hun favoriete artiesten markeren om een persoonlijk schema samen te stellen.
  - Werkt volledig offline via lokale opslag.
- **Interactieve Plattegrond met Live GPS**
  - Een vectorgebaseerde (SVG) kaart van het festivalterrein (Strijkviertel) met klikbare hotspots en handige legenda.
  - Geïntegreerde GPS-ondersteuning om de live locatie van de bezoeker op de kaart te tonen.
- **Progressive Web App (PWA) Voordelen**
  - **Offline modus:** Dankzij de Service Worker worden alle belangrijke pagina's, data en afbeeldingen gecacht zodat de app ook bij slecht bereik op het festivalterrein blijft werken.
  - **Installatie:** Eenvoudig toe te voegen aan het startscherm van iOS en Android.
- **Gebruikersinterface & Toegankelijkheid**
  - **Light & Dark mode:** Dynamic theme switching.
  - **Meertaligheid:** Volledige ondersteuning en directe switch tussen Nederlands en Engels (NL/EN).
  - **QR-Code Scanner:** Ingebouwde camera-scanner voor interactie op het festivalterrein.

---

## 🛠️ Projectstructuur

Het project is overzichtelijk georganiseerd in een statische mappenstructuur:

```text
8.1---Module---U-Festival-App/
├── assets/             # Afbeeldingen, iconen en plattegrond-illustraties
│   ├── artists/        # Foto's van de optredende artiesten
│   ├── icons/          # PWA en UI-iconen (inclusief logo's)
│   └── map/            # Kaartbestanden (SVG en stage previews)
├── data/               # Gestructureerde JSON-bestanden en vertalingen
│   ├── acts.json       # Artiesteninformatie en video-links
│   ├── i18n.js         # Vertalingen voor meertaligheid (NL/EN)
│   ├── map-markers.json# Coördinaten en details voor kaartpunten
│   ├── news.json       # Nieuwsberichten op de homepagina
│   └── schedule.json   # Blokkenschema en tijden per podium
├── js/                 # JavaScript-functionaliteiten
│   ├── qr.js           # Logica voor de QR-code scanner
│   └── qrcode.min.js   # QR-code generatiebibliotheek
├── index.html          # Centrale toegangspunt van de applicatie
├── manifest.json       # PWA configuratie (thema-kleuren, start-URL, iconen)
├── service-worker.js   # Caching logica en offline-afhandeling
└── render.yaml         # Render.com Static Site Blueprint-configuratie
```

---

## 🧰 Technische Stack & Afhankelijkheden

- **Frontend Basis:** Semantische HTML5, CSS3 (inclusief CSS Custom Properties voor thema's en flexibele grid/flexbox layouts) en Vanilla JavaScript (ES6+).
- **Typografie:** *Sansation* (Google Fonts) voor een moderne, festival-waardige uitstraling.
- **PWA Technologie:** Service Worker API (`service-worker.js`) voor caching en offline-beschikbaarheid, Web App Manifest (`manifest.json`).
- **Hosting:** Geoptimaliseerd voor **Render.com** als een Static Site.

---

## 🎬 Artiest-clips (YouTube)
De app bevat links naar officiële clips en live-optredens van de acts. Hier is een overzicht van de gebruikte media-links:

| Artiest | Video Clip Link |
| :--- | :--- |
| **Armin van Buuren** | [Bekijk op YouTube](https://www.youtube.com/watch?v=TxvpctgU_s8) |
| **Martin Garrix** | [Bekijk op YouTube](https://www.youtube.com/watch?v=Zv1QV6lrc_Y) |
| **Kensington** | [Bekijk op YouTube](https://www.youtube.com/watch?v=IH77eOyV95o) |
| **Within Temptation** | [Bekijk op YouTube](https://www.youtube.com/watch?v=iQVei5C2N4E) |
| **De Staat** | [Bekijk op YouTube](https://www.youtube.com/watch?v=0ttGgIQpAUc) |
| **Chef'Special** | [Bekijk op YouTube](https://www.youtube.com/watch?v=l3jRIr44lss) |
| **Navarone** | [Bekijk op YouTube](https://www.youtube.com/watch?v=EvLpaCSnc4k) |
| **Dotan** | [Bekijk op YouTube](https://www.youtube.com/watch?v=FZEuqzW16Nw) |
| **Eefje de Visser** | [Bekijk op YouTube](https://www.youtube.com/watch?v=6IlLJNmLDMg) |
| **Froukje** | [Bekijk op YouTube](https://www.youtube.com/watch?v=g4PlReX9e-E) |
| **Spinvis** | [Bekijk op YouTube](https://www.youtube.com/watch?v=F3ZTrGWSLf4) |

---

## 🚀 Lokaal Starten

Omdat de app bestanden inlaadt via `fetch()` (zoals de JSON-bestanden in `/data`), werkt de app niet optimaal als je deze direct opent via het bestandssysteem (`file://` in de browserbalk). Start de app daarom altijd via een lokale webserver.

### Optie 1: VS Code Live Server (Aanbevolen)
1. Installeer de extensie **Live Server** in VS Code.
2. Klik rechtsonder op **Go Live** of rechtermuisklik op `index.html` en kies **Open with Live Server**.

### Optie 2: Python HTTP Server
Als je Python geïnstalleerd hebt, kun je een snelle server starten via de terminal:
```bash
# Ga naar de projectmap
cd 8.1---Module---U-Festival-App

# Start de server
python -m http.server 8000
```
Open vervolgens `http://localhost:8000` in je browser.

### Optie 3: Node.js (npx serve)
Indien je Node.js gebruikt:
```bash
npx serve .
```

---

## 🌐 Live Implementatie

De applicatie is zo geconfigureerd dat deze direct op **Render.com** kan worden uitgerold als een *Static Site*. Dankzij de meegeleverde `render.yaml` leest Render automatisch de juiste configuratie in (inclusief cache-headers voor maximale laadsnelheid).

Bij elke push naar de gekoppelde GitHub-repository zal het platform de site automatisch opnieuw bouwen en online zetten.
