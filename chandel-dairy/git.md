# Chandel Dairy Website — GitHub Par Push Karne Ki Poori Guide

Ye poori folder (`chandel-dairy/`) ek static website hai — sirf HTML, CSS, JS aur images.
Koi build step nahi chahiye. Neeche step-by-step instructions hain ki poora folder GitHub
repo mein kaise daalein.

---

## 0. Pehli baar setup (agar Git kabhi install nahi kiya)

1. Git install karo: https://git-scm.com/downloads
2. Terminal / Git Bash / Command Prompt kholo aur apni identity set karo (ek hi baar karna hai):
   ```bash
   git config --global user.name "Bhumesh"
   git config --global user.email "your-email@example.com"
   ```
3. GitHub par account banao (agar nahi hai): https://github.com/signup

---

## 1. GitHub par naya repository banao

1. https://github.com par login karo.
2. Top-right corner mein **"+"** → **"New repository"** click karo.
3. Repository name do, jaise: `chandel-dairy-website`
4. **Public** ya **Private** — jo chaho chuno.
5. **"Initialize this repository with a README" ko UNCHECK rakho** (kyunki tumhare paas already files hain).
6. **"Create repository"** click karo.
7. Agli screen par tumhe ek URL milega, kuch aisa:
   ```
   https://github.com/<your-username>/chandel-dairy-website.git
   ```
   Ise copy kar lo — aage yeh chahiye hoga.

---

## 2. Apne computer par poora folder daalo

Agar tum yeh chat se ZIP download kar rahe ho:

1. ZIP file ko kisi bhi folder mein **extract** karo (Right click → Extract All).
2. Extract hone ke baad ek `chandel-dairy` folder milega jisme ye sab hoga:
   ```
   chandel-dairy/
   ├── index.html
   ├── products.html
   ├── about.html
   ├── location.html
   ├── contact.html
   ├── css/
   ├── js/
   ├── images/
   └── git.md   (yahi file)
   ```

---

## 3. Terminal se us folder mein jaao

Windows (Git Bash) ya Mac/Linux terminal kholo:

```bash
cd path/to/chandel-dairy
```

Jaise agar folder Desktop par hai (Windows):
```bash
cd C:/Users/YourName/Desktop/chandel-dairy
```

Ya Mac/Linux par:
```bash
cd ~/Desktop/chandel-dairy
```

---

## 4. Git repository initialize karo (isi folder ke andar)

```bash
git init
```

---

## 5. Sab files ko "staged" karo (poora folder add karo)

```bash
git add .
```

Yeh command poore folder ki har file (HTML, CSS, JS, images, sab) ko add kar degi.
`.gitignore` file nahi hai abhi, toh sab kuch add hoga — yahi chahiye.

---

## 6. Pehla commit banao

```bash
git commit -m "Initial commit: Chandel Dairy website"
```

---

## 7. Apni branch ka naam "main" set karo (GitHub ka default)

```bash
git branch -M main
```

---

## 8. GitHub repo ko "remote" ke roop mein jodo

Step 1 mein jo URL copy kiya tha, wahi yahan lagao:

```bash
git remote add origin https://github.com/<your-username>/chandel-dairy-website.git
```

Example:
```bash
git remote add origin https://github.com/bhumesh/chandel-dairy-website.git
```

---

## 9. Poora folder GitHub par push karo

```bash
git push -u origin main
```

Agar pehli baar push kar rahe ho, GitHub tumse login maang sakta hai:
- Username: apna GitHub username daalo
- Password: **apna GitHub password kaam nahi karega** — iski jagah **Personal Access Token (PAT)** chahiye.
  - Token banane ke liye: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  - Us token ko copy karke password wali jagah paste karo.

---

## 10. Ho gaya! Verify karo

1. Browser mein apna repo URL kholo:
   ```
   https://github.com/<your-username>/chandel-dairy-website
   ```
2. Wahan poora folder structure (css/, js/, images/, sab .html files) dikhna chahiye.

---

## 11. (Optional) Site ko live dekhne ke liye GitHub Pages on karo

1. Apne repo mein jaao → **Settings** tab
2. Left side mein **Pages** click karo
3. **Source** mein "Deploy from a branch" chuno
4. Branch: `main`, folder: `/ (root)` select karo, **Save** karo
5. 1-2 minute mein site live ho jayegi is URL par:
   ```
   https://<your-username>.github.io/chandel-dairy-website/
   ```

---

## Aage kabhi bhi kuch badalna ho (updates push karna)

Har baar jab bhi koi file badlo (jaise product price ya photo update karni ho):

```bash
cd path/to/chandel-dairy
git add .
git commit -m "Updated product prices"
git push
```

Bas itna hi. `git push -u origin main` sirf pehli baar karna padta hai — uske baad sirf `git push` kaafi hai.

---

## Common Errors Ka Fix

**Error: "remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/<your-username>/chandel-dairy-website.git
```

**Error: "failed to push some refs" / rejected**
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

**Authentication error / password reject ho raha hai**
GitHub ab plain password se push nahi hone deta. Personal Access Token banao
(Step 9 dekho) aur us token ko password ki jagah use karo.

---

## Folder mein file badalne ka reminder

- `css/root.css` → yahi ek file colors/fonts/spacing ke liye edit karo, poori site ka look badal jayega
- `js/products.js` → naye product add karne ya price badalne ke liye yahi file edit karo
- `images/logo.jpeg` → apna asli logo isi naam se replace kar do
- `images/products/` → product photos yahan daalo, `js/products.js` mein jo filename likha hai wahi rakhna
