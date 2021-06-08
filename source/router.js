//link
let baseLink = "";
let linkRoute = "";
let projectRoute = "";

function AnalyzeLink() {
  let link = window.location.href;
  if (!link.includes("#")) {
    baseLink = link + "#";
    window.location.href = baseLink;
  } else {
    let linkSegments = [];
    linkSegments = link.split("#");
    baseLink = linkSegments[0] + "#";
    linkRoute = linkSegments[1];
    projectRoute = "";
    if (linkRoute.includes("projects")) {
      let localRoute = linkRoute.split("/");
      linkRoute = "/" + localRoute[1];
      if (localRoute[2]) projectRoute = localRoute[2];
    }
  }
} //closes Analyzelink method;

function Router() {
  AnalyzeLink();
  currentScreen = linkRoute;
  switch (linkRoute) {
    case "":
      Redirect("/home");

      break;

    case "/home":
      if (ValidateSmallDisplay()) {
        Redirect("/about-me");
      } else {
        HomeScreen();
      }

      break;

    case "/about-me":
      AboutMeScreen();
      break;

    case "/projects":
      ProjectsScreen();
  
      break;

    case "/404":
      Redirect("/home");
      break;
    default:
      Redirect("/404");
      break;
  } //closes Router switch
  ProjectModal(projectRoute.length);
} //closes Router method

function Redirect(path) {
  window.location.href = baseLink + path;
} //closes Redirect method

function Refresh() {
  Router();
} //closes Redirect method

window.onhashchange = function () {
  Router();
}; //closes onHasChange event

Router();
