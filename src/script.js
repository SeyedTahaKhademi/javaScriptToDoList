const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const validate = document.getElementById('input-invalid');
const listItem = document.getElementById('item-list');
const itemClear = document.getElementById('items-clear');
const filter = document.getElementById('filter');

// نمایش آیتم‌های ذخیره شده
document.addEventListener('DOMContentLoaded', displayItems);

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDOM(item));
    checkUI();
}

// اضافه کردن آیتم جدید
function addItem(e) {
    e.preventDefault();
    const newItem = itemInput.value.trim();

    if (newItem === '') {
        validate.innerText = 'لطفا مقداری وارد کنید!';
        return;
    }

    addItemToDOM(newItem);
    addItemToStorage(newItem);
    itemInput.value = '';
    validate.innerText = '';
    checkUI();
}

// افزودن آیتم به DOM
function addItemToDOM(item) {
    const li = document.createElement('li');
    li.className = 'list-item';
    li.textContent = item;

    const icon = createIcon('bi bi-x fs-5 text-danger');
    li.appendChild(icon);

    listItem.appendChild(li);
}

// ایجاد آیکون حذف
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    icon.style.cursor = 'pointer';
    return icon;
}

// ذخیره آیتم در LocalStorage
function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// دریافت آیتم‌ها از LocalStorage
function getItemsFromStorage() {
    return localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
}

// حذف آیتم
function onClickItem(e) {
    if (e.target.classList.contains('bi-x')) {
        const item = e.target.parentElement.textContent;
        e.target.parentElement.remove();
        // removeItemFromStorage(item);
        checkUI();
    }
}

// حذف آیتم از LocalStorage
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// پاک کردن همه آیتم‌ها
function removeItems() {
    listItem.innerHTML = '';
    localStorage.removeItem('items');
    checkUI();
}

// فیلتر کردن آیتم‌ها
function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = listItem.querySelectorAll('li');

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        item.style.display = itemName.indexOf(text) !== -1 ? 'flex' : 'none';
    });
}

// بررسی وضعیت UI
function checkUI() {
    const items = listItem.querySelectorAll('li');
    itemClear.style.display = items.length === 0 ? 'none' : 'block';
    filter.style.display = items.length === 0 ? 'none' : 'block';
}

// رویداد‌ها
itemForm.addEventListener('submit', addItem);
listItem.addEventListener('click', onClickItem);
itemClear.addEventListener('click', removeItems);
filter.addEventListener('input', filterItems);
