class Circle {
    constructor(radius) {
        this._radius = radius;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        if (value > 0) {
            this._radius = value;
        } else {
            console.error("Радиус должен быть положительным числом.");
        }
    }


    get diameter() {
        return this._radius * 2;
    }


    calculateArea() {
        return Math.PI * Math.pow(this._radius, 2);
    }


    calculateCircumference() {
        return 2 * Math.PI * this._radius;
    }
}

const circle = new Circle(5);

console.log(`Радиус: ${circle.radius}`);

console.log(`Диаметр: ${circle.diameter}`);

console.log(`Площадь: ${circle.calculateArea().toFixed(2)}`);

console.log(`Длина окружности: ${circle.calculateCircumference().toFixed(2)}`);

circle.radius = 10;

console.log(`Новый радиус: ${circle.radius}`);
console.log(`Новый диаметр: ${circle.diameter}`);
console.log(`Новая площадь: ${circle.calculateArea().toFixed(2)}`);
console.log(`Новая длина окружности: ${circle.calculateCircumference().toFixed(2)}`);