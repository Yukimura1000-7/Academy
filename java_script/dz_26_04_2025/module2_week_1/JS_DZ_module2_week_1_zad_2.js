function gcd(a, b) 
{
    return b === 0 ? a : gcd(b, a % b);
}

function reduceFraction(fraction) 
{
    const divisor = gcd(fraction.numerator, fraction.denominator);
    return {
        numerator: fraction.numerator / divisor,
        denominator: fraction.denominator / divisor
    };
}

function addFractions(f1, f2) 
{
    const numerator = f1.numerator * f2.denominator + f2.numerator * f1.denominator;
    const denominator = f1.denominator * f2.denominator;
    return { numerator, denominator };
}

function subtractFractions(f1, f2) 
{
    const numerator = f1.numerator * f2.denominator - f2.numerator * f1.denominator;
    const denominator = f1.denominator * f2.denominator;
    return { numerator, denominator };
}

function multiplyFractions(f1, f2) 
{
    const numerator = f1.numerator * f2.numerator;
    const denominator = f1.denominator * f2.denominator;
    return { numerator, denominator };
}

function divideFractions(f1, f2) 
{
    const numerator = f1.numerator * f2.denominator;
    const denominator = f1.denominator * f2.numerator;
    return { numerator, denominator };
}

function displayFraction(fraction) 
{
    return `<sup>${fraction.numerator}</sup>/<sub>${fraction.denominator}</sub>`;
}

document.getElementById('addButton').addEventListener('click', function () 
{
    const num1 = parseInt(document.getElementById('num1').value, 10);
    const den1 = parseInt(document.getElementById('den1').value, 10);
    const num2 = parseInt(document.getElementById('num2').value, 10);
    const den2 = parseInt(document.getElementById('den2').value, 10);
    const result = addFractions({ numerator: num1, denominator: den1 }, { numerator: num2, denominator: den2 });
    document.getElementById('result').innerHTML = `Результат: ${displayFraction(result)}`;
});

document.getElementById('subtractButton').addEventListener('click', function () 
{
    const num1 = parseInt(document.getElementById('num1').value, 10);
    const den1 = parseInt(document.getElementById('den1').value, 10);
    const num2 = parseInt(document.getElementById('num2').value, 10);
    const den2 = parseInt(document.getElementById('den2').value, 10);
    const result = subtractFractions({ numerator: num1, denominator: den1 }, { numerator: num2, denominator: den2 });
    document.getElementById('result').innerHTML = `Результат: ${displayFraction(result)}`;
});

document.getElementById('multiplyButton').addEventListener('click', function () 
{
    const num1 = parseInt(document.getElementById('num1').value, 10);
    const den1 = parseInt(document.getElementById('den1').value, 10);
    const num2 = parseInt(document.getElementById('num2').value, 10);
    const den2 = parseInt(document.getElementById('den2').value, 10);
    const result = multiplyFractions({ numerator: num1, denominator: den1 }, { numerator: num2, denominator: den2 });
    document.getElementById('result').innerHTML = `Результат: ${displayFraction(result)}`;
});

document.getElementById('divideButton').addEventListener('click', function () 
{
    const num1 = parseInt(document.getElementById('num1').value, 10);
    const den1 = parseInt(document.getElementById('den1').value, 10);
    const num2 = parseInt(document.getElementById('num2').value, 10);
    const den2 = parseInt(document.getElementById('den2').value, 10);
    const result = divideFractions({ numerator: num1, denominator: den1 }, { numerator: num2, denominator: den2 });
    document.getElementById('result').innerHTML = `Результат: ${displayFraction(result)}`;
});

document.getElementById('reduceButton').addEventListener('click', function () 
{
    const num1 = parseInt(document.getElementById('num1').value, 10);
    const den1 = parseInt(document.getElementById('den1').value, 10);
    const result = reduceFraction({ numerator: num1, denominator: den1 });
    document.getElementById('result').innerHTML = `Reduced: ${displayFraction(result)}`;
});