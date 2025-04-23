class Marker {
    constructor(color, inkLevel = 100) {
        this._color = color;
        this._inkLevel = inkLevel;
    }

    print(text) {
        let output = "";
        for (let char of text) {
            if (this._inkLevel <= 0) break;

            output += char;

            if (!/\s/.test(char)) {
                this._inkLevel -= 0.5;
            }
        }

        console.log(`%c${output}`, `color: ${this._color}`);
        console.log(`Осталось чернил: ${this._inkLevel.toFixed(1)}%`);
    }

    get inkLevel() {
        return this._inkLevel;
    }
}

class RefillableMarker extends Marker {
    refill(amount) {
        this._inkLevel += amount;
        if (this._inkLevel > 100) {
            this._inkLevel = 100;
        }
        console.log(`Маркер заправлен. Текущий уровень чернил: ${this._inkLevel}%`);
    }
}

const marker = new Marker("blue", 50);
marker.print("Hello, world! This is a testing words."); 
marker.print("This text will not be fully printed.");

console.log("---");

const refillableMarker = new RefillableMarker("red", 30);
refillableMarker.print("This marker can be refilled."); 
refillableMarker.refill(40);
refillableMarker.print("Now it can print more and more text!");