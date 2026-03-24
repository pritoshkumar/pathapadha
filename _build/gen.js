// Generator for pathapadha class 10/11/12 pages
const fs = require('fs');
const path = require('path');
const ROOT = 'C:/Users/prito/Documents/pathapadha';

function mkdirp(d){fs.mkdirSync(d,{recursive:true})}

// ─── SHARED CSS BLOCKS ───
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+Oriya:wght@400;700&display=swap" rel="stylesheet">`;

function contentCSS(c,cbg){return `
:root{--ink:#111;--soft:#555;--light:#888;--bg:#fff;--off:#F7F7F5;--border:#EBEBEB;--c:${c};--cbg:${cbg};--font:'Nunito',sans-serif;--font-or:'Noto Sans Oriya',serif}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{font-family:var(--font);background:var(--bg);color:var(--ink);line-height:1.6}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:18px 48px;border-bottom:1px solid var(--border);background:rgba(255,255,255,0.93);backdrop-filter:blur(8px);position:sticky;top:0;z-index:100}
.logo{display:flex;align-items:center;gap:10px}.logo-emoji{font-size:1.5rem}.logo-text{display:flex;flex-direction:column;line-height:1.2}.logo-odia{font-family:var(--font-or);font-size:1.1rem;font-weight:700}.logo-url{font-size:0.68rem;font-weight:600;color:var(--light)}
.breadcrumb{display:flex;align-items:center;gap:8px;font-size:0.8rem;font-weight:700;color:var(--light)}.breadcrumb a{color:var(--light);transition:color .15s}.breadcrumb a:hover{color:var(--ink)}.breadcrumb span{color:var(--c)}
.hero{max-width:900px;margin:0 auto;padding:64px 48px 56px;display:grid;grid-template-columns:1fr auto;align-items:center;gap:48px}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--cbg);color:var(--c);font-size:0.78rem;font-weight:800;padding:5px 14px;border-radius:50px;margin-bottom:16px}
.hero h1{font-family:var(--font-or);font-size:clamp(2rem,5vw,3rem);font-weight:700;line-height:1.2;margin-bottom:8px}
.hero-eng{font-size:1rem;font-weight:800;color:var(--light);margin-bottom:12px}
.hero-art{width:120px;height:120px;border-radius:24px;background:var(--cbg);display:flex;align-items:center;justify-content:center;font-size:3.5rem;flex-shrink:0;animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
hr.divider{border:none;border-top:1px solid var(--border)}
.section{max-width:900px;margin:0 auto;padding:56px 48px}
.section-label{font-size:0.7rem;font-weight:700;color:#bbb;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:28px}
.content-card{background:#fff;border:2px solid var(--border);border-radius:20px;padding:32px;margin-bottom:20px}
.content-card h2{font-family:var(--font-or);font-size:1.4rem;font-weight:700;margin-bottom:12px;color:var(--c)}
.content-card p{font-size:0.9rem;color:var(--soft);line-height:1.8;margin-bottom:12px}
.content-card ul{padding-left:20px;margin-bottom:12px}.content-card li{font-size:0.88rem;color:var(--soft);line-height:1.8;margin-bottom:4px}
.example-box{background:var(--cbg);border-radius:12px;padding:16px 20px;margin:12px 0;font-family:var(--font-or);font-size:1rem;line-height:1.8;color:var(--ink)}
.games-link{display:inline-flex;align-items:center;gap:8px;background:var(--c);color:#fff;padding:12px 28px;border-radius:12px;font-weight:800;font-size:0.95rem;margin-top:20px;transition:opacity .15s}.games-link:hover{opacity:0.85}
footer{border-top:1px solid var(--border);padding:28px 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.footer-logo{font-family:var(--font-or);font-size:1rem;font-weight:700}.footer-copy{font-size:0.78rem;color:var(--light);font-weight:600}
@media(max-width:768px){nav{padding:14px 20px}.hero{grid-template-columns:1fr;padding:40px 20px 32px;gap:20px}.hero-art{width:80px;height:80px;font-size:2.5rem}.section{padding:36px 20px}footer{padding:20px}}
`;}

