import { classList } from "../data/classList.js";

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
