class Class {
  listing;
  description;
  link;

  constructor(classDetails) {
    this.listing = classDetails.listing;
    this.description = classDetails.description;
    this.link = classDetails.link;
  }

  getListing() {
    return this.listing;
  }

  getDescription() {
    return this.description;
  }
}

export let classList = [
  {
    listing: "MATH240",
    description: "Discrete Math",
  },
  {
    listing: "MATH340",
    description: "Linear Algebra",
  },
  {
    listing: "STAT324",
    description: "Statistics in R",
  },
  {
    listing: "CS252",
    description: "Low Level/ASM",
  },
  {
    listing: "CS354",
    description: "Low Level/C",
  },
  {
    listing: "CS300/400",
    description: "Data Structures",
  },
  {
    listing: "CS357",
    description: "Algorithims",
  },
];

classList = classList.map((c) => new Class(c));
