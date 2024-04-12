const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const todoListContainer = $("#todo-list");
const itemTemplate = $("#todo-item--template");

const dataHandler = (json) => {
    json.forEach(item => {
        const templateMarkup = itemTemplate.content.cloneNode(true);
        const templateCompleted = templateMarkup.querySelector("[data-hook='completed']");
        templateMarkup.querySelector("[data-hook='id']").innerHTML = item.id;
        templateMarkup.querySelector("[data-hook='title']").innerHTML = item.title;
        templateCompleted.innerHTML = templateCompleted.innerHTML
            .replace(/\{\{id\}\}/g, item.id)
            .replace(/\{\{checked\}\}/g, item.completed ? ' checked': '');

        todoListContainer.appendChild(templateMarkup)
    });
}

const showAlert = (id, isSuccess = false) => {
    const message = (isSuccess) ? 'Successfully updated' : 'Update failed';
    const extraClass = (isSuccess) ? 'alert-success' : 'alert-danger';
    $('.alert').innerHTML = `Item #${id}: ${message}`;
    $('.alert').classList.add('show', extraClass);
    clearTimeout(alertDisplayTimeout);
    alertDisplayTimeout = setTimeout(() => {
            $('.alert').classList.remove('show', 'alert-success', 'alert-danger')
        }, 3000);
};

fetch("https://jsonplaceholder.typicode.com/todos") 
  .then((response) => response.json())
  .then(dataHandler);

let alertDisplayTimeout;
$('body').addEventListener('click', (e) => {
    if (e.target.classList.contains('item-complete-checkbox')) {
        const id = e.target.dataset.id;
        const completed = e.target.checked;
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method:'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id, completed})
        })
        .then(response => showAlert(id, response.ok))
        .catch(error => {
            showAlert(id, false);
            console.error(error)
        });
    }
});