// ---- CONFIG: edit these without rebuilding anything else ----
const CONFIG={
  SITE_URL:"",            // set to your domain once purchased, e.g. "https://heostudio.com"
  WHATSAPP:"923303354950",
  FORM_ENDPOINT:""        // paste a Formspree/Web3Forms/Basin URL here to activate the form
};
const SERVICES=[
 {n:"Video Editing",note:"",p:[
  ["Basic","Rs. 400",["Clean cuts and trimming","Basic transitions","Background music","1 revision"]],
  ["Advanced","Rs. 700",["Professional transitions","Animated captions","Color grading","Sound effects","2 revisions"]],
  ["Premium","Rs. 1,200",["Cinematic editing","Advanced motion graphics","Professional effects","Sound design","3 revisions"]]]},
 {n:"Website Development",note:"Domain and recurring hosting charges may be separate.",p:[
  ["Starter","Rs. 1,500",["Single-page website","Modern design","Mobile-friendly layout"]],
  ["Business","Rs. 3,500",["Up to 3 pages","Professional design","Responsive layout","Contact section"]],
  ["Premium","Rs. 5,000",["Advanced website design","Custom sections","Responsive layout","Hosting setup assistance","Basic SEO configuration"]]]},
 {n:"Graphic Designing",note:"",p:[
  ["Basic","Rs. 300",["1 social media post"]],
  ["Advanced","Rs. 800",["3 social media posts"]],
  ["Premium","Rs. 1,500",["5 social media posts","1 promotional banner"]]]},
 {n:"Paid Promotion",note:"Advertising budget is separate from service fees. Views, followers or sales are not guaranteed.",p:[
  ["Starter","Rs. 500",["Campaign setup assistance"]],
  ["Growth","Rs. 1,000",["Audience targeting assistance","Basic campaign monitoring"]],
  ["Professional","Rs. 1,500",["Campaign management","Performance monitoring","Performance report"]]]}
];
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const svcEl=document.getElementById("svc");
if(svcEl)svcEl.innerHTML=SERVICES.map(s=>`<div class="svc"><h2 class="chrome">${esc(s.n)}</h2>${s.note?`<p class="note">${esc(s.note)}</p>`:'<p class="note">&nbsp;</p>'}<div class="grid g3">${s.p.map(k=>{
 const msg=`Hello HEO STUDIO, I would like to order the ${s.n} – ${k[0]} package (${k[1]}).`;
 return `<div class="card pkg"><h3>${k[0]}</h3><div class="pr chrome">${k[1]}</div><ul>${k[2].map(i=>`<li>${esc(i)}</li>`).join("")}</ul><a class="btn fill" target="_blank" rel="noopener" href="https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(msg)}">ORDER NOW</a></div>`}).join("")}</div></div>`).join("");

// ---- 3D monogram follows pointer ----
const mono=document.getElementById("mono");
if(mono&&!matchMedia("(prefers-reduced-motion:reduce)").matches)addEventListener("pointermove",e=>{
 mono.style.setProperty("--ry",((e.clientX/innerWidth-.5)*40)+"deg");
 mono.style.setProperty("--rx",(-(e.clientY/innerHeight-.5)*24)+"deg")});

// ---- contact form ----
const f=document.getElementById("f"),st=document.getElementById("status");
if(f){
function show(m){st.style.display="block";st.textContent=m}
f.addEventListener("submit",async e=>{
 e.preventDefault();let ok=true;
 const rules={name:v=>v.trim().length>=2||"Enter your full name.",email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)||"Enter a valid email address.",service:v=>!!v||"Select a service.",budget:v=>v.trim().length>0||"Enter your project budget.",desc:v=>v.trim().length>=10||"Describe your project in at least 10 characters."};
 for(const k in rules){const el=f.elements[k],r=rules[k](el.value),er=el.parentElement.querySelector(".err");
  if(r!==true){ok=false;er.textContent=r;el.setAttribute("aria-invalid","true")}else{er.textContent="";el.removeAttribute("aria-invalid")}}
 if(!ok){show("Please fix the highlighted fields.");return}
 if(!CONFIG.FORM_ENDPOINT){show("Form backend pending: this form is not connected yet, so nothing was sent. Please use WhatsApp or email above to reach HEO STUDIO.");return}
 try{const r=await fetch(CONFIG.FORM_ENDPOINT,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(f)))});
  if(!r.ok)throw 0;f.reset();show("Inquiry sent. We will reply soon.")}catch{show("Sending failed. Please try again or contact us on WhatsApp.")}
});
}