function gamesCSS(c,cbg){return `
:root{--ink:#111;--soft:#555;--light:#888;--bg:#fff;--off:#F7F7F5;--border:#EBEBEB;--c:${c};--cbg:${cbg};--green:#43AA8B;--greenbg:#EDFAF4;--yellow:#F9C74F;--blue:#3A86FF;--bluebg:#EEF4FF;--red:#FF6B6B;--redbg:#FFF0F0;--font:'Nunito',sans-serif;--font-or:'Noto Sans Oriya',serif}
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
.match-item{padding:14px 20px;border-radius:14px;border:2px solid var(--border);background:#fff;cursor:pointer;transition:border-color .15s,background .15s;display:flex;align-items:center;gap:12px;font-weight:700;user-select:none}
.match-item:hover{border-color:var(--c);background:var(--cbg)}
.match-item.selected{border-color:var(--blue);background:var(--bluebg)}
.match-item.correct{border-color:var(--green);background:var(--greenbg);pointer-events:none}
.match-item.wrong{border-color:var(--red);background:var(--redbg);animation:shake .3s}
.match-letter{font-family:var(--font-or);font-size:1rem;font-weight:700}
.fill-card{background:#fff;border-radius:20px;border:2px solid var(--border);padding:32px;margin-bottom:16px}
.fill-prompt{font-family:var(--font-or);font-size:1.3rem;font-weight:700;margin-bottom:8px;line-height:1.8}
.fill-hint{font-size:0.85rem;color:var(--soft);margin-bottom:20px}
.fill-choices{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.fill-choice{font-family:var(--font-or);font-size:1.1rem;font-weight:700;padding:12px 18px;border-radius:12px;border:2px solid var(--border);background:var(--off);cursor:pointer;transition:all .15s}
.fill-choice:hover{border-color:var(--blue);background:var(--bluebg)}
.fill-feedback{margin-top:12px;font-size:0.88rem;font-weight:700;display:none}.fill-feedback.show{display:block}.fill-feedback.ok{color:var(--green)}.fill-feedback.bad{color:var(--red)}
.fill-next{margin-top:12px;background:var(--ink);color:#fff;padding:10px 24px;border-radius:10px;font-size:0.85rem;font-weight:800;display:none}.fill-next.show{display:inline-block}
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
`;}

