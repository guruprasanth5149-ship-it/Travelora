/* Travelora - all data, animations and interactions. */
/* ===== IMAGE SOURCE: change this one function to use your own images ===== */
function img(seed){ return 'https://picsum.photos/seed/' + seed + '/900/650'; }

/* ===== DATA ===== */
const L='Hotel, Breakfast, Transfers', P=(n,d,price,cats,hotel,food,tr)=>({n,d,price,cats,hotel,food,tr});
const PKGS=[
 P('Goa Escape','3 Days / 2 Nights',8999,['india'],'3-star beach resort','Breakfast daily','Airport transfers'),
 P('Kerala Backwaters','4 Days / 3 Nights',12999,['india','honeymoon'],'Houseboat + resort','Breakfast & dinner','Private cab'),
 P('Kashmir Paradise','5 Days / 4 Nights',18999,['india','adventure','honeymoon'],'Lake-view hotel','Breakfast & dinner','Private cab'),
 P('Rajasthan Royal Tour','6 Days / 5 Nights',21999,['india'],'Heritage haveli stays','Breakfast daily','AC coach'),
 P('Andaman Island Escape','5 Days / 4 Nights',24999,['india','honeymoon','adventure'],'Beach resort','Breakfast daily','Ferry + cab'),
 P('Dubai','5 Days / 4 Nights',39999,['intl','luxury'],'4-star city hotel','Breakfast daily','Airport + city tours'),
 P('Singapore','5 Days / 4 Nights',49999,['intl'],'4-star central hotel','Breakfast daily','MRT pass'),
 P('Thailand','6 Days / 5 Nights',34999,['intl','adventure'],'3-star hotels','Breakfast daily','Private transfers'),
 P('Bali','6 Days / 5 Nights',44999,['intl','honeymoon'],'Pool villa','Breakfast daily','Private driver'),
 P('Maldives','4 Days / 3 Nights',54999,['intl','luxury','honeymoon'],'Water villa resort','Full board','Speedboat'),
 P('Paris','6 Days / 5 Nights',89999,['intl','luxury','honeymoon'],'4-star central hotel','Breakfast daily','Metro + coach'),
 P('Switzerland','7 Days / 6 Nights',129999,['intl','luxury','honeymoon'],'Alpine hotels','Breakfast & dinner','Swiss rail pass'),
 P('London','7 Days / 6 Nights',119999,['intl'],'4-star hotel','Breakfast daily','Oyster card'),
 P('Japan','7 Days / 6 Nights',109999,['intl','luxury'],'Business + ryokan stay','Breakfast daily','Rail pass'),
 P('Australia','8 Days / 7 Nights',149999,['intl','adventure'],'4-star hotels','Breakfast daily','Domestic flights')];
const TABS={india:'India Trips',intl:'International Trips',luxury:'Luxury Trips',honeymoon:'Honeymoon',adventure:'Adventure'};
const POPULAR=['Goa Escape','Kerala Backwaters','Kashmir Paradise','Rajasthan Royal Tour','Andaman Island Escape'];
const BLURB={'Goa Escape':'Sun, sand and sunset shacks.','Kerala Backwaters':'Drift through palm-lined canals.','Kashmir Paradise':'Snow peaks and shikara rides.','Rajasthan Royal Tour':'Forts, palaces and desert camps.','Andaman Island Escape':'Clear water and quiet beaches.'};
const GROUPS={'Friends Group Tours':[['Goa Beach Party','4D/3N','10-20',11999,'Water sports, beach nights','Beach resort','Tempo traveller'],['Manali Trek','5D/4N','8-15',13999,'Trekking, bonfire','Mountain lodge','Volvo coach']],
 'College Group Tours':[['Coorg Camp','3D/2N','25-40',6999,'Rafting, campfire','Camp stay','Bus'],['Hampi Heritage','3D/2N','25-40',5999,'Guided ruins walk','Budget hotel','Bus']],
 'Corporate Group Tours':[['Udaipur Offsite','3D/2N','20-60',17999,'Team games, lake dinner','5-star palace hotel','AC coach'],['Dubai Incentive','5D/4N','20-50',44999,'Desert safari, cruise','4-star hotel','Private coaches']],
 'Family Group Tours':[['Kerala Family Fun','5D/4N','4-12',15999,'Houseboat, tea gardens','Family suites','Private vans'],['Singapore Family','5D/4N','4-10',52999,'Zoo, Universal Studios','Family rooms','MRT + coach']]};
