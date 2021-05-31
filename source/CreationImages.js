let creationImageDOM = document.querySelector(".love-creation>main>.image");
let aboutMe = document.querySelector(".more-about-me");

let transitionInterval;

const DownloadCreationImages = () => {
  db.collection("creation_examples")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let creationImages = [];

        doc.data().creation_images_links.forEach((link) => {
          storage
            .refFromURL(link)
            .getDownloadURL()
            .then(function (url) {
              creationImages.push(url);

              if (
                creationImages.length == doc.data().creation_images_links.length
              )
                TransitionBackgrounds(creationImageDOM, creationImages, 10000);
            });
        });
      });
    });
};

const TransitionBackgrounds = (element, urls, delay) => {
  clearInterval(transitionInterval);
  let currentUrl = 0;

  element.style.backgroundImage = "url(" + urls[currentUrl] + ")";

  transitionInterval = setInterval(() => {
    if (moreAboutMe.style.display == "none") {
      clearInterval(transitionInterval);
    }

    currentUrl++;
    if (currentUrl >= urls.length) currentUrl = 0;
    element.style.backgroundImage = "url(" + urls[currentUrl] + ")";
  }, delay);
};