// ─── GAME JS TEMPLATE ───
function gameJS(numGames, c, matchData, quizData, fillData, tfData, extraGames){
  const maxStars = numGames * 5;
  let js = `
var totalStars=0,gamesCompleted=0,totalGames=${numGames};
function addStars(n,el){totalStars+=n;document.getElementById('starCount').textContent=totalStars;updateProgress();for(var i=0;i<n;i++){(function(idx){setTimeout(function(){var pop=document.createElement('div');pop.className='star-pop';pop.textContent='\\u2B50';if(el){var r=el.getBoundingClientRect();pop.style.left=(r.left+r.width/2)+'px';pop.style.top=r.top+'px'}else{pop.style.left=(window.innerWidth/2)+'px';pop.style.top=(window.innerHeight/2)+'px'}document.body.appendChild(pop);setTimeout(function(){pop.remove()},1000)},idx*150)})(i)}}
function completeGame(){gamesCompleted++;updateProgress();if(gamesCompleted>=totalGames)showResults()}
function updateProgress(){var pct=(gamesCompleted/totalGames)*100;document.getElementById('progressFill').style.width=pct+'%';document.getElementById('gamesDone').textContent=gamesCompleted+' / '+totalGames+' games done'}
function showResults(){var maxStars=${maxStars};var banner=document.getElementById('resultsBanner');var pct=Math.round((totalStars/maxStars)*100);document.getElementById('resultsScore').textContent='You earned '+totalStars+' out of '+maxStars+' stars ('+pct+'%)';var s='';for(var i=0;i<Math.min(totalStars,10);i++)s+='\\u2B50';if(totalStars>10)s+=' +'+(totalStars-10);document.getElementById('resultsStars').textContent=s;if(pct===100){document.getElementById('resultsEmoji').textContent='\\uD83C\\uDFC6';document.getElementById('resultsTitle').textContent='Perfect! \\u0B38\\u0B2E\\u0B4D\\u0B2A\\u0B42\\u0B30\\u0B4D\\u0B23\\u0B4D\\u0B23!'}else if(pct>=70){document.getElementById('resultsEmoji').textContent='\\uD83C\\uDF89';document.getElementById('resultsTitle').textContent='\\u0B2C\\u0B39\\u0B41\\u0B24 \\u0B2D\\u0B32!'}else{document.getElementById('resultsEmoji').textContent='\\uD83D\\uDCAA';document.getElementById('resultsTitle').textContent='\\u0B06\\u0B09 \\u0B25\\u0B30\\u0B47 \\u0B1A\\u0B47\\u0B37\\u0B4D\\u0B1F\\u0B3E \\u0B15\\u0B30!'}banner.classList.add('show');if(pct>=70)launchConfetti()}
`;
  // Match game
  js += `var matchData=${JSON.stringify(matchData)};
(function(){var data=matchData.slice();var sr=data.map(function(d){return{right:d.right,id:d.id}});for(var i=sr.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=sr[i];sr[i]=sr[j];sr[j]=t}var lc=document.getElementById('matchLeft');var rc=document.getElementById('matchRight');var sel=null,m=0,done=false;data.forEach(function(d){var el=document.createElement('div');el.className='match-item';el.innerHTML='<span class="match-letter">'+d.left+'</span>';el.dataset.id=d.id;el.dataset.side='left';el.onclick=function(){ck(el)};lc.appendChild(el)});sr.forEach(function(d){var el=document.createElement('div');el.className='match-item';el.innerHTML='<span class="match-letter">'+d.right+'</span>';el.dataset.id=d.id;el.dataset.side='right';el.onclick=function(){ck(el)};rc.appendChild(el)});function ck(el){if(done||el.classList.contains('correct'))return;if(!sel){sel=el;el.classList.add('selected');return}if(sel===el){sel.classList.remove('selected');sel=null;return}if(sel.dataset.side===el.dataset.side){sel.classList.remove('selected');sel=el;el.classList.add('selected');return}if(sel.dataset.id===el.dataset.id){sel.classList.remove('selected');sel.classList.add('correct');el.classList.add('correct');m++;addStars(1,el);document.getElementById('matchStatus').textContent=m+'/'+data.length+' matched';if(m===data.length){done=true;document.getElementById('matchStatus').textContent='All matched!';completeGame()}}else{sel.classList.remove('selected');sel.classList.add('wrong');el.classList.add('wrong');setTimeout(function(){sel.classList.remove('wrong');el.classList.remove('wrong');sel=null},500);return}sel=null}})();
`;
  // Quiz game
  js += buildMCQ('quiz', 'quizContainer', 'quizNextBtn', 'quizOpts', 'quizFeedback', quizData);
  // Fill game
  js += buildFill('fill', 'fillContainer', 'fillNextBtn', 'fillChoices', 'fillFeedback', fillData);
  // TF game
  js += buildTF('tf', 'tfContainer', 'tfNextBtn', 'tfOpts', 'tfFeedback', tfData);

  // Extra games for 8-game pages
  if(extraGames){
    for(const eg of extraGames){
      if(eg.type==='mcq') js += buildMCQ(eg.prefix, eg.container, eg.nextBtn, eg.optsId, eg.fbId, eg.data);
      else if(eg.type==='fill') js += buildFill(eg.prefix, eg.container, eg.nextBtn, eg.choicesId, eg.fbId, eg.data);
      else if(eg.type==='tf') js += buildTF(eg.prefix, eg.container, eg.nextBtn, eg.optsId, eg.fbId, eg.data);
      else if(eg.type==='sort') js += buildSort(eg.container, eg.checkBtn, eg.data);
    }
  }

  // Confetti
  js += `
function launchConfetti(){var canvas=document.getElementById('confetti');canvas.style.display='block';canvas.width=window.innerWidth;canvas.height=window.innerHeight;var ctx=canvas.getContext('2d');var ps=[];var cs=['${c}','#FF9F43','#FECA57','#48DBFB','#1DD1A1','#A29BFE','#FD79A8','#6C5CE7'];for(var i=0;i<150;i++){ps.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height-canvas.height,w:Math.random()*10+5,h:Math.random()*6+3,color:cs[Math.floor(Math.random()*cs.length)],vy:Math.random()*3+2,vx:(Math.random()-0.5)*2,rot:Math.random()*360,vr:(Math.random()-0.5)*8})}var fr=0;function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ps.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.fillStyle=p.color;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore()});fr++;if(fr<200)requestAnimationFrame(draw);else canvas.style.display='none'}draw()}
`;
  return js;
}

