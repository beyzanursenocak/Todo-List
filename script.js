// Todo Eleman Ekleme

// Eleman Seçimi

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName')
const btnAddTask = document.querySelector('#btnAddTask')
const btnDeletteAll = document.querySelector('#btnDeleteAll')
const taskList = document.querySelector('#task-list')
// const items = ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4', 'Todo 5', 'Todo 6']
let todos

// load items
loadItems()


eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener('submit', addNewItem)
    // delete an item
    taskList.addEventListener('click', deleteItem)
    // delete all item
    btnDeleteAll.addEventListener('click', deleteAllItems)
}

function loadItems() {
    todos = getItemsFromLS()
    todos.forEach(function (item) {
        createItem(item);
    })
}

// get iitems from local storage
function getItemsFromLS() {
    if (localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    return todos;
}

// set item to Local Storage
function setItemToLS(newTodo) {
    todos = getItemsFromLS();
    todos.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function createItem(newTodo) {
    // li oluşturma
    const li = document.createElement('li')
    li.className = 'list-group-item list-group-item-secondary'
    li.appendChild(document.createTextNode(newTodo))

    // a oluşturmak
    const a = document.createElement('a');
    a.classList = 'delete-item float-right'
    a.setAttribute('href', '#')
    a.innerHTML = '<i class="fas fa-times"></i>'
    li.appendChild(a)
    taskList.appendChild(li)
}

function addNewItem(e) {
    if (input.value === '') {
        alert('Add New Item')
        // console.log('submit')
    }

    // create item
    createItem(input.value)
    setItemToLS(input.value)
    input.value = ''

    e.preventDefault()
}

// Eleman Silme
function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        if (confirm('Silmek Istediğinize Emin Misiniz ?')) {
            // console.log(e.target)
            e.target.parentElement.parentElement.remove()
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        }
    }
    e.preventDefault()

}

function deleteTodoFromStorage(deletetodo) {
    let todos = getItemsFromLS()
    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1)
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Tüm Elemanları Silme
function deleteAllItems(e) {
    if (confirm('Tüm Elemanları Silmek Istediğinize Emin Misiniz ?')) {
        // console.log(e.target)
        // taskList.childNodes.forEach(function (item) {
        //     // console.log(item)
        //     if (item.nodeType === 1) {
        //         item.remove()
        //     }
        // })
        // taskList.innerHTML=""
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }
        localStorage.clear()
    }
}
