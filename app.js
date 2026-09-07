const { createClient } = supabase;
const sb = createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);

let state = {
  loaded:false,
  session:null,
  workspace:null,      // {id, business_name, logo_url}
  customers:[],
  transactions:[],
  view:'dashboard',
  selectedId:null,
  gateTab:'login',      // 'login' | 'activate'
  showAddCustomer:false,
  showAddTx:false,
  showSettings:false,
  showResetConfirm:false,
  txType:'sale',
  toastMsg:null,
  gateError:'',
  gateBusy:false,
  settingsError:'',
  settingsBusy:false,
};

function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
function bn(n){ return Number(n||0).toLocaleString('bn-BD'); }
function bnDate(d){ return new Date(d).toLocaleDateString('bn-BD',{day:'numeric',month:'short',year:'numeric'}); }
function escapeHtml(s){ return String(s==null?'':s).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function phoneToEmail(phone){ return phone.replace(/[^0-9]/g,'') + '@hisabkhata.app'; }

async function boot(){
  const { data:{ session } } = await sb.auth.getSession();
  state.session = session;
  if(session){ await loadWorkspaceAndData(); }
  state.loaded = true;
  render();
}

async function loadWorkspaceAndData(){
  const { data: ws, error: wsErr } = await sb.from('workspaces').select('*').single();
  if(wsErr || !ws){ await sb.auth.signOut(); state.session=null; state.workspace=null; return; }
  state.workspace = ws;
  const { data: custs } = await sb.from('customers').select('*').order('created_at', {ascending:true});
  state.customers = custs || [];
  const { data: txs } = await sb.from('transactions').select('*').order('tx_date', {ascending:false});
  state.transactions = txs || [];
}

function custDue(id){ return state.transactions.filter(t=>t.customer_id===id).reduce((s,t)=> s+(t.type==='sale'?Number(t.amount):-Number(t.amount)),0); }
function totals(){
  const totalSale = state.transactions.filter(t=>t.type==='sale').reduce((s,t)=>s+Number(t.amount),0);
  const totalPaid = state.transactions.filter(t=>t.type==='payment').reduce((s,t)=>s+Number(t.amount),0);
  return { totalSale, totalPaid, totalDue: totalSale-totalPaid, custCount: state.customers.length };
}
function showToast(msg){ state.toastMsg = msg; render(); setTimeout(()=>{ state.toastMsg=null; render(); }, 2600); }
function setView(v){ state.view=v; state.selectedId=null; render(); }
function openDetail(id){ state.view='detail'; state.selectedId=id; render(); }

async function addCustomer(name, phone, address){
  const { error } = await sb.from('customers').insert({ workspace_id: state.workspace.id, name, phone, address });
  if(error){ showToast('সমস্যা হয়েছে: '+error.message); return; }
  const { data: custs } = await sb.from('customers').select('*').order('created_at', {ascending:true});
  state.customers = custs || [];
  state.showAddCustomer=false; showToast('নতুন গ্রাহক যোগ করা হয়েছে');
}

async function addTransaction(customerId, type, amount, note){
  const { error } = await sb.from('transactions').insert({ workspace_id: state.workspace.id, customer_id: customerId, type, amount, note });
  if(error){ showToast('সমস্যা হয়েছে: '+error.message); return; }
  const { data: txs } = await sb.from('transactions').select('*').order('tx_date', {ascending:false});
  state.transactions = txs || [];
  state.showAddTx=false; showToast(type==='sale' ? 'বিক্রি যোগ করা হয়েছে' : 'পরিশোধ যোগ করা হয়েছে');
}

function waLink(cust, amount){
  const msg = `প্রিয় ${cust.name}, আপনার কাছে ${state.workspace.business_name || 'আমাদের'} এর ${bn(amount)}৳ বাকি আছে। সুবিধামতো পরিশোধ করলে কৃতজ্ঞ থাকব। ধন্যবাদ।`;
  const digits=(cust.phone||'').replace(/[^0-9]/g,'');
  let intl=digits;
  if(intl.startsWith('0')) intl='88'+intl; else if(!intl.startsWith('880')) intl='880'+intl;
  return `https://wa.me/${intl}?text=${encodeURIComponent(msg)}`;
}
function smsLink(cust, amount){
  const msg = `প্রিয় ${cust.name}, আপনার কাছে ${state.workspace.business_name || 'আমাদের'} এর ${bn(amount)}৳ বাকি আছে। ধন্যবাদ।`;
  return `sms:${cust.phone||''}?body=${encodeURIComponent(msg)}`;
}

function render(){
  const root = document.getElementById('root');
  if(!state.loaded){
    root.innerHTML = `<div style="padding:40px;text-align:center;color:var(--ink-soft);">লোড হচ্ছে…</div>`;
    return;
  }
  if(!state.session || !state.workspace){ root.innerHTML = renderGate(); attachGateEvents(); return; }

  const t = totals();
  const logoHtml = state.workspace.logo_url
    ? `<img src="${state.workspace.logo_url}" alt="লোগো" style="width:34px;height:34px;border-radius:6px;object-fit:cover;">`
    : `<div style="width:34px;height:34px;border-radius:6px;background:rgba(244,239,226,.15);"></div>`;

  let html = `
    <header class="cover">
      <div class="cover-top">
        <div class="cover-title-wrap">
          ${logoHtml}
          <div>
            <h1 class="cover-title">${escapeHtml(state.workspace.business_name || 'হিসাব খাতা')}</h1>
          </div>
        </div>
        <button class="gear-btn" id="gearBtn" title="সেটিংস">⚙</button>
      </div>
      <p class="cover-sub">গ্রাহক, বিক্রি ও বাকির হিসাব — এক জায়গায়</p>
    </header>
    <nav class="tabs">
      <button data-tab="dashboard" class="${state.view==='dashboard'?'active':''}">ড্যাশবোর্ড</button>
      <button data-tab="customers" class="${state.view==='customers'||state.view==='detail'?'active':''}">গ্রাহক তালিকা</button>
    </nav>
    <main>
  `;
  if(state.view==='dashboard') html += renderDashboard(t);
  else if(state.view==='customers') html += renderCustomers();
  else if(state.view==='detail') html += renderDetail();
  html += `</main>`;

  if(state.showAddCustomer) html += renderAddCustomerSheet();
  if(state.showAddTx) html += renderAddTxSheet();
  if(state.showSettings) html += renderSettingsSheet();
  if(state.showResetConfirm) html += renderResetConfirm();
  if(state.toastMsg) html += `<div class="toast">${escapeHtml(state.toastMsg)}</div>`;

  root.innerHTML = html;
  attachEvents();
}

function renderGate(){
  const isLogin = state.gateTab==='login';
  return `
  <div class="gate-screen">
    <div class="gate-card">
      <h2 class="gate-title">হিসাব খাতা</h2>
      <div class="seg" style="margin-bottom:16px;">
        <button data-gatetab="login" class="${isLogin?'on':''}">লগইন করুন</button>
        <button data-gatetab="activate" class="${!isLogin?'on':''}">নতুন? কোড দিয়ে শুরু করুন</button>
      </div>
      ${isLogin ? `
        <div class="field"><label>মোবাইল নম্বর</label><input id="loginPhone" placeholder="01XXXXXXXXX" inputmode="numeric"></div>
        <div class="field"><label>পাসওয়ার্ড</label><input id="loginPass" type="password" placeholder="পাসওয়ার্ড"></div>
      ` : `
        <div class="field"><label>অ্যাক্টিভেশন কোড</label><input id="actCode" placeholder="যেমন: HK-7X92K"></div>
        <div class="field"><label>আপনার মোবাইল নম্বর</label><input id="actPhone" placeholder="01XXXXXXXXX" inputmode="numeric"></div>
        <div class="field"><label>একটা পাসওয়ার্ড সেট করুন</label><input id="actPass" type="password" placeholder="ন্যূনতম ৬ অক্ষর"></div>
      `}
      ${state.gateError?`<div class="field err">${escapeHtml(state.gateError)}</div>`:''}
      <button class="primary" id="gateSubmit" style="width:100%; margin-top:8px;" ${state.gateBusy?'disabled':''}>
        ${state.gateBusy ? 'অপেক্ষা করুন…' : (isLogin ? 'প্রবেশ করুন' : 'অ্যাক্টিভেট করুন')}
      </button>
    </div>
  </div>`;
}

function attachGateEvents(){
  document.querySelectorAll('[data-gatetab]').forEach(b=>{
    b.addEventListener('click', ()=>{ state.gateTab=b.dataset.gatetab; state.gateError=''; render(); });
  });
  const submit = document.getElementById('gateSubmit');
  if(!submit) return;
  submit.addEventListener('click', async ()=>{
    state.gateError=''; state.gateBusy=true; render();
    try{
      if(state.gateTab==='login'){
        const phone = document.getElementById('loginPhone').value.trim();
        const pass = document.getElementById('loginPass').value;
        if(!phone || !pass) throw new Error('মোবাইল নম্বর ও পাসওয়ার্ড দিন।');
        const { data, error } = await sb.auth.signInWithPassword({ email: phoneToEmail(phone), password: pass });
        if(error) throw new Error('মোবাইল নম্বর বা পাসওয়ার্ড সঠিক নয়।');
        state.session = data.session;
        await loadWorkspaceAndData();
      } else {
        const code = document.getElementById('actCode').value.trim();
        const phone = document.getElementById('actPhone').value.trim();
        const pass = document.getElementById('actPass').value;
        if(!code || !phone || !pass) throw new Error('সব ঘর পূরণ করুন।');
        if(pass.length<6) throw new Error('পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।');
        const { data: valid } = await sb.rpc('check_activation_code', { p_code: code });
        if(!valid) throw new Error('কোডটি সঠিক নয় অথবা ইতিমধ্যে ব্যবহার হয়ে গেছে।');
        const { data: signUpData, error: signUpErr } = await sb.auth.signUp({ email: phoneToEmail(phone), password: pass });
        if(signUpErr) throw new Error(signUpErr.message);
        state.session = signUpData.session;
        const { error: actErr } = await sb.rpc('activate_workspace', { p_code: code, p_phone: phone });
        if(actErr) throw new Error('অ্যাক্টিভেট করা যায়নি: '+actErr.message);
        await loadWorkspaceAndData();
      }
      state.gateBusy=false; state.gateError='';
      render();
    } catch(e){
      state.gateBusy=false; state.gateError=e.message || 'একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।';
      render();
    }
  });
}

function renderDashboard(t){
  const recent = [...state.transactions].slice(0,6);
  let recentHtml = recent.length===0 ? `<div class="empty"><p>এখনো কোনো লেনদেন নেই।</p></div>` :
    recent.map(tx=>{
      const cust = state.customers.find(c=>c.id===tx.customer_id);
      return `<div class="activity-row">
        <div>
          <div class="who">${escapeHtml(cust?cust.name:'অজানা গ্রাহক')}</div>
          <div class="meta">${tx.type==='sale'?'বিক্রি':'পরিশোধ'} · ${bnDate(tx.tx_date)}${tx.note?' · '+escapeHtml(tx.note):''}</div>
        </div>
        <div class="amt ${tx.type==='sale'?'plus':'minus'}">${tx.type==='sale'?'+':'-'}${bn(tx.amount)}৳</div>
      </div>`;
    }).join('');
  return `
    <div class="stats-row">
      <div class="stat"><div class="num">${bn(t.custCount)}</div><div class="lbl">মোট গ্রাহক</div></div>
      <div class="stat paid"><div class="num">${bn(t.totalSale)}৳</div><div class="lbl">মোট বিক্রি</div></div>
      <div class="stat due"><div class="num">${bn(t.totalDue)}৳</div><div class="lbl">মোট বাকি</div></div>
    </div>
    <h2 class="section-title">সাম্প্রতিক লেনদেন</h2>
    ${recentHtml}
  `;
}

function renderCustomers(){
  let rows;
  if(state.customers.length===0){
    rows = `<div class="empty"><p>এখনো কোনো গ্রাহক যোগ করা হয়নি। নতুন গ্রাহক যোগ করে শুরু করুন।</p>
      <button class="primary" id="emptyAddCust">+ নতুন গ্রাহক</button></div>`;
  } else {
    rows = state.customers.map(c=>{
      const due = custDue(c.id);
      return `<div class="cust-row" data-open="${c.id}">
        <div><div class="cust-name">${escapeHtml(c.name)}</div><div class="cust-phone">${escapeHtml(c.phone||'')}</div></div>
        <div class="due-pill ${due>0?'has-due':'clear'}">${due>0? bn(due)+'৳ বাকি' : 'পরিশোধিত'}</div>
      </div>`;
    }).join('');
  }
  return `
    <div class="row-between">
      <h2 class="section-title" style="margin:0;">গ্রাহক তালিকা</h2>
      ${state.customers.length? '<button class="primary" id="addCustBtn">+ নতুন গ্রাহক</button>' : ''}
    </div>
    <div style="margin-top:12px;">${rows}</div>
  `;
}

function renderDetail(){
  const cust = state.customers.find(c=>c.id===state.selectedId);
  if(!cust) return `<div class="empty"><p>গ্রাহক পাওয়া যায়নি।</p></div>`;
  const due = custDue(cust.id);
  const txs = state.transactions.filter(t=>t.customer_id===cust.id);
  const totalSale = txs.filter(t=>t.type==='sale').reduce((s,t)=>s+Number(t.amount),0);
  const totalPaid = txs.filter(t=>t.type==='payment').reduce((s,t)=>s+Number(t.amount),0);
  let ledgerHtml = txs.length===0 ? `<div class="empty"><p>এই গ্রাহকের কোনো লেনদেন নেই।</p></div>` :
    txs.map(tx=>`
      <div class="activity-row" style="cursor:default;">
        <div><div class="who">${tx.type==='sale'?'বিক্রি':'পরিশোধ'}</div><div class="meta">${bnDate(tx.tx_date)}${tx.note?' · '+escapeHtml(tx.note):''}</div></div>
        <div class="amt ${tx.type==='sale'?'plus':'minus'}">${tx.type==='sale'?'+':'-'}${bn(tx.amount)}৳</div>
      </div>`).join('');
  return `
    <button class="link-back" id="backBtn">← গ্রাহক তালিকায় ফিরুন</button>
    <div class="cust-head">
      <div class="name">${escapeHtml(cust.name)}</div>
      <div class="phone">${escapeHtml(cust.phone||'ফোন নম্বর নেই')}</div>
      <div class="stats-row">
        <div class="stat"><div class="num">${bn(totalSale)}৳</div><div class="lbl">মোট বিক্রি</div></div>
        <div class="stat paid"><div class="num">${bn(totalPaid)}৳</div><div class="lbl">মোট পরিশোধ</div></div>
        <div class="stat due"><div class="num">${bn(due)}৳</div><div class="lbl">বর্তমান বাকি</div></div>
      </div>
      <div class="msg-row">
        <a class="msg-btn wa" href="${due>0?waLink(cust,due):'#'}" target="_blank" rel="noopener" ${due<=0?'style="pointer-events:none;opacity:.4;"':''}>হোয়াটসঅ্যাপে বার্তা পাঠান</a>
        <a class="msg-btn sms" href="${due>0?smsLink(cust,due):'#'}" ${due<=0?'style="pointer-events:none;opacity:.4;"':''}>এসএমএস পাঠান</a>
      </div>
    </div>
    <div class="add-btns">
      <button class="primary" id="addSaleBtn">+ নতুন বিক্রি</button>
      <button class="ghost" id="addPaymentBtn">+ পরিশোধ যোগ করুন</button>
    </div>
    <h2 class="section-title">লেনদেনের হিসাব</h2>
    ${ledgerHtml}
  `;
}

function renderAddCustomerSheet(){
  return `<div class="overlay" id="custOverlay"><div class="sheet">
    <h3>নতুন গ্রাহক</h3>
    <div class="field"><label>নাম</label><input id="custName" placeholder="যেমন: রহিম উদ্দিন"></div>
    <div class="field"><label>মোবাইল নম্বর</label><input id="custPhone" placeholder="01XXXXXXXXX" inputmode="numeric"></div>
    <div class="field"><label>ঠিকানা (ঐচ্ছিক)</label><input id="custAddr" placeholder="যেমন: মিরপুর, ঢাকা"></div>
    <div class="sheet-actions"><button class="ghost" id="cancelCust">বাতিল</button><button class="primary" id="saveCust">সংরক্ষণ করুন</button></div>
  </div></div>`;
}

function renderAddTxSheet(){
  return `<div class="overlay" id="txOverlay"><div class="sheet">
    <h3>${state.txType==='sale'?'নতুন বিক্রি যোগ করুন':'পরিশোধ যোগ করুন'}</h3>
    <div class="field"><label>ধরন</label>
      <div class="seg">
        <button data-type="sale" class="${state.txType==='sale'?'on':''}">বিক্রি (বাকি বাড়বে)</button>
        <button data-type="payment" class="${state.txType==='payment'?'on':''}">পরিশোধ (বাকি কমবে)</button>
      </div>
    </div>
    <div class="field"><label>টাকার পরিমাণ</label><input id="txAmount" type="number" inputmode="numeric" placeholder="০"></div>
    <div class="field"><label>বিবরণ (ঐচ্ছিক)</label><input id="txNote" placeholder="যেমন: ৫ কেজি চাল"></div>
    <div class="sheet-actions"><button class="ghost" id="cancelTx">বাতিল</button><button class="primary" id="saveTx">সংরক্ষণ করুন</button></div>
  </div></div>`;
}

function renderSettingsSheet(){
  return `<div class="overlay" id="settingsOverlay"><div class="sheet">
    <h3>সেটিংস</h3>
    <div class="field"><label>লোগো</label>
      <input type="file" id="logoFile" accept="image/*">
    </div>
    <div class="field"><label>ব্যবসার নাম</label><input id="setBizName" value="${escapeHtml(state.workspace.business_name||'')}"></div>
    <div class="divider"></div>
    <div class="field"><label>লগইন মোবাইল নম্বর পরিবর্তন</label><input id="setPhone" placeholder="নতুন মোবাইল নম্বর (না বদলালে খালি রাখুন)" inputmode="numeric"></div>
    <div class="field"><label>নতুন পাসওয়ার্ড (না বদলালে খালি রাখুন)</label><input id="setNewPass" type="password" placeholder="নতুন পাসওয়ার্ড"></div>
    <div class="field"><label>বর্তমান পাসওয়ার্ড (যেকোনো পরিবর্তন নিশ্চিত করতে আবশ্যক)</label><input id="setCurrentPass" type="password" placeholder="বর্তমান পাসওয়ার্ড"></div>
    ${state.settingsError?`<div class="field err">${escapeHtml(state.settingsError)}</div>`:''}
    <div class="sheet-actions"><button class="ghost" id="cancelSettings">বাতিল</button><button class="primary" id="saveSettings" ${state.settingsBusy?'disabled':''}>${state.settingsBusy?'সংরক্ষণ হচ্ছে…':'সংরক্ষণ করুন'}</button></div>

    <div class="divider"></div>
    <p style="font-size:12.5px; color:var(--ink-soft); margin:0 0 12px; line-height:1.6;">
      এই বাটনে চাপলে শুধু <strong>আপনার নিজের</strong> ব্যবসার গ্রাহক ও লেনদেন মুছে যাবে — অন্য কোনো গ্রাহকের ডেটার সাথে এর কোনো সম্পর্ক নেই, কারণ প্রতিটা অ্যাক্টিভেশন কোডের ডেটা আলাদাভাবে সংরক্ষিত।
    </p>
    <button class="danger" id="resetDataBtn" style="width:100%;">আমার সব গ্রাহক ও লেনদেন মুছে ফেলুন</button>

    <div class="divider"></div>
    <button class="ghost" id="logoutBtn" style="width:100%;">লগআউট করুন</button>
  </div></div>`;
}

function renderResetConfirm(){
  return `<div class="overlay" id="resetConfirmOverlay"><div class="sheet">
    <h3>নিশ্চিত করুন</h3>
    <p style="font-size:13.5px; color:var(--ink-soft); line-height:1.6;">
      এই কাজটি ফেরানো যাবে না। শুধু আপনার নিজের অ্যাকাউন্টের গ্রাহক ও লেনদেন মুছে যাবে। আপনি কি নিশ্চিত?
    </p>
    <div class="sheet-actions"><button class="ghost" id="cancelReset">না, বাতিল করুন</button><button class="danger" id="confirmReset" style="flex:1;">হ্যাঁ, মুছে ফেলুন</button></div>
  </div></div>`;
}

function attachEvents(){
  const root = document.getElementById('root');

  const gearBtn = document.getElementById('gearBtn');
  if(gearBtn) gearBtn.addEventListener('click', ()=>{ state.showSettings=true; state.settingsError=''; render(); });

  root.querySelectorAll('nav.tabs button').forEach(b=> b.addEventListener('click', ()=> setView(b.dataset.tab)));
  root.querySelectorAll('[data-open]').forEach(el=> el.addEventListener('click', ()=> openDetail(el.dataset.open)));

  const addCustBtn = document.getElementById('addCustBtn') || document.getElementById('emptyAddCust');
  if(addCustBtn) addCustBtn.addEventListener('click', ()=>{ state.showAddCustomer=true; render(); });
  const cancelCust = document.getElementById('cancelCust');
  if(cancelCust) cancelCust.addEventListener('click', ()=>{ state.showAddCustomer=false; render(); });
  const custOverlay = document.getElementById('custOverlay');
  if(custOverlay) custOverlay.addEventListener('click', (e)=>{ if(e.target.id==='custOverlay'){ state.showAddCustomer=false; render(); } });
  const saveCustBtn = document.getElementById('saveCust');
  if(saveCustBtn) saveCustBtn.addEventListener('click', async ()=>{
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const addr = document.getElementById('custAddr').value.trim();
    if(!name){ document.getElementById('custName').style.borderColor='var(--due)'; return; }
    await addCustomer(name, phone, addr); render();
  });

  const backBtn = document.getElementById('backBtn');
  if(backBtn) backBtn.addEventListener('click', ()=>{ state.view='customers'; state.selectedId=null; render(); });
  const addSaleBtn = document.getElementById('addSaleBtn');
  if(addSaleBtn) addSaleBtn.addEventListener('click', ()=>{ state.txType='sale'; state.showAddTx=true; render(); });
  const addPaymentBtn = document.getElementById('addPaymentBtn');
  if(addPaymentBtn) addPaymentBtn.addEventListener('click', ()=>{ state.txType='payment'; state.showAddTx=true; render(); });
  root.querySelectorAll('.seg button[data-type]').forEach(b=> b.addEventListener('click', ()=>{ state.txType=b.dataset.type; render(); }));
  const cancelTx = document.getElementById('cancelTx');
  if(cancelTx) cancelTx.addEventListener('click', ()=>{ state.showAddTx=false; render(); });
  const txOverlay = document.getElementById('txOverlay');
  if(txOverlay) txOverlay.addEventListener('click', (e)=>{ if(e.target.id==='txOverlay'){ state.showAddTx=false; render(); } });
  const saveTxBtn = document.getElementById('saveTx');
  if(saveTxBtn) saveTxBtn.addEventListener('click', async ()=>{
    const amtEl = document.getElementById('txAmount');
    const amount = parseFloat(amtEl.value);
    const note = document.getElementById('txNote').value.trim();
    if(!amount || amount<=0){ amtEl.style.borderColor='var(--due)'; return; }
    await addTransaction(state.selectedId, state.txType, amount, note); render();
  });

  const cancelSettings = document.getElementById('cancelSettings');
  if(cancelSettings) cancelSettings.addEventListener('click', ()=>{ state.showSettings=false; state.settingsError=''; render(); });
  const settingsOverlay = document.getElementById('settingsOverlay');
  if(settingsOverlay) settingsOverlay.addEventListener('click', (e)=>{ if(e.target.id==='settingsOverlay'){ state.showSettings=false; state.settingsError=''; render(); } });

  const saveSettingsBtn = document.getElementById('saveSettings');
  if(saveSettingsBtn) saveSettingsBtn.addEventListener('click', async ()=>{
    const newBiz = document.getElementById('setBizName').value.trim();
    const newPhone = document.getElementById('setPhone').value.trim();
    const newPass = document.getElementById('setNewPass').value;
    const currentPass = document.getElementById('setCurrentPass').value;
    const logoFile = document.getElementById('logoFile').files[0];

    if(!currentPass){ state.settingsError='যেকোনো পরিবর্তনের জন্য বর্তমান পাসওয়ার্ড দিন।'; render(); return; }

    state.settingsBusy=true; state.settingsError=''; render();
    try{
      const { error: verifyErr } = await sb.auth.signInWithPassword({ email: state.session.user.email, password: currentPass });
      if(verifyErr) throw new Error('বর্তমান পাসওয়ার্ড সঠিক নয়।');

      if(logoFile){
        const path = `${state.workspace.id}/logo.png`;
        const { error: upErr } = await sb.storage.from('logos').upload(path, logoFile, { upsert:true });
        if(upErr) throw new Error('লোগো আপলোড ব্যর্থ: '+upErr.message);
        const { data: pub } = sb.storage.from('logos').getPublicUrl(path);
        await sb.from('workspaces').update({ logo_url: pub.publicUrl + '?t=' + Date.now() }).eq('id', state.workspace.id);
      }
      if(newBiz && newBiz !== state.workspace.business_name){
        await sb.from('workspaces').update({ business_name: newBiz }).eq('id', state.workspace.id);
      }
      if(newPhone){
        const { error: emailErr } = await sb.auth.updateUser({ email: phoneToEmail(newPhone) });
        if(emailErr) throw new Error('লগইন নম্বর বদলানো যায়নি: '+emailErr.message);
        await sb.from('profiles').update({ phone: newPhone }).eq('id', state.session.user.id);
      }
      if(newPass){
        if(newPass.length<6) throw new Error('নতুন পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।');
        const { error: passErr } = await sb.auth.updateUser({ password: newPass });
        if(passErr) throw new Error('পাসওয়ার্ড বদলানো যায়নি: '+passErr.message);
      }

      await loadWorkspaceAndData();
      state.settingsBusy=false; state.showSettings=false; state.settingsError='';
      showToast('সেটিংস সংরক্ষণ করা হয়েছে');
    } catch(e){
      state.settingsBusy=false; state.settingsError = e.message || 'একটা সমস্যা হয়েছে।';
      render();
    }
  });

  const resetDataBtn = document.getElementById('resetDataBtn');
  if(resetDataBtn) resetDataBtn.addEventListener('click', ()=>{ state.showResetConfirm=true; render(); });
  const cancelReset = document.getElementById('cancelReset');
  if(cancelReset) cancelReset.addEventListener('click', ()=>{ state.showResetConfirm=false; render(); });
  const resetOverlay = document.getElementById('resetConfirmOverlay');
  if(resetOverlay) resetOverlay.addEventListener('click', (e)=>{ if(e.target.id==='resetConfirmOverlay'){ state.showResetConfirm=false; render(); } });
  const confirmReset = document.getElementById('confirmReset');
  if(confirmReset) confirmReset.addEventListener('click', async ()=>{
    await sb.from('transactions').delete().eq('workspace_id', state.workspace.id);
    await sb.from('customers').delete().eq('workspace_id', state.workspace.id);
    state.customers=[]; state.transactions=[];
    state.showResetConfirm=false; state.showSettings=false;
    showToast('আপনার সব ডেটা মুছে ফেলা হয়েছে');
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn) logoutBtn.addEventListener('click', async ()=>{
    await sb.auth.signOut();
    state.session=null; state.workspace=null; state.showSettings=false;
    render();
  });
}

boot();
