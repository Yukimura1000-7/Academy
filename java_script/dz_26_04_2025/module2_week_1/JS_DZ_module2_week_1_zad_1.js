const car = 
{
    manufacturer: "Toyota",
    model: "Camry",
    year: 2020,
    averageSpeed: 80
};

function displayCarInfo() 
{
    const info = `Марка машины: ${car.manufacturer}<br>
                  Модель: ${car.model}<br>
                  Год: ${car.year}<br>
                  Средняя скорость: ${car.averageSpeed} км/ч`;
    document.getElementById('result').innerHTML = info;
}

function calculateTravelTime(distance) 
{
    if (distance <= 0) 
        {
        throw new Error("Дистанция должна быть положительным числом.");
    }

    const drivingTime = distance / car.averageSpeed;
    const breakHours = Math.floor(drivingTime / 4);
    const totalTime = drivingTime + breakHours;

    return `${Math.floor(totalTime)} hours ${Math.round((totalTime % 1) * 60)} minutes`;
}

document.getElementById('showInfoButton').addEventListener('click', function () 
{
    displayCarInfo();
});

document.getElementById('calculateTimeButton').addEventListener('click', function () 
{
    try {
        const distance = parseFloat(document.getElementById('distanceInput').value);
        const time = calculateTravelTime(distance);
        document.getElementById('result').innerHTML = `Итоговое время: ${time}`;
    } catch (error) {
        document.getElementById('result').textContent = `Ошибка: ${error.message}`;
    }
});