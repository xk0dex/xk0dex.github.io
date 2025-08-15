
function copyText(id){
  const el = document.getElementById(id);
  if(!el) return;
  const text = el.innerText || el.textContent;
  navigator.clipboard.writeText(text).then(()=>{
    const btn = document.querySelector(`[data-copy='${id}']`);
    if(btn){ const t=btn.innerText; btn.innerText='Copiado ✓'; setTimeout(()=>btn.innerText=t,1400); }
  });
}
