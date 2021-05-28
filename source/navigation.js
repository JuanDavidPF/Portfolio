const homeBtn = document.getElementById("#homeBtn");
const meBtn = document.getElementById("#meBtn");
const projectsBtn = document.getElementById("#projectsBtn");

homeBtn.addEventListener("click", () => {
  if (linkRoute != "/home") Redirect("/home");
  else HomeScreen();
  ValidateSuccesfulTransition("/home", 500);
});
meBtn.addEventListener("click", () => {
  if (linkRoute != "/about-me") Redirect("/about-me");
  else AboutMeScreen();
  ValidateSuccesfulTransition("/about-me", 500);
});
projectsBtn.addEventListener("click", () => {
  if (linkRoute != "/projects") Redirect("/projects");
  else ProjectsScreen();
  ValidateSuccesfulTransition("/projects", 500);
});

const ValidateSuccesfulTransition = (screen, delay) => {
  setTimeout(() => {
    if (currentScreen != screen) {
      switch (screen) {
        case "/home":
          HomeScreen();
          break;

        case "/about-me":
          AboutMeScreen();
          break;

        case "/projects":
          ProjectsScreen();
          break;
      }
    }
  }, delay);
};
