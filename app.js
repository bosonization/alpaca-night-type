const MONTHLY_PASSWORD = '午前2時';
const TERMS_VERSION = '2026-04-29';
const PATTERN_SIZE = 12;
const PATTERN_TOTAL = PATTERN_SIZE * PATTERN_SIZE;
let TERMS_TEXT = '利用規約を読み込み中です…';
fetch('terms.txt').then(r => r.text()).then(t => { TERMS_TEXT = t; render(); }).catch(() => {});

const MBTI = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];

const qs = [
  ['🥂','初対面の飲み会であなたは？',[['自分から話しかける',{E:2},{party:2}],['話しかけられ待ち',{I:2},{distance:1}],['1人と深く話す',{I:1,N:1},{distance:2}],['様子を見る',{I:1,J:1},{care:2}]]],
  ['🍹','一杯目は？',[['とりあえずビール',{S:1,E:1},{party:2}],['ハイボール・サワー',{P:1,S:1},{party:1}],['カクテル・甘い系',{F:1,N:1},{music:1}],['ソフドリ・様子見',{J:2},{care:2}]]],
  ['💬','会話ではどっち？',[['自分の話をする',{E:2},{party:1}],['相手の話を聞く',{F:2},{distance:2}],['ツッコむ',{T:1,E:1},{party:1}],['深い話になる',{N:2},{distance:2}]]],
  ['🎤','二次会カラオケ、あなたは？',[['一番に歌う',{E:2,P:1},{karaoke:3}],['流れを見て入れる',{F:1,J:1},{care:1,karaoke:1}],['聴く専門',{I:2},{distance:1}],['気分で覚醒する',{P:2,N:1},{karaoke:2,midnight:1}]]],
  ['💗','気になる人が隣に来たら？',[['自分から話す',{E:1,F:1},{distance:2}],['相手待ち',{I:1,J:1},{care:1}],['ノリでいく',{E:1,P:1},{party:1,midnight:1}],['緊張して逆に静か',{I:2,F:1},{distance:1}]]],
  ['📱','LINEの返信は？',[['すぐ返す',{F:1,J:1},{care:1}],['気づいた時',{P:2},{midnight:1}],['相手次第',{F:1,N:1},{distance:1}],['わざと少し置く',{T:1,J:1},{care:1}]]],
  ['🎧','音楽の趣味が合わない相手は？',[['無理かも',{N:1,F:1},{music:3}],['少し大事',{F:1},{music:2}],['関係ない',{T:1,S:1},{care:1}],['むしろ新鮮',{N:1,P:1},{music:1,party:1}]]],
  ['🚃','終電が近い。あなたは？',[['帰る',{J:2},{care:2}],['少し迷う',{F:1,J:1},{distance:1}],['誰か残るなら残る',{E:1,F:1},{party:1}],['朝までコース',{P:2,E:1},{midnight:3,party:1}]]],
  ['🦙','酔ってくるとどうなる？',[['よく喋る',{E:2},{party:2}],['甘える',{F:2},{distance:2}],['静かになる',{I:2},{care:1}],['謎に元気',{P:2},{midnight:2,karaoke:1}]]],
  ['💘','好きになる人は？',[['面白い人',{E:1,P:1},{party:1}],['優しい人',{F:2},{distance:1}],['落ち着く人',{I:1,J:1},{care:1}],['刺激ある人',{N:1,P:1},{midnight:1}]]],
  ['🌙','二人きりで沈黙になったら？',[['気まずい',{E:1,F:1},{distance:1}],['自分から話す',{E:2},{party:1}],['平気',{I:1,T:1},{care:1}],['むしろ心地いい',{I:1,N:1},{distance:2}]]],
  ['✨','今このあと誘われたら？',[['もう一軒行く',{E:1,P:1},{party:2}],['ドライブ・散歩',{N:1,F:1},{distance:2}],['二人で話したい',{I:1,F:1},{distance:2}],['帰って寝る',{I:1,J:1},{care:2}]]]
];

