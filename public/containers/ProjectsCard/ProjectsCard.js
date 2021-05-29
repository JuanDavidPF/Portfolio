const homeBtn = document.getElementById("#homeBtn");
const meBtn = document.getElementById("#meBtn");
const projectsBtn = document.getElementById("#projectsBtn");

const mainContainer = document.querySelector("main");
const presentationDashboard = document.querySelector(".presentation__section");
const presentationContent =
  presentationDashboard.querySelector(".presentation");
const projectDashboard = document.querySelector(".projects__section");

const projectsContent = projectDashboard.querySelector("section>main");
const projectDashboardBtn = document.querySelector(
  ".projects__section>.controller>button"
);
const projectDashboardBtnIcon = projectDashboardBtn.querySelector("img");
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
  if (!presentationCollapsed && !resizeBtnClicked && currentScreen == "/home") {
    ValidateSmallDisplay();

    setTimeout(() => {
      ExpandProjectDashboard();
      ValidateSmallDisplay();
    }, 501);

    ExpandProjectDashboard();
  }
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
    ResizePresentationPanel(event.clientX);
  }
});

const ClickedOnResize = () => {
  if (resizingPanel == false && resizeBtnClicked == false)
    resizeBtnClicked = true;

  if (currentScreen == "/projects") projectDashboard.style.paddingLeft = "0px";
};

const ResizePresentationPanel = (width) => {
  resizingPanel = true;
  let presentationWidth = (width / window.innerWidth) * 100 + "vw";

  switch (currentScreen) {
    //Home Section

    case "/home":
      //To Projects from Home
      if (width < presentationDashboardSizes.minOpenedWidth) {
        presentationWidth = presentationDashboardSizes.minOpenedWidth + "px";

        HandleProjectsBarShadow(
          "#2f5af580",
          width,

          presentationDashboardSizes.minOpenedWidth,
          presentationDashboardSizes.minOpenedWidth - 50
        );
        ChangeBtnDashboardIcon(
          "./public/resources/image/icon/projects-icon.png"
        );
      }

      //Inside Home
      else if (
        width >= presentationDashboardSizes.minOpenedWidth &&
        width <= window.innerWidth - projectDashboardSizes.minOpenedWidth
      ) {
        RestoreProjectsBarShadow();
        ChangeBtnDashboardIcon(
          "./public/resources/image/icon/barTexture-icon.png"
        );
      }

      //To About Me from Home
      else if (
        width >
        window.innerWidth - projectDashboardSizes.minOpenedWidth
      ) {
        presentationWidth =
          window.innerWidth - projectDashboardSizes.minOpenedWidth + "px";

        HandleProjectsBarShadow(
          "#2f5af580",
          width,
          window.innerWidth - projectDashboardSizes.minOpenedWidth - 50,
          window.innerWidth - projectDashboardSizes.minOpenedWidth
        );

        ChangeBtnDashboardIcon("./public/resources/image/icon/me-icon.png");
      }

      break;

    //About Section

    case "/about-me":
      if (width >= window.innerWidth - 150)
        ChangeBtnDashboardIcon(
          "./public/resources/image/icon/barTexture-icon.png"
        );
      else if (
        width >= presentationDashboardSizes.minOpenedWidth &&
        width < window.innerWidth - 150
      ) {
        //To Home from About Me
        ChangeBtnDashboardIcon("./public/resources/image/icon/home-icon.png");
      }

      //To Projects from About Me
      else if (width < presentationDashboardSizes.minOpenedWidth) {
        presentationWidth = presentationDashboardSizes.minOpenedWidth + "px";

        HandleProjectsBarShadow(
          "#2f5af580",
          width,
          presentationDashboardSizes.minOpenedWidth,
          presentationDashboardSizes.minOpenedWidth - 50
        );
        ChangeBtnDashboardIcon(
          "./public/resources/image/icon/projects-icon.png"
        );
      }

      break;

    //Project Section

    case "/projects":
      //Less than NavBar

      if (width <= 75) {
        presentationWidth = 75 + "px";
      } else if (width > 75 && width < 75 + 150) {
        ChangeBtnDashboardIcon(
          "./public/resources/image/icon/barTexture-icon.png"
        );
      }
      //From Projects to Home
      else if (
        width > 75 + 150 &&
        width <= window.innerWidth - projectDashboardSizes.minOpenedWidth
      ) {
        ChangeBtnDashboardIcon("./public/resources/image/icon/home-icon.png");
      }

      //From Projects to About Me
      else if (
        width >
        window.innerWidth - projectDashboardSizes.minOpenedWidth
      ) {
        ChangeBtnDashboardIcon("./public/resources/image/icon/me-icon.png");
        presentationWidth =
          window.innerWidth - projectDashboardSizes.minOpenedWidth + "px";

        HandleProjectsBarShadow(
          "#2f5af580",
          width,
          window.innerWidth - projectDashboardSizes.minOpenedWidth - 50,
          window.innerWidth - projectDashboardSizes.minOpenedWidth
        );
      }

      break;
  }

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
      } else if (mouseX > window.innerWidth - 150) {
        Refresh();
        ChangeBtnDashboardIcon(
          "./public/resources/image/icon/barTexture-icon.png"
        );
      } else {
        Redirect("/home");
      }
      break;

      break;
    case "/projects":
      if (mouseX < 75 + 150) {
        Refresh();
        ChangeBtnDashboardIcon(
          "./public/resources/image/icon/barTexture-icon.png"
        );
      } else if (mouseX > window.innerWidth - 560) {
        Redirect("/about-me");
      } else {
        Redirect("/home");
      }
      break;
  }
};

