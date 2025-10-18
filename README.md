# 👶 Newborn Baby Essentials

Dinamička web stranica za organizaciju kupovine bebi opreme - DM narudžba.

## 📋 Kako koristiti

⚠️ **VAŽNO**: Ovaj sajt koristi `fetch()` API i **mora** se pokrenuti preko web servera. Ne može raditi ako samo otvorite `index.html` fajl direktno.

### Brzi start:

```bash
cd /Users/neven.ignjic/Data/newborn-baby-essentials
./start-server.sh
```

Zatim otvorite: **http://localhost:8000/index.html**

---

Detaljnije:
1. Pokrenite lokalni web server (vidi dole)
2. Otvorite sajt u web pregledaču
3. Svi podaci se učitavaju iz `products.json` fajla

## 🗂️ Struktura fajlova

```
Baby/
├── index.html       # Glavna HTML stranica
├── products.json    # Baza podataka proizvoda
└── README.md        # Ova dokumentacija
```

## ✏️ Kako ažurirati proizvode

Sve izmene radite u `products.json` fajlu. HTML će se automatski generisati na osnovu tih podataka.

### Struktura JSON fajla:

```json
{
  "dm": {
    "storeName": "DM",
    "storeNameFull": "DM drogerie markt",
    "general": [ /* lista proizvoda */ ],
    "porodiliste": [ /* lista proizvoda za porodilište */ ]
  }
}
```

### Struktura proizvoda:

```json
{
  "name": "Kratki naziv",
  "fullName": "Pun naziv proizvoda",
  "quantity": "x2",
  "details": "Detaljan opis proizvoda",
  "price": "29,95",
  "available": true,
  "emoji": "🍼",
  "link": "https://link-do-proizvoda.com"
}
```

### Polja proizvoda:

- **name** (obavezno): Kratki naziv koji se prikazuje
- **fullName**: Pun naziv proizvoda
- **quantity**: Količina (npr. "x2", "XL x5", "2x 120ml")
- **details** (obavezno): Detaljan opis
- **price**: Cena (npr. "29,95") - bez valute, biće automatski dodato "KM"
- **available**: `true` ili `false` - za praćenje dostupnosti
- **emoji** (obavezno): Emoji ikonica za vizuelnu identifikaciju
- **link**: URL link ka proizvodu (opciono)

## ➕ Dodavanje novog proizvoda

1. Otvorite `products.json`
2. Nađite odgovarajuću prodavnicu (`dm`, `aksa`, `apoteka`)
3. Dodajte proizvod u `general` ili `porodiliste` array:

```json
{
  "name": "Novi proizvod",
  "quantity": "x1",
  "details": "Opis novog proizvoda",
  "price": "19,99",
  "available": true,
  "emoji": "🎁",
  "link": ""
}
```

## 🏪 Dodavanje nove prodavnice

Da biste dodali novu prodavnicu:

1. U `products.json`, dodajte novi key:

```json
"nova_prodavnica": {
  "storeName": "Nova Prodavnica",
  "storeNameFull": "Nova Prodavnica - pun naziv",
  "general": [],
  "porodiliste": []
}
```

2. U `index.html`, dodajte konfiguraciju u `storeConfig` objekat:

```javascript
'nova_prodavnica': {
    icon: '🏪',
    className: 'nova-section'
}
```

3. Dodajte CSS stilove za novu prodavnicu u `<style>` sekciju:

```css
.nova-section .store-header {
    border-bottom-color: #vasa-boja;
}

.nova-section .store-header h2 {
    color: #vasa-boja;
}

.nova-section .store-badge {
    background: #vasa-boja;
    color: white;
}
```

## 🖥️ Lokalni server (preporučeno)

Zbog CORS ograničenja nekih pregledača, preporučuje se korišćenje lokalnog servera:

### Opcija 1: Python
```bash
# Python 3
python -m http.server 8000

# Zatim otvorite: http://localhost:8000
```

### Opcija 2: Node.js
```bash
npx http-server

# Ili sa live-server za automatsko osvežavanje:
npx live-server
```

### Opcija 3: PHP
```bash
php -S localhost:8000
```

## 🎨 Prilagođavanje dizajna

Sve stilove možete menjati u `<style>` sekciji `index.html` fajla:

- **Boje**: Promenite hex vrednosti (`#667eea`, `#ff6b6b`, itd.)
- **Fontovi**: Promenite `font-family` u `body` selektor
- **Grid**: Podesite `grid-template-columns` u `.items-grid` klasi
- **Responsive**: Prilagodite `@media` upite za različite ekrane

## 📱 Mobile Responsive

Sajt je potpuno responsive i radi na:
- 📱 Mobilnim telefonima (iOS, Android)
- 📱 Tabletima
- 💻 Desktop računarima

## 🔍 Primer ažuriranja cene

Ako želite da dodate ili promenite cenu proizvoda:

```json
{
  "name": "Pampers",
  "fullName": "Pampers Premium Care jumbo pack pelene vel. 2",
  "quantity": "x2",
  "details": "Veličina 2 - za novorođenčad, 68 kom.",
  "price": "29,55",    // ← Dodajte ili promenite ovu liniju
  "available": true,
  "emoji": "🍼",
  "link": ""
}
```

Cena će se automatski prikazati na kartici proizvoda.

## 💡 Saveti

1. **Backup**: Uvek napravite backup `products.json` pre većih izmena
2. **JSON validacija**: Koristite [JSONLint](https://jsonlint.com/) da proverite JSON sintaksu
3. **Emoji**: Kopirajte emoji sa [Emojipedia](https://emojipedia.org/)
4. **Slike**: Možete zameniti emoji sa pravim slikama proizvoda

## 🐛 Troubleshooting

### Proizvodi se ne prikazuju
- Proverite konzolu pregledača (F12) za greške
- Uverite se da je `products.json` u istom folderu kao `index.html`
- Koristite lokalni server umesto direktnog otvaranja fajla

### JSON greška
- Proverite da li ste zatvorili sve vitičaste zagrade `{}`
- Proverite zapete na kraju linija
- Koristite JSONLint za validaciju

## 📄 Licenca

Ovaj projekat je kreiran za lične potrebe. Slobodno ga koristite i prilagođavajte!

---

**Srećno sa pripremama za bebu!** 👶💕