const names = {
  ENFP:['深夜エンターテイナー','距離感バグらせ小悪魔'], ENFJ:['飲み会プロデューサー','甘やかし沼メーカー'], ENTP:['ツッコミ無双の策士','口説き文句が冗談に聞こえる人'], ENTJ:['二次会支配人','主導権握りがちナイトリーダー'],
  ESFP:['朝までパーティー番長','その場の空気で恋が始まる人'], ESFJ:['みんなの世話焼き乾杯係','酔うと距離が近い世話焼き'], ESTP:['終電クラッシャー','終電後に強すぎる危険人物'], ESTJ:['幹事長タイプ','ちゃんとしてるのに夜だけ大胆'],
  INFP:['静かな沼タイプ','好きになると重めロマンチスト'], INFJ:['深夜の聞き上手','目が合うだけで沼らせる人'], INTP:['考えすぎ哲学酔い','理屈っぽいのに不意に甘い'], INTJ:['クールな観察者','落とす気ないのに刺さる人'],
  ISFP:['気分で覚醒アーティスト','雰囲気で全部持っていく人'], ISFJ:['安心感の毛布','安心させてから沼らせる人'], ISTP:['一匹狼カラオケ職人','無口なのに距離感がずるい'], ISTJ:['終電守護神','誠実そうで夜にギャップ出る人']
};
const blurbs = {
  ENFP:'その場を明るくする天才。好きな人には意外と考えすぎる朝3時タイプ。', ENFJ:'全員の空気を見て、気づけば場を支配しているやさしい司会者。', ENTP:'会話の瞬発力で距離を詰める。冗談の中に本音を混ぜがち。', ENTJ:'二次会の行き先も席順も決められる夜の司令塔。',
  ESFP:'楽しい空気の中心。勢いで一番ドラマを起こすタイプ。', ESFJ:'気配りでみんなを包む。酔うと少し距離が近くなる。', ESTP:'ノリと行動力の塊。終電後から本領発揮。', ESTJ:'ちゃんとしているから信頼される。だけど夜にギャップが出る。',
  INFP:'静かなのに記憶に残る。深い話で急に沼らせる。', INFJ:'聞き上手すぎて相手が勝手に心を開く。視線が強い。', INTP:'酔っても分析している。たまに出る甘さがずるい。', INTJ:'落ち着いた観察者。狙ってない一言が妙に刺さる。',
  ISFP:'気分が乗った瞬間だけ誰よりも魅力的。雰囲気で勝つ。', ISFJ:'安心感がすごい。気づいたら隣にいてほしい存在。', ISTP:'無口だけど行動で見せる。カラオケ選曲にセンスが出る。', ISTJ:'終電を守る理性派。誠実さとギャップでじわじわ強い。'
};

let state = {
  mode:'home', flow:'solo', step:0, aType:'', aAns:[],
  termsOK:false, unlocked:false, pass:'',
  codeA:'', codeB:'', codeError:''
};
const app = document.getElementById('app');