function buildMCQ(prefix, container, nextBtn, optsId, fbId, data){
  return `
var ${prefix}Data=${JSON.stringify(data)};var ${prefix}Idx=0;
function render${prefix}(){if(${prefix}Idx>=${prefix}Data.length){document.getElementById('${nextBtn}').style.display='none';completeGame();return}var d=${prefix}Data[${prefix}Idx];var h='<div class="quiz-card"><div class="quiz-q-num">Question '+(${prefix}Idx+1)+' of '+${prefix}Data.length+'</div><div class="quiz-question">'+d.q+'</div><div class="quiz-instruction">Pick the correct answer</div><div class="quiz-options" id="${optsId}">';d.opts.forEach(function(o,i){h+='<button class="quiz-opt" onclick="pick${prefix}(this,'+i+')" data-idx="'+i+'">'+o+'</button>'});h+='</div><div class="quiz-feedback" id="${fbId}"></div></div>';document.getElementById('${container}').innerHTML=h;document.getElementById('${nextBtn}').classList.remove('show')}
function pick${prefix}(el,idx){var d=${prefix}Data[${prefix}Idx];var all=document.querySelectorAll('#${optsId} .quiz-opt');all.forEach(function(o){o.disabled=true});var fb=document.getElementById('${fbId}');if(idx===d.ans){el.classList.add('correct');fb.className='quiz-feedback show ok';fb.textContent='\\u2705 Correct!';addStars(1,el)}else{el.classList.add('wrong');all.forEach(function(o){if(parseInt(o.dataset.idx)===d.ans)o.classList.add('correct')});fb.className='quiz-feedback show bad';fb.textContent='\\u274C Correct: '+d.opts[d.ans]}document.getElementById('${nextBtn}').classList.add('show')}
function next${prefix}(){${prefix}Idx++;render${prefix}()}
render${prefix}();
`;}

function buildFill(prefix, container, nextBtn, choicesId, fbId, data){
  return `
var ${prefix}Data=${JSON.stringify(data)};var ${prefix}Idx=0;
function render${prefix}(){if(${prefix}Idx>=${prefix}Data.length){document.getElementById('${nextBtn}').style.display='none';completeGame();return}var d=${prefix}Data[${prefix}Idx];var sh=d.choices.slice();for(var i=sh.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=sh[i];sh[i]=sh[j];sh[j]=t}var ch='';sh.forEach(function(c){ch+='<button class="fill-choice" onclick="pick${prefix}(this)">'+c+'</button>'});var h='<div class="fill-card"><div class="quiz-q-num">Question '+(${prefix}Idx+1)+' of '+${prefix}Data.length+'</div><div class="fill-prompt">'+d.hint+' '+d.sentence+'</div><div class="fill-hint">Pick the correct answer</div><div class="fill-choices" id="${choicesId}">'+ch+'</div><div class="fill-feedback" id="${fbId}"></div></div>';document.getElementById('${container}').innerHTML=h;document.getElementById('${nextBtn}').classList.remove('show')}
function pick${prefix}(el){var d=${prefix}Data[${prefix}Idx];var fb=document.getElementById('${fbId}');document.querySelectorAll('#${choicesId} .fill-choice').forEach(function(c){c.style.pointerEvents='none'});if(el.textContent===d.answer){el.style.borderColor='var(--green)';el.style.background='var(--greenbg)';fb.className='fill-feedback show ok';fb.textContent='\\u2705 Correct!';addStars(1,el)}else{el.style.borderColor='var(--red)';el.style.background='var(--redbg)';fb.className='fill-feedback show bad';fb.textContent='\\u274C Correct: '+d.answer}document.getElementById('${nextBtn}').classList.add('show')}
function next${prefix}(){${prefix}Idx++;render${prefix}()}
render${prefix}();
`;}

function buildTF(prefix, container, nextBtn, optsId, fbId, data){
  return `
var ${prefix}Data=${JSON.stringify(data)};var ${prefix}Idx=0;
function render${prefix}(){if(${prefix}Idx>=${prefix}Data.length){document.getElementById('${nextBtn}').style.display='none';completeGame();return}var d=${prefix}Data[${prefix}Idx];var h='<div class="quiz-card"><div class="quiz-q-num">Question '+(${prefix}Idx+1)+' of '+${prefix}Data.length+'</div><div class="quiz-question">'+d.q+'</div><div class="quiz-instruction">Is this true or false?</div><div class="quiz-options" id="${optsId}"><button class="quiz-opt" onclick="pick${prefix}(this,true)">\\u2705 \\u0B20\\u0B3F\\u0B15\\u0B4D (True)</button><button class="quiz-opt" onclick="pick${prefix}(this,false)">\\u274C \\u0B2D\\u0B41\\u0B32 (False)</button></div><div class="quiz-feedback" id="${fbId}"></div></div>';document.getElementById('${container}').innerHTML=h;document.getElementById('${nextBtn}').classList.remove('show')}
function pick${prefix}(el,val){var d=${prefix}Data[${prefix}Idx];var all=document.querySelectorAll('#${optsId} .quiz-opt');all.forEach(function(o){o.disabled=true});var fb=document.getElementById('${fbId}');if(val===d.ans){el.classList.add('correct');fb.className='quiz-feedback show ok';fb.textContent='\\u2705 Correct!';addStars(1,el)}else{el.classList.add('wrong');fb.className='quiz-feedback show bad';fb.textContent='\\u274C Answer: '+(d.ans?'\\u0B20\\u0B3F\\u0B15\\u0B4D':'\\u0B2D\\u0B41\\u0B32')}document.getElementById('${nextBtn}').classList.add('show')}
function next${prefix}(){${prefix}Idx++;render${prefix}()}
render${prefix}();
`;}

