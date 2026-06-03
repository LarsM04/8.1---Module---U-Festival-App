# 🛠️ Setup Guide — U Festival PWA

Deze handleiding legt stap voor stap uit hoe je het **U Festival 2026** project kunt opzetten en draaien op je eigen computer.

---

## 📋 Vereisten

Voordat je begint, zorg dat je het volgende geïnstalleerd hebt:

| Tool | Doel | Download |
| :--- | :--- | :--- |
| **Git** | Repository clonen | [git-scm.com](https://git-scm.com/downloads) |
| **VS Code** | Code editor (aanbevolen) | [code.visualstudio.com](https://code.visualstudio.com/) |
| **Een moderne browser** | Chrome, Firefox, Edge of Safari | — |

### Optioneel (voor alternatieve servermethodes)

| Tool | Doel | Download |
| :--- | :--- | :--- |
| **Node.js** (v16+) | Voor `npx serve` | [nodejs.org](https://nodejs.org/) |
| **Python** (v3.x) | Voor `python -m http.server` | [python.org](https://www.python.org/downloads/) |

> **💡 Opmerking:** Dit project heeft **geen** `npm install` of build-stap nodig. Het is een volledig statische app zonder externe dependencies.

---

## 📥 Stap 1 — Repository clonen

Open een terminal (PowerShell, CMD, of Git Bash) en voer het volgende uit:

```bash
git clone https://github.com/LarsM04/8.1---Module---U-Festival-App.git
```

Navigeer vervolgens naar de projectmap:

```bash
cd 8.1---Module---U-Festival-App
```

De mappenstructuur ziet er als volgt uit:

```text
8.1---Module---U-Festival-App/
├── assets/             # Afbeeldingen, iconen en plattegrond-illustraties
│   ├── artists/        # Foto's van de optredende artiesten
│   ├── icons/          # PWA en UI-iconen (inclusief logo's)
│   ├── map/            # Kaartbestanden (SVG en stage previews)
│   └── qr/             # QR-code gerelateerde assets
├── data/               # JSON-databestanden en vertalingen
│   ├── acts.json       # Artiesteninformatie en video-links
│   ├── i18n.js         # Vertalingen (NL/EN)
│   ├── map-markers.json# Coördinaten voor kaartpunten
│   ├── news.json       # Nieuwsberichten
│   └── schedule.json   # Blokkenschema en tijden per podium
├── js/                 # JavaScript-bestanden
│   ├── qr.js           # QR-code scanner logica
│   └── qrcode.min.js   # QR-code generatiebibliotheek
├── index.html          # 🏠 Hoofdpagina van de app
├── admin.html          # 🔐 CMS / Admin dashboard
├── manifest.json       # PWA configuratie
├── service-worker.js   # Offline caching logica
└── render.yaml         # Render.com deployment configuratie
```

---

## 🚀 Stap 2 — Lokale server starten

De app laadt data via `fetch()` (JSON-bestanden uit `/data`). Hierdoor werkt de app **niet** als je `index.html` direct opent via `file://` in je browser. Je hebt een lokale webserver nodig.

Kies hieronder de methode die het beste bij je past:

---

### ✅ Optie A: VS Code Live Server (Aanbevolen)

Dit is de makkelijkste en snelste methode.

1. **Open het project in VS Code:**
   ```bash
   code .
   ```

2. **Installeer de Live Server extensie:**
   - Ga naar het Extensions-tabblad (`Ctrl+Shift+X`)
   - Zoek op **"Live Server"** (door Ritwick Dey)
   - Klik op **Install**

3. **Start de server:**
   - Klik rechtsonder in VS Code op **"Go Live"**
   - Of: rechtermuisklik op `index.html` → **"Open with Live Server"**

4. **De app opent automatisch** in je browser op:
   ```
   http://localhost:5502
   ```

> **💡 Tip:** De poort is ingesteld op `5502` via `.vscode/settings.json`. Dit kun je aanpassen als deze poort al in gebruik is.

---

### 🟢 Optie B: Node.js (`npx serve`)

Als je Node.js geïnstalleerd hebt:

```bash
npx serve .
```

De server start op `http://localhost:3000` (of een andere beschikbare poort).

---

### 🐍 Optie C: Python HTTP Server

Als je Python 3 geïnstalleerd hebt:

```bash
python -m http.server 8000
```

Open vervolgens `http://localhost:8000` in je browser.

---

## 📱 Stap 3 — De app gebruiken

Zodra de server draait, kun je de app openen in je browser:

| Pagina | URL | Beschrijving |
| :--- | :--- | :--- |
| **Hoofd-app** | `http://localhost:<poort>/` | De volledige festival-app |
| **Admin CMS** | `http://localhost:<poort>/admin.html` | Het content management systeem |

### Belangrijke functies om te testen:

- **🌓 Dark/Light mode** — Schakel via het contrast-icoon in de header
- **🌐 Taal wisselen** — NL ↔ EN via het vlag-icoon in de header
- **⭐ Favorieten** — Markeer artiesten om een persoonlijk schema samen te stellen
- **🗺️ Interactieve kaart** — Bekijk het festivalterrein met klikbare hotspots
- **📷 QR-scanner** — Test de ingebouwde camera-scanner
- **📲 PWA installatie** — Installeer de app op je startscherm (werkt in Chrome/Edge)

---

## 📲 Stap 4 — PWA testen (Optioneel)

Om de Progressive Web App (PWA) functionaliteiten volledig te testen:

1. **Open Chrome DevTools** (`F12` of `Ctrl+Shift+I`)
2. Ga naar het tabblad **Application**
3. Controleer onder **"Service Workers"** of de service worker actief is
4. Onder **"Manifest"** kun je de PWA-configuratie inzien
5. Onder **"Cache Storage"** zie je de gecachte bestanden voor offline gebruik

### Offline testen:
1. In DevTools → **Network** tabblad
2. Vink **"Offline"** aan
3. Herlaad de pagina — de app zou nog steeds moeten werken!

---

## 🌐 Deployen naar Render.com (Optioneel)

Het project bevat een `render.yaml` configuratiebestand voor automatische deployment:

1. Push je code naar een **GitHub-repository**
2. Ga naar [render.com](https://render.com/) en maak een account aan
3. Klik op **"New" → "Static Site"**
4. Koppel je GitHub-repository
5. Render detecteert automatisch de `render.yaml` configuratie
6. De site wordt gebouwd en is online beschikbaar

> Bij elke nieuwe push naar GitHub wordt de site automatisch opnieuw gedeployed.

---

## ❓ Veelvoorkomende problemen

### "Fetch failed" of CORS-fout bij het openen van de app
**Oorzaak:** Je opent `index.html` direct via `file://` in je browser.  
**Oplossing:** Start een lokale webserver (zie Stap 2).

### Live Server start niet op poort 5502
**Oorzaak:** De poort is al in gebruik door een andere applicatie.  
**Oplossing:** Wijzig de poort in `.vscode/settings.json`:
```json
{
    "liveServer.settings.port": 5503
}
```

### De kaart of afbeeldingen laden niet
**Oorzaak:** Bestanden zijn mogelijk niet volledig gecloned.  
**Oplossing:** Controleer of alle mappen (vooral `assets/`) compleet zijn:
```bash
git status
```

### Service Worker registreert niet
**Oorzaak:** Service Workers werken alleen over `localhost` of `HTTPS`.  
**Oplossing:** Zorg dat je de app opent via `http://localhost:<poort>` en niet via een IP-adres.

---

## 📬 Contact

Heb je vragen of problemen? Neem contact op via de GitHub-repository:  
🔗 [github.com/LarsM04/8.1---Module---U-Festival-App](https://github.com/LarsM04/8.1---Module---U-Festival-App)
