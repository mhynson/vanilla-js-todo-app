// Grab the todo list container (the HTMLElement).
const todoListContainer = document.querySelector("#todo-list"); // This is one way to point to an HTML element.
const anotherWay = document.getElementById("todo-list");    // This is another way to point to an HTML element.

// Get a reference to the template.
const template = document.querySelector("#todo-item--template");

// Function: converts a response to a usuable JSON object
function responseToJSON(response) {
    return response.json();
}

// Function: handles the json data
function handleJSONData(json) {
    console.log("json", json);

    // Now loop through our list of data.
    json.forEach(item => {
        const templateMarkup = template.content.cloneNode(true);
        const templateId = templateMarkup.querySelector("[data-hook='id']");    // <td />
        const templateTitle = templateMarkup.querySelector("[data-hook='title']");    // <td />
        const templateCompleted = templateMarkup.querySelector("[data-hook='completed']");    // <td />

        templateId.innerHTML = item.id;
        templateTitle.innerHTML = item.title;
        templateCompleted.innerHTML = item.completed;

        todoListContainer.appendChild(templateMarkup)
    });
}

// Grab some data from the API.
const url = "https://jsonplaceholder.typicode.com/todos";
fetch(url)  // argument is a String
  .then(responseToJSON)    // the argument here is a function
  .then(handleJSONData)      // the argument here is a function

// A callback function is when a function gets passed in as a parameter into another function.

// Different ways to define variables - const, let, and var