function buildSort(container, checkBtn, data){
  return `
var sortLines=${JSON.stringify(data)};
(function(){var correct=sortLines.slice();var sh=sortLines.slice();for(var i=sh.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=sh[i];sh[i]=sh[j];sh[j]=t}var ct=document.getElementById('${container}');var di=null;function render(){ct.innerHTML='';sh.forEach(function(line,i){var el=document.createElement('div');el.className='quiz-card';el.style.padding='16px 24px';el.style.cursor='grab';el.style.marginBottom='8px';el.draggable=true;el.innerHTML='<span style="color:var(--light);font-weight:800;margin-right:12px">'+(i+1)+'</span><span style="font-family:var(--font-or);font-size:1rem">'+line+'</span>';el.ondragstart=function(){di=i};el.ondragover=function(e){e.preventDefault();el.style.borderColor='var(--c)'};el.ondragleave=function(){el.style.borderColor='var(--border)'};el.ondrop=function(e){e.preventDefault();el.style.borderColor='var(--border)';if(di!==null&&di!==i){var t=sh[di];sh[di]=sh[i];sh[i]=t;render()}di=null};el.onclick=function(){if(di===null){di=i;el.style.borderColor='var(--blue)';el.style.background='var(--bluebg)'}else if(di===i){di=null;render()}else{var t=sh[di];sh[di]=sh[i];sh[i]=t;di=null;render()}};ct.appendChild(el)})}render();
window.checkSort=function(){var ok=true;for(var i=0;i<sh.length;i++){if(sh[i]!==correct[i]){ok=false;break}}var cards=ct.querySelectorAll('.quiz-card');if(ok){cards.forEach(function(c){c.style.borderColor='var(--green)';c.style.background='var(--greenbg)'});addStars(5);document.getElementById('${checkBtn}').style.display='none';completeGame()}else{var cc=0;cards.forEach(function(c,i){if(sh[i]===correct[i]){c.style.borderColor='var(--green)';c.style.background='var(--greenbg)';cc++}else{c.style.borderColor='var(--red)';c.style.background='var(--redbg)'}});if(cc>0)addStars(Math.floor(cc/2));setTimeout(function(){cards.forEach(function(c){c.style.borderColor='var(--border)';c.style.background='#fff'})},1500)}}})();
`;}

// ─── CONTENT PAGE BUILDER ───
function buildContentPage(opts){
  const {file, titleOr, titleEn, emoji, breadcrumbs, badge, cards, gamesHref, gamesCount, footerText, color, colorBg} = opts;
  const c = color || '#D62828';
  const bg = colorBg || '#FFF0F0';
  const html = `<!DOCTYPE html>
<html lang="or">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- REVIEW NEEDED -->
<title>${titleOr} — ପାଠପଢ଼ା</title>
${FONTS}
<style>${contentCSS(c,bg)}</style>
</head>
<body>
<nav>
  <a href="${breadcrumbs.homeHref}" class="logo"><div class="logo-emoji">📖</div><div class="logo-text"><!-- REVIEW NEEDED --><span class="logo-odia">ପାଠପଢ଼ା</span><span class="logo-url">pathapadha.com</span></div></a>
  <div class="breadcrumb">${breadcrumbs.links.map(l=>`<a href="${l.href}">${l.text}</a> ›`).join(' ')} <!-- REVIEW NEEDED --><span>${titleOr}</span></div>
</nav>
<section class="hero">
  <div>
    <!-- REVIEW NEEDED -->
    <div class="hero-badge">${emoji} ${badge}</div>
    <h1>${titleOr}</h1>
    <p class="hero-eng">${titleEn}</p>
  </div>
  <div class="hero-art">${emoji}</div>
</section>
<hr class="divider">
<section class="section">
  <!-- REVIEW NEEDED -->
  <div class="section-label">${titleOr} — ${titleEn}</div>
  ${cards.map(card => `<div class="content-card"><!-- REVIEW NEEDED -->
    <h2>${card.title}</h2>
    <p>${card.desc}</p>
    ${card.example ? `<div class="example-box">${card.example}</div>` : ''}
    ${card.points ? `<ul>${card.points.map(p=>`<li>${p}</li>`).join('')}</ul>` : ''}
  </div>`).join('\n  ')}
  <a href="${gamesHref}" class="games-link">🎮 Play ${titleEn} Games (${gamesCount} games)</a>
</section>
<footer><!-- REVIEW NEEDED --><span class="footer-logo">ପାଠପଢ଼ା</span><span class="footer-copy">${footerText}</span></footer>
</body>
</html>`;
  mkdirp(path.dirname(file));
  fs.writeFileSync(file, html);
  console.log('Created: ' + file);
}

