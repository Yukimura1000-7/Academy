function formatTemplate(template, ...params)
{
    return template.replace(/%(\d+)/g, (_, index) => params[parseInt(index) - 1] || '');
}

document.getElementById('formatButton').addEventListener('click', function () 
{
    const template = document.getElementById('templateInput').value;
    const paramsInput = document.getElementById('paramsInput').value;

    if (!template || !paramsInput) 
    {
        document.getElementById('result').textContent = "Ошибка: Пожалуйста, заполните оба поля.";
        return;
    }

    const paramsArray = paramsInput.split(',').map(param => param.trim());

    const result = formatTemplate(template, ...paramsArray);

    document.getElementById('result').textContent = `Результат: ${result}`;
});