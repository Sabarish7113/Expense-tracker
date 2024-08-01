let expenses = [];

document.getElementById('add-item').addEventListener('click', addItem);
document.getElementById('filter-category').addEventListener('change', filterItems);

function addItem() {
    const name = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const date = document.getElementById('item-date').value;
    const category = document.getElementById('item-category').value;

    if (name && price && date) {
        const expense = { id: Date.now(), name, price, date, category };
        expenses.push(expense);
        renderItems(expenses);
        updateTotal();
        clearInputs();
    } else {
        alert("Please fill in all fields");
    }
}

function renderItems(items) {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';

    items.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.price.toFixed(2)}</td>
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>
                <button onclick="editItem(${expense.id})">Edit</button>
                <button onclick="deleteItem(${expense.id})">Delete</button>
            </td>
        `;
        itemList.appendChild(row);
    });
}

function clearInputs() {
    document.getElementById('item-name').value = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-date').value = '';
    document.getElementById('item-category').value = 'Food';
}

function deleteItem(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    renderItems(expenses);
    updateTotal();
}

function editItem(id) {
    const expense = expenses.find(exp => exp.id === id);

    document.getElementById('item-name').value = expense.name;
    document.getElementById('item-price').value = expense.price;
    document.getElementById('item-date').value = expense.date;
    document.getElementById('item-category').value = expense.category;

    deleteItem(id);
}

function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.price, 0);
    document.getElementById('total-expenses').textContent = total.toFixed(2);
}

function filterItems() {
    const category = document.getElementById('filter-category').value;
    const filteredItems = category === 'All' ? expenses : expenses.filter(expense => expense.category === category);
    renderItems(filteredItems);
}
