const titleProjectDashboard = document.querySelector(
  ".projects__section>section>header>h1"
);
const descriptionProjectDashboard = document.querySelector(
  ".projects__section>section>header>p"
);

const mainThumbnailNavigation = document.querySelector(
  ".projects__section>section>main>a"
);

const mainThumbnailProjectDashboard = document.querySelector(
  ".projects__section>section>main>a>img"
);

const projectDashboardHeader = document.querySelector(
  ".projects__section>section>header"
);

let projectTransitionThread;
let projectsDB = [];

const LoadProjects = () => {
  projectsDB = [];

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

            if (querySnapshot.size == projectsDB.length)
              RepresentProject(projectsDB, 10000, 0);
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

  projectTransitionThread = setInterval(() => {
    currentProject++;

    if (currentProject >= projects.length) currentProject = 0;
    LoadProjectCard(
      projects[currentProject].thumbnail,
      projects[currentProject].title,
      projects[currentProject].description,
      projects[currentProject].behance
    );
  }, delay);
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
  }, 600);
};

LoadProjects();