const HOTELS=[['Palm Bay Resort','Goa','Standard Room',4,2999],['Lagoon Retreat','Kerala','Deluxe Room',4,4999],['Himalayan Crest','Kashmir','Premium Room',5,8999],['Amber Fort Palace','Jaipur','Suite',5,14999],['Coral Cove','Andaman','Family Room',4,6999],['Marina Skyline','Dubai','Deluxe Room',5,11999]];
const RTYPES=['Standard Room','Deluxe Room','Premium Room','Suite','Family Room'];
const inr=n=>'₹'+n.toLocaleString('en-IN'), $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const slug=s=>s.toLowerCase().replace(/[^a-z]+/g,'-');

/* ===== SHARED LAYOUT (header, footer, loader, modal, toast) ===== */
const page=document.body.dataset.page;
const links=[['index.html','Home','home'],['about.html','About Us','about'],['plans.html','Plans','plans'],['group-tour.html','Group Tour','group'],['hotels.html','Hotels','hotels'],['contact.html','Contact','contact']];
const cloudsHTML=()=>[0,1,2,3].map(i=>`<div class="cloud" style="top:${10+i*18}%;animation-duration:${40+i*14}s;animation-delay:-${i*12}s;transform:scale(${1+i*.2})"></div>`).join('');
document.body.insertAdjacentHTML('afterbegin',`
<div id="loader"><div><div class="logo">TRAVEL<span>ORA</span></div><p>Your Journey. Our Story.</p><div class="trail"></div></div></div>
<div id="wipe"><div class="cloud" style="top:20%;width:300px"></div><div class="cloud" style="top:70%"></div><div class="p">✈</div></div>
<div id="bar"></div><div id="cur"></div>
<nav class="main"><a class="logo" href="index.html">TRAVEL<span>ORA</span></a>
<button class="burger" aria-label="Menu"><i></i><i></i><i></i></button>
<ul>${links.map(l=>`<li><a href="${l[0]}" class="${l[2]===page?'on':''}">${l[1]}</a></li>`).join('')}</ul></nav>`);
document.body.insertAdjacentHTML('beforeend',`
<footer><div class="fg"><div><div class="logo">TRAVEL<span>ORA</span></div><p>Your Journey. Our Story.</p>
<div class="soc"><a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="Facebook">FB</a><a href="#" aria-label="YouTube">YT</a><a href="#" aria-label="X">X</a></div></div>
<div><h4>Quick Links</h4><ul>${links.map(l=>`<li><a href="${l[0]}">${l[1].replace('Us','').replace('Group Tour','Group Tours')}</a></li>`).join('')}</ul></div>
<div><h4>Popular Destinations</h4><ul>${['Goa','Kerala','Kashmir','Dubai','Singapore','Bali'].map(d=>`<li><a href="plans.html">${d}</a></li>`).join('')}</ul></div>
<div><h4>Get travel inspiration directly to your inbox.</h4><form class="nl" id="nl"><input type="email" required placeholder="Your email"><button class="btn gold sm">Subscribe</button></form></div></div>
<p class="copy">© 2026 Travelora. Demo website, no real bookings.</p></footer>
<button id="top" aria-label="Back to top">↑</button><div id="toast"></div><div class="ov" id="ov"><div class="m" id="m"></div></div>`);

