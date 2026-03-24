var fs=require('fs');
var base='C:/Users/prito/Documents/pathapadha/class-5';
var tpl=fs.readFileSync(base+'/english/reading-games.html','utf8');

function clone(src, replacements) {
  var out = src;
  replacements.forEach(function(r) { out = out.replace(r[0], r[1]); });
  return out;
}

var matchBoilerplate = function(data) {
  return "(function(){var matchData="+JSON.stringify(data)+";var shuffledR=matchData.map(function(d){return{right:d.right,id:d.id}});shuffle(shuffledR);var leftCol=document.getElementById('mL'),rightCol=document.getElementById('mR'),selected=null,matched=0,done=false;matchData.forEach(function(d){var el=document.createElement('div');el.className='match-item';el.textContent=d.left;el.dataset.id=d.id;el.dataset.side='left';el.onclick=function(){mClick(el)};leftCol.appendChild(el)});shuffledR.forEach(function(d){var el=document.createElement('div');el.className='match-item';el.textContent=d.right;el.dataset.id=d.id;el.dataset.side='right';el.onclick=function(){mClick(el)};rightCol.appendChild(el)});function mClick(el){if(done||el.classList.contains('correct'))return;if(!selected){selected=el;el.classList.add('selected');return}if(selected===el){selected.classList.remove('selected');selected=null;return}if(selected.dataset.side===el.dataset.side){selected.classList.remove('selected');selected=el;el.classList.add('selected');return}if(selected.dataset.id===el.dataset.id){selected.classList.remove('selected');selected.classList.add('correct');el.classList.add('correct');matched++;addStars(1,el);document.getElementById('mS').textContent=matched+'/'+matchData.length+' matched';if(matched===matchData.length){done=true;completeGame()}}else{var s=selected;s.classList.remove('selected');s.classList.add('wrong');el.classList.add('wrong');setTimeout(function(){s.classList.remove('wrong');el.classList.remove('wrong')},500)}selected=null}})();";
};

function makeGame(outFile, textReplacements, matchItems, quizItems, fillItems, tfItems) {
  var html = clone(tpl, textReplacements);
  html = html.replace(/\(function\(\)\{var matchData=[\s\S]*?\}\)\(\);/, matchBoilerplate(matchItems));
  html = html.replace(/var QData=\[[\s\S]*?\];/, "var QData="+JSON.stringify(quizItems)+";");
  html = html.replace(/var FData=\[[\s\S]*?\];/, "var FData="+JSON.stringify(fillItems)+";");
  html = html.replace(/var TData=\[[\s\S]*?\];/, "var TData="+JSON.stringify(tfItems)+";");
  fs.writeFileSync(base+'/'+outFile, html);
  console.log('Created: '+outFile);
}

// English Grammar Games
makeGame('english/grammar-games.html',
  [['Reading Games |','Grammar Games |'],['<span>Reading Games</span>','<span>Grammar Games</span>'],['<h1>Reading Games','<h1>Grammar Games'],['Game 1 \u2014 Match Characters','Game 1 \u2014 Parts of Speech'],['Match characters to their stories','Match words to their type'],['Character</div>','Word</div>'],['Story</div>','Type</div>'],['Game 2 \u2014 Comprehension Quiz','Game 2 \u2014 Tenses Quiz'],['Answer questions about passages','Pick the right tense'],['Are these facts correct?','Grammar facts'],['Reading \xb7 Free','Grammar \xb7 Free']],
  [{left:'dog',right:'Noun',id:'a'},{left:'run',right:'Verb',id:'b'},{left:'beautiful',right:'Adjective',id:'c'},{left:'quickly',right:'Adverb',id:'d'},{left:'and',right:'Conjunction',id:'e'}],
  [{q:'Which is a noun?',opts:['school','run','big','quickly'],ans:0},{q:'"She is singing" \u2014 what tense?',opts:['Present Continuous','Simple Past','Simple Future','Past Perfect'],ans:0},{q:'Which is an adjective?',opts:['tall','walk','he','slowly'],ans:0},{q:'Past tense of "go"?',opts:['went','goed','going','goes'],ans:0},{q:'"I will play tomorrow" \u2014 what tense?',opts:['Simple Future','Simple Past','Present','Past Continuous'],ans:0}],
  [{sentence:'She ___ to school every day.',answer:'goes',choices:['goes','went','going','go'],hint:'\ud83c\udfeb'},{sentence:'They ___ playing football yesterday.',answer:'were',choices:['were','are','is','will'],hint:'\u26bd'},{sentence:'I ___ reading a book now.',answer:'am',choices:['am','was','will','is'],hint:'\ud83d\udcd6'},{sentence:'He ___ come tomorrow.',answer:'will',choices:['will','was','is','has'],hint:'\ud83d\udcc5'},{sentence:'The cat ___ on the mat.',answer:'sat',choices:['sat','sit','sits','setting'],hint:'\ud83d\udc31'}],
  [{q:'A noun is a naming word.',ans:true},{q:'"Quickly" is an adjective.',ans:false},{q:'Past tense of "eat" is "ate".',ans:true},{q:'"Is, am, are" are helping verbs.',ans:true},{q:'An adverb describes a noun.',ans:false}]
);

