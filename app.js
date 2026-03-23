const { useState, useEffect, useCallback, useMemo, useRef } = React;

// ─── INDIAN ASSETS ──────────────────────────────────────────────────────────
const ALL_ASSETS = [
  { id:'TCS',        name:'Tata Consultancy Svcs', sector:'IT',       price:3540,  color:'#00ff88', vol:.010 },
  { id:'RELIANCE',   name:'Reliance Industries',   sector:'Energy',   price:2870,  color:'#38b6ff', vol:.012 },
  { id:'HDFCBANK',   name:'HDFC Bank',              sector:'Banking',  price:1690,  color:'#ffd166', vol:.009 },
  { id:'INFY',       name:'Infosys Ltd',            sector:'IT',       price:1435,  color:'#ff9d00', vol:.011 },
  { id:'WIPRO',      name:'Wipro Ltd',              sector:'IT',       price:488,   color:'#00ff88', vol:.013 },
  { id:'TATAMOTORS', name:'Tata Motors',            sector:'Auto',     price:915,   color:'#ff4d6a', vol:.016 },
  { id:'BAJFINANCE', name:'Bajaj Finance',          sector:'NBFC',     price:7180,  color:'#38b6ff', vol:.014 },
  { id:'ICICIBANK',  name:'ICICI Bank',             sector:'Banking',  price:1105,  color:'#ffd166', vol:.010 },
  { id:'SUNPHARMA',  name:'Sun Pharmaceutical',     sector:'Pharma',   price:1660,  color:'#00ff88', vol:.011 },
  { id:'ZOMATO',     name:'Zomato Ltd',             sector:'Tech',     price:218,   color:'#ff4d6a', vol:.022 },
  { id:'PAYTM',      name:'Paytm (One97)',           sector:'Fintech',  price:785,   color:'#ff9d00', vol:.025 },
  { id:'ONGC',       name:'ONGC',                   sector:'Energy',   price:282,   color:'#38b6ff', vol:.013 },
  { id:'MARUTI',     name:'Maruti Suzuki',          sector:'Auto',     price:11200, color:'#ffd166', vol:.009 },
  { id:'LT',         name:'Larsen & Toubro',        sector:'Infra',    price:3620,  color:'#00ff88', vol:.010 },
  { id:'AXISBANK',   name:'Axis Bank',              sector:'Banking',  price:1145,  color:'#38b6ff', vol:.012 },
];

// ─── LESSONS ────────────────────────────────────────────────────────────────
const LESSONS = [
  {
    id:'money-basics', icon:'💰', title:'What is Money & Inflation', sub:'Why your cash loses value over time', xp:50, tags:['Basics','India'],
    content:`
<p>Money is anything widely accepted as payment. In India we use the <strong>Rupee (₹)</strong>, managed by the <strong>Reserve Bank of India (RBI)</strong>.</p>
<h3>Three Jobs Money Does</h3>
<ul>
  <li><strong>Medium of Exchange</strong> — you trade ₹ for goods instead of bartering</li>
  <li><strong>Store of Value</strong> — you can save ₹ to use later</li>
  <li><strong>Unit of Account</strong> — you compare prices using a common measure</li>
</ul>
<h3>Inflation — The Silent Tax</h3>
<p>Inflation means prices rise over time. If inflation is <strong>6%</strong>, something costing ₹100 today will cost ₹106 next year. Keeping cash idle means your money loses buying power.</p>
<div class="hl">🇮🇳 A vada pav cost ₹5 in 2005. Today it costs ₹20. That's inflation — 4× in 20 years.</div>
<h3>Purchasing Power</h3>
<p>If inflation is 7% but your salary grew only 3%, your real purchasing power <em>fell by 4%</em>. This is why investing matters — your money must grow faster than inflation.</p>
<div class="ex">💡 FDs currently pay ~6.5–7% p.a. With 6% inflation your real gain is barely 0.5–1%. Equity (stocks) has historically returned 12–15% p.a. over long periods in India.</div>
`
  },
  {
    id:'credit-score', icon:'💳', title:'CIBIL Score & Credit Cards', sub:'How your credit score is calculated', xp:65, tags:['Credit','CIBIL'],
    content:`
<p>Your <strong>CIBIL score</strong> is a 3-digit number from <strong>300–900</strong> that tells lenders how reliable you are. Higher = better.</p>
<h3>Score Ranges</h3>
<ul>
  <li>🟢 <strong>750–900</strong>: Excellent — best loan rates</li>
  <li>🟡 <strong>650–749</strong>: Good — most loans approved</li>
  <li>🟠 <strong>550–649</strong>: Fair — higher interest charged</li>
  <li>🔴 <strong>300–549</strong>: Poor — loans often rejected</li>
</ul>
<h3>What Affects Your Score?</h3>
<ul>
  <li><strong>Payment History (35%)</strong> — Always pay on time, every time</li>
  <li><strong>Credit Utilisation (30%)</strong> — Use less than 30% of your credit limit</li>
  <li><strong>Credit Age (15%)</strong> — Older accounts help</li>
  <li><strong>Credit Mix (10%)</strong> — Having both cards and loans is good</li>
  <li><strong>Hard Inquiries (10%)</strong> — Too many loan applications hurts score</li>
</ul>
<div class="hl">🇮🇳 Priya has a ₹50,000 credit limit, uses only ₹10,000/month (20%) and pays in full. Her CIBIL is 820 — she gets a home loan at 8.5% instead of 11%! That saves lakhs.</div>
<h3>Build Credit as a Student</h3>
<ul>
  <li>Get a secured/student credit card with small limit</li>
  <li>Pay the <em>full</em> bill every month — not just minimum</li>
  <li>Never miss an EMI</li>
  <li>Don't apply to 5 banks at once — each query lowers score</li>
</ul>
`
  },
  {
    id:'stocks', icon:'📈', title:'How the Stock Market Works', sub:'NSE, BSE, Nifty50 — explained simply', xp:70, tags:['Stocks','NSE/BSE'],
    content:`
<p>When a company like Reliance needs capital to expand, it sells tiny ownership pieces called <strong>shares</strong> to the public. Buy a share = become a part-owner.</p>
<h3>Key Terms</h3>
<ul>
  <li><strong>NSE / BSE</strong> — India's two stock exchanges (marketplace for shares)</li>
  <li><strong>SENSEX</strong> — Index tracking top 30 BSE companies</li>
  <li><strong>NIFTY 50</strong> — Index tracking top 50 NSE companies</li>
  <li><strong>Market Cap</strong> — Total value of all shares of a company</li>
  <li><strong>Dividend</strong> — Share of profits paid to shareholders</li>
</ul>
<h3>How You Make Money</h3>
<ul>
  <li><strong>Capital Gains</strong>: Buy at ₹100, sell at ₹150 → ₹50 profit per share</li>
  <li><strong>Dividends</strong>: Some companies pay you quarterly just for holding</li>
</ul>
<div class="hl">🇮🇳 ₹1,000 invested in TCS in 2010 at ~₹380/share = ~2.6 shares. In 2024 at ₹3,540 = worth ₹9,200. That's ~9× in 14 years!</div>
<h3>Risks</h3>
<p>Stocks can drop 40–50% in a crash. <strong>Never put all money in one stock.</strong> Spread across sectors — IT, Banking, Pharma, Energy. This is <em>diversification</em>.</p>
<div class="ex">📌 Green candle = price went UP. Red candle = price went DOWN. Look at trends over weeks, not just a single day.</div>
`
  },
  {
    id:'sip-mf', icon:'🔄', title:'SIP & Mutual Funds', sub:'Compounding, NAV, and the 500/month trick', xp:70, tags:['Investing','SIP'],
    content:`
<p>A <strong>Mutual Fund</strong> pools money from many investors. A fund manager invests it across stocks/bonds. You don't pick stocks yourself!</p>
<h3>Types</h3>
<ul>
  <li><strong>Equity Funds</strong> — Invest in stocks → high risk, 12–18% historical returns</li>
  <li><strong>Debt Funds</strong> — Invest in bonds → lower risk, 6–8%</li>
  <li><strong>Index Funds / ETFs</strong> — Track NIFTY 50 passively. Low fees, beats most active funds over 15 years</li>
</ul>
<h3>SIP — The Student's Best Friend</h3>
<p><strong>SIP (Systematic Investment Plan)</strong> = invest a fixed amount every month regardless of market. You buy more units when prices are low, fewer when high — this <em>averages your cost</em> (Rupee Cost Averaging).</p>
<div class="hl">💡 ₹500/month SIP for 20 years at 12% p.a. → you invested ₹1.2 lakh total, you get back ~₹4.99 lakh. The extra ₹3.8L is compounding magic.</div>
<h3>Compounding</h3>
<p>Einstein called compound interest the "8th wonder of the world." ₹10,000 at 12% p.a.: Year 1 → ₹11,200 | Year 10 → ₹31,058 | Year 20 → ₹96,462. <strong>Start early, even if small.</strong></p>
`
  },
  {
    id:'budgeting', icon:'🎯', title:'Budgeting & the 50-30-20 Rule', sub:'Tell your money where to go', xp:55, tags:['Budget','Savings'],
    content:`
<p>Budgeting means <em>telling your money where to go</em> instead of wondering where it went. The simplest rule:</p>
<h3>50-30-20 Rule</h3>
<ul>
  <li>🏠 <strong>50% Needs</strong> — Rent, food, transport, phone bill</li>
  <li>🎉 <strong>30% Wants</strong> — Eating out, Netflix, shopping</li>
  <li>💰 <strong>20% Save / Invest</strong> — SIP, FD, emergency fund</li>
</ul>
<div class="hl">🇮🇳 Stipend ₹8,000/month: Needs ₹4,000 | Wants ₹2,400 | Savings ₹1,600 → Start a ₹500 SIP + keep ₹1,100 for emergency fund. You're ahead of 80% of your peers.</div>
<h3>Emergency Fund First</h3>
<p>Before investing anything, save <strong>3–6 months of expenses</strong> in a savings account or liquid fund. Never in stocks. When a crisis hits, you don't sell investments at a loss.</p>
<h3>Automate Savings</h3>
<p>Set up an auto-transfer on salary day. "Pay yourself first." People who automate save 20% more on average.</p>
<div class="ex">📌 Apps that help Indians track spending: Fi Money, Jupiter, Walnut, Money View. Use one!</div>
`
  },
  {
    id:'debt', icon:'💸', title:'Good Debt vs Bad Debt', sub:'EMIs, personal loans, and the Avalanche Method', xp:65, tags:['Debt','EMI'],
    content:`
<p>Not all debt is bad. The key is: does this debt <em>generate value</em> greater than its interest cost?</p>
<h3>Good Debt 🟢</h3>
<ul>
  <li><strong>Education loans</strong> — if they lead to higher income. Low interest, tax-deductible</li>
  <li><strong>Home loans</strong> — you build equity; tax benefits under Sec 24 & 80C</li>
  <li><strong>Business loans</strong> — used to generate more profit</li>
</ul>
<h3>Bad Debt 🔴</h3>
<ul>
  <li><strong>Credit card revolving debt</strong> — 36–42% p.a. interest in India. Devastating.</li>
  <li><strong>Personal loans for gadgets/travel</strong> — 14–22% p.a. depreciating purchase</li>
  <li><strong>Loan apps</strong> — some charge 120–400% APR. Predatory and dangerous.</li>
</ul>
<div class="hl">📌 Avalanche Method: Pay minimum on all debts, then throw every extra rupee at the highest-interest debt first. Saves the most money mathematically.</div>
<h3>EMI Formula</h3>
<p>EMI = P × r × (1+r)^n / ((1+r)^n − 1) where r = monthly rate, n = months. Use the EMI calculator in the Credit tab!</p>
`
  },
  {
    id:'tax', icon:'📋', title:'Income Tax Basics for Indians', sub:'Slabs, 80C, and why you should file ITR', xp:60, tags:['Tax','ITR','80C'],
    content:`
<p>Taxes are mandatory contributions to the government. In India, income tax is governed by the <strong>Income Tax Act</strong> and collected by the <strong>IT Department</strong>.</p>
<h3>New Tax Regime (FY 2024–25)</h3>
<ul>
  <li>₹0 – ₹3L: 0%</li>
  <li>₹3L – ₹7L: 5%</li>
  <li>₹7L – ₹10L: 10%</li>
  <li>₹10L – ₹12L: 15%</li>
  <li>₹12L – ₹15L: 20%</li>
  <li>Above ₹15L: 30%</li>
</ul>
<div class="hl">✅ Under new regime: income up to ₹7 lakh is effectively <strong>tax-free</strong> with rebate u/s 87A.</div>
<h3>Section 80C — Save ₹1.5L Tax!</h3>
<p>Under old regime, invest up to ₹1.5 lakh in: PPF, ELSS Mutual Funds, NSC, 5-year FD, LIC premium. This reduces your taxable income.</p>
<div class="ex">🇮🇳 If you're in 20% slab and invest ₹1.5L in 80C instruments, you save ₹30,000 in taxes.</div>
<h3>Why File ITR Even as a Student?</h3>
<ul>
  <li>Required if income > ₹2.5L annually</li>
  <li>Needed for student loans, visa applications, credit cards</li>
  <li>Claim TDS refund on FD interest</li>
  <li>Builds a financial track record early</li>
</ul>
`
  },
];