/* ===== HERO SKY (clouds, plane, birds, particles) + word animation ===== */
$$('.hero').forEach(h=>{
  $('.hero-bg',h).style.backgroundImage=`url(${img(h.dataset.seed)})`;
  $('.sky',h).innerHTML=cloudsHTML()+'<div class="plane" style="top:18%">✈</div><div class="bird" style="top:30%;animation-delay:-6s">︶v︶</div><div class="bird" style="top:38%;animation-delay:-12s">v︶v</div>'+
   Array.from({length:14},()=>`<span class="dot" style="left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:-${Math.random()*6}s"></span>`).join('');
  const h1=$('h1',h); h1.innerHTML=h1.textContent.split(' ').map((w,i)=>`<span class="word" style="animation-delay:${1.2+i*.12}s">${w}</span>`).join(' ');
});
window.addEventListener('scroll',()=>{ // parallax + progress + nav + back-to-top
  const y=scrollY; $$('.hero-bg').forEach(b=>b.style.transform=`translateY(${y*.25}px)`);
  $('#bar').style.width=(y/(document.body.scrollHeight-innerHeight)*100)+'%';
  $('nav.main').classList.toggle('solid',y>60); $('#top').classList.toggle('show',y>600);
},{passive:true});
$('#top').onclick=()=>scrollTo({top:0,behavior:'smooth'});

/* ===== PAGE TRANSITIONS (plane wipe) ===== */
addEventListener('load',()=>{
  const arrived=sessionStorage.getItem('travel');
  if(arrived){sessionStorage.removeItem('travel');$('#wipe').className='out';$('#loader').classList.add('hide')}
  else setTimeout(()=>$('#loader').classList.add('hide'),1800);
});
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href]'); if(!a) return;
  const href=a.getAttribute('href'); $('.burger').classList.remove('open');$('nav ul').classList.remove('open');
  if(!href.endsWith('.html')||e.ctrlKey||e.metaKey) return;
  e.preventDefault(); sessionStorage.setItem('travel','1');
  $('#wipe').className='in'; setTimeout(()=>location.href=href,850);
});
addEventListener('pageshow',e=>{if(e.persisted)$('#wipe').className=''}); // back button fix
$('.burger').onclick=e=>{e.currentTarget.classList.toggle('open');$('nav ul').classList.toggle('open')};

/* ===== CARD BUILDERS ===== */
function pkgCard(p,i=0){return `<article class="card tilt reveal pop" style="--d:${i*.06}s;animation-delay:${i*.05}s"><div class="pic" data-cur="Explore"><img loading="lazy" src="${img(slug(p.n))}" alt="${p.n}"></div><div class="body"><h3>${p.n}</h3><span class="tag">${p.d}</span>
<div class="meta"><div>Hotel: ${p.hotel}</div><div>Food: ${p.food}</div><div>Transport: ${p.tr}</div></div><div class="price"><small>from </small>${inr(p.price)}<small> /person</small></div>
<div class="row"><button class="btn dark sm detail" data-n="${p.n}">View Details</button><button class="btn gold sm book" data-pkg="${p.n}">Book Now</button></div></div></article>`}
function render(el,html){el.innerHTML=html;observe();}