// English Vocabulary Games
makeGame('english/vocabulary-games.html',
  [['Reading Games |','Vocabulary Games |'],['<span>Reading Games</span>','<span>Vocabulary Games</span>'],['<h1>Reading Games','<h1>Vocabulary Games'],['Game 1 \u2014 Match Characters','Game 1 \u2014 Synonyms Match'],['Match characters to their stories','Match words to synonyms'],['Character</div>','Word</div>'],['Story</div>','Synonym</div>'],['Game 2 \u2014 Comprehension Quiz','Game 2 \u2014 Antonyms Quiz'],['Answer questions about passages','Find the opposite'],['Are these facts correct?','Word facts'],['Reading \xb7 Free','Vocabulary \xb7 Free']],
  [{left:'happy',right:'glad',id:'a'},{left:'big',right:'large',id:'b'},{left:'fast',right:'quick',id:'c'},{left:'brave',right:'courageous',id:'d'},{left:'smart',right:'clever',id:'e'}],
  [{q:'Opposite of "hot"?',opts:['cold','warm','cool','heat'],ans:0},{q:'Opposite of "rich"?',opts:['poor','wealth','money','king'],ans:0},{q:'Synonym of "beautiful"?',opts:['lovely','ugly','bad','dark'],ans:0},{q:'Opposite of "remember"?',opts:['forget','recall','think','know'],ans:0},{q:'A person who teaches is a ___?',opts:['teacher','doctor','farmer','pilot'],ans:0}],
  [{sentence:'Opposite of "day" is ___.',answer:'night',choices:['night','morning','noon','evening'],hint:'\ud83c\udf19'},{sentence:'A place where books are kept is a ___.',answer:'library',choices:['library','kitchen','garden','market'],hint:'\ud83d\udcda'},{sentence:'Synonym of "begin" is ___.',answer:'start',choices:['start','end','stop','finish'],hint:'\u25b6\ufe0f'},{sentence:'One who cannot see is ___.',answer:'blind',choices:['blind','deaf','mute','lame'],hint:'\ud83d\udc41\ufe0f'},{sentence:'Opposite of "hard" is ___.',answer:'soft',choices:['soft','tough','rough','strong'],hint:'\ud83e\uddf8'}],
  [{q:'"Happy" and "glad" are synonyms.',ans:true},{q:'"Big" and "large" are antonyms.',ans:false},{q:'A florist sells flowers.',ans:true},{q:'"Fast" means the same as "slow".',ans:false},{q:'An igloo is a house made of ice.',ans:true}]
);

