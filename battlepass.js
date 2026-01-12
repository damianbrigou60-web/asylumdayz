const totalLevels = 100;
const levelsPerPage = 5;
const totalPages = Math.ceil(totalLevels / levelsPerPage);
let currentPage = 1;

let data = JSON.parse(localStorage.getItem("battlepassData"));

if (!data) {
  data = [];
  for (let i = 1; i <= totalLevels; i++) {
    data.push({
      level: i,
      free: { name: `Free Reward ${i}`, image: "images/free.png" },
      premium: { name: `Premium Reward ${i}`, image: "images/premium.png" }
    });
  }
  localStorage.setItem("battlepassData", JSON.stringify(data));
}

const track = document.getElementById("battlepass-track");
const pageText = document.getElementById("page-display");
const progress = document.getElementById("progress-bar");

function render() {
  track.innerHTML = "";

  const start = (currentPage - 1) * levelsPerPage;
  const end = start + levelsPerPage;

  pageText.textContent = `Page ${currentPage} / ${totalPages}`;
  progress.style.width = `${(end / totalLevels) * 100}%`;

  for (let i = start; i < end; i++) {
    const lvl = data[i];

    const tier = document.createElement("div");
    tier.className = "bp-tier";

    tier.innerHTML = `
      <div class="tier-number">LEVEL ${lvl.level}</div>

      <div class="tier-row">
        <div class="reward free">
          <img src="${lvl.free.image}">
          <span>${lvl.free.name}</span>
        </div>

        <div class="reward premium">
          <img src="${lvl.premium.image}">
          <span>${lvl.premium.name}</span>
        </div>
      </div>
    `;

    track.appendChild(tier);
  }
}

document.getElementById("next-page").onclick = () => {
  if (currentPage < totalPages) {
    currentPage++;
    render();
  }
};

document.getElementById("prev-page").onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    render();
  }
};

render();
