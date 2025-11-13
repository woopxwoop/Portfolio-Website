import { getUserData } from "../data/enka.js";

import { penTricksList } from "../data/pen-tricks.js";

import { addDialogEvent } from "./header.js";

getEnkaData();

renderPenTricks();

addDialogEvent();

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
