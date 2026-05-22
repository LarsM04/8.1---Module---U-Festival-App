# U Festival App (PWA)

Interactieve festival-app met line-up, kaart en act-details.

## Online zetten via Render.com

Je project staat al op GitHub: `https://github.com/LarsM04/8.1---Module---U-Festival-App`

### Stap 1 – Code naar GitHub pushen

Open een terminal in deze map en voer uit:

```bash
git add .
git commit -m "Add festival map and Render deploy config"
git push origin main
```

### Stap 2 – Account op Render

1. Ga naar [https://render.com](https://render.com)
2. Maak een account (gratis) of log in
3. Koppel je **GitHub**-account als Render dat vraagt

### Stap 3 – Nieuwe Static Site aanmaken

1. Klik op **New +** → **Static Site**
2. Kies de repository: `8.1---Module---U-Festival-App`
3. Vul in:

| Veld | Waarde |
|------|--------|
| **Name** | `u-festival-app` (of een naam naar keuze) |
| **Branch** | `main` |
| **Root Directory** | *(leeg laten)* |
| **Build Command** | *(leeg laten)* |
| **Publish Directory** | `.` |

4. Kies het gratis plan (**Free**)
5. Klik **Create Static Site**

Render bouwt en publiceert automatisch. Na 1–2 minuten krijg je een URL zoals:

`https://u-festival-app.onrender.com`

### Stap 4 – Testen

- Open de URL op je telefoon en computer
- Test de **kaart** (locatie-icoon onderin)
- Test **line-up** en act-details

Bij elke `git push` naar `main` wordt de site automatisch opnieuw gedeployed.

---

## Alternatief: Blueprint (render.yaml)

In de repo staat `render.yaml`. Je kunt ook:

1. **New +** → **Blueprint**
2. Repository kiezen
3. Render leest de configuratie automatisch

---

## Lokaal testen (zonder Render)

- **VS Code:** extensie *Live Server* → rechtsklik `index.html` → *Open with Live Server*
- **XAMPP:** project in `htdocs` → `http://localhost/.../index.html`

Open `index.html` niet via dubbelklik (`file://`) — dan werkt `fetch` en de kaart vaak niet.

---

## Projectstructuur

```
index.html          – hoofdpagina
manifest.json       – PWA-instellingen
service-worker.js   – offline / notificaties
data/               – acts, schedule, kaart-markers
assets/             – afbeeldingen, icons, kaart-SVG
render.yaml         – Render deploy-config
```
