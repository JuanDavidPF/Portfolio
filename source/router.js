//link
let baseLink = "";
let linkRoute = "";

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
  }
} //closes Analyzelink method;

function Router() {
  AnalyzeLink();


  switch (linkRoute) {
    case "":
      Redirect("/home");
      break;

    case "/home":
      if (window.innerWidth <= 600) {
        AboutMeScreen();
        break;
      }
      HomeScreen();
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
} //closes Router method

function Redirect(path) {
  window.location.href = baseLink + path;
} //closes Redirect method

window.onhashchange = function () {
  Router();
}; //closes onHasChange event

Router();