// ─── GAMES PAGE BUILDER ───
function buildGamesPage(opts){
  const {file, titleOr, titleEn, breadcrumbs, numGames, color, colorBg, footerText,
    matchData, quizData, fillData, tfData, extraGames, gameHeaders} = opts;
  const c = color || '#D62828';
  const bg = colorBg || '#FFF0F0';

  let gameSections = '';
  // Game 1 - Match
  gameSections += `
<section class="game-section" id="game1">
  <div class="game-header"><div class="game-icon">🔗</div><div><!-- REVIEW NEEDED --><div class="game-title">${gameHeaders[0].title}</div><div class="game-subtitle">${gameHeaders[0].sub}</div></div><div class="game-stars-possible">Up to 5 ⭐</div></div>
  <div class="match-grid"><div class="match-col"><div class="match-col-label">${gameHeaders[0].colA||'Column A'}</div><div id="matchLeft"></div></div><div class="match-col"><div class="match-col-label">${gameHeaders[0].colB||'Column B'}</div><div id="matchRight"></div></div></div>
  <div style="margin-top:20px;font-size:0.85rem;font-weight:700;color:var(--light)" id="matchStatus"></div>
</section><hr class="game-divider">`;
  // Game 2 - Quiz
  gameSections += `
<section class="game-section" id="game2">
  <div class="game-header"><div class="game-icon">❓</div><div><!-- REVIEW NEEDED --><div class="game-title">${gameHeaders[1].title}</div><div class="game-subtitle">${gameHeaders[1].sub}</div></div><div class="game-stars-possible">Up to 5 ⭐</div></div>
  <div id="quizContainer"></div>
  <button class="quiz-next show" id="quizNextBtn" onclick="nextquiz()">Next Question →</button>
</section><hr class="game-divider">`;
  // Game 3 - Fill
  gameSections += `
<section class="game-section" id="game3">
  <div class="game-header"><div class="game-icon">✏️</div><div><!-- REVIEW NEEDED --><div class="game-title">${gameHeaders[2].title}</div><div class="game-subtitle">${gameHeaders[2].sub}</div></div><div class="game-stars-possible">Up to 5 ⭐</div></div>
  <div id="fillContainer"></div>
  <button class="fill-next show" id="fillNextBtn" onclick="nextfill()">Next →</button>
</section><hr class="game-divider">`;
  // Game 4 - TF
  gameSections += `
<section class="game-section" id="game4">
  <div class="game-header"><div class="game-icon">✅</div><div><!-- REVIEW NEEDED --><div class="game-title">${gameHeaders[3].title}</div><div class="game-subtitle">${gameHeaders[3].sub}</div></div><div class="game-stars-possible">Up to 5 ⭐</div></div>
  <div id="tfContainer"></div>
  <button class="quiz-next show" id="tfNextBtn" onclick="nexttf()">Next Question →</button>
</section>`;

  // Extra games (5-8 for class 10)
  if(extraGames && extraGames.length > 0){
    for(let i=0; i<extraGames.length; i++){
      const g = extraGames[i];
      const gn = 5 + i;
      const gh = gameHeaders[4+i] || {title:`Game ${gn}`, sub:'Answer correctly.'};
      gameSections += `<hr class="game-divider">
<section class="game-section" id="game${gn}">
  <div class="game-header"><div class="game-icon">${gh.icon||'🎯'}</div><div><!-- REVIEW NEEDED --><div class="game-title">${gh.title}</div><div class="game-subtitle">${gh.sub}</div></div><div class="game-stars-possible">Up to 5 ⭐</div></div>
  <div id="${g.container}"></div>
  <button class="${g.type==='sort'?'quiz-next show':'quiz-next show'}" id="${g.nextBtn||g.checkBtn}" onclick="${g.type==='sort'?'checkSort()':'next'+g.prefix+'()'}">${g.type==='sort'?'Check Order ✓':'Next Question →'}</button>
</section>`;
    }
  }

  const html = `<!DOCTYPE html>
<html lang="or">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- REVIEW NEEDED -->
<title>${titleOr} ଖେଳ — ପାଠପଢ଼ା</title>
${FONTS}
<style>${gamesCSS(c,bg)}</style>
</head>
<body>
<canvas id="confetti"></canvas>
<nav>
  <a href="${breadcrumbs.homeHref}" class="logo"><div class="logo-emoji">📖</div><div class="logo-text"><!-- REVIEW NEEDED --><span class="logo-odia">ପାଠପଢ଼ା</span><span class="logo-url">pathapadha.com</span></div></a>
  <div class="breadcrumb">${breadcrumbs.links.map(l=>`<a href="${l.href}">${l.text}</a> ›`).join(' ')} <!-- REVIEW NEEDED --><span>${titleOr} ଖେଳ</span></div>
</nav>
<div class="star-bar"><div class="star-display"><span class="star-count" id="starCount">0</span><span style="font-size:1.4rem">⭐</span><span class="star-label">Stars earned</span></div><div class="progress-wrap"><div class="progress-label">Overall progress</div><div class="progress-bar"><div class="progress-fill" id="progressFill" style="width:0%"></div></div></div><div class="games-done" id="gamesDone">0 / ${numGames} games done</div></div>
<!-- REVIEW NEEDED -->
<div class="page-hero"><h1>${titleOr} ଖେଳ 🎮</h1><p>${numGames} games to practise ${titleEn} — earn ⭐ for every correct answer!</p></div>
<hr class="divider">
${gameSections}
<!-- REVIEW NEEDED -->
<div class="results-banner" id="resultsBanner"><div class="results-emoji" id="resultsEmoji">🏆</div><div class="results-title" id="resultsTitle">ବହୁତ ଭଲ!</div><div class="results-score" id="resultsScore"></div><div class="results-stars" id="resultsStars"></div><button class="results-retry" onclick="location.reload()">ପୁଣି ଖେଳ 🔄</button></div>
<footer><!-- REVIEW NEEDED --><span class="footer-logo">ପାଠପଢ଼ା</span><span class="footer-copy">${footerText}</span></footer>
<script>
// REVIEW NEEDED
${gameJS(numGames, c, matchData, quizData, fillData, tfData, extraGames)}
</script>
</body>
</html>`;
  mkdirp(path.dirname(file));
  fs.writeFileSync(file, html);
  console.log('Created: ' + file);
}

