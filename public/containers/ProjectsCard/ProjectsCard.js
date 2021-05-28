const mainContainer = document.querySelector("main");
const presentationDashboard = document.querySelector(".presentation__section");
const presentationContent =
  presentationDashboard.querySelector(".presentation");
const projectDashboard = document.querySelector(".projects__section");
const projectDashboardBtn = document.querySelector(
  ".projects__section>.controller>button"
);
const projectDashboardBar = document.querySelector(
  ".projects__section>.controller"
);

let resizeBtnClicked = false;
let resizingPanel = false;
let presentationCollapsed = false;

let presentationDashboardSizes = {
  widthOpacityOffset: 150,
  minOpenedWidth: 425,
  maxOpenWidth: window.innerWidth,
};

let currentScreen;

window.addEventListener("resize", () => {
  if (
    window.innerWidth <= 600 &&
    !presentationCollapsed &&
    !resizeBtnClicked &&
    currentScreen == "/home"
  ) {
    Redirect("/about-me");
  }

  setTimeout(() => {
    if (
      window.innerWidth <= 600 &&
      !presentationCollapsed &&
      !resizeBtnClicked &&
      currentScreen == "/home"
    ) {
      Redirect("/about-me");
    }
  }, 505);
});

projectDashboardBar.addEventListener("pointerdown", () => {
  ClickedOnResize();
});

projectDashboardBtn.addEventListener("pointerdown", () => {
  ClickedOnResize();
});

document.addEventListener("pointerup", (event) => {
  if (resizeBtnClicked) {
    resizeBtnClicked = false;
    DragPanelNavigation(event.clientX);
  }
});

document.addEventListener("pointermove", (event) => {
  if (resizeBtnClicked && !resizingPanel) {
    ResizePresentaionPanel(event.clientX);
  }
});

const ClickedOnResize = () => {
  if (resizingPanel == false && resizeBtnClicked == false)
    resizeBtnClicked = true;

  if (currentScreen == "/projects") projectDashboard.style.paddingLeft = "0px";
};

const ResizePresentaionPanel = (width) => {
  resizingPanel = true;

  let presentationWidth = (width / window.innerWidth) * 100 + "vw";
  if (
    width < presentationDashboardSizes.minOpenedWidth &&
    !presentationCollapsed
  )
    presentationWidth = presentationDashboardSizes.minOpenedWidth + "px";

  presentationDashboard.style.width = presentationWidth;

  ExpandProjectDashboard();

  PresentationOpacityHandler();
  resizingPanel = false;
};

const PresentationOpacityHandler = () => {
  presentationContent.style.opacity =
    Map(
      presentationDashboard.offsetWidth,
      presentationDashboardSizes.minOpenedWidth,
      presentationDashboardSizes.minOpenedWidth +
        presentationDashboardSizes.widthOpacityOffset,
      0,
      1
    ) + "";
};

const DragPanelNavigation = (mouseX) => {
  switch (currentScreen) {
    case "/home":
    case "/about-me":
      if (
        mouseX <= presentationDashboardSizes.minOpenedWidth &&
        presentationCollapsed == false
      ) {
        Redirect("/projects");
      }
      break;

      break;
    case "/projects":
      if (mouseX <= 70) {
        ProjectsScreen();
      } else {
        Redirect("/home");
      }
      break;
  }
};

const HomeScreen = () => {
  if (!resizingPanel) {
    resizingPanel = true;
    presentationCollapsed = false;

    SetTransitionsProperties(presentationDashboard, "width", true);
    SetTransitionsProperties(projectDashboard, "width", true);
    SetTransitionsProperties(presentationContent, "opacity", true);

    presentationDashboard.style.width = 70 + "vw";

    presentationContent.style.opacity = 1;

    projectDashboard.style.width = 30 + "vw";
    projectDashboard.style.paddingLeft = "0px";

    setTimeout(() => {
      presentationDashboard.style.maxWidth = 85 + "vw";
      SetTransitionsProperties(presentationDashboard, "width", false);
      SetTransitionsProperties(projectDashboard, "width", false);
      SetTransitionsProperties(presentationContent, "opacity", false);
      resizingPanel = false;
    }, 500);
  }
};

const AboutMeScreen = () => {
  if (!resizingPanel) {
    resizingPanel = true;
    presentationCollapsed = false;
    SetTransitionsProperties(presentationContent, "opacity", true);
    SetTransitionsProperties(presentationDashboard, "width", true);
    SetTransitionsProperties(projectDashboard, "width", true);

    presentationDashboard.style.width = "100vw";
    presentationDashboard.style.maxWidth = "none";
    projectDashboard.style.width = "0px";
    projectDashboard.style.paddingLeft = "0px";

    presentationContent.style.opacity = 1;
    setTimeout(() => {
      SetTransitionsProperties(projectDashboard, "width", false);
      SetTransitionsProperties(presentationDashboard, "width", false);
      SetTransitionsProperties(presentationContent, "opacity", false);
      resizingPanel = false;
    }, 500);
  }
};

const ProjectsScreen = () => {
  if (!resizingPanel) {
    resizingPanel = true;
    presentationCollapsed = true;

    SetTransitionsProperties(presentationDashboard, "width", true);
    SetTransitionsProperties(projectDashboard, "width", true);

    SetTransitionsProperties(presentationContent, "opacity", true);

    presentationDashboard.style.width = "0px";

    projectDashboard.style.width = "100vw";
    projectDashboard.style.paddingLeft = "75px";

    presentationContent.style.opacity = 0;

    setTimeout(() => {
      resizingPanel = false;

      SetTransitionsProperties(presentationDashboard, "width", false);
      SetTransitionsProperties(projectDashboard, "width", false);

      SetTransitionsProperties(presentationContent, "opacity", false);
    }, 500);
  }
};

const Map = (n, start1, stop1, start2, stop2) => {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

const SetTransitionsProperties = (element, property, activate) => {
  if (activate) {
    if (!element.style.transitionProperty + "".includes(property))
      element.style.transitionProperty += " " + property;
  } else {
    if (element.style.transitionProperty + "".includes(property))
      element.style.transitionProperty =
        element.style.transitionProperty.replace(property + "", "");
  }
};

const ExpandProjectDashboard = () => {
  projectDashboard.style.width =
    window.innerWidth - presentationDashboard.offsetWidth + "px";
};
