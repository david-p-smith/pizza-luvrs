const Topping = require("../models/topping");
const { sortBy, values } = require("lodash");
const DynamoStore = require("./dynamoStore");

function init() {
  create("Dough Crust", "dough_crust.png", "dough_crust.png", 1);
  create("Marinara Sauce", "marinara_sauce.png", "marinara_sauce.png", 2);
  create(
    "Mozzarella Cheese",
    "mozzarella_cheese.png",
    "mozzarella_cheese.png",
    3
  );
  create("Cheddar Cheese", "cheddar.png", "cheddar_cheese.png", 4);
  create("Mushrooms", "mushroom.png", "mushrooms.png", 5);
  create("Pepperoni", "pepperoni.png", "pepperonis.png", 6);
  create("Laser Beams", "laser_beam.png", "laser_beams.png", 7);
  create("Banana Peppers", "banana_pepper.png", "banana_peppers.png", 8);
  create("Ham", "ham.png", "hams.png", 9);
  create("Green Peppers", "green_pepper.png", "green_peppers.png", 10);
  create("Rainbows", "rainbow.png", "rainbows.png", 11);
  create("Money", "money.png", "moneys.png", 12);
}

async function getAll() {
  const toppings = await DynamoStore.getAllItems("toppings");
  return sortBy(toppings, ["order"]);
}

async function create(name, previewImage, image, order) {
  const id = name.replace(/ /g, "_").toLowerCase();
  const topping = new Topping(id, name, previewImage, image, order);

  DynamoStore.putItem("toppings", topping);
}

module.exports = {
  getAll,
  init
};
