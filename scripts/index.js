import { classList } from "../data/class-list.js";

import { getUserData } from "../data/enka.js";

import { pictures } from "../data/pictures.js";

import { penTricksList } from "../data/pen-tricks.js";

import { projects } from "../data/projects.js";

getEnkaData();

renderClassList();

addHeaderEvents();

renderHeadShots();

renderPenTricks();

// renderPopup();

renderProjects();

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

function addDialogEvent() {
  const dialog = document.querySelector(".dialog-overview");
  const openButton = document.querySelector(".header-contact-me");
  const closeButton = dialog.querySelector('sl-button[slot="footer"]');

  openButton.addEventListener("click", () => dialog.show());
  closeButton.addEventListener("click", () => dialog.hide());
}

function renderPenTricks() {
  const carousel = document.querySelector("sl-carousel");

  penTricksList.forEach((penTrick) => {
    carousel.innerHTML += `<sl-carousel-item role="tabpanel">
            <sl-card class = "card-header">
              <div slot="header">${penTrick.name}</div>
              <sl-animated-image
                play
                src="${penTrick.src}"
                alt="${penTrick.alt}"
              >
              </sl-animated-image>
            </sl-card>
          </sl-carousel-item>`;
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
                    <div class="col-sm-12 col-md-6 col-lg-6">
                        <div class="card project-card h-100">
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

async function getEnkaData(cacheKey = "enkaData", ttl = 3600_000) {
  // default 1 hour TTL
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    const age = Date.now() - timestamp;

    if (age < ttl) {
      // Still fresh
      console.log("Using cached data");
      return data;
    }
  }

  const UID = 621003558;

  let userData;

  try {
    getUserData().then((data) => {
      userData = data;
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ userData, timestamp: Date.now() })
      );
    });
  } catch (error) {
    console.error("Invalid fetch");
    return;
  }
}
