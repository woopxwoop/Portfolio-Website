class Class {
  listing;
  description;
  link;
  projects;

  constructor(classDetails) {
    this.listing = classDetails.listing;
    this.description = classDetails.description;
    this.link = classDetails.link;
    this.projects = classDetails.projects?.map(
      (project) => new Project(project)
    );
  }

  getListing() {
    return this.listing;
  }

  getDescription() {
    return this.description;
  }

  getProjects() {
    return this.projects;
  }
}

class Project {
  title;
  description;

  constructor(projectDetails) {
    this.title = projectDetails.title;
    this.description = projectDetails.description;
  }

  getTitle() {
    return this.title;
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
    description: "Intro to CompE/ASM",
    projects: [
      {
        title: "Lowest Level For Loop",
        description:
          "Wrote a for loop in binary according to x86 opcode specification",
      },
      {
        title: "Collatz Conjecture in ASM",
        description:
          "Wrote a program which calculates the number of steps it takes for a number to converge based on the Collatz Conjecture in x86 Assembly",
      },
    ],
  },
  {
    listing: "CS354",
    description: "Low Level/C",
    projects: [
      {
        title: "Sudoku Checker",
        description:
          "Wrote a program which reads in a sudoku board and checks whether it's valid in C",
      },
      {
        title: "Dynamic Memory Allocator",
        description:
          "Recreated the Heap's memory allocation system with Malloc and Free, using a Best-fit allocating policy and immediate coalescing",
      },
      {
        title: "Cache Simulator",
        description:
          "Wrote a program which simulates the cache in which the user can specify the memory layout and shows how memory accesses are affected by the cache",
      },
      {
        title: "Signal Handler",
        description:
          "Wrote custom signals and signals handlers which allows the user to sends signals between processes through the kernel",
      },
    ],
  },
  {
    listing: "CS300/400",
    description: "Programming I & II [Java]",
    projects: [
      {
        title: "Animated Walking",
        description:
          "Animated a figure walking using PImage, allowing users to add more figures and toggle which figures are walking",
      },
      {
        title: "iSongly",
        description:
          "Implemented the Red-Black Tree data structure as the underlying data structure to efficiently sort and store songs, allowing the user to sort and query songs based on tempo, date, etc...",
      },
      {
        title: "Shortest Path",
        description:
          "Implemented Dijkstra's Algorithm to find the shortest path between two locations on campus.",
      },
    ],
  },
  {
    listing: "CS537",
    description: "Operating Systems [C]",
    projects: [
      {
        title: "Shell",
        description:
          "Wrote a program to simulate a shell in a Linux environment with functionality for aliases, pipes, history, etc...",
      },
      {
        title: "STCF",
        description:
          "Modified the xv6 scheduler to use a Shortest Time to Completion First scheduler to minimize turnaround time and adding compatibility with process yielding and process creation",
      },
      {
        title: "MMIO",
        description:
          "Simulate Memory-Mapped IO and Huge Pages, allowing these attached devices to communicate with the process and perform computations",
      },
      {
        title: "Concurrency",
        description:
          "Wrote a program using Locks, Semaphores, and Condition Variables to guarantee concurrency for the reader-writer problem and the bounded-buffer problem.",
      },
    ],
  },
  {
    listing: "CS540",
    description: "Intro to AI",
  },
  {
    listing: "CS571",
    description: "UI/UX/Frontend",
  },
  {
    listing: "CS577",
    description: "Algorithims",
  },
];

classList = classList.map((c) => new Class(c));
