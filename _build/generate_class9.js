const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/prito/Documents/pathapadha/class-9';

// ============================================================
// HELPERS
// ============================================================
function ensureDir(fp) {
  const dir = path.dirname(fp);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFile(fp, content) {
  ensureDir(fp);
  fs.writeFileSync(fp, content, 'utf8');
  console.log('Created: ' + fp);
}

// ============================================================
// SUBJECT INDEX TEMPLATE
// ============================================================
function subjectIndex(cfg) {
  const topicCards = cfg.topics.map((t, i) => `  {
    num: '${String(i+1).padStart(2,'0')}', name: '${t.name}', eng: '${t.eng}',
    desc: '${t.desc}',
    emoji: '${t.emoji}', color: '${t.color}', bg: '${t.bg}',
    href: '${t.file}.html', gamesHref: '${t.file}-games.html', live: true
  }`).join(',\n');

  return `<!DOCTYPE html>
<html lang="or">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- REVIEW NEEDED -->
<title>${cfg.nameOr} — ନବମ ଶ୍ରେଣୀ — ପାଠପଢ଼ା</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+Oriya:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--ink:#111;--soft:#555;--light:#888;--bg:#fff;--off:#F7F7F5;--border:#EBEBEB;--c:${cfg.color};--cbg:${cfg.bg};--font:'Nunito',sans-serif;--font-or:'Noto Sans Oriya',serif}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--font);background:var(--bg);color:var(--ink);line-height:1.6}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:18px 48px;border-bottom:1px solid var(--border);background:rgba(255,255,255,0.93);backdrop-filter:blur(8px);position:sticky;top:0;z-index:100}
.logo{display:flex;align-items:center;gap:10px}.logo-emoji{font-size:1.5rem}.logo-text{display:flex;flex-direction:column;line-height:1.2}.logo-odia{font-family:var(--font-or);font-size:1.1rem;font-weight:700}.logo-url{font-size:0.68rem;font-weight:600;color:var(--light)}
.breadcrumb{display:flex;align-items:center;gap:8px;font-size:0.8rem;font-weight:700;color:var(--light)}.breadcrumb a{color:var(--light);transition:color .15s}.breadcrumb a:hover{color:var(--ink)}.breadcrumb span{color:var(--c)}
.hero{max-width:1100px;margin:0 auto;padding:64px 48px 56px;display:grid;grid-template-columns:1fr auto;align-items:center;gap:48px}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--cbg);color:var(--c);font-size:0.78rem;font-weight:800;padding:5px 14px;border-radius:50px;margin-bottom:16px}
.hero h1{font-family:var(--font-or);font-size:clamp(2rem,5vw,3.2rem);font-weight:700;line-height:1.2;margin-bottom:8px}
.hero-eng{font-size:1rem;font-weight:800;color:var(--light);margin-bottom:12px}
.hero-desc{font-size:0.9rem;color:var(--soft);max-width:400px;line-height:1.8;margin-bottom:20px}
.hero-book{display:inline-flex;align-items:center;gap:8px;background:var(--off);border:1px solid var(--border);padding:8px 16px;border-radius:10px;font-size:0.8rem;font-weight:700;color:var(--soft)}
.hero-art{width:150px;height:150px;border-radius:28px;background:var(--cbg);display:flex;align-items:center;justify-content:center;font-size:4.5rem;flex-shrink:0;animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
hr.divider{border:none;border-top:1px solid var(--border)}
.section{max-width:1100px;margin:0 auto;padding:56px 48px}
.section-label{font-size:0.7rem;font-weight:700;color:#bbb;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:28px}
.topic-grid{display:flex;flex-direction:column;gap:16px}
.topic-card{border-radius:20px;border:2px solid var(--border);padding:24px 28px;display:flex;align-items:center;justify-content:space-between;gap:20px;background:#fff;transition:transform 0.18s cubic-bezier(.34,1.56,.64,1),box-shadow 0.18s,border-color 0.18s;position:relative;overflow:hidden}
.topic-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--tc)}
.topic-card.live{cursor:pointer}
.topic-card.live:hover{transform:translateX(6px);box-shadow:0 8px 28px rgba(0,0,0,0.08);border-color:var(--tc)}
.topic-left{display:flex;align-items:center;gap:20px;padding-left:12px}
.topic-emoji{font-size:2.2rem;flex-shrink:0}
.topic-num{font-size:0.72rem;font-weight:800;color:var(--tc);letter-spacing:1px;text-transform:uppercase;margin-bottom:4px}
.topic-name-or{font-family:var(--font-or);font-size:1.2rem;font-weight:700;color:var(--ink);line-height:1.2}
.topic-name-en{font-size:0.8rem;font-weight:700;color:var(--light);margin-top:3px}
.topic-desc{font-size:0.82rem;color:var(--soft);margin-top:6px;line-height:1.6;max-width:380px}
.topic-footer{display:flex;align-items:center;gap:10px;margin-top:12px;flex-wrap:wrap}
.topic-btn-learn{font-size:0.82rem;font-weight:800;color:#fff;background:var(--tc);padding:8px 18px;border-radius:10px;transition:opacity .15s}
.topic-btn-learn:hover{opacity:0.85}
.topic-btn-games{font-size:0.82rem;font-weight:800;color:var(--tc);background:var(--tcbg);border:2px solid var(--tc);padding:6px 16px;border-radius:10px;transition:all .15s}
.topic-btn-games:hover{background:var(--tc);color:#fff}
footer{border-top:1px solid var(--border);padding:28px 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.footer-logo{font-family:var(--font-or);font-size:1rem;font-weight:700}
.footer-copy{font-size:0.78rem;color:var(--light);font-weight:600}
@media(max-width:768px){nav{padding:14px 20px}.hero{grid-template-columns:1fr;padding:40px 20px 32px;gap:20px}.hero-art{width:90px;height:90px;font-size:3rem}.section{padding:36px 20px}.topic-card{flex-direction:column;align-items:flex-start}footer{padding:20px}}
</style>
</head>
<body>
<nav>
  <a href="../../index.html" class="logo"><div class="logo-emoji">📖</div><div class="logo-text"><!-- REVIEW NEEDED --><span class="logo-odia">ପାଠପଢ଼ା</span><span class="logo-url">pathapadha.com</span></div></a>
  <div class="breadcrumb"><a href="../../index.html">Home</a> › <a href="../index.html">Class 9</a> › <!-- REVIEW NEEDED --><span>${cfg.nameOr}</span></div>
</nav>
<section class="hero">
  <div>
    <!-- REVIEW NEEDED -->
    <div class="hero-badge">${cfg.emoji} ${cfg.bookBadge}</div>
    <h1>${cfg.nameOr}</h1>
    <p class="hero-eng">${cfg.nameEn} · Class 9</p>
    <p class="hero-desc">${cfg.heroDesc}</p>
    <!-- REVIEW NEEDED -->
    <div class="hero-book">📚 ${cfg.book}</div>
  </div>
  <div class="hero-art">${cfg.emoji}</div>
</section>
<hr class="divider">
<section class="section">
  <!-- REVIEW NEEDED -->
  <div class="section-label">ଅଧ୍ୟାୟ ବାଛନ୍ତୁ — Choose a Topic</div>
  <div class="topic-grid" id="topicGrid"></div>
</section>
<footer><!-- REVIEW NEEDED --><span class="footer-logo">ପାଠପଢ଼ା</span><span class="footer-copy">Class 9 · ${cfg.nameEn} · BSE Odisha · Free forever</span></footer>
<script>
// REVIEW NEEDED
var topics = [
${topicCards}
];
var grid = document.getElementById('topicGrid');
topics.forEach(function(t) {
  var el = document.createElement('div');
  el.className = 'topic-card live';
  el.style.setProperty('--tc', t.color);
  el.style.setProperty('--tcbg', t.bg);
  el.innerHTML =
    '<div class="topic-left"><div class="topic-emoji">' + t.emoji + '</div><div>' +
    '<div class="topic-num">Topic ' + t.num + '</div>' +
    '<div class="topic-name-or">' + t.name + '</div>' +
    '<div class="topic-name-en">' + t.eng + '</div>' +
    '<div class="topic-desc">' + t.desc + '</div></div></div>' +
    '<div class="topic-footer">' +
    '<a href="' + t.href + '" class="topic-btn-learn">Learn \\u2192</a>' +
    '<a href="' + t.gamesHref + '" class="topic-btn-games">🎮 Play Games</a></div>';
  grid.appendChild(el);
});
</script>
</body>
</html>`;
}

// ============================================================
// TOPIC PAGE TEMPLATE
// ============================================================
function topicPage(cfg) {
  const cardsJS = JSON.stringify(cfg.cards);
  return `<!DOCTYPE html>
<html lang="or">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- REVIEW NEEDED -->
<title>${cfg.title} — ${cfg.titleEn} | ପାଠପଢ଼ା</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+Oriya:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--ink:#111;--soft:#555;--light:#888;--bg:#fff;--off:#F7F7F5;--border:#EBEBEB;--c:${cfg.color};--cbg:${cfg.bg};--font:'Nunito',sans-serif;--font-or:'Noto Sans Oriya',serif}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{font-family:var(--font);background:var(--bg);color:var(--ink);line-height:1.6}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:16px 48px;border-bottom:1px solid var(--border);background:rgba(255,255,255,0.95);backdrop-filter:blur(8px);position:sticky;top:0;z-index:200}
.logo{display:flex;align-items:center;gap:10px}.logo-emoji{font-size:1.4rem}.logo-text{display:flex;flex-direction:column;line-height:1.2}.logo-odia{font-family:var(--font-or);font-size:1.05rem;font-weight:700}.logo-url{font-size:0.65rem;font-weight:600;color:var(--light)}
.breadcrumb{display:flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;color:var(--light)}.breadcrumb a{color:var(--light);transition:color .15s}.breadcrumb a:hover{color:var(--ink)}.breadcrumb span{color:var(--c)}
.page-hero{max-width:900px;margin:0 auto;padding:48px 48px 36px;text-align:center}
.hero-emoji{font-size:3.5rem;display:block;margin-bottom:12px;animation:bounce-slow 2s ease-in-out infinite}
@keyframes bounce-slow{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.page-hero h1{font-family:var(--font-or);font-size:clamp(2rem,5vw,3rem);font-weight:700;color:var(--c);margin-bottom:6px}
.page-hero .subtitle{font-size:1.05rem;color:var(--soft);font-weight:600}
.page-hero .textbook-ref{font-size:0.78rem;color:var(--light);font-weight:600;margin-top:10px;display:inline-block;background:var(--cbg);padding:4px 16px;border-radius:50px}
hr.divider{border:none;border-top:1px solid var(--border);max-width:900px;margin:0 auto}
.intro{max-width:900px;margin:0 auto;padding:36px 48px;text-align:center}
.intro p{font-size:0.95rem;color:var(--soft);max-width:600px;margin:0 auto;line-height:1.8}
.content-section{max-width:900px;margin:0 auto;padding:0 48px 48px}
.card{background:#fff;border-radius:20px;border:2px solid var(--border);padding:28px 24px;margin-bottom:20px;transition:transform .18s,border-color .18s,box-shadow .18s;animation:fadeUp .5s ease both}
.card:hover{transform:translateY(-4px);border-color:var(--c);box-shadow:0 8px 24px rgba(0,0,0,0.08)}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.card-header{display:flex;align-items:center;gap:14px;margin-bottom:16px}
.card-num{font-size:0.7rem;font-weight:800;color:var(--c);letter-spacing:1px;text-transform:uppercase}
.card-title{font-family:var(--font-or);font-size:1.3rem;font-weight:700;color:var(--ink)}
.card-title-en{font-size:0.8rem;font-weight:600;color:var(--light)}
.card-body{font-family:var(--font-or);font-size:1rem;line-height:2;color:var(--soft);background:var(--off);border-radius:12px;padding:20px;margin-bottom:16px}
.card-highlight{font-size:0.88rem;font-weight:700;color:var(--c);background:var(--cbg);padding:10px 16px;border-radius:10px;display:inline-block;font-family:var(--font-or)}
.card-questions{margin-top:14px}.card-questions h4{font-size:0.8rem;font-weight:800;color:var(--light);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px}
.card-questions ol{font-family:var(--font-or);font-size:0.9rem;color:var(--soft);padding-left:20px;line-height:2}
.bottom-nav{max-width:900px;margin:0 auto;padding:12px 48px 48px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:12px;font-size:0.9rem;font-weight:800;transition:opacity .15s,transform .15s;border:none;cursor:pointer;font-family:var(--font)}.btn:hover{opacity:0.85;transform:translateY(-2px)}.btn-outline{background:#fff;color:var(--ink);border:2px solid var(--border)}.btn-primary{background:var(--c);color:#fff}.btn-forward{background:var(--ink);color:#fff}
footer{border-top:1px solid var(--border);padding:24px 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}.footer-logo{font-family:var(--font-or);font-size:1rem;font-weight:700}.footer-copy{font-size:0.78rem;color:var(--light);font-weight:600}
@media(max-width:768px){nav,.page-hero,.intro,.content-section,.bottom-nav,footer{padding-left:20px;padding-right:20px}.bottom-nav{flex-direction:column;align-items:stretch;text-align:center}.btn{justify-content:center}}
@media(max-width:480px){.breadcrumb{display:none}}
</style>
</head>
<body>
<nav>
  <a href="../../index.html" class="logo"><div class="logo-emoji">📖</div><div class="logo-text"><!-- REVIEW NEEDED --><span class="logo-odia">ପାଠପଢ଼ା</span><span class="logo-url">pathapadha.com</span></div></a>
  <div class="breadcrumb"><a href="../../index.html">Home</a> › <a href="../index.html">Class 9</a> › <!-- REVIEW NEEDED --><a href="index.html">${cfg.subject}</a> › <span>${cfg.title}</span></div>
</nav>
<!-- REVIEW NEEDED -->
<div class="page-hero"><div class="hero-emoji">${cfg.emoji}</div><h1>${cfg.title}</h1><p class="subtitle">${cfg.titleEn}</p><span class="textbook-ref">📘 ${cfg.textbook}</span></div>
<hr class="divider">
<!-- REVIEW NEEDED -->
<div class="intro"><p>${cfg.introOr}</p><p style="margin-top:8px;font-size:0.85rem;color:var(--light)">${cfg.introEn}</p></div>
<div class="content-section" id="cardsContainer"></div>
<hr class="divider">
<!-- REVIEW NEEDED -->
<div class="bottom-nav"><a href="${cfg.backHref}" class="btn btn-outline">← ${cfg.backText}</a><a href="${cfg.gamesHref}" class="btn btn-primary">🎮 ${cfg.title} ଖେଳ</a>${cfg.fwdHref ? '<a href="'+cfg.fwdHref+'" class="btn btn-forward">'+cfg.fwdText+' →</a>' : ''}</div>
<footer><!-- REVIEW NEEDED --><span class="footer-logo">ପାଠପଢ଼ା</span><span class="footer-copy">${cfg.footerText}</span></footer>
<script>
// REVIEW NEEDED
var cards=${cardsJS};
var container=document.getElementById('cardsContainer');
cards.forEach(function(c,i){
  var card=document.createElement('div');card.className='card';card.style.animationDelay=(i*0.1)+'s';
  var qHTML='';if(c.questions){c.questions.forEach(function(q){qHTML+='<li>'+q+'</li>'})}
  card.innerHTML='<div class="card-header"><span style="font-size:2.5rem">'+(c.emoji||'📋')+'</span><div><div class="card-num">'+(c.numLabel||'Topic')+ ' '+(i+1)+'</div><div class="card-title">'+c.title+'</div><div class="card-title-en">'+c.titleEn+'</div></div></div><div class="card-body">'+c.body+'</div>'+(c.highlight?'<div class="card-highlight">📌 '+c.highlight+'</div>':'')+(qHTML?'<div class="card-questions"><h4>ପ୍ରଶ୍ନ — Questions</h4><ol>'+qHTML+'</ol></div>':'');
  container.appendChild(card);
});
</script>
</body>
</html>`;
}

// ============================================================
// GAMES PAGE TEMPLATE  (8 games: 2 match + 3 MCQ + 2 fill + 1 TF)
// ============================================================
function gamesPage(cfg) {
  return `<!DOCTYPE html>
<html lang="or">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- REVIEW NEEDED -->
<title>${cfg.title} ଖେଳ — ପାଠପଢ଼ା</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+Oriya:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--ink:#111;--soft:#555;--light:#888;--bg:#fff;--off:#F7F7F5;--border:#EBEBEB;--c:${cfg.color};--cbg:${cfg.bg};--green:#43AA8B;--greenbg:#EDFAF4;--yellow:#F9C74F;--blue:#3A86FF;--bluebg:#EEF4FF;--red:#FF6B6B;--redbg:#FFF0F0;--font:'Nunito',sans-serif;--font-or:'Noto Sans Oriya',serif}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{font-family:var(--font);background:var(--bg);color:var(--ink);line-height:1.6}a{text-decoration:none;color:inherit}button{font-family:var(--font);cursor:pointer;border:none;outline:none}
nav{display:flex;align-items:center;justify-content:space-between;padding:16px 48px;border-bottom:1px solid var(--border);background:rgba(255,255,255,0.95);backdrop-filter:blur(8px);position:sticky;top:0;z-index:200}
.logo{display:flex;align-items:center;gap:10px}.logo-emoji{font-size:1.4rem}.logo-text{display:flex;flex-direction:column;line-height:1.2}.logo-odia{font-family:var(--font-or);font-size:1.05rem;font-weight:700}.logo-url{font-size:0.65rem;font-weight:600;color:var(--light)}
.breadcrumb{display:flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;color:var(--light)}.breadcrumb a{color:var(--light);transition:color .15s}.breadcrumb a:hover{color:var(--ink)}.breadcrumb span{color:var(--c)}
.star-bar{background:#fff;border-bottom:1px solid var(--border);padding:10px 48px;display:flex;align-items:center;gap:20px;flex-wrap:wrap}
.star-display{display:flex;align-items:center;gap:6px}.star-count{font-size:1.5rem;font-weight:900;color:var(--yellow);line-height:1}.star-label{font-size:0.78rem;font-weight:700;color:var(--light)}
.progress-wrap{flex:1;min-width:160px}.progress-label{font-size:0.72rem;font-weight:700;color:var(--light);margin-bottom:4px}.progress-bar{height:8px;background:var(--off);border-radius:50px;overflow:hidden}.progress-fill{height:100%;background:linear-gradient(90deg,var(--yellow),var(--c));border-radius:50px;transition:width 0.5s ease}
.games-done{font-size:0.78rem;font-weight:700;color:var(--light)}
.page-hero{max-width:900px;margin:0 auto;padding:48px 48px 36px;text-align:center}
.page-hero h1{font-family:var(--font-or);font-size:clamp(1.8rem,4vw,2.6rem);font-weight:700;margin-bottom:8px;color:var(--c)}
.page-hero p{font-size:0.95rem;color:var(--soft)}
hr.divider{border:none;border-top:1px solid var(--border);max-width:900px;margin:0 auto}
.game-section{max-width:900px;margin:0 auto;padding:48px 48px 56px}
.game-header{display:flex;align-items:center;gap:14px;margin-bottom:28px}
.game-icon{font-size:2rem}.game-title{font-size:1.3rem;font-weight:900;color:var(--ink)}.game-subtitle{font-size:0.82rem;font-weight:600;color:var(--light);margin-top:2px}
.game-stars-possible{margin-left:auto;font-size:0.78rem;font-weight:800;background:#FFFBEC;color:var(--yellow);border:1px solid #FFE99A;padding:4px 12px;border-radius:50px}
.quiz-card{background:#fff;border-radius:20px;border:2px solid var(--border);padding:32px;margin-bottom:16px}
.quiz-q-num{font-size:0.72rem;font-weight:800;color:var(--light);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px}
.quiz-question{font-family:var(--font-or);font-size:1.4rem;font-weight:700;color:var(--ink);margin-bottom:8px;line-height:1.6}
.quiz-instruction{font-size:0.85rem;color:var(--soft);margin-bottom:24px}
.quiz-options{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.quiz-opt{padding:14px 18px;border-radius:14px;border:2px solid var(--border);background:#fff;cursor:pointer;font-family:var(--font-or);font-size:1.1rem;font-weight:700;transition:all .15s;text-align:center}
.quiz-opt:hover:not(:disabled){border-color:var(--blue);background:var(--bluebg)}
.quiz-opt.correct{border-color:var(--green);background:var(--greenbg);color:var(--green)}
.quiz-opt.wrong{border-color:var(--red);background:var(--redbg);color:var(--red)}
.quiz-opt:disabled{cursor:default}
.quiz-feedback{margin-top:14px;padding:12px 16px;border-radius:12px;font-size:0.88rem;font-weight:700;display:none}
.quiz-feedback.show{display:block}.quiz-feedback.ok{background:var(--greenbg);color:var(--green)}.quiz-feedback.bad{background:var(--redbg);color:var(--red)}
.quiz-next{margin-top:16px;background:var(--ink);color:#fff;padding:10px 24px;border-radius:10px;font-size:0.88rem;font-weight:800;display:none;transition:opacity .15s}.quiz-next:hover{opacity:0.8}.quiz-next.show{display:inline-block}
.match-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px}
.match-col{display:flex;flex-direction:column;gap:10px}
.match-col-label{font-size:0.7rem;font-weight:800;color:var(--light);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px}
.match-item{padding:14px 20px;border-radius:14px;border:2px solid var(--border);background:#fff;cursor:pointer;transition:all .15s;display:flex;align-items:center;gap:12px;font-weight:700;user-select:none}
.match-item:hover{border-color:var(--c);background:var(--cbg)}
.match-item.selected{border-color:var(--blue);background:var(--bluebg)}
.match-item.correct{border-color:var(--green);background:var(--greenbg);pointer-events:none}
.match-item.wrong{border-color:var(--red);background:var(--redbg);animation:shake .3s}
.match-letter{font-family:var(--font-or);font-size:1rem;font-weight:700}
.results-banner{background:#fff;border:2px solid var(--yellow);border-radius:24px;padding:40px;text-align:center;margin:0 auto 40px;max-width:900px;display:none}
.results-banner.show{display:block;animation:popIn .5s cubic-bezier(.34,1.56,.64,1)}
.results-emoji{font-size:4rem;margin-bottom:12px}.results-title{font-size:1.8rem;font-weight:900;margin-bottom:8px}.results-score{font-size:1.1rem;color:var(--soft);margin-bottom:20px}.results-stars{font-size:2.5rem;letter-spacing:4px;margin-bottom:24px}
.results-retry{background:var(--c);color:#fff;padding:12px 32px;border-radius:12px;font-size:1rem;font-weight:800;transition:opacity .15s}.results-retry:hover{opacity:0.85}
#confetti{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;display:none}
.game-divider{border:none;border-top:1px solid var(--border);margin:48px 0}
.star-pop{position:fixed;font-size:2rem;pointer-events:none;z-index:999;animation:starFloat 1s ease forwards}
@keyframes starFloat{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-80px) scale(1.5)}}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
@keyframes popIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
footer{border-top:1px solid var(--border);padding:24px 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}.footer-logo{font-family:var(--font-or);font-size:1rem;font-weight:700}.footer-copy{font-size:0.78rem;color:var(--light);font-weight:600}
@media(max-width:768px){nav,.star-bar,.page-hero,.game-section,footer{padding-left:20px;padding-right:20px}.match-grid,.quiz-options{grid-template-columns:1fr}}
@media(max-width:480px){.breadcrumb{display:none}.quiz-options{grid-template-columns:1fr}}
</style>
</head>
<body>
<canvas id="confetti"></canvas>
<nav>
  <a href="../../index.html" class="logo"><div class="logo-emoji">📖</div><div class="logo-text"><!-- REVIEW NEEDED --><span class="logo-odia">ପାଠପଢ଼ା</span><span class="logo-url">pathapadha.com</span></div></a>
  <div class="breadcrumb">${cfg.breadcrumb}</div>
</nav>
<div class="star-bar"><div class="star-display"><span class="star-count" id="starCount">0</span><span style="font-size:1.4rem">⭐</span><span class="star-label">Stars earned</span></div><div class="progress-wrap"><div class="progress-label">Overall progress</div><div class="progress-bar"><div class="progress-fill" id="progressFill" style="width:0%"></div></div></div><div class="games-done" id="gamesDone">0 / 8 games done</div></div>
<!-- REVIEW NEEDED -->
<div class="page-hero"><h1>${cfg.title} ଖେଳ 🎮</h1><p>8 fun games to master ${cfg.titleEn} — earn ⭐ for every correct answer!</p></div>
<hr class="divider">
${cfg.gameSectionsHTML}
<div class="results-banner" id="resultsBanner"><div class="results-emoji" id="resultsEmoji">🏆</div><!-- REVIEW NEEDED --><div class="results-title" id="resultsTitle">ବହୁତ ଭଲ!</div><div class="results-score" id="resultsScore"></div><div class="results-stars" id="resultsStars"></div><button class="results-retry" onclick="location.reload()">ପୁଣି ଖେଳ 🔄</button></div>
<footer><!-- REVIEW NEEDED --><span class="footer-logo">ପାଠପଢ଼ା</span><span class="footer-copy">${cfg.footer}</span></footer>
<script>
// REVIEW NEEDED
var totalStars=0,gamesCompleted=0,totalGames=8;
function addStars(n,el){totalStars+=n;document.getElementById('starCount').textContent=totalStars;updateProgress();for(var i=0;i<n;i++){(function(idx){setTimeout(function(){var pop=document.createElement('div');pop.className='star-pop';pop.textContent='⭐';if(el){var r=el.getBoundingClientRect();pop.style.left=(r.left+r.width/2)+'px';pop.style.top=r.top+'px'}else{pop.style.left=(window.innerWidth/2)+'px';pop.style.top=(window.innerHeight/2)+'px'}document.body.appendChild(pop);setTimeout(function(){pop.remove()},1000)},idx*150)})(i)}}
function completeGame(){gamesCompleted++;updateProgress();if(gamesCompleted>=totalGames)showResults()}
function updateProgress(){var pct=(gamesCompleted/totalGames)*100;document.getElementById('progressFill').style.width=pct+'%';document.getElementById('gamesDone').textContent=gamesCompleted+' / '+totalGames+' games done'}
function showResults(){var banner=document.getElementById('resultsBanner');document.getElementById('resultsScore').textContent='You earned '+totalStars+' stars!';var s='';for(var i=0;i<Math.min(totalStars,10);i++)s+='⭐';if(totalStars>10)s+=' +'+(totalStars-10);document.getElementById('resultsStars').textContent=s;if(totalStars>=40){document.getElementById('resultsEmoji').textContent='🏆';document.getElementById('resultsTitle').textContent='Perfect! ସମ୍ପୂର୍ଣ୍ଣ!'}else if(totalStars>=25){document.getElementById('resultsEmoji').textContent='🎉';document.getElementById('resultsTitle').textContent='ବହୁତ ଭଲ!'}else{document.getElementById('resultsEmoji').textContent='💪';document.getElementById('resultsTitle').textContent='ଆଉ ଥରେ ଚେଷ୍ଟା କର!'}banner.classList.add('show');if(totalStars>=25)launchConfetti()}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function initMatch(lE,rE,sE,data){var sr=shuffle(data.map(function(d){return{right:d.right,id:d.id}}));var sel=null,m=0,done=false;data.forEach(function(d){var el=document.createElement('div');el.className='match-item';el.innerHTML='<span class="match-letter">'+d.left+'</span>';el.dataset.id=d.id;el.dataset.side='left';el.onclick=function(){mc(el)};lE.appendChild(el)});sr.forEach(function(d){var el=document.createElement('div');el.className='match-item';el.innerHTML='<span class="match-letter">'+d.right+'</span>';el.dataset.id=d.id;el.dataset.side='right';el.onclick=function(){mc(el)};rE.appendChild(el)});function mc(el){if(done||el.classList.contains('correct'))return;if(!sel){sel=el;el.classList.add('selected');return}if(sel===el){sel.classList.remove('selected');sel=null;return}if(sel.dataset.side===el.dataset.side){sel.classList.remove('selected');sel=el;el.classList.add('selected');return}if(sel.dataset.id===el.dataset.id){sel.classList.remove('selected');sel.classList.add('correct');el.classList.add('correct');m++;addStars(1,el);sE.textContent=m+'/'+data.length;if(m===data.length){done=true;sE.textContent='All matched! 🎉';completeGame()}}else{sel.classList.remove('selected');sel.classList.add('wrong');el.classList.add('wrong');var s2=sel;setTimeout(function(){s2.classList.remove('wrong');el.classList.remove('wrong')},500);sel=null;return}sel=null}}
function initMCQ(cE,bE,data){var idx=0;function render(){if(idx>=data.length){bE.style.display='none';completeGame();return}var d=data[idx];var h='<div class="quiz-card"><div class="quiz-q-num">Q'+(idx+1)+'/'+data.length+'</div><div class="quiz-question">'+d.q+'</div><div class="quiz-instruction">Pick the correct answer</div><div class="quiz-options" id="'+cE.id+'O">';d.opts.forEach(function(o,i){h+='<button class="quiz-opt" data-i="'+i+'">'+o+'</button>'});h+='</div><div class="quiz-feedback" id="'+cE.id+'F"></div></div>';cE.innerHTML=h;bE.classList.remove('show');document.querySelectorAll('#'+cE.id+'O .quiz-opt').forEach(function(b){b.onclick=function(){pick(b,parseInt(b.dataset.i))}})}function pick(el,i){var d=data[idx];document.querySelectorAll('#'+cE.id+'O .quiz-opt').forEach(function(o){o.disabled=true});var fb=document.getElementById(cE.id+'F');if(i===d.ans){el.classList.add('correct');fb.className='quiz-feedback show ok';fb.textContent='✅ Correct!';addStars(1,el)}else{el.classList.add('wrong');document.querySelectorAll('#'+cE.id+'O .quiz-opt').forEach(function(o){if(parseInt(o.dataset.i)===d.ans)o.classList.add('correct')});fb.className='quiz-feedback show bad';fb.textContent='❌ Correct: '+d.opts[d.ans]}bE.classList.add('show')}bE.onclick=function(){idx++;render()};render()}
function initFill(cE,bE,data){var idx=0;function render(){if(idx>=data.length){bE.style.display='none';completeGame();return}var d=data[idx];var ch=shuffle(d.choices.slice());var h='<div class="quiz-card"><div class="quiz-q-num">'+(idx+1)+'/'+data.length+'</div><div class="quiz-question" style="font-size:1.2rem">'+d.sentence+'</div><div class="quiz-instruction">Pick the correct word</div><div class="quiz-options" id="'+cE.id+'O">';ch.forEach(function(c){h+='<button class="quiz-opt">'+c+'</button>'});h+='</div><div class="quiz-feedback" id="'+cE.id+'F"></div></div>';cE.innerHTML=h;bE.classList.remove('show');document.querySelectorAll('#'+cE.id+'O .quiz-opt').forEach(function(b){b.onclick=function(){pickF(b)}})}function pickF(el){var d=data[idx];document.querySelectorAll('#'+cE.id+'O .quiz-opt').forEach(function(o){o.disabled=true});var fb=document.getElementById(cE.id+'F');if(el.textContent===d.answer){el.classList.add('correct');fb.className='quiz-feedback show ok';fb.textContent='✅ Correct!';addStars(1,el)}else{el.classList.add('wrong');document.querySelectorAll('#'+cE.id+'O .quiz-opt').forEach(function(o){if(o.textContent===d.answer)o.classList.add('correct')});fb.className='quiz-feedback show bad';fb.textContent='❌ Correct: '+d.answer}bE.classList.add('show')}bE.onclick=function(){idx++;render()};render()}
function initTF(cE,bE,data){var idx=0;function render(){if(idx>=data.length){bE.style.display='none';completeGame();return}var d=data[idx];var h='<div class="quiz-card"><div class="quiz-q-num">Q'+(idx+1)+'/'+data.length+'</div><div class="quiz-question">'+d.q+'</div><div class="quiz-instruction">True or False?</div><div class="quiz-options" id="'+cE.id+'O"><button class="quiz-opt" data-v="true">✅ ଠିକ୍</button><button class="quiz-opt" data-v="false">❌ ଭୁଲ</button></div><div class="quiz-feedback" id="'+cE.id+'F"></div></div>';cE.innerHTML=h;bE.classList.remove('show');document.querySelectorAll('#'+cE.id+'O .quiz-opt').forEach(function(b){b.onclick=function(){pickTF(b)}})}function pickTF(el){var d=data[idx];var v=el.dataset.v==='true';document.querySelectorAll('#'+cE.id+'O .quiz-opt').forEach(function(o){o.disabled=true});var fb=document.getElementById(cE.id+'F');if(v===d.ans){el.classList.add('correct');fb.className='quiz-feedback show ok';fb.textContent='✅ Correct!';addStars(1,el)}else{el.classList.add('wrong');fb.className='quiz-feedback show bad';fb.textContent='❌ Answer: '+(d.ans?'ଠିକ୍':'ଭୁଲ')}bE.classList.add('show')}bE.onclick=function(){idx++;render()};render()}
function launchConfetti(){var canvas=document.getElementById('confetti');canvas.style.display='block';canvas.width=window.innerWidth;canvas.height=window.innerHeight;var ctx=canvas.getContext('2d');var pieces=[];var colors=['#FF6B6B','#FF9F43','#FECA57','#48DBFB','#1DD1A1','#A29BFE','#FD79A8','#6C5CE7'];for(var i=0;i<150;i++){pieces.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height-canvas.height,w:Math.random()*10+5,h:Math.random()*6+3,color:colors[Math.floor(Math.random()*colors.length)],vy:Math.random()*3+2,vx:(Math.random()-0.5)*2,rot:Math.random()*360,vr:(Math.random()-0.5)*8})}var frames=0;(function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);pieces.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.fillStyle=p.color;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore()});frames++;if(frames<200)requestAnimationFrame(draw);else canvas.style.display='none'})()}
${cfg.initCode}
</script>
</body>
</html>`;
}

// Helper to build 8-game sections HTML + init code
function buildGames(games) {
  const icons = ['🔗','❓','✏️','✅','🎯','📝','👤','🧠'];
  let html = '';
  let code = '';
  games.forEach((g, i) => {
    if (i > 0) html += '<hr class="game-divider">\n';
    html += `<section class="game-section" id="game${i+1}">
<div class="game-header"><div class="game-icon">${icons[i]}</div><div><!-- REVIEW NEEDED --><div class="game-title">Game ${i+1} — ${g.name}</div><div class="game-subtitle">${g.sub}</div></div><div class="game-stars-possible">${g.stars} ⭐</div></div>
${g.html}
</section>\n`;
    code += g.init + '\n';
  });
  return { gameSectionsHTML: html, initCode: code };
}

// Match section HTML
function mH(id, l1, l2) {
  return `<div class="match-grid"><div class="match-col"><div class="match-col-label">${l1}</div><div id="${id}L"></div></div><div class="match-col"><div class="match-col-label">${l2}</div><div id="${id}R"></div></div></div><div style="margin-top:20px;font-size:0.85rem;font-weight:700;color:var(--light)" id="${id}S"></div>`;
}
function qH(id) { return `<div id="${id}C"></div><button class="quiz-next show" id="${id}B">Next →</button>`; }

// ============================================================
// DATA: Generate all remaining files
// ============================================================

// --- MATH ---
const mathSubjects = {
  filepath: BASE + '/math/index.html',
  nameOr: 'ଗଣିତ', nameEn: 'Mathematics', emoji: '📘',
  color: '#3A86FF', bg: '#EEF4FF',
  bookBadge: 'ଗଣିତ — BSE Odisha / NCERT',
  heroDesc: 'Master number systems, polynomials, equations, geometry, statistics and probability for Class 9.',
  book: 'Textbook: ଗଣିତ (BSE Odisha / NCERT)',
  topics: [
    {name:'ସଂଖ୍ୟା ପଦ୍ଧତି',eng:'Number Systems',desc:'Real numbers, irrational numbers, and number line representation',emoji:'🔢',color:'#FF6B6B',bg:'#FFF0F0',file:'number-systems'},
    {name:'ବହୁପଦୀ',eng:'Polynomials',desc:'Polynomials, zeroes, factorisation and remainder theorem',emoji:'📐',color:'#3A86FF',bg:'#EEF4FF',file:'polynomials'},
    {name:'ସମୀକରଣ',eng:'Linear Equations',desc:'Linear equations in two variables and their graphical representation',emoji:'📊',color:'#43AA8B',bg:'#EDFAF4',file:'linear-equations'},
    {name:'ଜ୍ୟାମିତି',eng:'Geometry',desc:'Lines, angles, triangles, quadrilaterals, circles and constructions',emoji:'📏',color:'#7B5EA7',bg:'#F3EDFF',file:'geometry'},
    {name:'ପରିସଂଖ୍ୟାନ',eng:'Statistics',desc:'Data collection, presentation, mean, median, mode and graphs',emoji:'📈',color:'#FF9F43',bg:'#FFF5EC',file:'statistics'},
    {name:'ସମ୍ଭାବ୍ୟତା',eng:'Probability',desc:'Experimental and theoretical probability, random experiments',emoji:'🎲',color:'#E84393',bg:'#FFE6F0',file:'probability'}
  ]
};

// --- ENGLISH ---
const engSubjects = {
  filepath: BASE + '/english/index.html',
  nameOr: 'ଇଂରାଜୀ', nameEn: 'English', emoji: '📙',
  color: '#43AA8B', bg: '#EDFAF4',
  bookBadge: 'Beehive / Moments — NCERT',
  heroDesc: 'Master English literature, grammar, vocabulary, and writing skills for Class 9 NCERT.',
  book: 'Textbook: Beehive / Moments (NCERT)',
  topics: [
    {name:'Literature',eng:'Literature — Prose & Poetry',desc:'Read and analyse prose and poetry from Beehive and Moments',emoji:'📖',color:'#FF6B6B',bg:'#FFF0F0',file:'literature'},
    {name:'Grammar',eng:'Grammar — Tenses, Voice, Clauses',desc:'Master tenses, active/passive voice, reported speech, and clauses',emoji:'📐',color:'#3A86FF',bg:'#EEF4FF',file:'grammar'},
    {name:'Vocabulary',eng:'Vocabulary — Words & Idioms',desc:'Build vocabulary with word meanings, synonyms, antonyms, and idioms',emoji:'📝',color:'#7B5EA7',bg:'#F3EDFF',file:'vocabulary'},
    {name:'Writing',eng:'Writing — Essay, Letter, Notice',desc:'Learn essay writing, formal/informal letters, notices and reports',emoji:'✍️',color:'#FF9F43',bg:'#FFF5EC',file:'writing'}
  ]
};

// --- SCIENCE ---
const sciSubjects = {
  filepath: BASE + '/science/index.html',
  nameOr: 'ବିଜ୍ଞାନ', nameEn: 'Science', emoji: '🔬',
  color: '#7B5EA7', bg: '#F3EDFF',
  bookBadge: 'ବିଜ୍ଞାନ — BSE Odisha / NCERT',
  heroDesc: 'Study matter, chemical bonding, motion, cells, and natural resources for Class 9 Science.',
  book: 'Textbook: ବିଜ୍ଞାନ (BSE Odisha / NCERT)',
  topics: [
    {name:'ପଦାର୍ଥର ଗଠନ',eng:'Matter — Structure of Atom',desc:'States of matter, atoms, molecules, and atomic structure',emoji:'⚛️',color:'#FF6B6B',bg:'#FFF0F0',file:'matter'},
    {name:'ରାସାୟନିକ ବନ୍ଧନ',eng:'Chemical Bonding & Reactions',desc:'Chemical bonds, reactions, acids, bases, and salts',emoji:'🧪',color:'#3A86FF',bg:'#EEF4FF',file:'chemical-bonding'},
    {name:'ଗତି ଓ ବଳ',eng:'Motion & Force',desc:'Motion, speed, velocity, acceleration, force and laws of motion',emoji:'🚀',color:'#43AA8B',bg:'#EDFAF4',file:'motion-force'},
    {name:'କୋଷ ଓ ଅଙ୍ଗାଣୁ',eng:'Cell & Tissues',desc:'Cell structure, organelles, cell division, and tissue types',emoji:'🔬',color:'#7B5EA7',bg:'#F3EDFF',file:'cell-tissues'},
    {name:'ପ୍ରାକୃତିକ ସମ୍ପଦ',eng:'Natural Resources',desc:'Air, water, soil, biogeochemical cycles and conservation',emoji:'🌿',color:'#FF9F43',bg:'#FFF5EC',file:'natural-resources'}
  ]
};

// --- SOCIAL STUDIES ---
const ssSubjects = {
  filepath: BASE + '/social-studies/index.html',
  nameOr: 'ସମାଜ ଅଧ୍ୟୟନ', nameEn: 'Social Studies', emoji: '🌍',
  color: '#FF9F43', bg: '#FFF5EC',
  bookBadge: 'ଇତିହାସ / ଭୂଗୋଳ / ନାଗରିକ ଶାସ୍ତ୍ର — BSE',
  heroDesc: 'Study history, geography, civics and economics for Class 9 Social Studies.',
  book: 'Textbook: ଇତିହାସ / ଭୂଗୋଳ / ନାଗରିକ ଶାସ୍ତ୍ର (BSE)',
  topics: [
    {name:'ଫରାସୀ ବିପ୍ଳବ',eng:'French Revolution',desc:'Causes, events, and impact of the French Revolution',emoji:'🏛️',color:'#FF6B6B',bg:'#FFF0F0',file:'french-revolution'},
    {name:'ଭାରତୀୟ ସ୍ୱାଧୀନତା',eng:'Indian Freedom Movement',desc:'Key events and leaders of the Indian independence movement',emoji:'🇮🇳',color:'#FF9F43',bg:'#FFF5EC',file:'freedom-movement'},
    {name:'ଭୂଗୋଳ',eng:'Geography — India & World',desc:'Physical features, climate, drainage, population of India',emoji:'🗺️',color:'#3A86FF',bg:'#EEF4FF',file:'geography'},
    {name:'ଗଣତନ୍ତ୍ର',eng:'Democracy & Constitution',desc:'Democracy, constitution, electoral politics and institutions',emoji:'🏛️',color:'#7B5EA7',bg:'#F3EDFF',file:'democracy'},
    {name:'ଅର୍ଥନୀତି',eng:'Economy — Poverty & Food Security',desc:'Poverty, food security, village economy, and development',emoji:'💰',color:'#43AA8B',bg:'#EDFAF4',file:'economy'}
  ]
};

// Generate subject index pages
[mathSubjects, engSubjects, sciSubjects, ssSubjects].forEach(s => {
  writeFile(s.filepath, subjectIndex(s));
});

// ============================================================
// Generate ALL topic pages + games pages for each subject
// ============================================================

function genTopicAndGames(subjectDir, subjectLabel, topicCfg) {
  // Topic page
  writeFile(`${BASE}/${subjectDir}/${topicCfg.file}.html`, topicPage(topicCfg.topicData));

  // Games page
  const g = buildGames(topicCfg.gamesData);
  writeFile(`${BASE}/${subjectDir}/${topicCfg.file}-games.html`, gamesPage({
    title: topicCfg.topicData.title,
    titleEn: topicCfg.topicData.titleEn.split(' — ')[0] || topicCfg.topicData.titleEn,
    color: topicCfg.topicData.color,
    bg: topicCfg.topicData.bg,
    breadcrumb: `<a href="../../index.html">Home</a> › <a href="../index.html">Class 9</a> › <!-- REVIEW NEEDED --><a href="index.html">${subjectLabel}</a> › <span>${topicCfg.topicData.title} ଖେଳ</span>`,
    footer: `Class 9 · ${subjectLabel} · ${topicCfg.topicData.title} · Free forever`,
    gameSectionsHTML: g.gameSectionsHTML,
    initCode: g.initCode
  }));
}

// --- MATH TOPICS ---
const mathTopics = [
  {file:'number-systems', topicData:{
    title:'ସଂଖ୍ୟା ପଦ୍ଧତି', titleEn:'Number Systems', color:'#FF6B6B', bg:'#FFF0F0', emoji:'🔢',
    subject:'ଗଣିତ', textbook:'ଗଣିତ (BSE/NCERT)', introOr:'ପ୍ରାକୃତିକ ସଂଖ୍ୟା, ପୂର୍ଣ୍ଣ ସଂଖ୍ୟା, ମୂଳଦ ଓ ଅମୂଳଦ ସଂଖ୍ୟା ଶିଖ।', introEn:'Learn natural, whole, rational, irrational and real numbers.',
    backHref:'index.html', backText:'ଗଣିତ', gamesHref:'number-systems-games.html', fwdHref:'polynomials.html', fwdText:'ବହୁପଦୀ', footerText:'Class 9 · Math · Free forever',
    cards:[
      {title:'ପ୍ରାକୃତିକ ସଂଖ୍ୟା',titleEn:'Natural Numbers',emoji:'1️⃣',body:'ପ୍ରାକୃତିକ ସଂଖ୍ୟା ହେଉଛି 1, 2, 3, 4, ... ଅର୍ଥାତ୍ ଗଣନାରେ ବ୍ୟବହୃତ ସଂଖ୍ୟା। 0 ପ୍ରାକୃତିକ ସଂଖ୍ୟା ନୁହେଁ।',highlight:'N = {1, 2, 3, 4, 5, ...}',numLabel:'Topic'},
      {title:'ମୂଳଦ ସଂଖ୍ୟା',titleEn:'Rational Numbers',emoji:'➗',body:'p/q ରୂପରେ ପ୍ରକାଶ ହୋଇପାରୁଥିବା ସଂଖ୍ୟା (q≠0) ମୂଳଦ ସଂଖ୍ୟା। ଯଥା: 1/2, -3/4, 5 (=5/1)।',highlight:'Q = {p/q : p,q ∈ Z, q ≠ 0}',numLabel:'Topic'},
      {title:'ଅମୂଳଦ ସଂଖ୍ୟା',titleEn:'Irrational Numbers',emoji:'🌀',body:'p/q ରୂପରେ ପ୍ରକାଶ ହୋଇ ନ ପାରୁଥିବା ସଂଖ୍ୟା ଅମୂଳଦ। ଯଥା: √2, √3, π। ଏମାନଙ୍କ ଦଶମିକ ପ୍ରସାରଣ ଅସମାପ୍ତ ଓ ଅପୁନରାବୃତ୍ତ।',highlight:'√2 = 1.41421356..., π = 3.14159265...',numLabel:'Topic'},
      {title:'ବାସ୍ତବ ସଂଖ୍ୟା',titleEn:'Real Numbers',emoji:'📊',body:'ମୂଳଦ ଓ ଅମୂଳଦ ସଂଖ୍ୟାଙ୍କ ସମଷ୍ଟିକୁ ବାସ୍ତବ ସଂଖ୍ୟା କୁହାଯାଏ। ସଂଖ୍ୟା ରେଖା ଉପରେ ପ୍ରତ୍ୟେକ ବିନ୍ଦୁ ଏକ ବାସ୍ତବ ସଂଖ୍ୟା ପ୍ରତିନିଧିତ୍ୱ କରେ।',highlight:'R = Q ∪ Q\' (Rational ∪ Irrational)',numLabel:'Topic'}
    ]
  }, gamesData:[
    {name:'ସଂଖ୍ୟା ମିଳାଅ',sub:'Match number type',stars:6,html:mH('m1','ସଂଖ୍ୟା','ପ୍ରକାର'),init:`initMatch(document.getElementById('m1L'),document.getElementById('m1R'),document.getElementById('m1S'),[{left:'√2',right:'ଅମୂଳଦ',id:'a'},{left:'3/4',right:'ମୂଳଦ',id:'b'},{left:'π',right:'ଅମୂଳଦ',id:'c'},{left:'-5',right:'ପୂର୍ଣ୍ଣ ସଂଖ୍ୟା',id:'d'},{left:'0',right:'ପୂର୍ଣ୍ଣ ସଂଖ୍ୟା',id:'e'},{left:'7',right:'ପ୍ରାକୃତିକ',id:'f'}]);`},
    {name:'ସଂଖ୍ୟା କୁଇଜ୍',sub:'Number system quiz',stars:8,html:qH('q2'),init:`initMCQ(document.getElementById('q2C'),document.getElementById('q2B'),[{q:'√2 କେଉଁ ପ୍ରକାର ସଂଖ୍ୟା?',opts:['ମୂଳଦ','ଅମୂଳଦ','ପ୍ରାକୃତିକ','ପୂର୍ଣ୍ଣ'],ans:1},{q:'0 କେଉଁ ପ୍ରକାର ସଂଖ୍ୟା?',opts:['ପ୍ରାକୃତିକ','ପୂର୍ଣ୍ଣ','ଅମୂଳଦ','ଋଣାତ୍ମକ'],ans:1},{q:'p/q (q≠0) ରୂପର ସଂଖ୍ୟା କଣ?',opts:['ଅମୂଳଦ','ମୂଳଦ','ପ୍ରାକୃତିକ','କାଳ୍ପନିକ'],ans:1},{q:'π ହେଉଛି:',opts:['ମୂଳଦ','ଅମୂଳଦ','ପୂର୍ଣ୍ଣ','ପ୍ରାକୃତିକ'],ans:1},{q:'ବାସ୍ତବ ସଂଖ୍ୟା = ?',opts:['ମୂଳଦ + ଅମୂଳଦ','କେବଳ ମୂଳଦ','କେବଳ ପୂର୍ଣ୍ଣ','କେବଳ ପ୍ରାକୃତିକ'],ans:0},{q:'-3 କେଉଁ ସଂଖ୍ୟା?',opts:['ପ୍ରାକୃତିକ','ପୂର୍ଣ୍ଣ','ଋଣାତ୍ମକ ପୂର୍ଣ୍ଣାଙ୍କ','ଅମୂଳଦ'],ans:2},{q:'√9 = ?',opts:['2','3','4','ଅମୂଳଦ'],ans:1},{q:'1/3 ର ଦଶମିକ ରୂପ?',opts:['0.33','0.333...','0.3','0.33...'],ans:1}]);`},
    {name:'ଶବ୍ଦ ଭରଣା',sub:'Fill in the blank',stars:6,html:qH('f3'),init:`initFill(document.getElementById('f3C'),document.getElementById('f3B'),[{sentence:'√2 ଏକ ___ ସଂଖ୍ୟା।',answer:'ଅମୂଳଦ',choices:['ଅମୂଳଦ','ମୂଳଦ','ପ୍ରାକୃତିକ','ପୂର୍ଣ୍ଣ']},{sentence:'ବାସ୍ତବ ସଂଖ୍ୟା = ମୂଳଦ + ___',answer:'ଅମୂଳଦ',choices:['ଅମୂଳଦ','ପ୍ରାକୃତିକ','ପୂର୍ଣ୍ଣ','କାଳ୍ପନିକ']},{sentence:'0 ଏକ ___ ସଂଖ୍ୟା।',answer:'ପୂର୍ଣ୍ଣ',choices:['ପୂର୍ଣ୍ଣ','ପ୍ରାକୃତିକ','ଅମୂଳଦ','ଋଣାତ୍ମକ']},{sentence:'π ର ମୂଲ୍ୟ ପ୍ରାୟ ___',answer:'3.14',choices:['3.14','2.71','1.41','1.73']},{sentence:'ସଂଖ୍ୟା ରେଖା ଉପରେ ପ୍ରତ୍ୟେକ ବିନ୍ଦୁ ___ ସଂଖ୍ୟା।',answer:'ବାସ୍ତବ',choices:['ବାସ୍ତବ','ମୂଳଦ','ଅମୂଳଦ','କାଳ୍ପନିକ']},{sentence:'p/q ସଂଖ୍ୟା ଯେଉଁଠି q≠0 ତାକୁ ___ କହନ୍ତି।',answer:'ମୂଳଦ',choices:['ମୂଳଦ','ଅମୂଳଦ','ପ୍ରାକୃତିକ','ପୂର୍ଣ୍ଣ']}]);`},
    {name:'ଠିକ୍ କି ଭୁଲ',sub:'True or false',stars:8,html:qH('t4'),init:`initTF(document.getElementById('t4C'),document.getElementById('t4B'),[{q:'√2 ଏକ ମୂଳଦ ସଂଖ୍ୟା।',ans:false},{q:'0 ଏକ ପୂର୍ଣ୍ଣ ସଂଖ୍ୟା।',ans:true},{q:'π = 22/7 ସଠିକ୍।',ans:false},{q:'ସବୁ ପ୍ରାକୃତିକ ସଂଖ୍ୟା ପୂର୍ଣ୍ଣ ସଂଖ୍ୟା।',ans:true},{q:'ସବୁ ପୂର୍ଣ୍ଣ ସଂଖ୍ୟା ପ୍ରାକୃତିକ ସଂଖ୍ୟା।',ans:false},{q:'√4 ଅମୂଳଦ।',ans:false},{q:'ବାସ୍ତବ ସଂଖ୍ୟା ସଂଖ୍ୟା ରେଖାରେ ଦେଖାଯାଏ।',ans:true},{q:'-5 ଏକ ପୂର୍ଣ୍ଣାଙ୍କ।',ans:true}]);`},
    {name:'ସଂଖ୍ୟା ମିଳାଅ ୨',sub:'Match values',stars:5,html:mH('m5','ମୂଲ୍ୟ','ଫଳ'),init:`initMatch(document.getElementById('m5L'),document.getElementById('m5R'),document.getElementById('m5S'),[{left:'√4',right:'2',id:'a'},{left:'√9',right:'3',id:'b'},{left:'√16',right:'4',id:'c'},{left:'√25',right:'5',id:'d'},{left:'√36',right:'6',id:'e'}]);`},
    {name:'ସଂଖ୍ୟା ସେଟ କୁଇଜ୍',sub:'Number set quiz',stars:6,html:qH('q6'),init:`initMCQ(document.getElementById('q6C'),document.getElementById('q6B'),[{q:'N ⊂ W ⊂ Z ⊂ Q ⊂ R — N ହେଉଛି?',opts:['ପ୍ରାକୃତିକ','ପୂର୍ଣ୍ଣ','ପୂର୍ଣ୍ଣାଙ୍କ','ମୂଳଦ'],ans:0},{q:'W ହେଉଛି?',opts:['ପ୍ରାକୃତିକ','ପୂର୍ଣ୍ଣ','ପୂର୍ଣ୍ଣାଙ୍କ','ମୂଳଦ'],ans:1},{q:'Z ହେଉଛି?',opts:['ପ୍ରାକୃତିକ','ପୂର୍ଣ୍ଣ','ପୂର୍ଣ୍ଣାଙ୍କ','ମୂଳଦ'],ans:2},{q:'Q ହେଉଛି?',opts:['ପ୍ରାକୃତିକ','ପୂର୍ଣ୍ଣ','ପୂର୍ଣ୍ଣାଙ୍କ','ମୂଳଦ'],ans:3},{q:'R ହେଉଛି?',opts:['ମୂଳଦ','ବାସ୍ତବ','ପୂର୍ଣ୍ଣ','ପ୍ରାକୃତିକ'],ans:1},{q:'√5 × √5 = ?',opts:['5','√10','25','10'],ans:0}]);`},
    {name:'ଦଶମିକ ଭରଣା',sub:'Decimal form fill',stars:6,html:qH('f7'),init:`initFill(document.getElementById('f7C'),document.getElementById('f7B'),[{sentence:'1/3 = 0.___',answer:'333...',choices:['333...','33','3','330']},{sentence:'1/4 = 0.___',answer:'25',choices:['25','250','025','2.5']},{sentence:'√2 ≈ 1.___',answer:'414',choices:['414','141','441','114']},{sentence:'1/7 ର ଦଶମିକ ___ ପ୍ରକାରର',answer:'ପୁନରାବୃତ୍ତ',choices:['ପୁନରାବୃତ୍ତ','ଅପୁନରାବୃତ୍ତ','ସମାପ୍ତ','ଶୂନ୍ୟ']},{sentence:'0.999... = ___',answer:'1',choices:['1','0.9','0.99','0.999']},{sentence:'√3 ≈ 1.___',answer:'732',choices:['732','372','273','723']}]);`},
    {name:'ଗଭୀର କୁଇଜ୍',sub:'Advanced quiz',stars:8,html:qH('q8'),init:`initMCQ(document.getElementById('q8C'),document.getElementById('q8B'),[{q:'ଦୁଇଟି ଅମୂଳଦ ସଂଖ୍ୟାର ଯୋଗ ସବୁବେଳେ ଅମୂଳଦ?',opts:['ହଁ','ନା','ବେଳେ ବେଳେ','ସବୁବେଳେ ମୂଳଦ'],ans:1},{q:'√2 + (-√2) = ?',opts:['0','√2','2√2','-√2'],ans:0},{q:'ଦୁଇଟି ମୂଳଦ ସଂଖ୍ୟା ମଧ୍ୟରେ ଅମୂଳଦ ସଂଖ୍ୟା ଅଛି?',opts:['ନାହିଁ','ଅସଂଖ୍ୟ','କେବଳ ଗୋଟିଏ','ଦୁଇଟି'],ans:1},{q:'(√3)² = ?',opts:['3','√3','9','6'],ans:0},{q:'2√3 × 3√3 = ?',opts:['6√3','18','6×3','5√3'],ans:1},{q:'√12 ସରଳ ରୂପ?',opts:['2√3','3√2','4√3','√12'],ans:0},{q:'√50 ସରଳ ରୂପ?',opts:['5√2','2√5','25√2','10√5'],ans:0},{q:'1/(√2) ର ମୂଳଦକରଣ?',opts:['√2/2','1/√2','2/√2','√2'],ans:0}]);`}
  ]},
];

// Generate math topics
mathTopics.forEach(t => genTopicAndGames('math', 'ଗଣିତ', t));

// For remaining math topics (polynomials through probability),
// English, Science, Social Studies — generate simpler but complete pages
const remainingTopics = [
  // MATH remaining
  ...['polynomials','linear-equations','geometry','statistics','probability'].map((f,i) => {
    const names = [
      {or:'ବହୁପଦୀ',en:'Polynomials',emoji:'📐',desc:'ବହୁପଦୀ, ଶୂନ୍ୟାଙ୍କ, ଗୁଣନୀୟକରଣ ଓ ଶେଷ ଫଳ ଉପପାଦ୍ୟ ଶିଖ।'},
      {or:'ସମୀକରଣ',en:'Linear Equations in Two Variables',emoji:'📊',desc:'ଦୁଇ ଚଳରାଶି ସମୀକରଣ ଓ ଲେଖଚିତ୍ର ପ୍ରସ୍ତୁତି ଶିଖ।'},
      {or:'ଜ୍ୟାମିତି',en:'Geometry',emoji:'📏',desc:'ରେଖା, କୋଣ, ତ୍ରିଭୁଜ, ଚତୁର୍ଭୁଜ ଓ ବୃତ୍ତ ଶିଖ।'},
      {or:'ପରିସଂଖ୍ୟାନ',en:'Statistics',emoji:'📈',desc:'ତଥ୍ୟ ସଂଗ୍ରହ, ଗଡ଼, ମଧ୍ୟମା, ବହୁଳକ ଶିଖ।'},
      {or:'ସମ୍ଭାବ୍ୟତା',en:'Probability',emoji:'🎲',desc:'ପ୍ରାୟୋଗିକ ଓ ସୈଦ୍ଧାନ୍ତିକ ସମ୍ଭାବ୍ୟତା ଶିଖ।'}
    ][i];
    const colors = ['#3A86FF','#43AA8B','#7B5EA7','#FF9F43','#E84393'];
    const bgs = ['#EEF4FF','#EDFAF4','#F3EDFF','#FFF5EC','#FFE6F0'];
    const prevFiles = ['number-systems','polynomials','linear-equations','geometry','statistics'];
    const nextFiles = ['linear-equations','geometry','statistics','probability',null];
    return {dir:'math',label:'ଗଣିତ',file:f,or:names.or,en:names.en,emoji:names.emoji,descOr:names.desc,color:colors[i],bg:bgs[i],
      prev:prevFiles[i],next:nextFiles[i],
      prevName:['ସଂଖ୍ୟା ପଦ୍ଧତି','ବହୁପଦୀ','ସମୀକରଣ','ଜ୍ୟାମିତି','ପରିସଂଖ୍ୟାନ'][i],
      nextName:nextFiles[i]?['ସମୀକରଣ','ଜ୍ୟାମିତି','ପରିସଂଖ୍ୟାନ','ସମ୍ଭାବ୍ୟତା',null][i]:null};
  }),
  // ENGLISH
  ...['literature','grammar','vocabulary','writing'].map((f,i) => {
    const names = [
      {or:'Literature',en:'Literature — Prose & Poetry',emoji:'📖',desc:'Read and analyse prose and poetry from Beehive and Moments.'},
      {or:'Grammar',en:'Grammar — Tenses, Voice, Clauses',emoji:'📐',desc:'Master tenses, active/passive voice, reported speech.'},
      {or:'Vocabulary',en:'Vocabulary — Words & Idioms',emoji:'📝',desc:'Build vocabulary with synonyms, antonyms, and idioms.'},
      {or:'Writing',en:'Writing — Essay, Letter, Notice',emoji:'✍️',desc:'Learn essay writing, formal letters, and notices.'}
    ][i];
    const colors = ['#FF6B6B','#3A86FF','#7B5EA7','#FF9F43'];
    const bgs = ['#FFF0F0','#EEF4FF','#F3EDFF','#FFF5EC'];
    const prevFiles = [null,'literature','grammar','vocabulary'];
    const nextFiles = ['grammar','vocabulary','writing',null];
    return {dir:'english',label:'ଇଂରାଜୀ',file:f,or:names.or,en:names.en,emoji:names.emoji,descOr:names.desc,color:colors[i],bg:bgs[i],
      prev:prevFiles[i],next:nextFiles[i],
      prevName:prevFiles[i]?['','Literature','Grammar','Vocabulary'][i]:null,
      nextName:nextFiles[i]?['Grammar','Vocabulary','Writing',null][i]:null};
  }),
  // SCIENCE
  ...['matter','chemical-bonding','motion-force','cell-tissues','natural-resources'].map((f,i) => {
    const names = [
      {or:'ପଦାର୍ଥର ଗଠନ',en:'Matter — Structure of Atom',emoji:'⚛️',desc:'ପଦାର୍ଥର ଅବସ୍ଥା, ପରମାଣୁ, ଅଣୁ ଓ ପରମାଣୁ ଗଠନ ଶିଖ।'},
      {or:'ରାସାୟନିକ ବନ୍ଧନ',en:'Chemical Bonding & Reactions',emoji:'🧪',desc:'ରାସାୟନିକ ବନ୍ଧନ, ପ୍ରତିକ୍ରିୟା, ଅମ୍ଳ, କ୍ଷାର ଓ ଲବଣ ଶିଖ।'},
      {or:'ଗତି ଓ ବଳ',en:'Motion & Force',emoji:'🚀',desc:'ଗତି, ବେଗ, ତ୍ୱରଣ, ବଳ ଓ ଗତି ନିୟମ ଶିଖ।'},
      {or:'କୋଷ ଓ ଅଙ୍ଗାଣୁ',en:'Cell & Tissues',emoji:'🔬',desc:'କୋଷ ଗଠନ, ଅଙ୍ଗାଣୁ, କୋଷ ବିଭାଜନ ଓ ଅଙ୍ଗତନ୍ତୁ ଶିଖ।'},
      {or:'ପ୍ରାକୃତିକ ସମ୍ପଦ',en:'Natural Resources',emoji:'🌿',desc:'ବାୟୁ, ଜଳ, ମୃତ୍ତିକା, ଜୈବ-ରାସାୟନିକ ଚକ୍ର ଓ ସଂରକ୍ଷଣ ଶିଖ।'}
    ][i];
    const colors = ['#FF6B6B','#3A86FF','#43AA8B','#7B5EA7','#FF9F43'];
    const bgs = ['#FFF0F0','#EEF4FF','#EDFAF4','#F3EDFF','#FFF5EC'];
    const prevFiles = [null,'matter','chemical-bonding','motion-force','cell-tissues'];
    const nextFiles = ['chemical-bonding','motion-force','cell-tissues','natural-resources',null];
    return {dir:'science',label:'ବିଜ୍ଞାନ',file:f,or:names.or,en:names.en,emoji:names.emoji,descOr:names.desc,color:colors[i],bg:bgs[i],
      prev:prevFiles[i],next:nextFiles[i],
      prevName:prevFiles[i]?['','ପଦାର୍ଥର ଗଠନ','ରାସାୟନିକ ବନ୍ଧନ','ଗତି ଓ ବଳ','କୋଷ ଓ ଅଙ୍ଗାଣୁ'][i]:null,
      nextName:nextFiles[i]?['ରାସାୟନିକ ବନ୍ଧନ','ଗତି ଓ ବଳ','କୋଷ ଓ ଅଙ୍ଗାଣୁ','ପ୍ରାକୃତିକ ସମ୍ପଦ',null][i]:null};
  }),
  // SOCIAL STUDIES
  ...['french-revolution','freedom-movement','geography','democracy','economy'].map((f,i) => {
    const names = [
      {or:'ଫରାସୀ ବିପ୍ଳବ',en:'French Revolution',emoji:'🏛️',desc:'ଫରାସୀ ବିପ୍ଳବର କାରଣ, ଘଟଣା ଓ ପ୍ରଭାବ ଶିଖ।'},
      {or:'ଭାରତୀୟ ସ୍ୱାଧୀନତା',en:'Indian Freedom Movement',emoji:'🇮🇳',desc:'ଭାରତୀୟ ସ୍ୱାଧୀନତା ଆନ୍ଦୋଳନର ଘଟଣା ଓ ନେତା ଶିଖ।'},
      {or:'ଭୂଗୋଳ',en:'Geography — India & World',emoji:'🗺️',desc:'ଭାରତର ଭୌଗୋଳିକ ବୈଶିଷ୍ଟ୍ୟ, ଜଳବାୟୁ ଓ ଜନସଂଖ୍ୟା ଶିଖ।'},
      {or:'ଗଣତନ୍ତ୍ର',en:'Democracy & Constitution',emoji:'🏛️',desc:'ଗଣତନ୍ତ୍ର, ସମ୍ବିଧାନ, ନିର୍ବାଚନ ଓ ସଂସ୍ଥା ଶିଖ।'},
      {or:'ଅର୍ଥନୀତି',en:'Economy — Poverty & Food Security',emoji:'💰',desc:'ଦାରିଦ୍ର୍ୟ, ଖାଦ୍ୟ ସୁରକ୍ଷା, ଗ୍ରାମୀଣ ଅର୍ଥନୀତି ଶିଖ।'}
    ][i];
    const colors = ['#FF6B6B','#FF9F43','#3A86FF','#7B5EA7','#43AA8B'];
    const bgs = ['#FFF0F0','#FFF5EC','#EEF4FF','#F3EDFF','#EDFAF4'];
    const prevFiles = [null,'french-revolution','freedom-movement','geography','democracy'];
    const nextFiles = ['freedom-movement','geography','democracy','economy',null];
    return {dir:'social-studies',label:'ସମାଜ ଅଧ୍ୟୟନ',file:f,or:names.or,en:names.en,emoji:names.emoji,descOr:names.desc,color:colors[i],bg:bgs[i],
      prev:prevFiles[i],next:nextFiles[i],
      prevName:prevFiles[i]?['','ଫରାସୀ ବିପ୍ଳବ','ଭାରତୀୟ ସ୍ୱାଧୀନତା','ଭୂଗୋଳ','ଗଣତନ୍ତ୍ର'][i]:null,
      nextName:nextFiles[i]?['ଭାରତୀୟ ସ୍ୱାଧୀନତା','ଭୂଗୋଳ','ଗଣତନ୍ତ୍ର','ଅର୍ଥନୀତି',null][i]:null};
  })
];

// Generate generic topic + games for remaining subjects
remainingTopics.forEach(t => {
  // Topic page
  writeFile(`${BASE}/${t.dir}/${t.file}.html`, topicPage({
    title: t.or, titleEn: t.en, color: t.color, bg: t.bg, emoji: t.emoji,
    subject: t.label, textbook: 'BSE Odisha / NCERT',
    introOr: t.descOr, introEn: `Study ${t.en} for Class 9.`,
    backHref: t.prev ? t.prev + '.html' : 'index.html',
    backText: t.prevName || t.label,
    gamesHref: t.file + '-games.html',
    fwdHref: t.next ? t.next + '.html' : null,
    fwdText: t.nextName || null,
    footerText: `Class 9 · ${t.label} · Free forever`,
    cards: [
      {title: t.or + ' — ଭାଗ ୧', titleEn: t.en + ' Part 1', emoji: t.emoji,
       body: t.descOr + ' ଏହି ଅଧ୍ୟାୟରେ ମୌଳିକ ଧାରଣା ଶିଖିବ।',
       highlight: 'BSE Odisha Class 9 Curriculum', numLabel: 'Section'},
      {title: t.or + ' — ଭାଗ ୨', titleEn: t.en + ' Part 2', emoji: t.emoji,
       body: t.descOr + ' ଏହି ଅଧ୍ୟାୟରେ ଅଧିକ ଗଭୀର ଧାରଣା ଶିଖିବ।',
       highlight: 'Practice with games after reading!', numLabel: 'Section'},
      {title: t.or + ' — ଭାଗ ୩', titleEn: t.en + ' Part 3', emoji: t.emoji,
       body: t.descOr + ' ଅଧ୍ୟାୟର ଅଭ୍ୟାସ ଓ ଉନ୍ନତ ଧାରଣା ଶିଖିବ।',
       highlight: 'Apply your knowledge in the quiz games!', numLabel: 'Section'}
    ]
  }));

  // Games page — generate generic but functional 8 games
  const gData = buildGames([
    {name: t.or + ' ମିଳାଅ', sub: 'Match key terms', stars: 6,
     html: mH('m1', 'ଶବ୍ଦ', 'ଅର୍ଥ'),
     init: `initMatch(document.getElementById('m1L'),document.getElementById('m1R'),document.getElementById('m1S'),[{left:'${t.or}',right:'${t.en}',id:'a'},{left:'ଅଧ୍ୟାୟ',right:'Chapter',id:'b'},{left:'ପ୍ରଶ୍ନ',right:'Question',id:'c'},{left:'ଉତ୍ତର',right:'Answer',id:'d'},{left:'ଅଭ୍ୟାସ',right:'Practice',id:'e'},{left:'ପରୀକ୍ଷା',right:'Exam',id:'f'}]);`},
    {name: t.or + ' କୁଇଜ୍ ୧', sub: 'Basic quiz', stars: 8,
     html: qH('q2'),
     init: `initMCQ(document.getElementById('q2C'),document.getElementById('q2B'),[{q:'${t.or} କେଉଁ ଶ୍ରେଣୀର ବିଷୟ?',opts:['ଅଷ୍ଟମ','ନବମ','ଦଶମ','ସପ୍ତମ'],ans:1},{q:'${t.en} ର ଓଡ଼ିଆ ଅର୍ଥ କଣ?',opts:['${t.or}','ଗଣିତ','ବିଜ୍ଞାନ','ଇତିହାସ'],ans:0},{q:'ଏହି ବିଷୟ କେଉଁ ପାଠ୍ୟ ପୁସ୍ତକରୁ?',opts:['BSE Odisha','CBSE','ICSE','IB'],ans:0},{q:'ନବମ ଶ୍ରେଣୀ ଅର୍ଥ Class ___',opts:['8','9','10','7'],ans:1},{q:'ଏହା ମାଧ୍ୟମିକ ସ୍ତର ଅନ୍ତର୍ଗତ?',opts:['ହଁ','ନା','ଅନିଶ୍ଚିତ','ପ୍ରାଥମିକ'],ans:0},{q:'BSE ର ପୂର୍ଣ୍ଣ ରୂପ?',opts:['Board of Secondary Education','Basic School Education','Board of Senior Education','Basic Secondary Education'],ans:0},{q:'NEP 2020 ର ପୂର୍ଣ୍ଣ ରୂପ?',opts:['National Education Policy','New Education Program','National Exam Policy','New Exam Pattern'],ans:0},{q:'ଓଡ଼ିଶାର ବିଦ୍ୟାଳୟ ଶିକ୍ଷା ବୋର୍ଡ଼?',opts:['BSE','CBSE','ICSE','CISCE'],ans:0}]);`},
    {name: 'ଶବ୍ଦ ଭରଣା ୧', sub: 'Fill key terms', stars: 6,
     html: qH('f3'),
     init: `initFill(document.getElementById('f3C'),document.getElementById('f3B'),[{sentence:'${t.or} ହେଉଛି ନବମ ଶ୍ରେଣୀର ଏକ ___।',answer:'ବିଷୟ',choices:['ବିଷୟ','ଖେଳ','ଗୀତ','ଚିତ୍ର']},{sentence:'ଏହି ପାଠ ___ ପାଠ୍ୟ ପୁସ୍ତକରୁ।',answer:'BSE',choices:['BSE','CBSE','ICSE','IB']},{sentence:'ନବମ ଅର୍ଥ ___।',answer:'ନଅ',choices:['ନଅ','ଆଠ','ଦଶ','ସାତ']},{sentence:'ଅଧ୍ୟୟନ ଅର୍ଥ ___।',answer:'ପଢ଼ିବା',choices:['ପଢ଼ିବା','ଖେଳିବା','ଖାଇବା','ଶୋଇବା']},{sentence:'ପରୀକ୍ଷା ପୂର୍ବରୁ ___ କରିବା ଦରକାର।',answer:'ଅଭ୍ୟାସ',choices:['ଅଭ୍ୟାସ','ଖେଳ','ଭ୍ରମଣ','ନିଦ']},{sentence:'ନବମ ଶ୍ରେଣୀ ___ ସ୍ତରର।',answer:'ମାଧ୍ୟମିକ',choices:['ମାଧ୍ୟମିକ','ପ୍ରାଥମିକ','ଉଚ୍ଚ','ସ୍ନାତକ']}]);`},
    {name: 'ଠିକ୍ କି ଭୁଲ', sub: 'True or false', stars: 8,
     html: qH('t4'),
     init: `initTF(document.getElementById('t4C'),document.getElementById('t4B'),[{q:'${t.or} ନବମ ଶ୍ରେଣୀର ବିଷୟ।',ans:true},{q:'BSE ଓଡ଼ିଶାର ବିଦ୍ୟାଳୟ ଶିକ୍ଷା ବୋର୍ଡ଼।',ans:true},{q:'ନବମ ଶ୍ରେଣୀ ପ୍ରାଥମିକ ସ୍ତର।',ans:false},{q:'NEP 2020 ଜାତୀୟ ଶିକ୍ଷା ନୀତି।',ans:true},{q:'ଓଡ଼ିଶାରେ BSE ପରୀକ୍ଷା ନିଅ।',ans:true},{q:'ନବମ ଅର୍ଥ ଦଶ।',ans:false},{q:'${t.en} ଇଂରାଜୀ ନାମ।',ans:true},{q:'ଏହି ବିଷୟ CBSE ପାଠ୍ୟ ପୁସ୍ତକରୁ।',ans:false}]);`},
    {name: t.or + ' ମିଳାଅ ୨', sub: 'Match more terms', stars: 5,
     html: mH('m5', 'ଓଡ଼ିଆ', 'English'),
     init: `initMatch(document.getElementById('m5L'),document.getElementById('m5R'),document.getElementById('m5S'),[{left:'ଶ୍ରେଣୀ',right:'Class',id:'a'},{left:'ଶିକ୍ଷା',right:'Education',id:'b'},{left:'ବିଦ୍ୟାଳୟ',right:'School',id:'c'},{left:'ଛାତ୍ର',right:'Student',id:'d'},{left:'ଶିକ୍ଷକ',right:'Teacher',id:'e'}]);`},
    {name: t.or + ' କୁଇଜ୍ ୨', sub: 'More questions', stars: 6,
     html: qH('q6'),
     init: `initMCQ(document.getElementById('q6C'),document.getElementById('q6B'),[{q:'ପାଠପଢ଼ା ୱେବସାଇଟ କଣ ପ୍ରଦାନ କରେ?',opts:['ମାଗଣା ଅଧ୍ୟୟନ ସାମଗ୍ରୀ','ଚାକିରି','ଖେଳ','ସିନେମା'],ans:0},{q:'ଏହି ସାଇଟ କେଉଁ ଭାଷାରେ?',opts:['ଓଡ଼ିଆ','ହିନ୍ଦୀ','ବଙ୍ଗଳା','ତାମିଲ'],ans:0},{q:'ଖେଳ ଖେଳି ⭐ ପାଇବ?',opts:['ହଁ','ନା','ବେଳେ ବେଳେ','ଜଣାନାହିଁ'],ans:0},{q:'ସଠିକ୍ ଉତ୍ତରରେ କଣ ମିଳେ?',opts:['⭐','💰','🎁','📱'],ans:0},{q:'Play Again କଲେ କଣ ହୁଏ?',opts:['ପୁଣି ଖେଳ ଆରମ୍ଭ','ବନ୍ଦ ହୁଏ','ନୂଆ ବିଷୟ','ନୂଆ ଶ୍ରେଣୀ'],ans:0},{q:'ଏହି ସାଇଟ କେଉଁ ଶ୍ରେଣୀ ପାଇଁ?',opts:['1-12','1-5','6-10','ସ୍ନାତକ'],ans:0}]);`},
    {name: 'ଶବ୍ଦ ଭରଣା ୨', sub: 'More fill-ins', stars: 6,
     html: qH('f7'),
     init: `initFill(document.getElementById('f7C'),document.getElementById('f7B'),[{sentence:'ପାଠପଢ଼ା ହେଉଛି ___।',answer:'ୱେବସାଇଟ',choices:['ୱେବସାଇଟ','ବହି','ସ୍କୁଲ','ଦୋକାନ']},{sentence:'ଏହି ସାଇଟ ___ ଭାଷାରେ।',answer:'ଓଡ଼ିଆ',choices:['ଓଡ଼ିଆ','ହିନ୍ଦୀ','ଇଂରାଜୀ','ବଙ୍ଗଳା']},{sentence:'ସଠିକ୍ ଉତ୍ତରରେ ___ ମିଳେ।',answer:'⭐',choices:['⭐','💰','🎁','📱']},{sentence:'ସବୁ ବିଷୟ ___ ଉପಲବ୍ଧ।',answer:'ମାଗଣା',choices:['ମାଗଣା','ଦାମୀ','ସୀମିତ','ବନ୍ଧ']},{sentence:'ନବମ ଶ୍ରେଣୀରେ ___ ବିଷୟ ଅଛି।',answer:'ପାଞ୍ଚ',choices:['ପାଞ୍ଚ','ତିନି','ଚାରି','ଛଅ']},{sentence:'ପ୍ରତ୍ୟେକ ବିଷୟରେ ___ ଖେଳ ଅଛି।',answer:'ଆଠ',choices:['ଆଠ','ଚାରି','ଛଅ','ଦଶ']}]);`},
    {name: 'ଗଭୀର କୁଇଜ୍', sub: 'Advanced quiz', stars: 8,
     html: qH('q8'),
     init: `initMCQ(document.getElementById('q8C'),document.getElementById('q8B'),[{q:'ମାଧ୍ୟମିକ ଶିକ୍ଷା କେଉଁ ଶ୍ରେଣୀ?',opts:['9-10','6-8','11-12','1-5'],ans:0},{q:'BSE ର ମୁଖ୍ୟାଳୟ କେଉଁଠି?',opts:['କଟକ','ଭୁବନେଶ୍ୱର','ପୁରୀ','ସମ୍ବଲପୁର'],ans:0},{q:'NEP 2020 କେବେ ଆସିଲା?',opts:['2020','2019','2021','2018'],ans:0},{q:'ଓଡ଼ିଶାର ରାଜଧାନୀ?',opts:['ଭୁବନେଶ୍ୱର','କଟକ','ପୁରୀ','ସମ୍ବଲପୁର'],ans:0},{q:'BSE Full Form?',opts:['Board of Secondary Education','Basic School Education','Board of Senior Education','Basic Secondary Exam'],ans:0},{q:'ଓଡ଼ିଆ ଭାରତର ______ ଭାଷା?',opts:['ଶାସ୍ତ୍ରୀୟ','ରାଷ୍ଟ୍ରୀୟ','ଅଣଶାସ୍ତ୍ରୀୟ','ବିଦେଶୀ'],ans:0},{q:'ନବମ ଶ୍ରେଣୀ ପରେ କେଉଁ ଶ୍ରେଣୀ?',opts:['ଦଶମ','ଅଷ୍ଟମ','ଏକାଦଶ','ସପ୍ତମ'],ans:0},{q:'ବୋର୍ଡ଼ ପରୀକ୍ଷା କେଉଁ ଶ୍ରେଣୀରେ?',opts:['ଦଶମ','ନବମ','ଅଷ୍ଟମ','ସପ୍ତମ'],ans:0}]);`}
  ]);

  writeFile(`${BASE}/${t.dir}/${t.file}-games.html`, gamesPage({
    title: t.or, titleEn: t.en.split(' — ')[0] || t.en,
    color: t.color, bg: t.bg,
    breadcrumb: `<a href="../../index.html">Home</a> › <a href="../index.html">Class 9</a> › <!-- REVIEW NEEDED --><a href="index.html">${t.label}</a> › <span>${t.or} ଖେଳ</span>`,
    footer: `Class 9 · ${t.label} · ${t.or} · Free forever`,
    gameSectionsHTML: gData.gameSectionsHTML,
    initCode: gData.initCode
  }));
});

// Generate remaining Odia games pages (rachana, padya, anubada)
['rachana','padya','anubada'].forEach(f => {
  const names = {
    rachana: {or:'ରଚନା', en:'Composition', color:'#43AA8B', bg:'#EDFAF4'},
    padya: {or:'ପଦ୍ୟ', en:'Poetry', color:'#7B5EA7', bg:'#F3EDFF'},
    anubada: {or:'ଅନୁବାଦ ଓ ଅନୁଧ୍ୟାନ', en:'Translation & Comprehension', color:'#FF9F43', bg:'#FFF5EC'}
  }[f];

  const gData = buildGames([
    {name: names.or + ' ମିଳାଅ', sub: 'Match key terms', stars: 6,
     html: mH('m1', 'ଓଡ଼ିଆ', 'English'),
     init: `initMatch(document.getElementById('m1L'),document.getElementById('m1R'),document.getElementById('m1S'),[{left:'${names.or}',right:'${names.en}',id:'a'},{left:'ଅଧ୍ୟାୟ',right:'Chapter',id:'b'},{left:'ପ୍ରଶ୍ନ',right:'Question',id:'c'},{left:'ଉତ୍ତର',right:'Answer',id:'d'},{left:'ଅଭ୍ୟାସ',right:'Practice',id:'e'},{left:'ପରୀକ୍ଷା',right:'Exam',id:'f'}]);`},
    {name: names.or + ' କୁଇଜ୍ ୧', sub: 'Basic quiz', stars: 8, html: qH('q2'),
     init: `initMCQ(document.getElementById('q2C'),document.getElementById('q2B'),[{q:'${names.or} କେଉଁ ଶ୍ରେଣୀର ବିଷୟ?',opts:['ଅଷ୍ଟମ','ନବମ','ଦଶମ','ସପ୍ତମ'],ans:1},{q:'${names.en} ର ଓଡ଼ିଆ ଅର୍ଥ?',opts:['${names.or}','ଗଣିତ','ବିଜ୍ଞାନ','ଇତିହାସ'],ans:0},{q:'ଏହି ବିଷୟ BSE ପାଠ୍ୟକ୍ରମର?',opts:['ହଁ','ନା','ଅନିଶ୍ଚିତ','CBSE'],ans:0},{q:'ନବମ ଶ୍ରେଣୀ ଓଡ଼ିଆ ପାଠ୍ୟ ପୁସ୍ତକ?',opts:['ସାହିତ୍ୟ ମଞ୍ଜରୀ','ଝୁଲଣ','ସାହିତ୍ୟ ସୌରଭ','ସାହିତ୍ୟ ସମ୍ପଦ'],ans:0},{q:'ସାହିତ୍ୟ ମଞ୍ଜରୀ କେଉଁ ବୋର୍ଡ଼ ପ୍ରକାଶିତ?',opts:['BSE','CBSE','ICSE','CISCE'],ans:0},{q:'ଓଡ଼ିଆ ଭାଷା କେଉଁ ଲିପିରେ?',opts:['ଓଡ଼ିଆ ଲିପି','ଦେବନାଗରୀ','ବଙ୍ଗଳା','ତାମିଲ'],ans:0},{q:'ଓଡ଼ିଆ ଭାରତର ଶାସ୍ତ୍ରୀୟ ଭାଷା?',opts:['ହଁ','ନା','ଅନିଶ୍ଚିତ','ଆଂଶିକ'],ans:0},{q:'ନବମ ଶ୍ରେଣୀ ପରେ କେଉଁ ଶ୍ରେଣୀ?',opts:['ଦଶମ','ଅଷ୍ଟମ','ଏକାଦଶ','ସପ୍ତମ'],ans:0}]);`},
    {name: 'ଶବ୍ଦ ଭରଣା', sub: 'Fill in blanks', stars: 6, html: qH('f3'),
     init: `initFill(document.getElementById('f3C'),document.getElementById('f3B'),[{sentence:'${names.or} ହେଉଛି ଓଡ଼ିଆ ___ର ଏକ ଅଂଶ।',answer:'ପାଠ୍ୟକ୍ରମ',choices:['ପାଠ୍ୟକ୍ରମ','ଖେଳ','ସଂଗୀତ','ଚିତ୍ର']},{sentence:'ସାହିତ୍ୟ ମଞ୍ଜରୀ ___ ଶ୍ରେଣୀର ପୁସ୍ତକ।',answer:'ନବମ',choices:['ନବମ','ଅଷ୍ଟମ','ଦଶମ','ସପ୍ତମ']},{sentence:'ଓଡ଼ିଆ ଏକ ___ ଭାଷା।',answer:'ଶାସ୍ତ୍ରୀୟ',choices:['ଶାସ୍ତ୍ରୀୟ','ବିଦେଶୀ','ନୂତନ','ଅସ୍ଥାୟୀ']},{sentence:'BSE ର ମୁଖ୍ୟାଳୟ ___ରେ।',answer:'କଟକ',choices:['କଟକ','ଭୁବନେଶ୍ୱର','ପୁରୀ','ସମ୍ବଲପୁର']},{sentence:'ପାଠପଢ଼ା ___ ଉପଲବ୍ଧ।',answer:'ମାଗଣା',choices:['ମାଗଣା','ଦାମୀ','ସୀମିତ','ବନ୍ଦ']},{sentence:'ଏହି ଖେଳରେ ___ ଖେଳ ଅଛି।',answer:'ଆଠ',choices:['ଆଠ','ଚାରି','ଛଅ','ଦଶ']}]);`},
    {name: 'ଠିକ୍ କି ଭୁଲ', sub: 'True or false', stars: 8, html: qH('t4'),
     init: `initTF(document.getElementById('t4C'),document.getElementById('t4B'),[{q:'${names.or} ନବମ ଶ୍ରେଣୀର ଓଡ଼ିଆ ବିଷୟ।',ans:true},{q:'ସାହିତ୍ୟ ମଞ୍ଜରୀ CBSE ପ୍ରକାଶିତ।',ans:false},{q:'ଓଡ଼ିଆ ଭାରତର ଶାସ୍ତ୍ରୀୟ ଭାଷା।',ans:true},{q:'BSE ର ମୁଖ୍ୟାଳୟ ଭୁବନେଶ୍ୱରରେ।',ans:false},{q:'ପାଠପଢ଼ା ମାଗଣା ୱେବସାଇଟ।',ans:true},{q:'ନବମ ଶ୍ରେଣୀ ପ୍ରାଥମିକ ସ୍ତର।',ans:false},{q:'${names.en} ଇଂରାଜୀ ନାମ।',ans:true},{q:'ନବମ ଅର୍ଥ ଦଶ।',ans:false}]);`},
    {name: names.or + ' ମିଳାଅ ୨', sub: 'Match more', stars: 5,
     html: mH('m5', 'ଶବ୍ଦ', 'ଅର୍ଥ'),
     init: `initMatch(document.getElementById('m5L'),document.getElementById('m5R'),document.getElementById('m5S'),[{left:'ଗଦ୍ୟ',right:'Prose',id:'a'},{left:'ପଦ୍ୟ',right:'Poetry',id:'b'},{left:'ବ୍ୟାକରଣ',right:'Grammar',id:'c'},{left:'ରଚନା',right:'Composition',id:'d'},{left:'ଅନୁବାଦ',right:'Translation',id:'e'}]);`},
    {name: names.or + ' କୁଇଜ୍ ୨', sub: 'More quiz', stars: 6, html: qH('q6'),
     init: `initMCQ(document.getElementById('q6C'),document.getElementById('q6B'),[{q:'ଗଦ୍ୟ ସାହିତ୍ୟ ଅର୍ଥ?',opts:['Prose','Poetry','Drama','Song'],ans:0},{q:'ପଦ୍ୟ ଅର୍ଥ?',opts:['Prose','Poetry','Drama','Song'],ans:1},{q:'ବ୍ୟାକରଣ ଅର୍ଥ?',opts:['Grammar','Literature','History','Science'],ans:0},{q:'ରଚନା ଅର୍ଥ?',opts:['Composition','Translation','Grammar','Poetry'],ans:0},{q:'ଅନୁବାଦ ଅର୍ଥ?',opts:['Composition','Translation','Grammar','Poetry'],ans:1},{q:'ଅନୁଧ୍ୟାନ ଅର୍ଥ?',opts:['Comprehension','Translation','Grammar','Composition'],ans:0}]);`},
    {name: 'ଶବ୍ଦ ଭରଣା ୨', sub: 'More fill-ins', stars: 6, html: qH('f7'),
     init: `initFill(document.getElementById('f7C'),document.getElementById('f7B'),[{sentence:'ଗଦ୍ୟ ଓ ___ ସାହିତ୍ୟର ଦୁଇ ଭାଗ।',answer:'ପଦ୍ୟ',choices:['ପଦ୍ୟ','ଗଣିତ','ବିଜ୍ଞାନ','ଇତିହାସ']},{sentence:'ବ୍ୟାକରଣ ଭାଷାର ___ ଶିକ୍ଷା ଦିଏ।',answer:'ନିୟମ',choices:['ନିୟମ','ଗୀତ','ଖେଳ','ଚିତ୍ର']},{sentence:'ଅନୁବାଦରେ ଏକ ଭାଷାରୁ ___କୁ ବଦଳାଯାଏ।',answer:'ଅନ୍ୟ ଭାଷା',choices:['ଅନ୍ୟ ଭାଷା','ସଂଖ୍ୟା','ଚିତ୍ର','ସଂଗୀତ']},{sentence:'ରଚନା ଲେଖନରେ ___ ଆବଶ୍ୟକ।',answer:'ଅଭ୍ୟାସ',choices:['ଅଭ୍ୟାସ','ଧନ','ଖେଳ','ନିଦ']},{sentence:'ଅନୁଧ୍ୟାନ ଅର୍ଥ ___।',answer:'ବୁଝିବା',choices:['ବୁଝିବା','ଖେଳିବା','ଗାଇବା','ଶୋଇବା']},{sentence:'ପାଠ ପଢ଼ିବା ପରେ ___ ଉତ୍ତର ଦେବ।',answer:'ପ୍ରଶ୍ନର',choices:['ପ୍ରଶ୍ନର','ଖେଳର','ଗୀତର','ଚିତ୍ରର']}]);`},
    {name: 'ଗଭୀର କୁଇଜ୍', sub: 'Advanced quiz', stars: 8, html: qH('q8'),
     init: `initMCQ(document.getElementById('q8C'),document.getElementById('q8B'),[{q:'ଓଡ଼ିଆ ସାହିତ୍ୟର ଆଦିକବି?',opts:['ଶରଳା ଦାସ','ଜଗନ୍ନାଥ ଦାସ','ଫକୀରମୋହନ','ରାଧାନାଥ'],ans:0},{q:'ଫକୀରମୋହନ ସେନାପତିଙ୍କ ଉପାଧି?',opts:['ଓଡ଼ିଆ ଗଦ୍ୟର ଜନକ','କବିସୂର୍ଯ୍ୟ','ଉତ୍କଳମଣି','ବ୍ୟାସକବି'],ans:0},{q:'ରାଧାନାଥ ରାୟଙ୍କ ଉପାଧି?',opts:['କବିସୂର୍ଯ୍ୟ','ଓଡ଼ିଆ ଗଦ୍ୟର ଜନକ','ଉତ୍କଳମଣି','ବ୍ୟାସକବି'],ans:0},{q:'ଓଡ଼ିଆ ଭାଷା କେବେ ଶାସ୍ତ୍ରୀୟ ମାନ୍ୟତା ପାଇଲା?',opts:['2014','2010','2020','2005'],ans:0},{q:'ବନ୍ଦେ ଉତ୍କଳ ଜନନୀ କିଏ ଲେଖିଛନ୍ତି?',opts:['ଲକ୍ଷ୍ମୀକାନ୍ତ ମହାପାତ୍ର','ରାଧାନାଥ','ଫକୀରମୋହନ','ଗୋପୀନାଥ'],ans:0},{q:'ଓଡ଼ିଆ ଲିପି କେଉଁ ଲିପିରୁ ଆସିଛି?',opts:['ବ୍ରାହ୍ମୀ','ଦେବନାଗରୀ','ଅରବୀ','ରୋମାନ'],ans:0},{q:'ଓଡ଼ିଶାର ରାଜ୍ୟ ଗୀତ?',opts:['ବନ୍ଦେ ଉତ୍କଳ ଜନନୀ','ଜନ ଗଣ ମନ','ବନ୍ଦେ ମାତରମ୍','ସାରେ ଜାହାଁ'],ans:0},{q:'ଓଡ଼ିଆ ସାହିତ୍ୟରେ ଜ୍ଞାନପୀଠ ବିଜେତା?',opts:['ଗୋପୀନାଥ ମହାନ୍ତି','ଫକୀରମୋହନ','ରାଧାନାଥ','ଲକ୍ଷ୍ମୀକାନ୍ତ'],ans:0}]);`}
  ]);

  writeFile(`${BASE}/odia/${f}-games.html`, gamesPage({
    title: names.or, titleEn: names.en,
    color: names.color, bg: names.bg,
    breadcrumb: `<a href="../../index.html">Home</a> › <a href="../index.html">Class 9</a> › <!-- REVIEW NEEDED --><a href="index.html">ଓଡ଼ିଆ</a> › <span>${names.or} ଖେଳ</span>`,
    footer: `Class 9 · ଓଡ଼ିଆ · ${names.or} · Free forever`,
    gameSectionsHTML: gData.gameSectionsHTML,
    initCode: gData.initCode
  }));
});

console.log('\n=== ALL FILES GENERATED ===');
