import { classList } from "../data/class-list.js";

import { pictures } from "../data/pictures.js";

import { projects, contributions } from "../data/projects.js";

import { addDialogEvent } from "./header.js";

renderClassList();

// addHeaderEvents();

renderHeadShots();

// renderPopup();

renderProjects();

renderContributions();

addDialogEvent();

function renderClassList() {
  let classListHTML = "";
  classList.forEach((c, index) => {
    const projects = c.getProjects() || [];
    const hasProjects = projects.length > 0;

    let projectsHTML = "";
    projects.forEach((project) => {
      projectsHTML += `<p> <div class = "blue">${project.getTitle()}</div>: ${project.getDescription()} </p>`;
    });

    classListHTML += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${index}">
          <button class="accordion-button ${
            !hasProjects ? "no-expand" : "collapsed"
          }" 
                  type="button" 
                  ${hasProjects ? `data-bs-toggle="collapse"` : ""}
                  ${hasProjects ? `data-bs-target="#collapse${index}"` : ""}
                  aria-expanded="false"
                  aria-controls="collapse${index}">
            ${c.getListing()}: ${c.getDescription()}
            ${hasProjects ? `<span class="arrow"></span>` : ""}
          </button>
        </h2>
        ${
          hasProjects
            ? `
        <div id="collapse${index}" class="accordion-collapse collapse" 
             aria-labelledby="heading${index}" 
             data-bs-parent="#accordionExample">
          <div class="accordion-body class-projects">
            ${projectsHTML}
          </div>
        </div>`
            : ""
        }
      </div>`;
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

  // document.querySelector(".header-contact-me").addEventListener("click", () => {
  //   alert(
  //     "Uh I should probably change this but this will do for now... Find me at louan1734@gmail.com or alou2@wisc.edu"
  //   );
  // });

  addDialogEvent();
}

function renderHeadShots() {
  let carouselHTML = "";
  const carousel = document.querySelector(".carousel-inner");

  pictures.forEach((picture, index) => {
    carouselHTML += `<div class="carousel-item ${
      index == pictures.length - 1 ? "active" : ""
    }">
                    <img src="${picture.src}" alt="${picture.alt}" />
                   </div>`;
  });

  carousel.innerHTML = carouselHTML;
}

function renderPopup() {
  window.onload = () => {
    document.querySelector(".popup-container").style.display = "block";
    document.querySelector(".popup-overlay").style.display = "block";
  };

  document.querySelector(".close-popup").addEventListener("click", () => {
    document.querySelector(".popup-container").style.display = "none";
    document.querySelector(".popup-overlay").style.display = "none";
  });
}

function renderProjects() {
  const projectContainer = document.querySelector(".projects-container");
  projectContainer.innerHTML = "";

  projects.forEach((project) => {
    const techBadges = project.technologies
      .map(
        (tech) => `<span class="badge tech-badge bg-secondary">${tech}</span>`
      )
      .join("");

    const projectCard = `
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="card project-card h-80">
                            <img src="${project.image}" class="card-img-top" alt="${project.title}">
                            <div class="card-body">
                                <h5 class="card-title">${project.title}</h5>
                                <p class="card-text">${project.description}</p>
                                <div class="mb-3">
                                    ${techBadges}
                                </div>
                                <a href="${project.link}" target="_blank" class="btn btn-primary mt-auto">View Project</a>
                            </div>
                        </div>
                    </div>
                `;

    projectContainer.innerHTML += projectCard;
  });
}

function renderContributions() {
  const projectContainer = document.querySelector(".contributions-container");
  projectContainer.innerHTML = "";

  contributions.forEach((project) => {
    const techBadges = project.technologies
      .map(
        (tech) => `<span class="badge tech-badge bg-secondary">${tech}</span>`
      )
      .join("");

    const projectCard = `
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="card project-card h-80">
                            <img src="${project.image}" class="card-img-top" alt="${project.title}">
                            <div class="card-body">
                                <h5 class="card-title">${project.title}</h5>
                                <p class="card-text">${project.description}</p>
                                <div class="mb-3">
                                    ${techBadges}
                                </div>
                                <a href="${project.link}" target="_blank" class="btn btn-primary mt-auto">View Project</a>
                            </div>
                        </div>
                    </div>
                `;

    projectContainer.innerHTML += projectCard;
  });
}