function addScores(target, add){ Object.entries(add || {}).forEach(([k,v]) => target[k] = (target[k] || 0) + v); }
function typeFrom(ans, fallback){
  if (fallback) return fallback;
  const s = {E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};
  ans.forEach((a,i) => addScores(s, qs[i]?.[2]?.[a]?.[1]));
  return `${s.E>=s.I?'E':'I'}${s.S>=s.N?'S':'N'}${s.T>=s.F?'T':'F'}${s.J>=s.P?'J':'P'}`;
}
function night(ans){
  const n = {party:0,karaoke:0,distance:0,midnight:0,music:0,care:0};
  ans.forEach((a,i) => addScores(n, qs[i]?.[2]?.[a]?.[2]));
  return n;
}
function topAxis(n){
  const order = ['party','karaoke','distance','midnight','music','care'];
  return order.reduce((best,k,i) => (n[k] > n[order[best]] ? i : best), 0);
}
function hash36(str, len){
  let h = 2166136261;
  for (let i=0; i<str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36).toUpperCase().padStart(len, '0').slice(-len);
}
function patternFromAnswers(type, ans){
  const n = night(ans);
  let weighted = 0;
  ans.forEach((a,i) => weighted += (a + 1) * (i + 3));
  const x = ((weighted + topAxis(n) + type.charCodeAt(0)) % PATTERN_SIZE) + 1;
  const y = ((Math.abs(n.party*3 + n.distance*5 + n.midnight*7 + n.music*11 + n.karaoke*13 + n.care*17) + MBTI.indexOf(type) + PATTERN_SIZE) % PATTERN_SIZE) + 1;
  const pattern = (x - 1) * PATTERN_SIZE + y;
  const prefix = (pattern - 1).toString(36).toUpperCase().padStart(2, '0');
  const code = prefix + hash36(`${type}|${ans.join('')}|${x}|${y}|${TERMS_VERSION}`, 6);
  return { x, y, pattern, code, n };
}
function normalizeCode(code){ return String(code || '').toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 8); }
function decodeCode(raw){
  const code = normalizeCode(raw);
  if (!/^[0-9A-Z]{8}$/.test(code)) return null;
  const zeroBased = parseInt(code.slice(0, 2), 36);
  if (!Number.isFinite(zeroBased) || zeroBased < 0 || zeroBased >= PATTERN_TOTAL) return null;
  const pattern = zeroBased + 1;
  const x = Math.floor((pattern - 1) / PATTERN_SIZE) + 1;
  const y = ((pattern - 1) % PATTERN_SIZE) + 1;
  return { code, pattern, x, y };
}
function codeCompatibility(a, b){
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  let score = 98 - Math.round((dx + dy) * 4.4);
  if (a.x === b.x || a.y === b.y) score += 6;
  if (Math.abs(a.x + b.x - 13) <= 1) score += 4;
  if (Math.abs(a.y + b.y - 13) <= 1) score += 4;
  if (dx <= 2 && dy <= 2) score += 5;
  score = Math.max(32, Math.min(99, score));
  const vibe = dx + dy <= 3 ? 'かなり近い夜テンション' : dx + dy <= 8 ? '違いがいい刺激になる夜テンション' : '温度差を楽しむ探り合いテンション';
  return { score, dx, dy, distance: dx + dy, vibe };
}
function rank(sc){
  return sc >= 90 ? '深夜まで一緒にいたくなる相性' : sc >= 80 ? 'カラオケで距離が縮まる相性' : sc >= 70 ? '飲み会で自然に隣になる相性' : sc >= 60 ? '友達から始まる安定相性' : '探り合いから始まる相性';
}
function mbtiSelect(id,label,val){
  return `<label class="field"><span>${label}</span><select id="${id}"><option value="">未登録・わからない</option>${MBTI.map(t => `<option ${val===t?'selected':''}>${t}</option>`).join('')}</select></label>`;
}
function stats(n){
  return `<div class="stats">${[['飲み会ノリ',n.party],['カラオケ',n.karaoke],['距離感',n.distance],['深夜危険度',n.midnight],['音楽感性',n.music]].map(([k,v]) => `<div><span>${k}</span><i><b style="width:${Math.min(100, v*18)}%"></b></i></div>`).join('')}</div>`;
}
function termsView(){
  return `<section class="card center terms"><div class="alpaca">🦙📜</div><h2>利用規約への同意</h2><p class="lead">診断を始める前に、利用規約を確認してください。</p><div class="termsBox"><pre>${escapeHTML(TERMS_TEXT)}</pre></div><label class="agree"><input id="termsOK" type="checkbox" ${state.termsOK?'checked':''}>利用規約に同意します</label><button data-act="termsNext" ${state.termsOK?'':'disabled'}>同意して進む</button><button class="ghost" data-act="home">戻る</button></section>`;
}
function homeView(){
  return `<section class="card hero"><div><div class="badge">✨ 飲み会でバレる</div><h1>夜の16タイプ診断</h1><p>アルパカと一緒に見つける、あなたの裏人格。ひとり診断で8桁の相性コードを発行し、ふたり診断ではコード同士で144パターン相性を見ます。</p><div class="actions"><button data-act="solo">💕 ひとりで診断する</button><button class="secondary" data-act="pair">👥 ふたりで相性診断する</button></div><p class="mini">※これはエンタメ用の16タイプ風診断です。</p></div><div><img src="alpaca-promo.png" alt="アルパカ夜診断"><div class="phone"><b>相性コード発行</b><strong>ENFP</strong><span>8桁コードで診断</span></div></div></section>`;
}
function gateView(){
  return `<section class="card center"><div class="alpaca">🦙💕</div><h2>まずMBTI/16タイプを登録してね</h2><p class="lead">登録済みなら選ぶだけ。わからない人は、このあと${qs.length}問で夜タイプから仮判定して、8桁の相性コードを発行します。</p><div class="grid2 single">${mbtiSelect('aType','あなたのMBTI',state.aType)}</div><button data-act="gateNext">${state.aType?'診断結果を見る':`${qs.length}問で仮登録する`}</button><button class="ghost" data-act="home">戻る</button></section>`;
}
function codeInputView(){
  return `<section class="card center codeInput"><div class="alpaca">🦙🔐</div><h2>144パターンコードで相性診断</h2><p class="lead">ひとり診断の結果画面に出る<strong>8桁の相性コード</strong>を、あなたと相手それぞれ入力してください。ここではMBTI/16タイプは使いません。</p><div class="grid2"><label class="field"><span>あなたの8桁コード</span><input id="codeA" maxlength="8" value="${escapeAttr(state.codeA)}" placeholder="例：03ABC123"></label><label class="field"><span>相手の8桁コード</span><input id="codeB" maxlength="8" value="${escapeAttr(state.codeB)}" placeholder="例：1ZPAX999"></label></div>${state.codeError?`<div class="error">${state.codeError}</div>`:''}<div class="actions" style="justify-content:center"><button data-act="codeCompat">144パターンで相性診断する</button><button class="ghost" data-act="soloFromCode">コードを発行する</button><button class="ghost" data-act="home">戻る</button></div><p class="mini">コードを持っていない場合は「コードを発行する」から、ひとり診断をしてください。</p></section>`;
}
function quizView(){
  const q = qs[state.step];
  return `<section class="card quiz"><div class="progress"><span>あなたの診断</span><b>${state.step+1}/${qs.length}</b></div><div class="bar"><i style="width:${(state.step+1)/qs.length*100}%"></i></div><div class="qIcon">${q[0]}</div><h2>${q[1]}</h2><div class="options">${q[2].map((o,i) => `<button data-answer="${i}"><b>${String.fromCharCode(65+i)}</b>${o[0]}</button>`).join('')}</div></section>`;
}
function soloResultView(){
  const type = typeFrom(state.aAns, state.aType);
  const p = patternFromAnswers(type, state.aAns);
  return `<section class="results"><div class="card result codePair"><div class="alpaca">🦙✨</div><div class="badge">🍷 診断結果</div><h2>${type}</h2><h3>${names[type]?.[0] || '深夜エンターテイナー'}</h3><p class="lead">${blurbs[type] || blurbs.ENFP}</p><div class="codeBox"><span>相性診断用 8桁コード</span><strong>${p.code}</strong><small>144パターン番号：${p.pattern} / 座標：X${p.x}-Y${p.y}<br>ふたり相性診断では、このコードだけを相手と交換してください。</small></div>${stats(p.n)}<a class="btn share" target="_blank" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`飲み会でバレる夜人格診断をやったよ。私は${type}「${names[type]?.[0]}」 / 相性コード ${p.code} 🦙💕`)}">結果をシェアする</a></div><div class="card secret"><h3>🔒 深夜モード</h3><p>合言葉を知っている人だけ、もう一段ドキッとする結果を見られます。</p>${secretBlock(type)}</div><button class="reset ghost" data-act="home">↻ もう一回やる</button></section>`;
}
function codeResultView(){
  const a = decodeCode(state.codeA), b = decodeCode(state.codeB);
  const c = codeCompatibility(a, b);
  return `<section class="results"><div class="card pair codePair"><div class="badge">💕 144パターン相性</div><h2>${c.score}%</h2><h3>${rank(c.score)}</h3><p class="lead">8桁コードに含まれる144パターン番号だけで診断しました。16タイプ同士ではなく、夜テンションの細かい位置関係で見ています。</p><div class="pairCodes"><div><span>あなた</span><b>${a.code}</b><small>144番中 ${a.pattern}<br>X${a.x}-Y${a.y}</small></div><div><span>相手</span><b>${b.code}</b><small>144番中 ${b.pattern}<br>X${b.x}-Y${b.y}</small></div></div><ul><li>距離：${c.distance} / 22。${c.vibe}</li><li>良いポイント：近いほど自然、離れているほど刺激が出やすい</li><li>おすすめ：まずは音楽・終電感覚・沈黙耐性の話をすると盛り上がります</li></ul></div><div class="card secret"><h3>🔒 深夜モード</h3><p>合言葉を知っている人だけ、深夜版の相性コメントを見られます。</p>${state.unlocked?`<div class="unlocked"><h2>深夜相性 ${Math.min(99,c.score+7)}%</h2><p>急に攻めるより、帰り道の会話が一番刺さります。ふたりの距離は、場が落ち着いたあとに縮まりやすいタイプ。</p></div>`:`<input id="pass" placeholder="今月の合言葉" value="${escapeAttr(state.pass)}"><button data-act="unlock">深夜モードを解放する</button><small>ヒント：公式Xや画像のどこかに隠す想定</small>`}</div><button class="reset ghost" data-act="codeBack">コード入力に戻る</button><button class="reset ghost" data-act="home">↻ 最初に戻る</button></section>`;
}
function secretBlock(type){
  return state.unlocked ? `<div class="unlocked"><h2>${names[type]?.[1]}</h2><p>急に攻めるより、帰り道の会話が一番刺さります。隣に座ると空気が変わるタイプ。</p></div>` : `<input id="pass" placeholder="今月の合言葉" value="${escapeAttr(state.pass)}"><button data-act="unlock">深夜モードを解放する</button><small>ヒント：公式Xや画像のどこかに隠す想定</small>`;
}
function view(){
  if (state.mode === 'home') return homeView();
  if (state.mode === 'terms') return termsView();
  if (state.mode === 'gate') return gateView();
  if (state.mode === 'codeInput') return codeInputView();
  if (state.mode === 'quiz') return quizView();
  if (state.mode === 'soloResult') return soloResultView();
  if (state.mode === 'codeResult') return codeResultView();
  return homeView();
}
function render(){ app.innerHTML = `<main class="wrap">${view()}</main>`; bind(); }
function bind(){
  document.querySelectorAll('[data-act]').forEach(el => el.onclick = () => act(el.dataset.act));
  document.querySelectorAll('[data-answer]').forEach(el => el.onclick = () => answer(+el.dataset.answer));
  const termsOK = document.getElementById('termsOK');
  if (termsOK) termsOK.onchange = e => { state.termsOK = e.target.checked; render(); };
  const aType = document.getElementById('aType');
  if (aType) aType.onchange = e => { state.aType = e.target.value; render(); };
  const pass = document.getElementById('pass');
  if (pass) pass.oninput = e => state.pass = e.target.value;
  const codeA = document.getElementById('codeA');
  const codeB = document.getElementById('codeB');
  if (codeA) codeA.oninput = e => state.codeA = normalizeCode(e.target.value);
  if (codeB) codeB.oninput = e => state.codeB = normalizeCode(e.target.value);
}
function act(a){
  if (a === 'solo' || a === 'pair') {
    state = {mode:'terms', flow:a, step:0, aType:'', aAns:[], termsOK:false, unlocked:false, pass:'', codeA:'', codeB:'', codeError:''};
  } else if (a === 'home') {
    state = {...state, mode:'home'};
  } else if (a === 'termsNext') {
    if (!state.termsOK) return;
    state.mode = state.flow === 'pair' ? 'codeInput' : 'gate';
  } else if (a === 'gateNext') {
    if (state.aType) state.mode = 'soloResult';
    else { state.aAns = []; state.step = 0; state.mode = 'quiz'; }
  } else if (a === 'soloFromCode') {
    state.flow = 'solo'; state.mode = 'gate'; state.aType = ''; state.aAns = []; state.step = 0; state.codeError = '';
  } else if (a === 'codeCompat') {
    state.codeA = normalizeCode(document.getElementById('codeA')?.value || state.codeA);
    state.codeB = normalizeCode(document.getElementById('codeB')?.value || state.codeB);
    const da = decodeCode(state.codeA), db = decodeCode(state.codeB);
    if (!da || !db) { state.codeError = '8桁の相性コードを2つ入力してください。ひとり診断の結果画面に表示されるコードが必要です。'; render(); return; }
    state.codeError = ''; state.mode = 'codeResult';
  } else if (a === 'codeBack') {
    state.mode = 'codeInput'; state.unlocked = false; state.pass = '';
  } else if (a === 'unlock') {
    state.pass = document.getElementById('pass')?.value || state.pass;
    state.unlocked = state.pass.trim() === MONTHLY_PASSWORD;
  }
  render();
}
function answer(i){
  state.aAns.push(i);
  if (state.aAns.length < qs.length) state.step = state.aAns.length;
  else state.mode = 'soloResult';
  render();
}
function escapeHTML(str){ return String(str).replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch])); }
function escapeAttr(str){ return escapeHTML(str).replace(/'/g, '&#39;'); }
render();