/* Home: popular + search */
if($('#popular')){
  const draw=q=>{const list=PKGS.filter(p=>p.n.toLowerCase().includes(q.toLowerCase())&&(q||POPULAR.includes(p.n)||false)); render($('#popular'),list.length?list.map((p,i)=>pkgCard(p,i)).join(''):'<p>No destination found. Try another name.</p>')};
  draw(''); $('#search').oninput=e=>draw(e.target.value.trim());
}
/* Plans: category tabs with filter animation */
if($('#pkgs')){
  $('#tabs').innerHTML=Object.entries(TABS).map(([k,v],i)=>`<button data-k="${k}" class="${i?'':'on'}">${v}</button>`).join('');
  const show=k=>render($('#pkgs'),PKGS.filter(p=>p.cats.includes(k)).map((p,i)=>pkgCard(p,i)).join(''));
  show('india'); $('#tabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('#tabs button').forEach(x=>x.classList.toggle('on',x===b));show(b.dataset.k)};
}
/* Group tours */
if($('#groups')) render($('#groups'),Object.entries(GROUPS).map(([t,l])=>`<h2 class="gh reveal">${t}</h2><div class="grid">${l.map((g,i)=>`<article class="card tilt reveal"><div class="pic"><img loading="lazy" src="${img(slug(g[0]))}" alt="${g[0]}"></div><div class="body"><h3>${g[0]}</h3><span class="tag">${g[1]}</span><div class="meta"><div>Group size: ${g[2]} people</div><div>Activities: ${g[4]}</div><div>Hotel: ${g[5]}</div><div>Transport: ${g[6]}</div></div><div class="price"><small>from </small>${inr(g[3])}<small> /person</small></div><div class="row"><button class="btn gold sm book" data-pkg="${g[0]}">Book Now</button></div></div></article>`).join('')}</div>`).join(''));
/* Hotels: filter + room modal */
if($('#hotels')){
  $('#htabs').innerHTML=['All',...RTYPES].map((t,i)=>`<button class="${i?'':'on'}">${t}</button>`).join('');
  const show=t=>render($('#hotels'),HOTELS.filter(h=>t==='All'||h[2]===t).map((h,i)=>`<article class="card tilt reveal pop room" data-i="${HOTELS.indexOf(h)}" style="--d:${i*.06}s"><div class="pic" data-cur="View"><img loading="lazy" src="${img(slug(h[0]))}" alt="${h[0]}"></div><div class="body"><h3>${h[0]}</h3><div class="meta"><div>${h[1]} · ${'★'.repeat(h[3])}</div><div>${h[2]} · Breakfast included · Wi-Fi · Pool · Parking</div></div><div class="price">${inr(h[4])}<small> /night</small></div><div class="row"><button class="btn gold sm book" data-pkg="${h[0]} (${h[2]})">Book Room</button></div></div></article>`).join('')||'<p>No hotels with this room type yet.</p>');
  show('All'); $('#htabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('#htabs button').forEach(x=>x.classList.toggle('on',x===b));show(b.textContent)};
}

/* ===== MODALS ===== */
const ov=$('#ov'), m=$('#m');
function open(html){m.innerHTML=`<button class="x" aria-label="Close">×</button>`+html;ov.classList.add('show')}
function close(){ov.classList.remove('show')}
ov.onclick=e=>{if(e.target===ov||e.target.closest('.x'))close()}; addEventListener('keydown',e=>e.key==='Escape'&&close());
function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),3500)}
function bookingForm(pkg){const opts=[...PKGS.map(p=>p.n),pkg].filter((v,i,a)=>a.indexOf(v)===i);
  open(`<div class="mb"><h3>Book: ${pkg}</h3><form id="bf" style="margin-top:16px"><div class="f"><input required placeholder=" "><label>Name</label></div><div class="f"><input required placeholder=" " pattern="[0-9+ ]{8,15}"><label>Phone</label></div><div class="f"><input type="email" required placeholder=" "><label>Email</label></div><div class="f"><input placeholder=" " value="${pkg}"><label>Destination</label></div><div class="f"><input type="date" required><label class="up">Travel date</label></div><div class="f"><input type="number" min="1" required placeholder=" "><label>Number of travelers</label></div><div class="f"><input class="sel" list="pl" value="${pkg}" placeholder=" "><datalist id="pl">${opts.map(o=>`<option value="${o}">`).join('')}</datalist><label class="up">Package</label></div><button class="btn gold">Submit Enquiry <i>→</i></button></form></div>`);
  $('#bf').onsubmit=e=>{e.preventDefault();$('.mb').innerHTML='<div class="ok"><b>✓</b>Your travel enquiry has been received! Our travel expert will contact you shortly.</div>';toast('Enquiry sent. We will be in touch soon.')}}
