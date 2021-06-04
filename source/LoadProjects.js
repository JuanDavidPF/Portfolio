const bulletPrefab = document.querySelector(
  ".projects__section>section>.projects-gallery>article>.bullet"
);
const bulletContainer = document.querySelector(
  ".projects__section>section>.projects-gallery>article"
);

const titleProjectDashboard = document.querySelector(
  ".projects__section>section>header>h1"
);
const descriptionProjectDashboard = document.querySelector(
  ".projects__section>section>header>p"
);

const mainThumbnailNavigation = document.querySelector(
  ".projects__section>section>.projects-gallery>.singleProject"
);

const mainThumbnailProjectDashboard = document.querySelector(
  ".projects__section>section>.projects-gallery>.singleProject>img"
);

const projectDashboardHeader = document.querySelector(
  ".projects__section>section>header"
);

const projectsExpandedContainer = document.querySelector(
  ".projects__section>section>.projects-expanded"
);
const projectPrefab = projectsExpandedContainer.querySelector("article");

let projectTransitionThread;
let projectsDB = [];
let bullets = [];

const LoadProjects = () => {
  projectsDB = [];
  bullets = [];

  db.collection("projects")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        storage
          .refFromURL(doc.data().thumbnail)
          .getDownloadURL()
          .then(function (url) {
            let project = {
              thumbnail: url,
              title: doc.data().title,
              description: doc.data().description,
              behance: doc.data().behance,
            };

            projectsDB.push(project);

            let bullet = bulletPrefab.cloneNode();
            bullet.style.display = "block";
            bulletContainer.appendChild(bullet);
            bullets.push(bullet);

            if (querySnapshot.size == projectsDB.length) {
              LoadBulletsListeners();
              RepresentProject(projectsDB, 10000, 0);
              CreateProjectsCards(projectsDB);
            }
          });
      });
    });
};

const RepresentProject = (projects, delay, firstProject) => {
  clearInterval(projectTransitionThread);

  let currentProject = firstProject;

  LoadProjectCard(
    projects[currentProject].thumbnail,
    projects[currentProject].title,
    projects[currentProject].description,
    projects[currentProject].behance
  );
  SelectBullet(currentProject);

  projectTransitionThread = setInterval(() => {
    currentProject++;

    if (currentProject >= projects.length) currentProject = 0;
    LoadProjectCard(
      projects[currentProject].thumbnail,
      projects[currentProject].title,
      projects[currentProject].description,
      projects[currentProject].behance
    );
    SelectBullet(currentProject);
  }, delay);
};

const CreateProjectsCards = (projects) => {
  projectsExpandedContainer.innerHTML = "";

  projects.forEach((project) => {
    let projectCard = projectPrefab.cloneNode(true);

    projectCard.querySelector("a").href = project.behance;
    projectCard.querySelector("a>div").style.backgroundImage ="url("+project.thumbnail+")";
    projectCard.querySelector("h1").textContent = project.title;


    projectCard.style.display = "flex";
    projectsExpandedContainer.appendChild(projectCard);
  });
};

const LoadProjectCard = (thumbnailUrl, title, description, behance) => {
  mainThumbnailProjectDashboard.style.opacity = 0;
  projectDashboardHeader.style.opacity = 0;

  setTimeout(() => {
    titleProjectDashboard.textContent = title;
    descriptionProjectDashboard.textContent = description;
    mainThumbnailProjectDashboard.src = thumbnailUrl;
    mainThumbnailNavigation.href = behance;
  }, 300);

  setTimeout(() => {
    mainThumbnailProjectDashboard.style.opacity = 1;
    projectDashboardHeader.style.opacity = 1;
  }, 650);
};

const LoadBulletsListeners = () => {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].addEventListener("click", () => {
      RepresentProject(projectsDB, 5000, i);
    });
  }
};

const SelectBullet = (index) => {
  bullets.forEach((bullet) => {
    bullet.classList.remove("selected");
  });
  bullets[index].classList.add("selected");
};

LoadProjects();
