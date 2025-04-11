const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const inputInvalid = document.getElementById('input-invalid');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('items-clear');
const itemFilter = document.getElementById('filter');
const formBTN = itemForm.querySelector('button');
let isEditMode = false ; 
function displayItems() {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    // Validate Input
    if (newItem == '') {
        inputInvalid.innerText = 'Please add an item';
        return;
    } else {
        inputInvalid.innerText = '';
    } ;

    if(isEditMode) {
      const itemToEdit = itemList.querySelector('.edit-mode');
        
      removeItemFromLocalStorage(itemToEdit.textContent)
      itemToEdit.remove()
      formBTN.innerHTML = '<i class="bi bi-plus"></i>Add  item' 
      formBTN.classList.replace('btn-primary' , 'btn-dark') 


      isEditMode = false
    }

    addItemToDOM(newItem);

    addItemToStorage(newItem);

    itemInput.value = '';
    checkUI();
}

function addItemToDOM(item) {
    const li = document.createElement('li');
    li.className = 'list-item';
    li.textContent = item;

    const icon = createIcon('bi bi-x fs-5 text-danger');
    li.appendChild(icon);

    itemList.appendChild(li);
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;

    return icon;
}

function onClickItem(e) {
    // e.target.parentElement.remove();
    // console.log(e.target.classList.contains('bi-x'));
    if (e.target.classList.contains('bi-x')) {
        removeItem(e.target.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function clearItems() {
    itemList.innerHTML = '';
    localStorage.removeItem('items');
    checkUI();
} ; 
function removeItem(item){
        item.remove();
        removeItemFromLocalStorage(item.textContent);
        checkUI();
} ;
function setItemToEdit(item) {
     isEditMode = true;
    itemList.querySelectorAll('li').forEach(item => item.classList.remove('edit-mode'));
        item.classList.add('edit-mode');
        itemInput.value = item.textContent;
        formBTN.innerHTML = 'update item';
        formBTN.classList.replace('btn-dark' , 'btn-primary') ;
}
function removeItemFromLocalStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((i) => i !==item);
    localStorage.setItem('items' , JSON.stringify(itemsFromStorage));
    
}

function checkUI() {
    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) !== -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Event Listener
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();