document.addEventListener('click',e=>{
  const bk=e.target.closest('.book'); if(bk){e.stopPropagation();return bookingForm(bk.dataset.pkg)}
  const d=e.target.closest('.detail'); if(d){const p=PKGS.find(x=>x.n===d.dataset.n);
    return open(`<img src="${img(slug(p.n))}" alt="${p.n}"><div class="mb"><h3>${p.n}</h3><p><span class="tag">${p.d}</span></p><div class="meta"><div>Hotel: ${p.hotel}</div><div>Food: ${p.food}</div><div>Transport: ${p.tr}</div></div><div class="price">${inr(p.price)}<small> /person</small></div><div class="row"><button class="btn gold book" data-pkg="${p.n}">Book Now</button></div></div>`)}
  const r=e.target.closest('.room'); if(r){const h=HOTELS[r.dataset.i];
    open(`<img src="${img(slug(h[0]))}" alt="${h[0]}"><div class="mb"><h3>${h[0]}, ${h[1]}</h3><p>${h[2]} · ${'★'.repeat(h[3])}</p><div class="meta"><div>Amenities: Wi-Fi, swimming pool, parking, breakfast included</div><div>Nights: <input id="nights" type="number" min="1" value="2" style="width:60px"></div></div><div class="price" id="tot">${inr(h[4]*2)}<small> for 2 nights (${inr(h[4])}/night)</small></div><div class="row"><button class="btn gold book" data-pkg="${h[0]} (${h[2]})">Book Now</button></div></div>`);
    $('#nights').oninput=ev=>{const n=Math.max(1,+ev.target.value||1);$('#tot').innerHTML=`${inr(h[4]*n)}<small> for ${n} night(s)</small>`}}
});
$('#contactForm')&&($('#contactForm').onsubmit=e=>{e.preventDefault();toast('Your travel enquiry has been received! Our travel expert will contact you shortly.');e.target.reset()});
$('#nl').onsubmit=e=>{e.preventDefault();toast('Subscribed! Travel inspiration is on its way.');e.target.reset()};

/* ===== SCROLL REVEAL, COUNTERS, RIPPLE, 3D TILT, CURSOR ===== */
let io; function observe(){io=io||new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);
  $$('[data-n]',en.target).forEach(c=>count(c))}}),{threshold:.15}); $$('.reveal:not(.in),.stats').forEach(el=>io.observe(el))}
function count(c){const t=+c.dataset.n;let n=0;const s=setInterval(()=>{n+=Math.ceil(t/50);if(n>=t){n=t;clearInterval(s)}c.textContent=n},30)}
observe(); $$('[data-seed]:not(.hero)').forEach(i=>i.src=img(i.dataset.seed));
document.addEventListener('click',e=>{const b=e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect(),s=document.createElement('span');
  s.className='ripple';s.style.cssText=`width:60px;height:60px;left:${e.clientX-r.left-30}px;top:${e.clientY-r.top-30}px`;b.appendChild(s);setTimeout(()=>s.remove(),600)});
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
if(fine){
  document.addEventListener('mousemove',e=>{ // 3D tilt on cards
    const c=e.target.closest('.tilt');$$('.tilt').forEach(x=>{if(x!==c)x.style.transform=''});
    if(c){const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateY(${px*8}deg) rotateX(${-py*8}deg) translateY(-8px)`}});
  const cur=$('#cur');let x=0,y=0,cx=0,cy=0;
  document.addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;const t=e.target.closest('[data-cur]'),b=e.target.closest('.btn,a,button');
    cur.classList.toggle('big',!!(t||b));cur.textContent=t?t.dataset.cur:''});
  (function loop(){cx+=(x-cx)*.18;cy+=(y-cy)*.18;cur.style.transform=`translate(${cx-7}px,${cy-7}px)`;requestAnimationFrame(loop)})();
}
