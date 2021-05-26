const mainContainer = document.querySelector("main");
const presentationDashboard = document.querySelector(".presentation__section");
const projectDashboard = document.querySelector(".projects__section");
const projectDashboardBtn = document.querySelector(
  ".projects__section>.controller>button"
);

let resizeBtnClicked = false;
let resizingPanel = false;

projectDashboardBtn.addEventListener("pointerdown", () => {
  if (resizingPanel == false && resizeBtnClicked == false)
    resizeBtnClicked = true;
});

document.addEventListener("pointerup", (event) => {
  if (resizeBtnClicked) {
    resizeBtnClicked = false;

    if (event.clientX <= 550) {
      MaximiseProjectsDashboard();
    }
  }
});

document.addEventListener("pointermove", (event) => {
  if (!resizeBtnClicked) return;
  if (resizingPanel) return;

  let presentationWidth = event.clientX + 20;
  if (presentationWidth < 550) presentationWidth = 550;
  presentationDashboard.style.width = presentationWidth + "px";

  projectDashboard.style.width =
    window.innerWidth - presentationDashboard.offsetWidth + "px";

  PresentationOpacityHandler();
});

window.addEventListener("resize", () => {
  projectDashboard.style.width =
    window.innerWidth - presentationDashboard.offsetWidth + "px";
});

const PresentationOpacityHandler = () => {
  let presentationContent =
    presentationDashboard.querySelector(".presentation");
  presentationContent.style.opacity =
    Map(presentationDashboard.offsetWidth, 550, 750, 0, 1) + "";
};

const MaximisePresentationDashboard = () => {
  resizingPanel = true;

  if (presentationDashboard.offsetWidth < 750)
    presentationDashboard.style.width = "750px";


  let opacity = setInterval(() => {
    PresentationOpacityHandler();
  }, 17);

  setTimeout(() => {
    clearInterval(opacity);
    presentationDashboard.style.transitionDuration = "0s";
    presentationDashboard.style.transitionTimingFunction = "";
    presentationDashboard.style.transitionProperty = "";
    presentationDashboard.style.minWidth = "550px";
    resizingPanel = false;
  }, 300);
};

const MaximiseProjectsDashboard = () => {
  resizingPanel = true;

  presentationDashboard.style.transitionDuration = "0.3s";
  presentationDashboard.style.transitionTimingFunction = "ease-in-out";
  presentationDashboard.style.transitionProperty = "width";
  projectDashboard.style.width = window.innerWidth + "px";

  presentationDashboard.style.minWidth = "75px";
  presentationDashboard.style.width = "75px";

  let opacity = setInterval(() => {
    PresentationOpacityHandler();
    console.log("hola");
  }, 17);

  setTimeout(() => {
    clearInterval(opacity);
    resizingPanel = false;
  }, 300);
};

const Map = (n, start1, stop1, start2, stop2) => {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};
