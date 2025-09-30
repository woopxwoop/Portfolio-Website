import { classList } from "../data/classList.js";

import { getUserData } from "../data/enka.js";

const UID = 621003558;

let genshinUser;

try {
  genshinUser = await getUserData();
} catch (error) {
  console.error("Invalid fetch");
}

if (genshinUser) {
  console.log(genshinUser);
}

renderClassList();

addHeaderEvents();

function renderClassList() {
  let classListHTML = "";
  classList.forEach((c) => {
    classListHTML += `<li>${c.getListing()}: ${c.getDescription()}</li>`;
  });

  document.querySelector(".class-list").innerHTML = classListHTML;
}

function addHeaderEvents() {
  const aboutMeSection = document.querySelector(".about-me-section");
  const projectsSection = document.querySelector(".projects-section");
  const educationSection = document.querySelector(".class-list-section");

  document.querySelector(".header-about-me").addEventListener("click", () => {
    aboutMeSection.scrollIntoView({ block: "start", behavior: "smooth" });
  });
  document.querySelector(".header-projects").addEventListener("click", () => {
    projectsSection.scrollIntoView({ block: "start", behavior: "smooth" });
  });
  document.querySelector(".header-education").addEventListener("click", () => {
    educationSection.scrollIntoView({ block: "start", behavior: "smooth" });
  });
  document.querySelector(".header-contact-me").addEventListener("click", () => {
    alert(
      "Uh I should probably change this but this will do for now... Find me at louan1734@gmail.com or alou2@wisc.edu"
    );
  });
}

window.onload = () => {
  document.querySelector(".popup-container").style.display = "block";
  document.querySelector(".popup-overlay").style.display = "block";
};

document.querySelector(".close-popup").addEventListener("click", () => {
  document.querySelector(".popup-container").style.display = "none";
  document.querySelector(".popup-overlay").style.display = "none";
});
