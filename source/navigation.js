let verificationThread;
let calculateDelay;
let nextVerification = 0;

homeBtn.addEventListener("click", () => {
  Redirect("/home");

  ValidateSuccesfulTransition(500);
});
meBtn.addEventListener("click", () => {
  Redirect("/about-me");

  ValidateSuccesfulTransition(500);
});
projectsBtn.addEventListener("click", () => {
  Redirect("/projects");

  ValidateSuccesfulTransition(500);
});

const ValidateSuccesfulTransition = (delay) => {
  clearTimeout(verificationThread);
  clearInterval(calculateDelay);
  delay -= nextVerification;

  calculateDelay = setInterval(() => {
    nextVerification += 2.5;
  }, 1);

  verificationThread = setTimeout(() => {
    clearInterval(calculateDelay);
    clearTimeout(verificationThread);
    nextVerification = 0;
    Refresh();
  }, delay);
};
