let shoppingList = [];

function displayShoppingList() 
{
    const sortedList = shoppingList.sort((a, b) => a.bought - b.bought);

    let output = "<h3>Список покупок:</h3>";
    sortedList.forEach(item => 
    {
        const statusClass = item.bought ? "bought" : "not-bought";
        output += `<div class="${statusClass}">${item.name} (x${item.quantity}) - ${item.bought ? "Куплено" : "Не куплено"}</div>`;
    });

    document.getElementById('result').innerHTML = output;
}


function addProduct(name, quantity) 
{
    const existingProduct = shoppingList.find(item => item.name === name);

    if (existingProduct) 
    {
        existingProduct.quantity += quantity; 
    } 
    else 
    {
        shoppingList.push({ name, quantity, bought: false });
    }
}

function markAsBought(name) 
{
    const product = shoppingList.find(item => item.name === name);

    if (product) 
    {
        product.bought = true;
    } 
    else 
    {
        document.getElementById('result').textContent = `Ошибка: продукт "${name}" не был найден.`;
    }
}

document.getElementById('showListButton').addEventListener('click', function () 
{
    displayShoppingList();
});

document.getElementById('addProductButton').addEventListener('click', function () 
{
    const name = document.getElementById('productName').value.trim();
    const quantity = parseInt(document.getElementById('productQuantity').value, 10);

    if (!name || isNaN(quantity) || quantity <= 0) 
    {
        document.getElementById('result').textContent = "Ошибка: Проверьте правильность названия.";
        return;
    }

    addProduct(name, quantity);
    displayShoppingList();
});

document.getElementById('markBoughtButton').addEventListener('click', function () 
{
    const name = document.getElementById('markProductName').value.trim();

    if (!name) 
    {
        document.getElementById('result').textContent = "Ошибка: Введите название продукта.";
        return;
    }

    markAsBought(name);
    displayShoppingList();
});