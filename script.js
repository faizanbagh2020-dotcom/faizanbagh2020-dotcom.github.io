const certificates = [
  {title:"AI Interview — Outstanding Performance", org:"micro1", date:"June 22, 2026", category:"AI / ML", filter:"ai", type:"image", src:"assets/cert-micro1.jpg"},
  {title:"Cyber Security Workshop", org:"Aether Link", date:"August 9, 2026", category:"Cybersecurity", filter:"cyber", type:"image", src:"assets/cert-aetherlink.jpg"},
  {title:"Artificial Intelligence — Online Internship", org:"Crixsoft Solution", date:"June 20 – July 20, 2026", category:"Training / Internship", filter:"training", type:"image", src:"assets/cert-crixsoft.jpg"},
  {title:"Machine Learning", org:"University of Michigan • Coursera", date:"July 22, 2026", category:"AI / ML", filter:"ai", type:"image", src:"assets/cert-umich-ml.png"},
  {title:"AI for Beginners", org:"HP LIFE • HP Foundation", date:"April 4, 2025", category:"AI / ML", filter:"ai", type:"image", src:"assets/cert-hp-ai.jpg"},
  {title:"Artificial Intelligence & Machine Learning", org:"University of Michigan • Coursera", date:"September 1, 2026", category:"AI / ML", filter:"ai", type:"image", src:"assets/cert-umich-ai-ml.png"},
  {title:"Artificial Intelligence & Machine Learning", org:"University of Virginia • Coursera", date:"September 5, 2026", category:"AI / ML", filter:"ai", type:"image", src:"assets/cert-uva-ai-ml.png"},
  {title:"Full Ethical Hacking Course Volume 1", org:"Cyber Pashto", date:"Issued January 19, 2025", category:"Cybersecurity", filter:"cyber", type:"image", src:"assets/cert-cyberpashto.jpg"},
  {title:"Artificial Intelligence Using Python", org:"DigiSkills.pk • Ignite • Virtual University", date:"Apr – Jul 2026", category:"Training", filter:"training", type:"image", src:"assets/cert-digiskills.jpg"},
  {title:"Thinking Like a Journalist", org:"IC YF / MOI • Virtual Workshop", date:"June 2026", category:"Workshop", filter:"workshop", type:"image", src:"assets/cert-icyf.jpg"},
  {title:"AI & Future Tech Seminar 2026", org:"NanoCoders • AI Workshop", date:"July 4, 2026", category:"Workshop", filter:"workshop", type:"pdf", src:"assets/cert-ai-future-seminar.pdf"},
  {title:"Introduction to Artificial Intelligence", org:"Simplilearn SkillUp", date:"April 26, 2025", category:"AI / ML", filter:"ai", type:"pdf", src:"assets/cert-simplilearn-ai.pdf"}
];

const grid = document.getElementById("certGrid");
const modal = document.getElementById("certModal");
const viewer = document.getElementById("viewer");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDate = document.getElementById("modalDate");

function certCard(cert, index){
  const card = document.createElement("article");
  card.className = "cert-card reveal";
  card.dataset.filter = cert.filter;
  card.style.transitionDelay = `${Math.min(index * 0.045, .25)}s`;
  card.innerHTML = `
    <div class="cert-thumb">
      ${cert.type === "image"
        ? `<img src="${cert.src}" alt="${cert.title} — ${cert.org}" loading="lazy">`
        : `<div class="pdf-thumb"><div><span class="pdf-icon">▣</span><b>PDF CERTIFICATE</b><br><small>Click to open</small></div></div>`}
    </div>
    <div class="cert-info">
      <div class="cert-topline"><span>${cert.category}</span><span>${cert.date}</span></div>
      <h3>${cert.title}</h3>
      <p>${cert.org}</p>
      <div class="open-label">OPEN CERTIFICATE ↗</div>
    </div>`;
  card.addEventListener("click", () => openCert(cert));
  return card;
}

function render(filter = "all"){
  grid.innerHTML = "";
  certificates.forEach((cert, i) => {
    if(filter === "all" || cert.filter === filter) grid.appendChild(certCard(cert, i));
  });
  requestAnimationFrame(() => {
    grid.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
  });
}
render();

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
  });
});

function openCert(cert){
  modalTitle.textContent = cert.title;
  modalCategory.textContent = `${cert.category} • ${cert.org}`;
  modalDate.textContent = cert.date;
  viewer.innerHTML = cert.type === "image"
    ? `<img src="${cert.src}" alt="${cert.title}">`
    : `<iframe src="${cert.src}#toolbar=1&navpanes=0" title="${cert.title}"></iframe>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
}
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  viewer.innerHTML = "";
  document.body.classList.remove("modal-open");
}
document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add("visible"); observer.unobserve(entry.target); }});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
window.addEventListener("scroll", () => {
  document.getElementById("navbar").style.borderBottomColor = window.scrollY > 10 ? "rgba(255,255,255,.08)" : "transparent";
});
document.getElementById("year").textContent = new Date().getFullYear();
