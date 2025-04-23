function normalizeAndFormatTime(hours, minutes = 0, seconds = 0) 
{
    if (typeof hours === 'Неопределен') 
    {
        throw new Error("Часы недоступны.");
    }

    let totalSeconds = seconds + minutes * 60 + hours * 3600; 
    let normalizedHours = Math.floor(totalSeconds / 3600);
    let remainingSeconds = totalSeconds % 3600; 
    let normalizedMinutes = Math.floor(remainingSeconds / 60); 
    let normalizedSeconds = remainingSeconds % 60;

    const formattedHours = String(normalizedHours).padStart(2, '0');
    const formattedMinutes = String(normalizedMinutes).padStart(2, '0');
    const formattedSeconds = String(normalizedSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

document.getElementById('formatButton').addEventListener('click', function () 
{
    try 
    {
        const hours = parseInt(document.getElementById('hours').value, 10) || 0; 
        const minutes = parseInt(document.getElementById('minutes').value, 10) || 0; 
        const seconds = parseInt(document.getElementById('seconds').value, 10) || 0;

        const result = normalizeAndFormatTime(hours, minutes, seconds);

        document.getElementById('result').textContent = `Результат ${result}`;
    } 
    catch (error) 
    {
        document.getElementById('result').textContent = `Ошибка: ${error.message}`;
    }
});