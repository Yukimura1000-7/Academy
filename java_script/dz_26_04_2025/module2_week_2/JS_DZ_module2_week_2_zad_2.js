const receipt = [
    { name: "Шоколадка", quantity: 3, price: 100 },
    { name: "Хлеб", quantity: 2, price: 55 },
    { name: "Молоко", quantity: 1, price: 120 },
    { name: "Сыр", quantity: 1, price: 300 }
];

function printReceipt() 
{
    let output = "<h3>Чек:</h3>";
    receipt.forEach(item => 
    {
        output += `<div>${item.name} (x${item.quantity}) - ₽${item.price.toFixed(2)} за 1 ед</div>`;
    });
    document.getElementById('result').innerHTML = output;
}

function calculateTotal() 
{
    const total = receipt.reduce((sum, item) => sum + item.quantity * item.price, 0);
    document.getElementById('result').textContent = `Общая сумма: ₽${total.toFixed(2)}`;
}

function findMostExpensive() 
{
    const mostExpensive = receipt.reduce((max, item) => 
        {
        const totalPrice = item.quantity * item.price;
        return totalPrice > (max.totalPrice || 0) ? { ...item, totalPrice } : max;
    }, {});
    document.getElementById('result').innerHTML = `Самая дорогая позиция: ${mostExpensive.name} - ₽${mostExpensive.totalPrice.toFixed(2)}`;
}


function calculateAverage() 
{
    const totalQuantity = receipt.reduce((sum, item) => sum + item.quantity, 0);
    const totalCost = receipt.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const average = totalQuantity > 0 ? totalCost / totalQuantity : 0;
    document.getElementById('result').textContent = `Средння стоимость товара: ₽${average.toFixed(2)}`;
}

document.getElementById('printReceiptButton').addEventListener('click', printReceipt);
document.getElementById('calculateTotalButton').addEventListener('click', calculateTotal);
document.getElementById('findMostExpensiveButton').addEventListener('click', findMostExpensive);
document.getElementById('calculateAverageButton').addEventListener('click', calculateAverage);