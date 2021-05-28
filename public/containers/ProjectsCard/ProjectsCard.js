const mainContainer = document.querySelector("main");
const presentationDashboard = document.querySelector(".presentation__section");
const presentationContent =
  presentationDashboard.querySelector(".presentation");
const projectDashboard = document.querySelector(".projects__section");

const projectsContent = projectDashboard.querySelector("section>main");
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

let projectDashboardSizes = {
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

  if (
    width > window.innerWidth - projectDashboardSizes.minOpenedWidth &&
    !presentationCollapsed &&
    currentScreen == "/home"
  )
    presentationWidth =
      window.innerWidth - projectDashboardSizes.minOpenedWidth + "px";

  presentationDashboard.style.width = presentationWidth;

  ExpandProjectDashboard();

  ProjectsOpacityHandler();
  PresentationOpacityHandler();
  resizingPanel = false;
};

const ProjectsOpacityHandler = () => {
  projectsContent.style.opacity = Map(
    projectDashboard.offsetWidth,
    projectDashboardSizes.minOpenedWidth +
      projectDashboardSizes.widthOpacityOffset,
    projectDashboardSizes.minOpenedWidth,
    1,
    0
  );
};

const PresentationOpacityHandler = () => {
  presentationContent.style.opacity = Map(
    presentationDashboard.offsetWidth,
    presentationDashboardSizes.minOpenedWidth,
    presentationDashboardSizes.minOpenedWidth +
      presentationDashboardSizes.widthOpacityOffset,
    0,
    1
  );
};

const DragPanelNavigation = (mouseX) => {
  switch (currentScreen) {
    case "/home":
      if (
        mouseX <= presentationDashboardSizes.minOpenedWidth &&
        presentationCollapsed == false
      ) {
        Redirect("/projects");
      } else if (
        mouseX > window.innerWidth - projectDashboardSizes.minOpenedWidth &&
        presentationCollapsed == false
      ) {
        Redirect("/about-me");
      }
      break;
    case "/about-me":
      if (
        mouseX <= presentationDashboardSizes.minOpenedWidth &&
        presentationCollapsed == false
      ) {
        Redirect("/projects");
      } else if (mouseX > window.innerWidth - 10) {
        Redirect("/about-me");
      } else {
        Redirect("/home");
      }
      break;

      break;
    case "/projects":
      if (mouseX <= 70) {
        ProjectsScreen();
      } else if (mouseX > window.innerWidth - 560) {
        Redirect("/about-me");
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
    SetTransitionsProperties(presentationContent, "opacity", true);

    SetTransitionsProperties(projectDashboard, "width", true);
    SetTransitionsProperties(projectsContent, "opacity", true);

    presentationDashboard.style.width = 70 + "vw";

    presentationContent.style.opacity = 1;
    projectsContent.style.opacity = 1;

    projectDashboard.style.width = 30 + "vw";
    projectDashboard.style.paddingLeft = "0px";

    setTimeout(() => {
      currentScreen = "/home";
      SetTransitionsProperties(presentationDashboard, "width", false);
      SetTransitionsProperties(presentationContent, "opacity", false);

      SetTransitionsProperties(projectDashboard, "width", false);
      SetTransitionsProperties(projectsContent, "opacity", false);
      resizingPanel = false;
    }, 500);
  }
};

const AboutMeScreen = () => {
  if (!resizingPanel) {
    resizingPanel = true;
    presentationCollapsed = false;
    SetTransitionsProperties(presentationDashboard, "width", true);
    SetTransitionsProperties(projectDashboard, "width", true);

    SetTransitionsProperties(presentationContent, "opacity", true);
    SetTransitionsProperties(projectsContent, "opacity", true);

    presentationDashboard.style.width = "100vw";
    presentationDashboard.style.maxWidth = "100vw";

    projectDashboard.style.width = "0px";
    projectDashboard.style.paddingLeft = "0px";

    presentationContent.style.opacity = 1;
    projectsContent.style.opacity = 0;

    setTimeout(() => {
      currentScreen = "/about-me";
      SetTransitionsProperties(presentationDashboard, "width", false);
      SetTransitionsProperties(presentationContent, "opacity", false);

      SetTransitionsProperties(projectDashboard, "width", false);
      SetTransitionsProperties(projectsContent, "opacity", false);

      resizingPanel = false;
    }, 500);
  }
};

const ProjectsScreen = () => {
  if (!resizingPanel) {
    resizingPanel = true;
    presentationCollapsed = true;

    SetTransitionsProperties(presentationDashboard, "width", true);
    SetTransitionsProperties(presentationContent, "opacity", true);

    SetTransitionsProperties(projectDashboard, "width", true);
    SetTransitionsProperties(projectsContent, "opacity", true);

    presentationDashboard.style.maxWidth = "100vw";
    presentationDashboard.style.width = "0px";

    projectDashboard.style.width = "100vw";
    projectDashboard.style.paddingLeft = "75px";

    presentationContent.style.opacity = 0;
    projectsContent.style.opacity = 1;

    setTimeout(() => {
      currentScreen = "/projects";
      resizingPanel = false;     

      SetTransitionsProperties(presentationDashboard, "width", false);
      SetTransitionsProperties(presentationContent, "opacity", false);

      SetTransitionsProperties(projectDashboard, "width", false);
      SetTransitionsProperties(projectsContent, "opacity", false);
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
