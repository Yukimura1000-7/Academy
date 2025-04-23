class CssClass {
    constructor(name) {
        this._name = name; 
        this._styles = {};
    }

    setStyle(property, value) {
        this._styles[property] = value;
    }

    removeStyle(property) {
        delete this._styles[property];
    }

    getCss() {
        const stylesString = Object.entries(this._styles)
            .map(([property, value]) => `  ${property}: ${value};`)
            .join('\n');

        return `.${this._name} {\n${stylesString}\n}`;
    }
}

const myCssClass = new CssClass("my-class");

myCssClass.setStyle("color", "red");
myCssClass.setStyle("font-size", "16px");
myCssClass.setStyle("background-color", "yellow");

console.log(myCssClass.getCss());

myCssClass.removeStyle("background-color");

console.log(myCssClass.getCss());