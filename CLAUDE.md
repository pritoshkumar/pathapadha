# ପାଠପଢ଼ା (Pathapadha) — Claude Code Project

> Free, always-available Odia-medium study materials for students in grades 1–12.
> Domain: pathapadha.com | Local root: C:\Users\prito\Documents\pathapadha

---

## ALWAYS READ THIS FIRST
Before doing anything in this project:
1. Read this entire file
2. Read `C:\Users\prito\Documents\Odia\CLAUDE.md` — the central Odia knowledge base
3. Never delete content files — move to `_review/` if replacing
4. All Odia text must have `<!-- REVIEW NEEDED -->` above it
5. Brand name is always **ପାଠପଢ଼ା** (with ା matra) — never ପଠପଢ଼ା
6. Test every page at 375px mobile width before marking done
7. Verify ALL Odia words against central dictionary before publishing
8. Log any corrections to `C:\Users\prito\Documents\Odia\knowledge\corrections_log.md`

---

## Odia Knowledge Base (Central Repository)
All Odia language knowledge is stored centrally at: `C:\Users\prito\Documents\Odia\`
- **Dictionary**: `Odia\dictionary\Odia_structured_wordlist_full.json` (81,909 words)
- **Grammar**: `Odia\knowledge\grammar_rules.md`
- **Corrections**: `Odia\knowledge\corrections_log.md`
- **Verified words**: `Odia\knowledge\verified_words.md`
- **Terminology**: `Odia\knowledge\` (math, science, history)

Always read the corrections log and verified words before creating Odia content.

---

## Project Philosophy
- Pure HTML + CSS + JS only — no frameworks, no build tools
- Mobile-first — target students on low-end Android phones
- Odia-first — all student content in Odia script
- Zero cost — no login, no paywall, no tracking

---

## Folder Structure

```
C:\Users\prito\Documents\pathapadha\
│
├── index.html                        ← Homepage ✅
├── CLAUDE.md                         ← This file
├── assets\
│   └── css\
│       └── global.css                ← TODO: extract shared styles
│
├── class-1\
│   ├── index.html                    ← Class 1 hub ✅
│   ├── odia\
│   │   ├── index.html                ← Odia subject hub ✅
│   │   ├── barnabodha.html           ← Alphabet page ✅
│   │   ├── barnabodha-games.html     ← 6 gamified assignments ✅
│   │   ├── matras.html               ← TODO
│   │   ├── words.html                ← TODO
│   │   ├── sentences.html            ← TODO
│   │   └── rhymes.html               ← TODO
│   ├── math\
│   │   ├── index.html                ← Math subject hub ✅
│   │   ├── numbers.html              ← TODO
│   │   ├── counting.html             ← TODO
│   │   ├── order.html                ← TODO
│   │   ├── addsub.html               ← TODO
│   │   ├── shapes.html               ← TODO
│   │   └── patterns.html             ← TODO
│   ├── english\
│   │   └── index.html                ← TODO
│   └── evs\
│       └── index.html                ← TODO
│
├── class-2\ ... class-12\            ← TODO after class-1 complete
└── _review\                          ← Staging: content needing native speaker check
```

---

## Textbooks (Class 1, NEP 2020, SCERT Odisha)
| Subject | Textbook |
|---------|----------|
| Odia    | ଝୁଲଣ ଭାଗ ୧ (Jhulana Part 1) |
| Math    | ଗଣିତ ଖେଳ (Ganita Khela) |
| English | Marigold Part 1 (NCERT) |
| EVS     | ଆମ ଚାରିପାଖ (Our Surroundings) |

---

## Design System
```css
--ink:     #111111;
--soft:    #555555;
--light:   #888888;
--bg:      #ffffff;
--off:     #F7F7F5;
--border:  #EBEBEB;
--font:    'Nunito', sans-serif;
--font-or: 'Noto Sans Oriya', serif;

/* Class 1 subject colors */
--odia-c:  #FF6B6B;  --odia-bg:  #FFF0F0;
--math-c:  #3A86FF;  --math-bg:  #EEF4FF;
--eng-c:   #43AA8B;  --eng-bg:   #EDFAF4;
--evs-c:   #F9C74F;  --evs-bg:   #FFFBEC;
```

---

## Page Structure Pattern
Every page must have:
1. Sticky nav with breadcrumb (Home › Class N › Subject › Topic)
2. Hero section with Odia title + English subtitle + floating emoji art
3. Main content section
4. Footer with ପାଠପଢ଼ା logo

Every topic page must also have:
- A `[topic]-games.html` with at least 4 game types
- Games: Match, MCQ Quiz, Fill the Blank, Word Builder, Sort, Listen & Identify
- Star reward system (⭐ per correct answer)
- Confetti on completion

---

## Gamification Rules
- ⭐ stars per correct answer (shown in sticky bar)
- Progress bar fills as games complete
- Floating star pop animation on correct answer
- Confetti + trophy banner on all games complete
- "Play Again" reloads the page

---

## Content Quality Rules
| Rule | Detail |
|------|--------|
| Odia spelling | Brand = **ପାଠପଢ଼ା** (ା matra after ପ). Always verify. |
| Review flag | Add `<!-- REVIEW NEEDED -->` above ALL Odia text content |
| Medial letters | ଙ ଞ ଣ ଳ ଵ — always show in a word where the letter is highlighted |
| Syllabus | Follow SCERT Odisha / BSE Odisha textbooks exactly |
| Images | Emoji only — no external image URLs |
| Dependencies | Google Fonts allowed. No CDN JS libraries. |

---

## Deployment
- Host: Cloudflare Pages (free)
- Repo: GitHub → connect to Cloudflare Pages
- Domain: pathapadha.com (add as custom domain in Cloudflare Pages)
- Build: none needed — pure static files
- Auto-deploy on every git push to main

---

## Next Tasks for Claude Code
```
1. Create class-1/odia/matras.html — vowel signs page + matras-games.html
2. Create class-1/odia/words.html  — simple words page + words-games.html
3. Extract shared CSS into assets/css/global.css
4. Create class-1/math/numbers.html — numbers 1-20 + games
```