const HomeScreen = () => {
  ValidateSmallDisplay();
  if (!resizingPanel) {
    UpdateLinkBtns("/home");
    resizingPanel = true;
    presentationCollapsed = false;

    SetTransitionsProperties(presentationDashboard, "width", true);
    SetTransitionsProperties(presentationContent, "opacity", true);

    SetTransitionsProperties(projectDashboard, "width", true);
    SetTransitionsProperties(projectsContent, "opacity", true);

    RestoreProjectsBarShadow();

    presentationDashboard.style.width = 50 + "vw";

    presentationContent.style.opacity = 1;
    projectsContent.style.opacity = 1;

    projectDashboard.style.width = 50 + "vw";

    projectDashboard.style.paddingLeft = "0px";

    setTimeout(() => {
      ChangeBtnDashboardIcon(
        "./public/resources/image/icon/barTexture-icon.png"
      );
      presentationDashboard.style.minWidth =
        presentationDashboardSizes.minOpenedWidth + "px";

      projectDashboard.style.minWidth =
        presentationDashboardSizes.minOpenedWidth + "px";

      SetTransitionsProperties(presentationDashboard, "width", false);
      SetTransitionsProperties(presentationContent, "opacity", false);

      SetTransitionsProperties(projectDashboard, "width", false);
      SetTransitionsProperties(projectsContent, "opacity", false);
      resizingPanel = false;
      ValidateSmallDisplay();
    }, 500);
  }
};

const AboutMeScreen = () => {
  if (!resizingPanel) {
    UpdateLinkBtns("/about-me");

    resizingPanel = true;
    presentationCollapsed = false;
    SetTransitionsProperties(presentationDashboard, "width", true);
    SetTransitionsProperties(projectDashboard, "width", true);

    SetTransitionsProperties(presentationContent, "opacity", true);
    SetTransitionsProperties(projectsContent, "opacity", true);

    RestoreProjectsBarShadow();

    presentationDashboard.style.width = "100vw";
    presentationDashboard.style.maxWidth = "100vw";

    projectDashboard.style.width = "0px";
    projectDashboard.style.paddingLeft = "0px";

    presentationContent.style.opacity = 1;
    projectsContent.style.opacity = 0;

    setTimeout(() => {
      ChangeBtnDashboardIcon(
        "./public/resources/image/icon/barTexture-icon.png"
      );
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
    UpdateLinkBtns("/projects");

    resizingPanel = true;
    presentationCollapsed = true;

    SetTransitionsProperties(presentationDashboard, "width", true);
    SetTransitionsProperties(presentationContent, "opacity", true);

    SetTransitionsProperties(projectDashboard, "width", true);
    SetTransitionsProperties(projectsContent, "opacity", true);

    RestoreProjectsBarShadow();

    presentationDashboard.style.minWidth = "0px";
    presentationDashboard.style.maxWidth = "100vw";
    presentationDashboard.style.width = "0px";

    projectDashboard.style.width = "100vw";

    presentationContent.style.opacity = 0;
    projectsContent.style.opacity = 1;

    setTimeout(() => {
      ChangeBtnDashboardIcon(
        "./public/resources/image/icon/barTexture-icon.png"
      );
      resizingPanel = false;
      
      projectDashboard.style.paddingLeft = "75px";
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

const UpdateLinkBtns = (screen) => {
  switch (screen) {
    case "/home":
      if (!homeBtn.classList.contains("selected"))
        homeBtn.classList.add("selected");
      if (meBtn.classList.contains("selected"))
        meBtn.classList.remove("selected");
      if (projectsBtn.classList.contains("selected"))
        projectsBtn.classList.remove("selected");
      break;

    case "/about-me":
      if (!meBtn.classList.contains("selected"))
        meBtn.classList.add("selected");
      if (homeBtn.classList.contains("selected"))
        homeBtn.classList.remove("selected");
      if (projectsBtn.classList.contains("selected"))
        projectsBtn.classList.remove("selected");
      break;

    case "/projects":
      if (!projectsBtn.classList.contains("selected"))
        projectsBtn.classList.add("selected");
      if (homeBtn.classList.contains("selected"))
        homeBtn.classList.remove("selected");
      if (meBtn.classList.contains("selected"))
        meBtn.classList.remove("selected");

      break;
  }
};

const ValidateSmallDisplay = () => {
  if (
    window.innerWidth <=
    projectDashboardSizes.minOpenedWidth +
      projectDashboardSizes.widthOpacityOffset +
      presentationDashboardSizes.minOpenedWidth +
      presentationDashboardSizes.widthOpacityOffset
  ) {
    Redirect("/about-me");
    return true;
  } else return false;
};

const ChangeBtnDashboardIcon = (iconPath) => {
  projectDashboardBtnIcon.src = iconPath;
};

const RestoreProjectsBarShadow = () => {
  projectDashboardBar.style.boxShadow = "#8f8f8fec -3px 0px 15px 0px";
};

const HandleProjectsBarShadow = (color, currentX, minX, maxX) => {
  let extension = Map(currentX, minX, maxX, 0, 10);
  if (extension > 50) extension = 50;
  projectDashboardBar.style.boxShadow =
    color + " -3px 0px " + extension + "px " + extension / 2 + "px";
};
