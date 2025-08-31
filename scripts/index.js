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
  const aboutMeSection = document.querySelector(".about-me");
  const projectsSection = document.querySelector(".projects");
  const educationSection = document.querySelector(".class-list-container");

  document.querySelector(".header-about-me").addEventListener("click", () => {
    aboutMeSection.scrollIntoView({ block: "end", behavior: "smooth" });
  });
  document.querySelector(".header-projects").addEventListener("click", () => {
    projectsSection.scrollIntoView({ block: "end", behavior: "smooth" });
  });
  document.querySelector(".header-education").addEventListener("click", () => {
    educationSection.scrollIntoView({ block: "end", behavior: "smooth" });
  });
}
