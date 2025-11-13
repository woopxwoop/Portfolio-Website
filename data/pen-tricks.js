class PenTrick {
  name;
  src;
  alt;

  constructor(name) {
    this.name = name;
    this.src = `./media/webps/pen-spinning/${name}.webp`;
    this.alt = `Pen spinning trick: ${name}`;
  }
}

export let penTricksList = [
  {
    name: "fingerpass",
  },
  {
    name: "thumbaround",
  },
  {
    name: "charge",
  },
  {
    name: "sonic",
  },
  {
    name: "twisted sonic",
  },
  {
    name: "shadow",
  },
];

penTricksList = penTricksList.map(({ name }) => new PenTrick(name));
