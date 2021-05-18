const mainContainer = document.querySelector("main");
const presentationDashboard = document.querySelector(".presentation__section");
const projectDashboard = document.querySelector(".projects__section");
const projectDashboardBtn = document.querySelector(
  ".projects__section>.controller>button"
);

let resizingPanel = false;

projectDashboardBtn.addEventListener("pointerdown", () => {
  resizingPanel = true;
});

document.addEventListener("pointerup", () => {
  resizingPanel = false;
});

document.addEventListener("pointermove", (event) => {
  if (!resizingPanel) return;

  presentationDashboard.style.width = event.clientX + 20 + "px";

  projectDashboard.style.width =
    window.innerWidth - presentationDashboard.offsetWidth + "px";
});

window.addEventListener("resize", () => {
  projectDashboard.style.width =
    window.innerWidth - presentationDashboard.offsetWidth + "px";
});
