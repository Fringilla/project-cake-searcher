'use strict';

// Required for prompt() in Node.js
const prompt = require("prompt-sync")();

// Req. 1.1 Import the cake recipes from the JSON file
const cakeRecipes = require("./cake-recipes.json");

let savedRecipes = []; // Global variable to store saved recipes

// Your functions here

const getAllAuthors = (recipes) => {
  const authors = new Set();
  recipes.forEach(recipe => {
    authors.add(recipe.Author);
  });
  return Array.from(authors).toSorted();
}

const getRecipeNamesByAuthor = (author, recipes) => {
  const query = recipes.filter(recipe => recipe.Author.toLowerCase() === author.toLowerCase());
  return Array.from(query.map(recipe => recipe.Name)).toSorted();
}

const getRecipeNamesByIngredient = (ingredient, recipes) => {
  const query = recipes.filter(recipe => recipe.Ingredients.some(i => i.toLowerCase().includes(ingredient.toLowerCase())));
  return Array.from(query.map(recipe => recipe.Name)).toSorted();
}

const getRecipeByName = (name, recipes) => {
  return recipes.find(recipe => recipe.Name.toLowerCase() === name.toLowerCase());
}

const getAllIngredientsOfSavedRecipes = (recipes) => {
  const ingredients = new Set();
  recipes.forEach(recipe => {
    if (recipe && recipe.Ingredients) {
      recipe.Ingredients.forEach(ingredient => {
        ingredients.add(ingredient);
      });
    }
  });
  return Array.from(ingredients).toSorted();
}

// Menu functions and user interaction

// Show All Authors
// - When this option is selected, the program should display a list of all unique authors found in the recipe data.
const showAllAuthors = () => {
  const authors = getAllAuthors(cakeRecipes);
  console.log("All Authors:");
  //authors.forEach(author => console.log(author));
  for (let i = 0; i < authors.length; i += 5) {
    console.log(`${(authors[i] || "").padEnd(19)} ${(authors[i + 1] || "").padEnd(19)} ${(authors[i + 2] || "").padEnd(19)} ${(authors[i + 3] || "").padEnd(19)} ${(authors[i + 4] || "").padEnd(19)}`);
  }
}

// Show Recipe Names by Author
// - If you choose this option, you will be prompted to enter the name of an author.
// - The program will then display a list of recipe names authored by the specified author.
const showRecipeNamesByAuthor = () => {
  let author = prompt("Enter the author's name: ");
  console.log();
  const recipes = getRecipeNamesByAuthor(author, cakeRecipes);
  if (recipes.length > 0) {
    // Get the correct case for the author's name
    author = cakeRecipes.find(recipe => recipe.Author.toLocaleLowerCase() === author.toLocaleLowerCase())?.Author || author;
    console.log(`Recipes by ${author}:`);
    //recipes.forEach(recipe => console.log(recipe));
    for (let i = 0; i < recipes.length; i += 2) {
      console.log(`${(recipes[i] || "").padEnd(39)} ${(recipes[i + 1] || "").padEnd(39)}`);
    }
  } else {
    console.log(`No recipes found for author: ${author}`);
  }
}

// Show Recipe Names by Ingredient
// - This option allows you to search for recipes containing a specific ingredient.
// - You will be prompted to enter the name of the ingredient.
// - The program will display a list of recipe names that include the entered ingredient.
const showRecipeNamesByIngredient = () => {
  const ingredient = prompt("Enter the ingredient: ");
  console.log();
  const recipes = getRecipeNamesByIngredient(ingredient, cakeRecipes);
  if (recipes.length > 0) {
    console.log(`Recipes containing ${ingredient}:`);
    //recipes.forEach(recipe => console.log(recipe));
    for (let i = 0; i < recipes.length; i += 2) {
      console.log(`${(recipes[i] || "").padEnd(39)} ${(recipes[i + 1] || "").padEnd(39)}`);
    }
  } else {
    console.log(`No recipes found containing ingredient: ${ingredient}`);
  }
}

// Get Recipe by Name
// - If you select this option, you can search for a recipe by its name.
// - Enter the name of the recipe you're looking for.
// - The program will display the details of the found recipe.
// - You'll also have the option to save the ingredients of the recipe. Save them in a global variable, so that you can save the ingredients of multiple recipes and also use it for the next step. 
const showRecipeByName = () => {
  const name = prompt("Enter the recipe name: ");
  console.log();
  const recipe = getRecipeByName(name, cakeRecipes);
  if (recipe) {
    console.log(`Recipe: ${recipe.Name}`);
    console.log(`Author: ${recipe.Author}`);
    console.log(`Ingredients: ${recipe.Ingredients.join(", ")}`);

    if (savedRecipes.some(saved => saved.Name === recipe.Name)) {
      console.log("This recipe is already saved.");
    } else {
      const save = prompt("Do you want to save the ingredients of this recipe? (yes/no): ").toLowerCase();
      if (save === "yes" || save === "y") {
        savedRecipes.push(recipe);
        console.log("Recipe saved.");
      }
    }
  } else {
    console.log(`No recipe found with name: ${name}`);
  }
}

// Get All Ingredients of Saved Recipes
// - Choose this option to view a list of ingredients from the saved recipes.
// - The program will display the ingredient list from all the saved recipes.
const showAllIngredientsOfSavedRecipes = () => {
  const ingredients = getAllIngredientsOfSavedRecipes(savedRecipes);
  console.log("All Ingredients of Saved Recipes:");
  ingredients.forEach(ingredient => console.log(ingredient));
}

// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("8. Run tests");
  console.log("9. Clear Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}


let choice;

do {
  choice = displayMenu();
  console.log();
  // console.clear();
  // console.log("\x1b[2J\x1b[0;0H"); // Clear the console
  switch (choice) {
    case 1:
      showAllAuthors();
      break;
    case 2:
      showRecipeNamesByAuthor();
      break;
    case 3:
      showRecipeNamesByIngredient();
      break;
    case 4:
      showRecipeByName();
        break;
    case 5:
      showAllIngredientsOfSavedRecipes();
      break;
    case 8:
      console.log("Running tests...");
      console.log(getAllAuthors(cakeRecipes));
      console.log(getRecipeNamesByAuthor("John Doe", cakeRecipes));
      console.log(getRecipeNamesByIngredient("flour", cakeRecipes));
      savedRecipes = [getRecipeByName("Chocolate fruitcake", cakeRecipes)];
      console.log(getAllIngredientsOfSavedRecipes(savedRecipes));
      break;
    case 9:
      savedRecipes = [];
      console.log("Saved recipes cleared.");
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);