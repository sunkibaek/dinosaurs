const main = async () => {
  // Create Dino Constructor
  class Dino {
    constructor({ species, weight, height, diet, where, when, fact }) {
      this.species = species;
      this.weight = weight;
      this.height = height;
      this.diet = diet;
      this.where = where;
      this.when = when;
      this.fact = fact;
    }

    toHtml = () => {
      const container = document.createElement("div");
      container.className = "grid-item";

      const name = document.createElement("h3");
      name.innerHTML = this.species;

      const description = document.createElement("p");
      description.innerHTML = `Height: ${this.height}<br />Weight: ${this.weight}<br />Diet: ${this.diet}`;

      container.appendChild(name);
      container.appendChild(description);

      return container;
    };
  }

  // Create Dino Objects
  const dinosData = await fetch("./dino.json").then(
    async (response) => await response.json()
  );

  const dinos = dinosData.Dinos.map((dinoData) => {
    return new Dino(dinoData);
  });

  // Create Human Object
  class Human {
    constructor({ name, height, weight, diet }) {
      this.name = name;
      this.height = height; // in inches
      this.weight = weight; // in lbs
      this.diet = diet; // herbavor | omnivor | carnivor
    }

    toHtml = () => {
      const container = document.createElement("div");
      container.className = "grid-item";

      const name = document.createElement("h3");
      name.innerHTML = this.name;

      const description = document.createElement("p");
      description.innerHTML = `Height: ${this.height}<br />Weight: ${this.weight}<br />Diet: ${this.diet}`;

      container.appendChild(name);
      container.appendChild(description);

      return container;
    };
  }

  // Use IIFE to get human data from form
  const buildHumanFromFormData = (formData) => {
    const name = formData.get("name");
    const feet = formData.get("feet");
    const inches = formData.get("inches");
    const height = Number(feet) * 12 + Number(inches);
    const weight = Number(formData.get("weight"));
    const diet = formData.get("diet").toLowerCase();

    return new Human({
      name,
      height,
      weight,
      diet,
    });
  };

  // Create Dino Compare Method 1
  // NOTE: Weight in JSON file is in lbs, height in inches.

  // Create Dino Compare Method 2
  // NOTE: Weight in JSON file is in lbs, height in inches.

  // Create Dino Compare Method 3
  // NOTE: Weight in JSON file is in lbs, height in inches.

  // Generate Tiles for each Dino in Array
  const buildDinoNodes = (dinos, human) => {
    dinos.splice(4, 0, human);

    return dinos.map((dino) => {
      return dino.toHtml();
    });
  };

  // Add tiles to DOM
  const appendToGrid = (dinoNodes) => {
    const grid = document.querySelector("#grid");
    dinoNodes.forEach((node) => {
      grid.appendChild(node);
    });
  };

  // Remove form from screen
  const removeForm = () => {
    const form = document.querySelector("#dino-compare");
    form.remove();
  };

  // On button click, prepare and display infographic
  const compareButton = document.querySelector("#btn");

  compareButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const formData = new FormData(document.querySelector("#dino-compare"));
    const human = buildHumanFromFormData(formData);
    const dinoNodes = buildDinoNodes(dinos, human);

    appendToGrid(dinoNodes);
    removeForm();
  });
};

main();