// English Writing Games
makeGame('english/writing-games.html',
  [['Reading Games |','Writing Games |'],['<span>Reading Games</span>','<span>Writing Games</span>'],['<h1>Reading Games','<h1>Writing Games'],['Game 1 \u2014 Match Characters','Game 1 \u2014 Letter Parts'],['Match characters to their stories','Match parts of a letter'],['Character</div>','Part</div>'],['Story</div>','Example</div>'],['Game 2 \u2014 Comprehension Quiz','Game 2 \u2014 Punctuation Quiz'],['Answer questions about passages','Pick the right punctuation'],['Are these facts correct?','Writing rules'],['Reading \xb7 Free','Writing \xb7 Free']],
  [{left:'Greeting',right:'Dear Ravi,',id:'a'},{left:'Closing',right:'Your friend, Sita',id:'b'},{left:'Address',right:'Puri, Odisha',id:'c'},{left:'Date',right:'24 March 2026',id:'d'},{left:'Body',right:'I want to tell you...',id:'e'}],
  [{q:'Which ends a question?',opts:['?','!','.',','],ans:0},{q:'"i am happy" \u2014 what is wrong?',opts:['"i" should be "I"','Nothing','Remove "am"','Add "!"'],ans:0},{q:'A story needs characters, setting, and a ___?',opts:['problem','number','colour','song'],ans:0},{q:'An essay has introduction, body, and ___?',opts:['conclusion','title','address','greeting'],ans:0},{q:'Which punctuation shows surprise?',opts:['!','?','.',','],ans:0}],
  [{sentence:'A letter starts with Dear ___.',answer:'Name',choices:['Name','End','Body','Date'],hint:'\u2709\ufe0f'},{sentence:'Every sentence starts with a ___ letter.',answer:'capital',choices:['capital','small','red','big'],hint:'\ud83d\udd24'},{sentence:'A question ends with a ___ mark.',answer:'question',choices:['question','full','exclamation','comma'],hint:'\u2753'},{sentence:'An essay has ___ main parts.',answer:'three',choices:['three','five','two','ten'],hint:'\ud83d\udcdd'},{sentence:'A story has a beginning, middle, and ___.',answer:'end',choices:['end','title','name','top'],hint:'\ud83d\udcd6'}],
  [{q:'Every sentence must start with a capital letter.',ans:true},{q:'A comma is used at the end of a sentence.',ans:false},{q:'"I" is always written in capital.',ans:true},{q:'An informal letter needs a greeting.',ans:true},{q:'Exclamation marks show questions.',ans:false}]
);