// ─── LOAN OPTIONS ────────────────────────────────────────────────────────────
const LOAN_OPTIONS = [
  { name:'Student Education Loan', amount:5000, interest:9  },
  { name:'Personal Loan (Bank)',   amount:3000, interest:14 },
  { name:'Credit Card Debt',       amount:2000, interest:36 },
  { name:'NBFC Quick Loan',        amount:1500, interest:24 },
  { name:'Loan App (Instant)',     amount:1000, interest:120 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const inr = (n) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:2}).format(n);
const inrS = (n) => n >= 100000 ? `₹${(n/100000).toFixed(2)}L` : n >= 1000 ? `₹${(n/1000).toFixed(1)}K` : `₹${n.toFixed(0)}`;
const pct  = (a, b) => (((b-a)/a)*100).toFixed(2);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const simPrice = (base, vol=.015) => +(base * (1 + (Math.random()-.48) * vol * 2)).toFixed(2);
const genSpark = (base, n=10) => { const p=[base]; for(let i=1;i<n;i++) p.push(simPrice(p[i-1],.025)); return p; };
const getScoreInfo = s => {
  if(s>=800) return {label:'Exceptional',color:'#00ff88'};
  if(s>=740) return {label:'Very Good',  color:'#38b6ff'};
  if(s>=670) return {label:'Good',       color:'#ffd166'};
  if(s>=580) return {label:'Fair',       color:'#ff9d00'};
  return             {label:'Poor',      color:'#ff4d6a'};
};

// ─── SPARKLINE ───────────────────────────────────────────────────────────────
function Spark({ data, up, w=72, h=22 }) {
  if (!data || data.length < 2) return null;
  const mn = Math.min(...data), mx = Math.max(...data), range = mx-mn||1;
  const pts = data.map((v,i) => `${(i/(data.length-1)*w).toFixed(1)},${(h-((v-mn)/range)*h).toFixed(1)}`).join(' ');
  return <svg width={w} height={h} style={{display:'block'}}><polyline points={pts} fill="none" stroke={up?'var(--neon)':'var(--red)'} strokeWidth="1.5" strokeLinejoin="round"/></svg>;
}

// ─── TOAST ───────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, []);
  const ic = type==='success'?'✅':type==='error'?'❌':'ℹ️';
  return <div className={`toast ${type}`}><span>{ic}</span><span>{msg}</span></div>;
}

