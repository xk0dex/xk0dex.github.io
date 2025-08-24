// --- Config ---
// ⚠️ Cambia esta URL por la de tu Worker desplegado:
const API = localStorage.getItem("SOPA_API") || "https://TU-WORKER.example.workers.dev";

const $ = (q)=>document.querySelector(q);
const dateUTC = new Date().toISOString().slice(0,10);
let session = null, startAt = 0, timerId = 0, puzzle=null;
let selected = new Set();

// Carga puzzle y leaderboard
const pz = await fetch(`${API}/puzzle?date=${dateUTC}`).then(r=>r.json());
puzzle = pz; renderPuzzle(pz);
renderLeaderboard();

// Start
$("#startForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const username = new FormData(e.target).get("username") || null;
  session = await fetch(`${API}/start`, { method:"POST", headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ date_utc: dateUTC, username }) }).then(r=>r.json());
  startAt = performance.now();
  startTimer();
  $("#status").textContent = "¡Suerte!";
});

async function renderLeaderboard(){
  const list = await fetch(`${API}/leaderboard?date=${dateUTC}&limit=20`).then(r=>r.json()).catch(()=>[]);
  const el = $("#leaderboard"); el.innerHTML = "";
  list.forEach((r,i)=>{
    const li = document.createElement("li");
    li.textContent = `#${i+1} ${r.username ?? "anon"} — ${(r.duration_ms/1000).toFixed(3)}s`;
    el.appendChild(li);
  });
}

function startTimer(){
  stopTimer();
  timerId = setInterval(()=>{
    const ms = performance.now() - startAt;
    $("#timer").textContent = fmt(ms);
  }, 31);
}
function stopTimer(){ clearInterval(timerId); }
function fmt(ms){ const s = Math.floor(ms/1000); const m = Math.floor(s/60);
  return `${String(m).padStart(2,"0")}:${String(s%60).padStart(2,"0")}.${String(Math.floor(ms%1000)).padStart(3,"0")}`;
}

// Render grid & words
function renderPuzzle(p){
  const gridEl = $("#grid");
  gridEl.style.gridTemplateColumns = `repeat(${p.size}, 32px)`;
  gridEl.innerHTML = "";
  for(let y=0;y<p.size;y++){
    for(let x=0;x<p.size;x++){
      const i = y*p.size+x;
      const div = document.createElement("div");
      div.className = "cell"; div.textContent = p.grid[i];
      div.dataset.i = i;
      div.addEventListener("click", ()=>{
        if(selected.has(i)){ selected.delete(i); div.classList.remove("sel"); }
        else { selected.add(i); div.classList.add("sel"); }
        checkSolved();
      });
      gridEl.appendChild(div);
    }
  }
  $("#words").innerHTML = "<ul>"+p.words.map(w=>`<li>${w}</li>`).join("")+"</ul>";
}

// Comprobar si todas las casillas de la solución están seleccionadas
function checkSolved(){
  if(!session) return;
  const need = new Set(puzzle.solution_indices);
  for(const idx of need){ if(!selected.has(idx)) return; }
  solved();
}

// Enviar resultado al backend
async function solved(){
  stopTimer();
  const res = await fetch(`${API}/submit`, { method:"POST", headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ session_id: session.session_id, token: session.token, proof: { grid_hash: puzzle.grid_hash } })
  }).then(r=>r.json());
  $("#status").textContent = `Tiempo verificado: ${(res.duration_ms/1000).toFixed(3)}s — Puesto: ${res.position ?? "?"}`;
  renderLeaderboard();
}