// Now generate Science index + 5 topics + 5 games
var sciColor = '#7B5EA7', sciBg = '#F3EDFF';
// Science Index
var mathIdx = fs.readFileSync(base+'/math/index.html','utf8');
var sciIdx = mathIdx
  .replace(/--c:#3A86FF/g, '--c:'+sciColor)
  .replace(/--cbg:#EEF4FF/g, '--cbg:'+sciBg)
  .replace(/<a href="index\.html">\u0B17\u0B23\u0B3F\u0B24<\/a>/g, '<a href="index.html">\u0B2C\u0B3F\u0B1C\u0B4D\u0B1E\u0B3E\u0B28</a>')
  .replace(/\u0B17\u0B23\u0B3F\u0B24 — Class 5 Math/g, '\u0B2C\u0B3F\u0B1C\u0B4D\u0B1E\u0B3E\u0B28 \u2014 Class 5 Science')
  .replace(/<span>\u0B17\u0B23\u0B3F\u0B24<\/span>/g, '<span>\u0B2C\u0B3F\u0B1C\u0B4D\u0B1E\u0B3E\u0B28</span>')
  .replace(/<h1>\u0B17\u0B23\u0B3F\u0B24<\/h1>/g, '<h1>\u0B2C\u0B3F\u0B1C\u0B4D\u0B1E\u0B3E\u0B28</h1>')
  .replace(/Mathematics — Class 5/g, 'Science \u2014 Class 5')
  .replace(/\u0B17\u0B23\u0B3F\u0B24 \u0B2A\u0B4D\u0B30\u0B2D\u0B3E \u0B2D\u0B3E\u0B17 \u0B6B \(SCERT Odisha\)/g, '\u0B2C\u0B3F\u0B1C\u0B4D\u0B1E\u0B3E\u0B28 \u0B2D\u0B3E\u0B17 \u0B6B (SCERT Odisha)')
  .replace(/<div class="hero-emoji">\ud83d\udcd8<\/div>/, '<div class="hero-emoji">\ud83d\udd2c</div>')
  .replace(/Class 5 \xb7 \u0B17\u0B23\u0B3F\u0B24/g, 'Class 5 \xb7 \u0B2C\u0B3F\u0B1C\u0B4D\u0B1E\u0B3E\u0B28');

sciIdx = sciIdx.replace(/var topics=\[[\s\S]*?\];/, "var topics=[" +
  "{emoji:'\ud83c\udf3f',name:'\u0B1C\u0B40\u0B2C\u0B1C\u0B17\u0B24',eng:'Living World',learn:'living-world.html',play:'living-world-games.html'}," +
  "{emoji:'\u2697\ufe0f',name:'\u0B2A\u0B26\u0B3E\u0B30\u0B4D\u0B25',eng:'Matter & Materials',learn:'matter.html',play:'matter-games.html'}," +
  "{emoji:'\ud83d\ude80',name:'\u0B2C\u0B33 \u0B13 \u0B17\u0B24\u0B3F',eng:'Force & Motion',learn:'force-motion.html',play:'force-motion-games.html'}," +
  "{emoji:'\ud83d\udca7',name:'\u0B1C\u0B33 \u0B1A\u0B15\u0B4D\u0B30',eng:'Water Cycle',learn:'water-cycle.html',play:'water-cycle-games.html'}," +
  "{emoji:'\ud83c\udfe5',name:'\u0B38\u0B4D\u0B35\u0B3E\u0B38\u0B4D\u0B25\u0B4D\u0B5F \u0B13 \u0B30\u0B4B\u0B17',eng:'Health & Disease',learn:'health.html',play:'health-games.html'}" +
  "];");

fs.writeFileSync(base+'/science/index.html', sciIdx);
console.log('Created: science/index.html');

// Social Studies Index
var ssIdx = mathIdx
  .replace(/--c:#3A86FF/g, '--c:#FF9F43')
  .replace(/--cbg:#EEF4FF/g, '--cbg:#FFF5EC')
  .replace(/<a href="index\.html">\u0B17\u0B23\u0B3F\u0B24<\/a>/g, '<a href="index.html">\u0B38\u0B2E\u0B3E\u0B1C \u0B05\u0B27\u0B4D\u0B5F\u0B5F\u0B28</a>')
  .replace(/\u0B17\u0B23\u0B3F\u0B24 — Class 5 Math/g, '\u0B38\u0B2E\u0B3E\u0B1C \u0B05\u0B27\u0B4D\u0B5F\u0B5F\u0B28 \u2014 Class 5 Social Studies')
  .replace(/<span>\u0B17\u0B23\u0B3F\u0B24<\/span>/g, '<span>\u0B38\u0B2E\u0B3E\u0B1C \u0B05\u0B27\u0B4D\u0B5F\u0B5F\u0B28</span>')
  .replace(/<h1>\u0B17\u0B23\u0B3F\u0B24<\/h1>/g, '<h1>\u0B38\u0B2E\u0B3E\u0B1C \u0B05\u0B27\u0B4D\u0B5F\u0B5F\u0B28</h1>')
  .replace(/Mathematics — Class 5/g, 'Social Studies \u2014 Class 5')
  .replace(/\u0B17\u0B23\u0B3F\u0B24 \u0B2A\u0B4D\u0B30\u0B2D\u0B3E \u0B2D\u0B3E\u0B17 \u0B6B \(SCERT Odisha\)/g, '\u0B38\u0B2E\u0B3E\u0B1C \u0B05\u0B27\u0B4D\u0B5F\u0B5F\u0B28 \u0B2D\u0B3E\u0B17 \u0B6B (SCERT Odisha)')
  .replace(/<div class="hero-emoji">\ud83d\udcd8<\/div>/, '<div class="hero-emoji">\ud83c\udf0f</div>')
  .replace(/Class 5 \xb7 \u0B17\u0B23\u0B3F\u0B24/g, 'Class 5 \xb7 \u0B38\u0B2E\u0B3E\u0B1C \u0B05\u0B27\u0B4D\u0B5F\u0B5F\u0B28');

ssIdx = ssIdx.replace(/var topics=\[[\s\S]*?\];/, "var topics=[" +
  "{emoji:'\ud83c\uddee\ud83c\uddf3',name:'\u0B2D\u0B3E\u0B30\u0B24 \u0B2D\u0B42\u0B17\u0B4B\u0B33',eng:'India Geography',learn:'india-geography.html',play:'india-geography-games.html'}," +
  "{emoji:'\ud83c\udfdb\ufe0f',name:'\u0B2A\u0B4D\u0B30\u0B3E\u0B1A\u0B40\u0B28 \u0B2D\u0B3E\u0B30\u0B24',eng:'Ancient India',learn:'ancient-india.html',play:'ancient-india-games.html'}," +
  "{emoji:'\ud83c\udfe0',name:'\u0B13\u0B21\u0B3C\u0B3F\u0B36\u0B3E',eng:'Odisha',learn:'odisha.html',play:'odisha-games.html'}," +
  "{emoji:'\ud83c\udfdb\ufe0f',name:'\u0B28\u0B3E\u0B17\u0B30\u0B3F\u0B15 \u0B1C\u0B40\u0B2C\u0B28',eng:'Civic Life',learn:'civic-life.html',play:'civic-life-games.html'}," +
  "{emoji:'\ud83c\udf33',name:'\u0B2A\u0B30\u0B3F\u0B2C\u0B47\u0B36',eng:'Environment',learn:'environment.html',play:'environment-games.html'}" +
  "];");

fs.writeFileSync(base+'/social-studies/index.html', ssIdx);
console.log('Created: social-studies/index.html');

console.log('All done!');