// ─── ONBOARDING ──────────────────────────────────────────────────────────────
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [name, setName]   = useState('');
  const [handle, setHandle] = useState('');
  const [money, setMoney]  = useState(10000);
  const [goals, setGoals]  = useState([]);
  const [err,  setErr]     = useState('');
  const GOALS = ['Stocks 📈','Credit 💳','Budgeting 💰','SIP/MF 🔄','Debt Payoff 💸','Tax Filing 📋'];
  const toggle = g => setGoals(p => p.includes(g) ? p.filter(x=>x!==g) : [...p,g]);

  const next = () => {
    if (step===0 && (!name.trim()||!handle.trim())) { setErr('Fill in both fields please!'); return; }
    setErr('');
    if (step < 2) setStep(s=>s+1);
    else finish();
  };
  const finish = () => {
    const h = handle.trim().replace(/\s/g,'').toLowerCase();
    // If a saved account with this handle exists, offer to resume it
    try {
      const existing = localStorage.getItem('bbs_user_' + h);
      if (existing) {
        const saved = JSON.parse(existing);
        if (window.confirm(`Welcome back, ${saved.name}! Resume your saved account?\n\nBalance: ₹${saved.cash.toLocaleString('en-IN')} | XP: ${saved.xp} | Level ${saved.level}\n\nPress OK to resume, Cancel to start fresh.`)) {
          onComplete(saved);
          return;
        }
      }
    } catch(e){}
    const initPrices = {};
    ALL_ASSETS.forEach(a => initPrices[a.id] = a.price);
    onComplete({
      name: name.trim(), handle: handle.trim().replace(/\s/g,'').toLowerCase(),
      cash: money, startMoney: money, portfolio: {}, transactions: [],
      creditScore: 640 + Math.floor(Math.random()*80),
      debtCards: [], creditHistory: [],
      xp: 0, level: 1, completedLessons: [], goals,
      createdAt: Date.now(),
    });
  };

  return (
    <div className="ob-wrap">
      <div className="ob-box fu">
        <div className="ob-hero">
          <div style={{fontSize:'2.4rem',marginBottom:'8px'}}>🪙</div>
          <h1>Broke<span>But</span><span style={{color:'var(--neon)'}}>Smart</span></h1>
          <p>Learn real money skills with fake rupees. Zero risk. Pure financial knowledge. Built for India.</p>
        </div>
        <div className="step-dots">
          {[0,1,2].map(i=><div key={i} className={`step-dot ${step===i?'active':''}`}/>)}
        </div>

        {step===0 && (
          <div className="form-stack fu">
            <div><label className="inp-label">Your Name</label><input className="inp" placeholder="e.g. Rahul Sharma" value={name} onChange={e=>setName(e.target.value)}/></div>
            <div><label className="inp-label">Username</label><input className="inp" placeholder="e.g. rahulbuyslow" value={handle} onChange={e=>setHandle(e.target.value)}/></div>
            {err && <p style={{color:'var(--red)',fontSize:'.78rem'}}>{err}</p>}
            <button className="v0-btn v0-btn-primary v0-btn-lg" style={{marginTop:'6px'}} onClick={next}>Let's Go →</button>
          </div>
        )}

        {step===1 && (
          <div className="form-stack fu">
            <p style={{color:'var(--text2)',fontSize:'.84rem',lineHeight:'1.6'}}>Choose your <strong style={{color:'var(--text)'}}>starting balance</strong>. This is fake paper money — treat it like real to build real habits.</p>
            <div className="money-disp">
              <div className="amt">₹{money.toLocaleString('en-IN')}</div>
              <div className="lbl">Starting Paper Money</div>
            </div>
            <input type="range" className="inp-range" min="1000" max="50000" step="1000" value={money} onChange={e=>setMoney(Number(e.target.value))}/>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'.68rem',color:'var(--text3)',fontFamily:'var(--mono)'}}>
              <span>₹1,000 (Tight budget)</span><span>₹25,000 (Decent)</span><span>₹50,000 (Big bag!)</span>
            </div>
            <div className="pick-chips">
              {[1000,5000,10000,25000,40000,50000].map(v=><button key={v} className={`pick-chip ${money===v?'sel':''}`} onClick={()=>setMoney(v)}>₹{v.toLocaleString('en-IN')}</button>)}
            </div>
            <button className="v0-btn v0-btn-primary v0-btn-lg" onClick={next}>Choose This →</button>
          </div>
        )}

        {step===2 && (
          <div className="form-stack fu">
            <p style={{color:'var(--text2)',fontSize:'.84rem',lineHeight:'1.6'}}>What do you want to learn? (pick all that apply)</p>
            <div className="pick-chips">
              {GOALS.map(g=><button key={g} className={`pick-chip ${goals.includes(g)?'sel':''}`} onClick={()=>toggle(g)}>{g}</button>)}
            </div>
            <button className="v0-btn v0-btn-primary v0-btn-lg" onClick={finish} style={{marginTop:'4px'}}>Start Learning 🚀</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TRADE MODAL ─────────────────────────────────────────────────────────────
function TradeModal({ asset, prices, user, onTrade, onClose }) {
  const [mode, setMode] = useState('buy');
  const [qty,  setQty]  = useState(1);
  const price = prices[asset.id] || asset.price;
  const owned  = user.portfolio[asset.id]?.shares || 0;
  const total  = +(price * qty).toFixed(2);
  const maxBuy = Math.floor(user.cash / price);
  const canBuy  = qty>0 && total<=user.cash;
  const canSell = qty>0 && qty<=owned;

  return (
    <div className="modal-ov" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="modal">
        <div className="modal-ttl">
          <div style={{width:28,height:28,borderRadius:6,background:`${asset.color}22`,border:`1px solid ${asset.color}55`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--mono)',fontWeight:700,fontSize:'.7rem',color:asset.color}}>{asset.id.slice(0,3)}</div>
          {asset.name}
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div style={{display:'flex',gap:'7px',marginBottom:'14px'}}>
          {['buy','sell'].map(m=>(
            <button key={m} className={`btn btn-sm ${mode===m?'btn-primary':'btn-outline'}`} style={{flex:1,textTransform:'capitalize'}} onClick={()=>{setMode(m);setQty(1)}}>
              {m==='buy'?'🟢 Buy':'🔴 Sell'}
            </button>
          ))}
        </div>

        <div style={{marginBottom:'14px'}}>
          <label className="inp-label">Shares ({mode==='buy'?`Max: ${maxBuy}`:`Owned: ${owned}`})</label>
          <div style={{display:'flex',alignItems:'center',gap:'7px',marginTop:'5px'}}>
            <button className="v0-btn v0-btn-outline v0-btn-sm" onClick={()=>setQty(q=>Math.max(1,q-1))}>−</button>
            <input className="inp" type="number" min="1" max={mode==='buy'?maxBuy:owned} value={qty} onChange={e=>setQty(Math.max(1,Number(e.target.value)))} style={{textAlign:'center'}}/>
            <button className="v0-btn v0-btn-outline v0-btn-sm" onClick={()=>setQty(q=>Math.min(mode==='buy'?maxBuy:owned,q+1))}>+</button>
          </div>
          <input type="range" className="inp-range" style={{marginTop:'9px'}} min="1" max={Math.max(1,mode==='buy'?maxBuy:owned)} value={qty} onChange={e=>setQty(Number(e.target.value))}/>
        </div>

        <div className="trade-sum">
          <div className="tr-row"><span className="k">Market Price</span><span className="v">{inr(price)}</span></div>
          <div className="tr-row"><span className="k">Shares</span><span className="v">× {qty}</span></div>
          <div className="tr-row" style={{borderTop:'1px solid var(--border)',paddingTop:'7px',marginTop:'3px'}}>
            <span className="k">Total</span><span className="v" style={{color:'var(--neon)',fontSize:'.95rem'}}>{inr(total)}</span>
          </div>
          {mode==='buy' && <div className="tr-row"><span className="k">Cash after</span><span className="v" style={{color:canBuy?'var(--text)':'var(--red)'}}>{inr(user.cash-total)}</span></div>}
        </div>

        {mode==='buy'&&!canBuy && <p style={{color:'var(--red)',fontSize:'.76rem',marginBottom:'11px'}}>⚠ Not enough balance. Reduce quantity.</p>}
        {mode==='sell'&&owned===0 && <p style={{color:'var(--red)',fontSize:'.76rem',marginBottom:'11px'}}>⚠ You don't own any shares of this stock.</p>}

        <button className={`btn btn-lg ${mode==='buy'?'btn-primary':'btn-danger'}`} style={{width:'100%'}} disabled={mode==='buy'?!canBuy:!canSell} onClick={()=>onTrade(mode,asset,qty,price)}>
          {mode==='buy'?`Buy ${qty} Share${qty!==1?'s':''}`:` Sell ${qty} Share${qty!==1?'s':''}`}
        </button>
      </div>
    </div>
  );
}

// ─── LESSON MODAL ─────────────────────────────────────────────────────────────
function LessonModal({ lesson, done, onComplete, onClose }) {
  return (
    <div className="modal-ov" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="modal" style={{maxWidth:560}}>
        <div className="modal-ttl">{lesson.icon} {lesson.title}<button className="modal-close" onClick={onClose}>✕</button></div>
        <div className="lm-body" dangerouslySetInnerHTML={{__html:lesson.content}}/>
        <button className="v0-btn v0-btn-primary v0-btn-lg" style={{width:'100%',marginTop:'16px'}} disabled={done} onClick={onComplete}>
          {done ? '✅ Already Completed!' : `✅ Mark Complete & Earn +${lesson.xp} XP`}
        </button>
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard({ user, prices, portfolioValue, totalValue, pnl, pnlPct, sparklines, setTab, resetAccount }) {
  const pnlUp = pnl >= 0;
  const topHoldings = Object.entries(user.portfolio).slice(0,3).map(([id,pos]) => {
    const a = ALL_ASSETS.find(x=>x.id===id);
    const val = (prices[id]||0)*pos.shares;
    const gain = val - pos.avgPrice*pos.shares;
    return { id, a, pos, val, gain };
  });
  const recentTx = user.transactions.slice(0,5);

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
      {/* Hero */}
      <div className="v0-card v0-card-neon fu" style={{background:'linear-gradient(135deg,rgba(0,255,136,.05),rgba(56,182,255,.03))'}}>
        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
          <div>
            <div className="balance-lbl">Total Portfolio Value</div>
            <div className="balance-big">{inrS(totalValue)}</div>
            <div className={`pnl-badge ${pnlUp?'':'badge-r'}`} style={{background:pnlUp?'rgba(0,255,136,.1)':'rgba(255,77,106,.1)',color:pnlUp?'var(--neon)':'var(--red)',border:`1px solid ${pnlUp?'rgba(0,255,136,.25)':'rgba(255,77,106,.3)'}`}}>
              {pnlUp?'▲':'▼'} {inr(Math.abs(pnl))} ({pnlUp?'+':''}{pnlPct}%)
            </div>
            <div className="stat-row">
              <div className="stat-pill">Cash: <span>{inrS(user.cash)}</span></div>
              <div className="stat-pill">Invested: <span>{inrS(portfolioValue)}</span></div>
              <div className="stat-pill">Start: <span>₹{user.startMoney}</span></div>
            </div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:'.7rem',color:'var(--text3)',fontFamily:'var(--mono)',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'.06em'}}>CIBIL Score</div>
            <div style={{fontFamily:'var(--mono)',fontSize:'2rem',fontWeight:700,color:getScoreInfo(user.creditScore).color}}>{user.creditScore}</div>
            <div style={{fontSize:'.7rem',color:'var(--text3)',fontFamily:'var(--mono)'}}>{getScoreInfo(user.creditScore).label}</div>
          </div>
        </div>
      </div>

      <div className="grid-4 fu1">
        {[
          {lbl:'Cash Available', val:inrS(user.cash), sub:'Undeployed', col:'var(--neon)'},
          {lbl:'Stock Value',    val:inrS(portfolioValue), sub:`${Object.keys(user.portfolio).length} holdings`, col:'var(--blue)'},
          {lbl:'XP Earned',     val:`${user.xp} XP`, sub:`Level ${user.level}`, col:'var(--gold)'},
          {lbl:'Lessons Done',  val:`${user.completedLessons.length}/${LESSONS.length}`, sub:'Completed', col:'var(--orange)'},
        ].map(s=>(
          <div key={s.lbl} className="v0-card">
            <div className="card-title">{s.lbl}</div>
            <div className="card-val" style={{color:s.col,fontSize:'1.4rem'}}>{s.val}</div>
            <div className="card-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2 fu2">
        {/* Quick Actions */}
        <div className="v0-card">
          <div className="section-hdr"><div className="section-ttl">⚡ Quick Actions</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {[
              {icon:'📈',lbl:'Buy your first stock',tab:'market'},
              {icon:'💳',lbl:'Simulate credit score',tab:'credit'},
              {icon:'🎓',lbl:'Read a lesson',tab:'learn'},
              {icon:'💼',lbl:'View portfolio',tab:'portfolio'},
            ].map(a=>(
              <button key={a.tab} className="v0-btn v0-btn-outline" style={{justifyContent:'flex-start',gap:'10px'}} onClick={()=>setTab(a.tab)}>
                <span>{a.icon}</span><span>{a.lbl}</span>
              </button>
            ))}

          </div>
        </div>

        {/* Recent activity */}
        <div className="v0-card">
          <div className="section-hdr"><div className="section-ttl">🕐 Recent Activity</div></div>
          {recentTx.length===0
            ? <div className="empty-state">No transactions yet.<br/>Go buy some stocks! 📈</div>
            : recentTx.map(tx=>(
              <div key={tx.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
                <div>
                  <div style={{fontSize:'.82rem',fontWeight:600}}>{tx.mode==='buy'?'📈 Bought':'📉 Sold'} {tx.assetId}</div>
                  <div style={{fontSize:'.7rem',color:'var(--text3)',fontFamily:'var(--mono)'}}>{tx.qty} share{tx.qty!==1?'s':''} @ {inr(tx.price)}</div>
                </div>
                <span className={tx.mode==='buy'?'badge-r':'badge-g'}>{tx.mode==='buy'?'-':'+' }{inrS(tx.total)}</span>
              </div>
            ))
          }
        </div>
      </div>

      {/* Market snapshot */}
      <div className="v0-card fu3">
        <div className="section-hdr"><div className="section-ttl">🇮🇳 Market Snapshot</div><button className="v0-btn v0-btn-outline v0-btn-sm" onClick={()=>setTab('market')}>Full Market →</button></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))',gap:'8px'}}>
          {ALL_ASSETS.slice(0,8).map(a=>{
            const p=prices[a.id]||a.price, pp=a.price;
            const up=p>=pp, chg=pct(pp,p);
            return (
              <div key={a.id} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'8px',padding:'10px',cursor:'pointer'}} onClick={()=>setTab('market')}>
                <div style={{fontFamily:'var(--mono)',fontWeight:700,fontSize:'.78rem',color:a.color}}>{a.id}</div>
                <div style={{fontFamily:'var(--mono)',fontSize:'.86rem',margin:'3px 0'}}>{inrS(p)}</div>
                <div style={{fontSize:'.7rem',color:up?'var(--neon)':'var(--red)'}}>{up?'▲':'▼'}{Math.abs(chg)}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── MARKET ──────────────────────────────────────────────────────────────────
function Market({ user, prices, prevPrices, sparklines, onTrade }) {
  const [search, setSearch] = useState('');
  const [sort, setSort]     = useState('name');
  const filtered = ALL_ASSETS
    .filter(a => a.id.includes(search.toUpperCase()) || a.name.toLowerCase().includes(search.toLowerCase()) || a.sector.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sort==='change' ? (pct(a.price,prices[a.id]||a.price)-pct(b.price,prices[b.id]||b.price)) : a.name.localeCompare(b.name));

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
      <div className="v0-card fu" style={{padding:'14px 18px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'10px'}}>
          <div>
            <div style={{fontSize:'1.05rem',fontWeight:700}}>🇮🇳 NSE / BSE Market</div>
            <div style={{fontSize:'.75rem',color:'var(--text2)'}}>Prices update every 3s · All amounts in ₹</div>
          </div>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            <input className="inp" style={{width:180}} placeholder="🔍 Search stocks..." value={search} onChange={e=>setSearch(e.target.value)}/>
            <select className="inp" style={{width:'auto'}} value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="name">Sort: Name</option>
              <option value="change">Sort: % Change</option>
            </select>
          </div>
        </div>
      </div>

      <div className="v0-card fu1" style={{padding:0,overflow:'hidden',border:'1px solid rgba(0,255,136,.2))'}}>
        <table className="v0-table">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Price</th>
              <th>Change</th>
              <th style={{display:'table-cell'}}>Sector</th>
              <th>Trend</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a=>{
              const p = prices[a.id]||a.price, pp = prevPrices[a.id]||a.price;
              const up = p>=pp, chg = pct(pp,p);
              const owned = user.portfolio[a.id]?.shares||0;
              const spark = sparklines[a.id]||[a.price];
              return (
                <tr key={a.id} onClick={()=>onTrade(a)}>
                  <td>
                    <div className="s-name" style={{color:a.color}}>{a.id}</div>
                    <div className="s-sym">{a.name}</div>
                    {owned>0 && <span className="badge-g" style={{fontSize:'.62rem'}}>Holding {owned}</span>}
                  </td>
                  <td style={{fontFamily:'var(--mono)',fontWeight:700}}>{inr(p)}</td>
                  <td><span className={up?'badge-g':'badge-r'}>{up?'▲':'▼'}{Math.abs(chg)}%</span></td>
                  <td><span className="tag">{a.sector}</span></td>
                  <td><Spark data={spark} up={up}/></td>
                  <td>
                    <div className="act-btns">
                      <button className="btn btn-sm" style={{background:'rgba(0,255,136,.12)',color:'var(--neon)',border:'1px solid rgba(0,255,136,.25)'}} onClick={e=>{e.stopPropagation();onTrade(a)}}>Trade</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PORTFOLIO ───────────────────────────────────────────────────────────────
function Portfolio({ user, prices, portfolioValue, totalValue, pnl, pnlPct }) {
  const pnlUp = pnl>=0;
  const holdings = Object.entries(user.portfolio);

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
      <div className="v0-card fu" style={{background:'linear-gradient(135deg,rgba(0,255,136,.04),rgba(56,182,255,.03))'}}>
        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'12px',alignItems:'flex-start'}}>
          <div>
            <div className="balance-lbl">Portfolio Net Worth</div>
            <div className="balance-big">{inrS(totalValue)}</div>
            <div className={`pnl-badge`} style={{background:pnlUp?'rgba(0,255,136,.1)':'rgba(255,77,106,.1)',color:pnlUp?'var(--neon)':'var(--red)',border:`1px solid ${pnlUp?'rgba(0,255,136,.25)':'rgba(255,77,106,.3)'}`}}>
              {pnlUp?'▲':'▼'} {inr(Math.abs(pnl))} ({pnlUp?'+':''}{pnlPct}%)
            </div>
          </div>
          <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
            <div className="v0-card" style={{minWidth:100,padding:'10px 14px'}}>
              <div className="card-title">Cash</div>
              <div style={{fontFamily:'var(--mono)',fontWeight:700,fontSize:'1rem',color:'var(--neon)'}}>{inrS(user.cash)}</div>
            </div>
            <div className="v0-card" style={{minWidth:100,padding:'10px 14px'}}>
              <div className="card-title">Invested</div>
              <div style={{fontFamily:'var(--mono)',fontWeight:700,fontSize:'1rem',color:'var(--blue)'}}>{inrS(portfolioValue)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="v0-card fu1">
        <div className="section-hdr"><div className="section-ttl">💼 Holdings ({holdings.length})</div></div>
        {holdings.length===0
          ? <div className="empty-state">No holdings yet.<br/>Head to the Market tab to buy your first share!</div>
          : holdings.map(([id,pos])=>{
              const a = ALL_ASSETS.find(x=>x.id===id);
              const curPrice = prices[id]||a.price;
              const val  = +(curPrice*pos.shares).toFixed(2);
              const cost = +(pos.avgPrice*pos.shares).toFixed(2);
              const gain = +(val-cost).toFixed(2);
              const gainPct = pct(cost,val);
              const up = gain>=0;
              return (
                <div key={id} className="pi">
                  <div className="pi-l">
                    <div className="pi-ico" style={{background:`${a.color}18`,color:a.color,border:`1px solid ${a.color}33`}}>{id.slice(0,3)}</div>
                    <div>
                      <div style={{fontSize:'.88rem',fontWeight:700}}>{a.name}</div>
                      <div className="pi-meta">{pos.shares} shares @ avg {inr(pos.avgPrice)}</div>
                    </div>
                  </div>
                  <div className="pi-r">
                    <div className="pi-val">{inr(val)}</div>
                    <div className="pi-meta" style={{color:up?'var(--neon)':'var(--red)'}}>{up?'+':''}{inr(gain)} ({up?'+':''}{gainPct}%)</div>
                  </div>
                </div>
              );
            })
        }
      </div>

      {user.transactions.length>0 && (
        <div className="v0-card fu2">
          <div className="section-hdr"><div className="section-ttl">🧾 Transaction History</div></div>
          {user.transactions.slice(0,15).map(tx=>(
            <div key={tx.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
              <div>
                <div style={{fontSize:'.82rem',fontWeight:600}}>{tx.mode==='buy'?'📈':'📉'} {tx.mode.toUpperCase()} {tx.assetId}</div>
                <div style={{fontSize:'.7rem',color:'var(--text3)',fontFamily:'var(--mono)'}}>{tx.qty} share{tx.qty!==1?'s':''} @ {inr(tx.price)}</div>
              </div>
              <span className={tx.mode==='buy'?'badge-r':'badge-g'}>{tx.mode==='buy'?'-':'+' }{inr(tx.total)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CREDIT ──────────────────────────────────────────────────────────────────
function CreditModule({ user, takeLoan, makePayment, showToast }) {
  const [tab, setTab] = useState('score');
  const [payAmts, setPayAmts] = useState({});
  const [emiP, setEmiP] = useState('');
  const [emiR, setEmiR] = useState('');
  const [emiN, setEmiN] = useState('');
  const [emiRes, setEmiRes] = useState(null);
  const { label, color } = getScoreInfo(user.creditScore);
  const circ = 2 * Math.PI * 52;
  const offset = circ - ((user.creditScore-300)/600)*circ;

  const calcEMI = () => {
    const P=parseFloat(emiP), r=parseFloat(emiR)/12/100, n=parseInt(emiN);
    if(!P||!r||!n) { showToast('Fill all EMI fields!','error'); return; }
    const emi = P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
    const total = emi*n, interest = total-P;
    setEmiRes({emi,total,interest});
  };

  const factors = [
    {name:'Payment History',   pct:user.debtCards.length===0?85:65, weight:'35%'},
    {name:'Credit Utilisation',pct:user.debtCards.length===0?90:50, weight:'30%'},
    {name:'Credit Age',        pct:40, weight:'15%'},
    {name:'Credit Mix',        pct:user.debtCards.length>0?70:35, weight:'10%'},
    {name:'Hard Inquiries',    pct:80, weight:'10%'},
  ];

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
      <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}} className="fu">
        {['score','loans','debt','emi'].map(t=>(
          <button key={t} className={`btn btn-sm ${tab===t?'btn-primary':'btn-outline'}`} style={{textTransform:'capitalize'}} onClick={()=>setTab(t)}>
            {t==='score'?'📊 Score':t==='loans'?'🏦 Loans':t==='debt'?'💸 My Debt':'🧮 EMI Calc'}
          </button>
        ))}
      </div>

      {tab==='score' && (
        <div style={{display:'flex',flexDirection:'column',gap:'14px'}} className="fu">
          <div className="v0-card">
            <div style={{display:'flex',alignItems:'center',gap:'24px',flexWrap:'wrap'}}>
              <div className="ring-wrap" style={{flexShrink:0}}>
                <svg width="130" height="130" viewBox="0 0 130 130">
                  <circle cx="65" cy="65" r="52" fill="none" stroke="var(--border2)" strokeWidth="10"/>
                  <circle cx="65" cy="65" r="52" fill="none" stroke={color} strokeWidth="10"
                    strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
                    style={{transition:'stroke-dashoffset 1s ease'}}/>
                </svg>
                <div className="ring-lbl">
                  <div className="ring-score" style={{color}}>{user.creditScore}</div>
                  <div className="ring-sub">CIBIL</div>
                </div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:'1.1rem',fontWeight:700,marginBottom:'4px'}}>{label}</div>
                <div style={{fontSize:'.8rem',color:'var(--text2)',marginBottom:'16px'}}>Score range: 300 – 900 · Updated realtime</div>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {factors.map(f=>(
                    <div key={f.name} className="cf">
                      <div className="cf-hdr">
                        <span className="cf-name">{f.name}</span>
                        <span className="cf-val">{f.weight}</span>
                      </div>
                      <div className="cf-track"><div className="cf-fill" style={{width:`${f.pct}%`,background:f.pct>70?'var(--neon)':f.pct>40?'var(--gold)':'var(--red)'}}/></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="v0-card">
            <div className="section-hdr"><div className="section-ttl">🎯 Simulate Credit Events</div></div>
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {[
                {icon:'✅',title:'Pay bill on time',sub:'Score +10 to +15 pts',fn:()=>{takeLoan(0,'dummy',0,'payment'); showToast('On-time payment recorded! CIBIL improving 📈','success');}},
                {icon:'❌',title:'Miss a payment',sub:'Score −35 to −50 pts',fn:()=>{takeLoan(0,'dummy',0,'miss'); showToast('Missed payment! CIBIL dropped badly 📉','error');}},
                {icon:'🔄',title:'High credit utilisation (>50%)',sub:'Score −10 to −20 pts',fn:()=>{takeLoan(0,'dummy',0,'util'); showToast('High utilisation detected. Score dropped ⚠️','error');}},
              ].map(c=>(
                <div key={c.title} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'8px',padding:'11px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontSize:'.84rem',fontWeight:600}}>{c.icon} {c.title}</div>
                    <div style={{fontSize:'.7rem',color:'var(--text2)'}}>{c.sub}</div>
                  </div>
                  <button className="v0-btn v0-btn-outline v0-btn-sm" onClick={c.fn}>Simulate</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab==='loans' && (
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}} className="fu">
          <div className="v0-card" style={{background:'rgba(56,182,255,.04)'}}>
            <p style={{fontSize:'.84rem',color:'var(--text2)',lineHeight:'1.65'}}>Take a loan to practice repayment. Notice how higher APR loans cost much more over time. <span style={{color:'var(--gold)'}}>⚠ Never use predatory loan apps in real life!</span></p>
          </div>
          {LOAN_OPTIONS.map(l=>(
            <div key={l.name} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'8px',padding:'13px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
              <div>
                <div style={{fontSize:'.88rem',fontWeight:700,marginBottom:'4px'}}>{l.name}</div>
                <div style={{display:'flex',gap:'5px',flexWrap:'wrap'}}>
                  <span className="badge-g">+₹{l.amount.toLocaleString('en-IN')}</span>
                  <span className={`${l.interest>20?'badge-r':l.interest>10?'badge-y':'badge-g'}`}>{l.interest}% APR</span>
                  {l.interest>100 && <span className="badge-r">⚠ PREDATORY</span>}
                </div>
              </div>
              <button className="v0-btn v0-btn-outline v0-btn-sm" onClick={()=>takeLoan(l.amount,l.name,l.interest)}>Take Loan</button>
            </div>
          ))}
        </div>
      )}

      {tab==='debt' && (
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}} className="fu">
          {user.debtCards.length===0
            ? <div className="empty-state">No active debt.<br/>Go to Loans tab to take a loan and practice repayment.</div>
            : user.debtCards.map(d=>{
                const paidPct = ((d.original-d.balance)/d.original)*100;
                const pa = payAmts[d.id]||d.minPayment;
                return (
                  <div key={d.id} className="debt-item">
                    <div className="debt-hdr">
                      <div>
                        <div className="debt-name">{d.name}</div>
                        <div style={{fontSize:'.7rem',color:'var(--text3)',fontFamily:'var(--mono)'}}>APR: <span style={{color:d.interest>20?'var(--red)':d.interest>10?'var(--gold)':'var(--neon)'}}>{d.interest}%</span></div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div className="debt-amt" style={{color:'var(--red)'}}>₹{d.balance.toLocaleString('en-IN')}</div>
                        <div style={{fontSize:'.7rem',color:'var(--text3)',fontFamily:'var(--mono)'}}>of ₹{d.original.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                    <div className="debt-prog"><div className="debt-prog-fill" style={{width:`${100-paidPct}%`}}/></div>
                    <div style={{display:'flex',alignItems:'center',gap:'8px',marginTop:'10px',flexWrap:'wrap'}}>
                      <div style={{flex:1,minWidth:'120px'}}>
                        <label className="inp-label" style={{marginBottom:'4px'}}>Payment Amount (₹)</label>
                        <input type="number" className="inp" style={{padding:'6px 10px',fontSize:'.8rem'}}
                          min={d.minPayment} max={Math.min(d.balance,user.cash)}
                          value={pa} onChange={e=>setPayAmts(p=>({...p,[d.id]:Number(e.target.value)}))}/>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
                        <button className="btn btn-sm btn-outline" onClick={()=>makePayment(d.id,d.minPayment)}>Min: ₹{d.minPayment}</button>
                        <button className="btn btn-sm btn-primary" onClick={()=>makePayment(d.id,Math.min(pa||d.minPayment,user.cash,d.balance))}>Pay ₹{Math.min(pa||d.minPayment,user.cash,d.balance).toFixed(0)}</button>
                      </div>
                    </div>
                  </div>
                );
              })
          }
          {user.debtCards.length>0 && (
            <div className="v0-card" style={{background:'var(--bg2)',fontSize:'.8rem',color:'var(--text2)'}}>
              <span style={{color:'var(--gold)'}}>💡 Strategy: </span>
              The <strong style={{color:'var(--text)'}}>Avalanche Method</strong> — pay minimum on all debts, then throw everything extra at the highest-APR debt first. Saves maximum interest in real life.
            </div>
          )}
        </div>
      )}

      {tab==='emi' && (
        <div style={{display:'flex',flexDirection:'column',gap:'14px'}} className="fu">
          <div className="v0-card">
            <div className="section-hdr"><div className="section-ttl">🧮 EMI Calculator</div></div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <div><label className="inp-label">Loan Amount (₹)</label><input className="inp" type="number" placeholder="e.g. 50000" value={emiP} onChange={e=>setEmiP(e.target.value)}/></div>
              <div><label className="inp-label">Annual Interest Rate (%)</label><input className="inp" type="number" placeholder="e.g. 12" value={emiR} onChange={e=>setEmiR(e.target.value)}/></div>
              <div><label className="inp-label">Tenure (months)</label><input className="inp" type="number" placeholder="e.g. 24" value={emiN} onChange={e=>setEmiN(e.target.value)}/></div>
              <button className="v0-btn v0-btn-primary" onClick={calcEMI}>Calculate EMI →</button>
            </div>
            {emiRes && (
              <div style={{background:'var(--bg2)',borderRadius:'10px',padding:'16px',marginTop:'14px',textAlign:'center',animation:'fadeUp .3s ease'}}>
                <div style={{fontSize:'.7rem',color:'var(--text3)',fontFamily:'var(--mono)',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'4px'}}>Monthly EMI</div>
                <div style={{fontFamily:'var(--mono)',fontSize:'2.2rem',fontWeight:700,color:'var(--neon)'}}>{inr(emiRes.emi)}</div>
                <div style={{display:'flex',justifyContent:'center',gap:'16px',marginTop:'12px',flexWrap:'wrap'}}>
                  <div><div style={{fontSize:'.7rem',color:'var(--text3)',fontFamily:'var(--mono)'}}>TOTAL INTEREST</div><div style={{fontFamily:'var(--mono)',color:'var(--red)',fontWeight:700}}>{inr(emiRes.interest)}</div></div>
                  <div><div style={{fontSize:'.7rem',color:'var(--text3)',fontFamily:'var(--mono)'}}>TOTAL PAYABLE</div><div style={{fontFamily:'var(--mono)',color:'var(--blue)',fontWeight:700}}>{inr(emiRes.total)}</div></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LEARN ───────────────────────────────────────────────────────────────────
function Learn({ user, onOpen }) {
  const totalXp  = LESSONS.reduce((s,l)=>s+l.xp,0);
  const earnedXp = LESSONS.filter(l=>user.completedLessons.includes(l.id)).reduce((s,l)=>s+l.xp,0);
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
      <div className="v0-card v0-card-neon fu" style={{background:'linear-gradient(135deg,rgba(0,255,136,.05),rgba(56,182,255,.03))'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
          <div>
            <h2 style={{fontSize:'1.05rem',fontWeight:800,marginBottom:'3px'}}>🎓 Financial Literacy</h2>
            <p style={{fontSize:'.76rem',color:'var(--text2)'}}>Real money knowledge. Zero fluff. Built for Indian students.</p>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:'var(--mono)',fontSize:'1.4rem',fontWeight:700,color:'var(--gold)'}}>{earnedXp} / {totalXp}</div>
            <div style={{fontSize:'.66rem',color:'var(--text3)',fontFamily:'var(--mono)'}}>XP EARNED</div>
          </div>
        </div>
        <div style={{marginTop:'11px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'.7rem',color:'var(--text3)',marginBottom:'4px',fontFamily:'var(--mono)'}}>
            <span>{user.completedLessons.length}/{LESSONS.length} completed</span>
            <span>{Math.round(earnedXp/totalXp*100)}%</span>
          </div>
          <div style={{height:'5px',background:'var(--border)',borderRadius:'3px',overflow:'hidden'}}>
            <div style={{height:'100%',width:`${earnedXp/totalXp*100}%`,background:'linear-gradient(90deg,var(--neon),var(--blue))',borderRadius:'3px',transition:'width 1s ease'}}/>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {LESSONS.map((l,i)=>{
          const done = user.completedLessons.includes(l.id);
          return (
            <div key={l.id} className={`v0-card fu${Math.min(i+1,5)} ${done?'done':''}`} onClick={()=>onOpen(l)}>
              <div className="lc-top">
                <span className="lc-ico">{l.icon}</span>
                <div><div className="lc-ttl">{l.title}</div><div className="lc-sub">{l.sub}</div></div>
              </div>
              <div className="lc-prog"><div className="lc-fill" style={{width:done?'100%':'0%'}}/></div>
              <div className="lc-bot">
                <div>{l.tags.map(t=><span key={t} className="tag">{t}</span>)}</div>
                <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
                  {done && <span style={{color:'var(--neon)',fontSize:'.8rem'}}>✅</span>}
                  <span className="xp-badge">+{l.xp} XP</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="v0-card" style={{background:'var(--bg2)',fontSize:'.8rem',color:'var(--text2)',textAlign:'center'}}>
        <p>💬 <strong style={{color:'var(--text)'}}>Remember:</strong> The goal isn't to get rich quick — it's to understand how money works so it can work <em>for</em> you. Every rupee you learn to manage here builds a skill that transfers directly to real life.</p>
      </div>
    </div>
  );
}

// ─── ACCOUNT SWITCHER ────────────────────────────────────────────────────────
function AccountSwitcher({ user, totalValue, getAllAccounts, onSwitch, onNew, onReset }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const accounts = getAllAccounts();

  return (
    <div className="acct-wrap" ref={ref}>
      <div className="user-chip" onClick={() => setOpen(o => !o)}>
        <div className="u-avatar">{user.name[0]}</div>
        <span style={{fontFamily:'var(--mono)',fontSize:'.73rem'}}>@{user.handle}</span>
        <span style={{color:'var(--neon)',fontFamily:'var(--mono)',fontSize:'.76rem'}}>{inrS(totalValue)}</span>
        <span style={{color:'var(--text3)',fontSize:'.7rem',marginLeft:'2px'}}>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div className="acct-dropdown">
          <div style={{fontSize:'.65rem',color:'var(--text3)',fontFamily:'var(--mono)',textTransform:'uppercase',letterSpacing:'.08em',padding:'4px 10px 6px'}}>Accounts</div>
          {accounts.map(acct => (
            <div key={acct.handle} className={`acct-item ${acct.handle === user.handle ? 'active-acct' : ''}`}
              onClick={() => { if (acct.handle !== user.handle) { onSwitch(acct.handle); setOpen(false); } }}>
              <div className="acct-av">{acct.name[0]}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:'.82rem',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{acct.name}</div>
                <div style={{fontSize:'.68rem',color:'var(--text3)',fontFamily:'var(--mono)'}}>@{acct.handle} · ₹{Math.round(acct.cash).toLocaleString('en-IN')} · Lv.{acct.level}</div>
              </div>
              {acct.handle === user.handle && <span style={{fontSize:'.7rem',color:'var(--neon)'}}>●</span>}
            </div>
          ))}

          <div className="acct-divider"/>

          <div className="acct-item new-acct" onClick={() => { onNew(); setOpen(false); }}>
            <div style={{width:28,height:28,borderRadius:'50%',border:'2px dashed var(--neon)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',flexShrink:0}}>+</div>
            <div>
              <div style={{fontWeight:700}}>Create New Account</div>
              <div style={{fontSize:'.68rem',color:'var(--text3)',fontFamily:'var(--mono)'}}>Your current account stays saved</div>
            </div>
          </div>

          <div className="acct-divider"/>

          <div className="acct-item danger" onClick={() => { onReset(); }}>
            <div style={{width:28,height:28,borderRadius:'50%',background:'var(--red-dim)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.9rem',flexShrink:0}}>🗑️</div>
            <div>
              <div style={{fontWeight:700}}>Delete This Account</div>
              <div style={{fontSize:'.68rem',color:'var(--text3)',fontFamily:'var(--mono)'}}>Permanently removes @{user.handle}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SUPABASE CONFIG ─────────────────────────────────────────────────────────
// 🔧 Replace these two values with your own.
// Find them at: supabase.com → your project → Project Settings → API
const SUPABASE_URL  = 'https://baltojlbsiqofmtjaier.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbHRvamxic2lxb2ZtdGphaWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MzkzOTIsImV4cCI6MjA4OTQxNTM5Mn0.fUbhvQWXM4ND-ozJ4xhOpz415WLQevan1xMwgY_gI68';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// ─── HELPERS: convert DB row (snake_case) ↔ app object (camelCase) ───────────
function dbToUser(row) {
  return {
    id:               row.id,
    name:             row.name,
    handle:           row.handle,
    cash:             row.cash,
    startMoney:       row.start_money,
    portfolio:        row.portfolio        || {},
    transactions:     row.transactions     || [],
    creditScore:      row.credit_score,
    debtCards:        row.debt_cards       || [],
    creditHistory:    row.credit_history   || [],
    xp:               row.xp,
    level:            row.level,
    completedLessons: row.completed_lessons|| [],
    goals:            row.goals            || [],
    createdAt:        row.created_at,
  };
}

function userToDb(user) {
  return {
    cash:              user.cash,
    start_money:       user.startMoney,
    portfolio:         user.portfolio,
    transactions:      user.transactions,
    credit_score:      user.creditScore,
    debt_cards:        user.debtCards,
    credit_history:    user.creditHistory,
    xp:                user.xp,
    level:             user.level,
    completed_lessons: user.completedLessons,
    goals:             user.goals,
  };
}

// ─── AUTH SCREEN ──────────────────────────────────────────────────────────────
// Shown to any visitor who is not logged in.
// Handles Sign Up and Log In with email + password.
function AuthScreen({ onAuth }) {
  const [mode,     setMode]     = useState('login');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [name,     setName]     = useState('');
  const [loading,  setLoading]  = useState(false);
  const [err,      setErr]      = useState('');
  const [ok,       setOk]       = useState('');

  const reset = (m) => { setMode(m); setErr(''); setOk(''); };

  const submit = async () => {
    setErr(''); setOk('');
    if (!email.trim() || !password.trim()) { setErr('Please fill in all fields.'); return; }
    if (mode === 'signup' && !name.trim())  { setErr('Please enter your name.');    return; }
    if (password.length < 6)               { setErr('Password must be at least 6 characters.'); return; }
    setLoading(true);

    try {
      if (mode === 'signup') {
        // 1. Create the auth account
        const { data, error } = await sb.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { display_name: name.trim() } },
        });
        if (error) throw error;

        // 2. Create the game profile row in the profiles table
        if (data.user) {
          const handle = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
          await sb.from('profiles').upsert({
            id:               data.user.id,
            name:             name.trim(),
            handle,
            cash:             10000,
            start_money:      10000,
            portfolio:        {},
            transactions:     [],
            credit_score:     640 + Math.floor(Math.random() * 80),
            debt_cards:       [],
            credit_history:   [],
            xp:               0,
            level:            1,
            completed_lessons:[],
            goals:            [],
            created_at:       new Date().toISOString(),
          });
          setOk('✅ Account created! Check your email to verify, then log in.');
        }

      } else {
        // Log in
        const { data, error } = await sb.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        if (data.user) onAuth(data.user);
      }
    } catch (e) {
      setErr(e.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-box fu">

        {/* Hero */}
        <div className="ob-hero" style={{marginBottom:20}}>
          <div style={{fontSize:'2.2rem',marginBottom:'6px'}}>🪙</div>
          <h1 style={{fontSize:'2rem',fontWeight:800,lineHeight:1.1}}>
            Broke<span style={{color:'var(--neon)'}}>But</span><span style={{color:'var(--gold)'}}>Smart</span>
          </h1>
          <p style={{color:'var(--text2)',fontSize:'.82rem',marginTop:6}}>
            {mode === 'login'
              ? 'Welcome back! Log in to continue your journey.'
              : 'Create a free account. Your progress saves to the cloud.'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="auth-tabs">
          <button className={`auth-tab ${mode==='login' ?'active':''}`} onClick={()=>reset('login')}>Log In</button>
          <button className={`auth-tab ${mode==='signup'?'active':''}`} onClick={()=>reset('signup')}>Sign Up</button>
        </div>

        {/* Form */}
        <div className="form-stack">
          {mode === 'signup' && (
            <div>
              <label className="inp-label">Your Name</label>
              <input className="inp" placeholder="e.g. Rahul Sharma"
                value={name} onChange={e => setName(e.target.value)}/>
            </div>
          )}
          <div>
            <label className="inp-label">Email</label>
            <input className="inp" type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div>
            <label className="inp-label">Password</label>
            <input className="inp" type="password" placeholder="Min. 6 characters"
              value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}/>
          </div>

          {err && <div className="auth-err">⚠ {err}</div>}
          {ok  && <div className="auth-ok">{ok}</div>}

          <button className="v0-btn v0-btn-primary v0-btn-lg" onClick={submit} disabled={loading}>
            {loading ? '⏳ Please wait…' : mode === 'login' ? 'Log In →' : 'Create Account →'}
          </button>

          <p style={{textAlign:'center',fontSize:'.72rem',color:'var(--text3)',fontFamily:'var(--mono)'}}>
            {mode === 'login'
              ? <>No account? <span style={{color:'var(--neon)',cursor:'pointer'}} onClick={()=>reset('signup')}>Sign up free →</span></>
              : <>Already have one? <span style={{color:'var(--neon)',cursor:'pointer'}} onClick={()=>reset('login')}>Log in →</span></>}
          </p>
        </div>

      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function App() {
  // authUser = undefined means "still checking session" (show spinner)
  // authUser = null means "not logged in" (show AuthScreen)
  // authUser = object means "logged in" (show game)
  const [authUser,      setAuthUser]      = useState(undefined);
  const [user,          setUser]          = useState(null);   // game profile
  const [tab,           setTab]           = useState('dashboard');
  const [prices,        setPrices]        = useState(() => Object.fromEntries(ALL_ASSETS.map(a=>[a.id,a.price])));
  const [prevPrices,    setPrevPrices]    = useState(() => Object.fromEntries(ALL_ASSETS.map(a=>[a.id,a.price])));
  const [sparklines,    setSparklines]    = useState(() => Object.fromEntries(ALL_ASSETS.map(a=>[a.id,genSpark(a.price)])));
  const [tradeAsset,    setTradeAsset]    = useState(null);
  const [activeLesson,  setActiveLesson]  = useState(null);
  const [toast,         setToast]         = useState(null);
  const saveTimer = useRef(null);

  // ── Step 1: On page load, check if a Supabase session already exists
  // (this handles users who refreshed the page — they stay logged in)
  useEffect(() => {
    // Safety timeout: if Supabase doesn't respond in 4s, fall back to login screen
    const timeout = setTimeout(() => setAuthUser(null), 4000);

    sb.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(timeout);
      setAuthUser(session?.user ?? null);
    }).catch(() => {
      clearTimeout(timeout);
      setAuthUser(null);
    });

    // Also listen for login / logout events (e.g. after signUp confirmation)
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
    });
    return () => { subscription.unsubscribe(); clearTimeout(timeout); };
  }, []);

  // ── Step 2: Once we know who is logged in, load their game profile from DB
  useEffect(() => {
    if (!authUser) { setUser(null); return; }

    sb.from('profiles').select('*').eq('id', authUser.id).single()
      .then(({ data, error }) => {
        if (error || !data) {
  // New user — show onboarding instead of auto-creating profile
  setUser('onboarding');
}
        else {
          setUser(dbToUser(data));
        }
      });
  }, [authUser]);

  // ── Step 3: Auto-save game state to Supabase 1.5s after any change
  // Debounced so we don't hammer the DB on every keypress / price tick
  useEffect(() => {
    if (!user || !authUser || typeof user !== 'object') return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      sb.from('profiles').update(userToDb(user)).eq('id', authUser.id);
    }, 1500);
    return () => clearTimeout(saveTimer.current);
  }, [user]);

  // ── Market price simulation (runs every 3s, same as before)
  useEffect(() => {
    const iv = setInterval(() => {
      setPrevPrices(p => ({...p}));
      setPrices(prev => {
        const next = {};
        ALL_ASSETS.forEach(a => { next[a.id] = simPrice(prev[a.id]||a.price, a.vol); });
        return next;
      });
      setSparklines(prev => {
        const next = {};
        ALL_ASSETS.forEach(a => { const old=prev[a.id]||[]; next[a.id]=[...old.slice(-11), prices[a.id]||a.price]; });
        return next;
      });
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  // ── Sign out
  const signOut = useCallback(async () => {
    await sb.auth.signOut();
    setUser(null);
  }, []);

  // ── Reset game progress (keeps the account, wipes game data)
  const resetAccount = useCallback(async () => {
    if (!window.confirm('Reset your account? All portfolio, XP and progress will be lost.')) return;
    const fresh = {
      cash:              10000,
      start_money:       10000,
      portfolio:         {},
      transactions:      [],
      credit_score:      640 + Math.floor(Math.random()*80),
      debt_cards:        [],
      credit_history:    [],
      xp:                0,
      level:             1,
      completed_lessons: [],
      goals:             [],
    };
    await sb.from('profiles').update(fresh).eq('id', authUser.id);
    setUser(u => dbToUser({...u, ...fresh}));
    showToast('Account reset!', 'info');
  }, [authUser]);


  //---deleting account------------------------------------

  const deleteAccount = useCallback(async () => {
  if (!window.confirm('Permanently delete your account? This CANNOT be undone. All your data will be lost forever.')) return;
  try {
    // 1. Delete profile row from database
    await sb.from('profiles').delete().eq('id', authUser.id);
    // 2. Delete the auth user via SQL function
    await sb.rpc('delete_user');
    // 3. Sign out locally and clear state
    await sb.auth.signOut();
    setUser(null);
    setAuthUser(null);
  } catch(e) {
    showToast('Error deleting account. Please try again.', 'error');
  }
}, [authUser]);

  // ── Stub out account-switcher callbacks (not needed with real auth — one account per login)
  const getAllAccounts  = useCallback(() => user ? [user] : [], [user]);
  const switchToAccount = useCallback(() => {}, []);
  const addNewAccount   = useCallback(() => {}, []);

  const showToast = useCallback((msg, type='success') => {
    setToast({ msg, type, id: Date.now() });
  }, []);

  // ── Trade handler
  const handleTrade = useCallback((mode, asset, qty, price) => {
    setUser(u => {
      const cost = +(qty*price).toFixed(2);
      const cur  = u.portfolio[asset.id]||{shares:0,avgPrice:0};
      let newPf  = {...u.portfolio}, newCash = u.cash;
      if (mode==='buy') {
        if (cost>u.cash) return u;
        newCash = +(u.cash-cost).toFixed(2);
        const ts = cur.shares+qty, tc = cur.shares*cur.avgPrice+cost;
        newPf[asset.id] = {shares:ts, avgPrice:+(tc/ts).toFixed(2)};
      } else {
        if (qty>cur.shares) return u;
        newCash = +(u.cash+cost).toFixed(2);
        const rem = cur.shares-qty;
        if (rem===0) { const {[asset.id]:_,...rest}=newPf; newPf=rest; }
        else newPf[asset.id]={...cur,shares:rem};
      }
      const tx = {id:Date.now(),mode,assetId:asset.id,assetName:asset.name,qty,price,total:cost,time:Date.now()};
      return {...u,cash:newCash,portfolio:newPf,transactions:[tx,...u.transactions].slice(0,60)};
    });
    setTradeAsset(null);
    showToast(`${mode==='buy'?'Bought':'Sold'} ${qty} share${qty!==1?'s':''} of ${asset.id} at ${inr(price)}!`, mode==='buy'?'success':'info');
  }, []);

  const completeLesson = useCallback((lesson) => {
    setUser(u => {
      if (u.completedLessons.includes(lesson.id)) return u;
      const newXp = u.xp+lesson.xp, newLv = Math.floor(newXp/200)+1;
      return {...u,xp:newXp,level:newLv,completedLessons:[...u.completedLessons,lesson.id]};
    });
    setActiveLesson(null);
    showToast(`+${lesson.xp} XP! "${lesson.title}" completed 🎉`,'success');
  }, []);

  const takeLoan = useCallback((amount, name, interest, type) => {
    setUser(u => {
      let scoreChange = 0;
      if (type==='payment') scoreChange = +12;
      else if (type==='miss') scoreChange = -42;
      else if (type==='util') scoreChange = -15;
      else scoreChange = -8;
      const newScore = clamp(u.creditScore+scoreChange,300,900);
      if (amount===0) return {...u,creditScore:newScore};
      return {
        ...u,
        cash: +(u.cash+amount).toFixed(2),
        debtCards: [...u.debtCards,{id:Date.now(),name,balance:amount,original:amount,interest,minPayment:+(amount*.03).toFixed(2)}],
        creditHistory: [...u.creditHistory,{type:'loan',amount,time:Date.now()}],
        creditScore: newScore,
      };
    });
    if (amount>0) showToast(`Loan of ₹${amount.toLocaleString('en-IN')} added. Now practice repaying it.`,'success');
  }, []);

  const makePayment = useCallback((debtId, payAmount) => {
    setUser(u => {
      if (u.cash<payAmount) { showToast('Not enough cash!','error'); return u; }
      const newDebts = u.debtCards.map(d=>d.id!==debtId?d:{...d,balance:Math.max(0,+(d.balance-payAmount).toFixed(2))}).filter(d=>d.balance>0);
      const boost = Math.min(18,Math.floor(payAmount/30));
      return {...u,cash:+(u.cash-payAmount).toFixed(2),debtCards:newDebts,creditScore:clamp(u.creditScore+boost,300,900),creditHistory:[...u.creditHistory,{type:'payment',amount:payAmount,time:Date.now()}]};
    });
    showToast('Payment made! CIBIL score improving 📈','success');
  }, []);

  const portfolioValue = useMemo(() =>
  user && typeof user === 'object' ? Object.entries(user.portfolio).reduce((s,[id,p])=>s+(prices[id]||0)*p.shares,0) : 0
,[user,prices]);

const totalValue = user && typeof user === 'object' ? +(user.cash+portfolioValue).toFixed(2) : 0;
const pnl        = user && typeof user === 'object' ? +(totalValue-user.startMoney).toFixed(2) : 0;
const pnlPct     = user && typeof user === 'object' ? pct(user.startMoney,totalValue) : '0.00';

  // ── Render: loading spinner while session check runs
  if (authUser === undefined) return (
    <div className="auth-loading" style={{background:'#080c0f',height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'14px'}}>
      <div className="spinner"/>
      <span style={{fontFamily:'monospace',color:'#00ff88',fontSize:'.85rem'}}>Loading BrokeButSmart…</span>
    </div>
  );

  // ── Render: not logged in → show auth screen
  if (!authUser) return (
    <div style={{height:'100vh',overflow:'hidden',position:'relative',zIndex:1}}>
      <AuthScreen onAuth={setAuthUser}/>
      {toast && <Toast key={toast.id} msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
    </div>
  );

  // ── Render: logged in but profile still loading from DB
  if (!user) return (
    <div className="auth-loading">
      <div className="spinner"/>
      <span>Loading your profile…</span>
    </div>
  );

// ── Render: new user — show onboarding to pick starting balance
if (user === 'onboarding') return (
  <Onboarding onComplete={async (profile) => {
    const handle = authUser.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g,'');
    const fresh = {
      id:                authUser.id,
      name:              profile.name || authUser.user_metadata?.full_name || handle,
      handle:            profile.handle || handle,
      cash:              profile.cash,
      start_money:       profile.cash,
      portfolio:         {},
      transactions:      [],
      credit_score:      profile.creditScore,
      debt_cards:        [],
      credit_history:    [],
      xp:                0,
      level:             1,
      completed_lessons: [],
      goals:             profile.goals || [],
      created_at:        new Date().toISOString(),
    };
    await sb.from('profiles').upsert(fresh);
    setUser(dbToUser(fresh));
  }}/>
);

  const TABS = [
    {id:'dashboard',label:'Dashboard',icon:'📊'},
    {id:'market',   label:'Market',   icon:'📈'},
    {id:'portfolio',label:'Portfolio',icon:'💼'},
    {id:'credit',   label:'Credit',   icon:'💳'},
    {id:'learn',    label:'Learn',    icon:'🎓'},
  ];

  const xpPct    = ((user.xp%200)/200)*100;
  const xpToNext = (user.level*200)-user.xp;

  return (
    <div className="app-shell">

      {/* ── TOP BAR (v0.dev shadcn/ui Navbar) ── */}
      <header className="top-bar" style={{flexDirection:'column',alignItems:'stretch',gap:0,padding:0}}>
        {/* Row 1: logo + user controls */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 20px',borderBottom:'1px solid var(--border)'}}>
          {/* Logo — tricolor BrokeButSmart */}
          <div className="logo">
            <div className="logo-dot"/>
            <span style={{fontFamily:'var(--sans)',fontWeight:800,fontSize:'1.15rem'}}>
              <span style={{color:'var(--text)'}}>Broke</span><span style={{color:'var(--neon)'}}>But</span><span style={{color:'var(--gold)'}}>Smart</span>
            </span>
          </div>
          {/* Right side: account switcher + avatar chip + sign out */}
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <AccountSwitcher
              user={user}
              totalValue={totalValue}
              getAllAccounts={getAllAccounts}
              onSwitch={switchToAccount}
              onNew={addNewAccount}
              onReset={deleteAccount}
            />
            <div className="v0-avatar" title={user.name}>{(user.name||'U')[0].toUpperCase()}</div>
            <button className="signout-btn" onClick={signOut} title="Sign out">⏻ Sign Out</button>
          </div>
        </div>
        {/* Row 2: Nav tabs (shadcn Tabs style) */}
        <nav style={{display:'flex',gap:'3px',padding:'8px 16px',background:'var(--bg2)'}}>
          {TABS.map(t=>(
            <button
              key={t.id}
              onClick={()=>setTab(t.id)}
              className={`nav-btn ${tab===t.id?'active':''}`}
              style={tab===t.id ? {background:'var(--neon-dim)',color:'var(--neon)',borderRadius:'8px',boxShadow:'0 0 12px rgba(0,255,136,.2)'} : {}}
            >
              <span>{t.icon}</span> <span className="lbl">{t.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* ── TICKER (v0.dev Ticker component) ── */}
      <div className="ticker-wrap" style={{borderBottom:'1px solid var(--border)',background:'rgba(13,19,24,.8)',backdropFilter:'blur(8px)'}}>
        <div className="ticker-inner">
          {[...ALL_ASSETS,...ALL_ASSETS].map((a,i)=>{
            const p=prices[a.id]||a.price, up=p>=a.price, chg=pct(a.price,p);
            return (
              <div key={i} className="ticker-item">
                <span style={{color:'var(--neon)',fontWeight:700,fontSize:'.72rem'}}>{a.id}</span>
                <span style={{color:'var(--text)',fontWeight:700,fontFamily:'var(--mono)'}}>₹{p.toLocaleString('en-IN',{minimumFractionDigits:0})}</span>
                <span className={`v0-badge ${up?'v0-badge-green':'v0-badge-red'}`} style={{padding:'1px 7px',fontSize:'.65rem'}}>
                  {up?'▲':'▼'}{Math.abs(chg)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MAIN CONTENT (v0.dev page layout) ── */}
      <div className="content-wrap">
        <div className="tab-panel" key={tab}>
          {tab==='dashboard' && <Dashboard user={user} prices={prices} portfolioValue={portfolioValue} totalValue={totalValue} pnl={pnl} pnlPct={pnlPct} sparklines={sparklines} setTab={setTab} resetAccount={resetAccount}/>}
          {tab==='market'    && <Market    user={user} prices={prices} prevPrices={prevPrices} sparklines={sparklines} onTrade={setTradeAsset}/>}
          {tab==='portfolio' && <Portfolio user={user} prices={prices} portfolioValue={portfolioValue} totalValue={totalValue} pnl={pnl} pnlPct={pnlPct}/>}
          {tab==='credit'    && <CreditModule user={user} takeLoan={takeLoan} makePayment={makePayment} showToast={showToast}/>}
          {tab==='learn'     && <Learn user={user} onOpen={setActiveLesson}/>}
        </div>
      </div>

      {/* ── XP FOOTER (v0.dev XPFooter component) ── */}
      <footer className="xp-footer" style={{backdropFilter:'blur(12px)',background:'rgba(8,12,15,.92)'}}>
        <div className="v0-badge v0-badge-green" style={{padding:'3px 10px',fontSize:'.7rem'}}>Lv.{user.level}</div>
        <div className="xp-track" style={{flex:1}}>
          <div className="xp-fill" style={{width:`${xpPct}%`}}/>
        </div>
        <span style={{fontFamily:'var(--mono)',fontSize:'.68rem',color:'var(--text3)',whiteSpace:'nowrap'}}>{xpToNext} XP to next</span>
        <span style={{fontFamily:'var(--mono)',fontSize:'.7rem',color:'var(--gold)',whiteSpace:'nowrap'}}>✨ {user.xp} XP</span>
        <a href="https://v0.dev" target="_blank" rel="noopener" style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:'5px',textDecoration:'none',opacity:.55,transition:'opacity .2s'}} onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=.55}>
          <span style={{fontFamily:'var(--mono)',fontSize:'.6rem',color:'var(--text3)',letterSpacing:'.05em'}}>UI built with</span>
          <span style={{fontFamily:'var(--sans)',fontSize:'.68rem',fontWeight:800,color:'var(--neon)',letterSpacing:'.03em'}}>v0.dev</span>
        </a>
      </footer>

      {/* ── MODALS ── */}
      {tradeAsset   && <TradeModal asset={tradeAsset} prices={prices} user={user} onTrade={handleTrade} onClose={()=>setTradeAsset(null)}/>}
      {activeLesson && <LessonModal lesson={activeLesson} done={user.completedLessons.includes(activeLesson.id)} onComplete={()=>completeLesson(activeLesson)} onClose={()=>setActiveLesson(null)}/>}
      {toast        && <Toast key={toast.id} msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