// ─── SUBJECT INDEX PAGE BUILDER ───
function buildSubjectIndex(opts){
  const {file, titleOr, titleEn, emoji, badge, breadcrumbs, color, colorBg, topics, footerText} = opts;
  const c = color || '#D62828';
  const bg = colorBg || '#FFF0F0';
  const html = `<!DOCTYPE html>
<html lang="or">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- REVIEW NEEDED -->
<title>${titleOr} — ପାଠପଢ଼ା</title>
${FONTS}
<style>
:root{--ink:#111;--soft:#555;--light:#888;--bg:#fff;--off:#F7F7F5;--border:#EBEBEB;--c:${c};--cbg:${bg};--font:'Nunito',sans-serif;--font-or:'Noto Sans Oriya',serif}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{font-family:var(--font);background:var(--bg);color:var(--ink);line-height:1.6}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:18px 48px;border-bottom:1px solid var(--border);background:rgba(255,255,255,0.93);backdrop-filter:blur(8px);position:sticky;top:0;z-index:100}
.logo{display:flex;align-items:center;gap:10px}.logo-emoji{font-size:1.5rem}.logo-text{display:flex;flex-direction:column;line-height:1.2}.logo-odia{font-family:var(--font-or);font-size:1.1rem;font-weight:700}.logo-url{font-size:0.68rem;font-weight:600;color:var(--light)}
.breadcrumb{display:flex;align-items:center;gap:8px;font-size:0.8rem;font-weight:700;color:var(--light)}.breadcrumb a{color:var(--light);transition:color .15s}.breadcrumb a:hover{color:var(--ink)}.breadcrumb span{color:var(--c)}
.hero{max-width:1100px;margin:0 auto;padding:64px 48px 56px;display:grid;grid-template-columns:1fr auto;align-items:center;gap:48px}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--cbg);color:var(--c);font-size:0.78rem;font-weight:800;padding:5px 14px;border-radius:50px;margin-bottom:16px}
.hero h1{font-family:var(--font-or);font-size:clamp(2.2rem,5vw,3.4rem);font-weight:700;line-height:1.2;margin-bottom:8px}
.hero-eng{font-size:1.1rem;font-weight:800;color:var(--light);margin-bottom:16px}
.hero-desc{font-size:0.95rem;color:var(--soft);max-width:420px;line-height:1.8}
.hero-art{width:160px;height:160px;border-radius:32px;background:var(--cbg);display:flex;align-items:center;justify-content:center;font-size:5rem;flex-shrink:0;animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
hr.divider{border:none;border-top:1px solid var(--border)}
.section{max-width:1100px;margin:0 auto;padding:56px 48px}
.section-label{font-size:0.7rem;font-weight:700;color:#bbb;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:28px}
.topic-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.topic-card{border-radius:20px;border:2px solid var(--border);padding:28px 24px;background:#fff;cursor:pointer;position:relative;overflow:hidden;transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s,border-color .2s}
.topic-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--c)}
.topic-card:hover{transform:translateY(-5px);box-shadow:0 12px 32px rgba(0,0,0,0.08);border-color:var(--c)}
.topic-emoji{font-size:2.4rem;margin-bottom:12px}
.topic-name{font-family:var(--font-or);font-size:1.2rem;font-weight:700;margin-bottom:4px}
.topic-eng{font-size:0.8rem;font-weight:700;color:var(--light)}
.topic-desc{font-size:0.82rem;color:var(--soft);margin-top:8px;line-height:1.6}
.topic-footer{display:flex;align-items:center;justify-content:space-between;margin-top:14px;padding-top:10px;border-top:1px solid var(--border)}
.topic-go{font-size:0.8rem;font-weight:800;color:var(--c);display:flex;align-items:center;gap:5px}
.topic-card:hover .topic-go{gap:10px}
.topic-tags{display:flex;gap:6px}
.topic-tag{font-size:0.65rem;font-weight:700;padding:3px 10px;border-radius:6px;background:var(--cbg);color:var(--c)}
footer{border-top:1px solid var(--border);padding:28px 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.footer-logo{font-family:var(--font-or);font-size:1rem;font-weight:700}.footer-copy{font-size:0.78rem;color:var(--light);font-weight:600}
@media(max-width:768px){nav{padding:14px 20px}.hero{grid-template-columns:1fr;padding:40px 20px 32px;gap:24px}.hero-art{width:100px;height:100px;font-size:3rem;border-radius:20px}.section{padding:40px 20px}.topic-grid{grid-template-columns:1fr}footer{padding:20px}}
</style>
</head>
<body>
<nav>
  <a href="${breadcrumbs.homeHref}" class="logo"><div class="logo-emoji">📖</div><div class="logo-text"><!-- REVIEW NEEDED --><span class="logo-odia">ପାଠପଢ଼ା</span><span class="logo-url">pathapadha.com</span></div></a>
  <div class="breadcrumb">${breadcrumbs.links.map(l=>`<a href="${l.href}">${l.text}</a> ›`).join(' ')} <!-- REVIEW NEEDED --><span>${titleOr}</span></div>
</nav>
<section class="hero">
  <div>
    <div class="hero-badge">${emoji} ${badge}</div>
    <!-- REVIEW NEEDED -->
    <h1>${titleOr}</h1>
    <p class="hero-eng">${titleEn}</p>
  </div>
  <div class="hero-art">${emoji}</div>
</section>
<hr class="divider">
<section class="section">
  <!-- REVIEW NEEDED -->
  <div class="section-label">ଅଧ୍ୟାୟ ବାଛନ୍ତୁ — Choose a Chapter</div>
  <div class="topic-grid" id="topicGrid"></div>
</section>
<footer><!-- REVIEW NEEDED --><span class="footer-logo">ପାଠପଢ଼ା</span><span class="footer-copy">${footerText}</span></footer>
<script>
// REVIEW NEEDED
var topics=${JSON.stringify(topics)};
var grid=document.getElementById('topicGrid');
topics.forEach(function(t){
  var a=document.createElement('a');a.href=t.href;a.className='topic-card';
  var tagsH=t.tags.map(function(tg){return '<span class="topic-tag">'+tg+'</span>'}).join('');
  a.innerHTML='<div class="topic-emoji">'+t.emoji+'</div><div class="topic-name">'+t.name+'</div><div class="topic-eng">'+t.eng+'</div><div class="topic-desc">'+t.desc+'</div><div class="topic-footer"><span class="topic-go">Learn & Play \\u2192</span><div class="topic-tags">'+tagsH+'</div></div>';
  grid.appendChild(a);
});
</script>
</body>
</html>`;
  mkdirp(path.dirname(file));
  fs.writeFileSync(file, html);
  console.log('Created: ' + file);
}

// Export for use
module.exports = {buildContentPage, buildGamesPage, buildSubjectIndex, mkdirp};
console.log('Generator module loaded successfully');
