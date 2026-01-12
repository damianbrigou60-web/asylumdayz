// SETTINGS
const totalLevels = 100;
const itemsPerPage = 5;
const totalPages = Math.ceil(totalLevels/itemsPerPage);
let currentPage = 1;

// LOAD DATA OR CREATE DEFAULT
let battlepassData = JSON.parse(localStorage.getItem("battlepassData")) || [];
if(battlepassData.length === 0){
  for(let i=1;i<=totalLevels;i++){
    battlepassData.push({
      level:i,
      free:{image:`images/free${i}.png`, name:`Free Item ${i}`, description:""},
      premium:{image:`images/premium${i}.png`, name:`Premium Item ${i}`, description:""}
    });
  }
  localStorage.setItem("battlepassData",JSON.stringify(battlepassData));
}

// DOM
const itemsContainer = document.getElementById("battlepass-items");
const pageDisplay = document.getElementById("page-display");
const nextBtn = document.getElementById("next-page");
const prevBtn = document.getElementById("prev-page");
const logoutBtn = document.getElementById("logout-btn");

// RENDER FUNCTION
function renderBattlepass(page){
  const startIndex = (page-1)*itemsPerPage;
  const endIndex = Math.min(startIndex+itemsPerPage,totalLevels);

  pageDisplay.textContent = `Page ${page} / ${totalPages}`;
  itemsContainer.innerHTML = "";

  for(let i=startIndex;i<endIndex;i++){
    const level = battlepassData[i];
    const levelDiv = document.createElement("div");
    levelDiv.className = "battlepass-level";

    levelDiv.innerHTML = `
      <div class="level-number">Level ${level.level}</div>
      <div class="level-items">
        <div class="level-item free-track">
          <img src="${level.free.image}" alt="${level.free.name}">
          <input type="text" value="${level.free.name}" placeholder="Free Item Name">
          <input type="text" value="${level.free.description}" placeholder="Description">
          <input type="text" value="${level.free.image}" placeholder="Image URL">
        </div>
        <div class="level-item premium-track">
          <img src="${level.premium.image}" alt="${level.premium.name}">
          <input type="text" value="${level.premium.name}" placeholder="Premium Item Name">
          <input type="text" value="${level.premium.description}" placeholder="Description">
          <input type="text" value="${level.premium.image}" placeholder="Image URL">
        </div>
      </div>
    `;

    // Update live on input
    levelDiv.querySelectorAll("input").forEach((input,index)=>{
      input.addEventListener("input",()=>{
        if(index<3){ // free
          if(index===0) level.free.name=input.value;
          if(index===1) level.free.description=input.value;
          if(index===2){ 
            level.free.image=input.value;
            levelDiv.querySelector(".level-item.free-track img").src=input.value;
          }
        } else { // premium
          const idx=index-3;
          if(idx===0) level.premium.name=input.value;
          if(idx===1) level.premium.description=input.value;
          if(idx===2){
            level.premium.image=input.value;
            levelDiv.querySelector(".level-item.premium-track img").src=input.value;
          }
        }
        localStorage.setItem("battlepassData",JSON.stringify(battlepassData));
      });
    });

    itemsContainer.appendChild(levelDiv);
  }
}

// BUTTONS
nextBtn.addEventListener("click",()=>{if(currentPage<totalPages){currentPage++; renderBattlepass(currentPage);}});
prevBtn.addEventListener("click",()=>{if(currentPage>1){currentPage--; renderBattlepass(currentPage);}});

// LOGOUT
logoutBtn.addEventListener("click",()=>{
  localStorage.removeItem("adminLoggedIn");
  window.location.href="admin.html";
});

// ACCESS CONTROL
if(localStorage.getItem("adminLoggedIn")!=="true"){window.location.href="admin.html";}

// INITIAL RENDER
renderBattlepass(currentPage);
