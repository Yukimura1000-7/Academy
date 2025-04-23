class ExtendedDate extends Date {
    getDateInWords() {
        const months = [
            "января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ];
        const day = this.getDate();
        const month = months[this.getMonth()];
        return `${day} ${month}`;
    }

    isFutureDate() {
        const now = new Date();
        return this >= now;
    }

    isLeapYear() {
        const year = this.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    getNextDate() {
        const nextDate = new ExtendedDate(this);
        nextDate.setDate(this.getDate() + 1);
        return nextDate;
    }
}

const extendedDate = new ExtendedDate(2023, 9, 15);

console.log(`Дата текстом: ${extendedDate.getDateInWords()}`);

console.log(`Это будущая дата? ${extendedDate.isFutureDate()}`);

console.log(`Год високосный? ${extendedDate.isLeapYear()}`);

const nextDate = extendedDate.getNextDate();
console.log(`Следующая дата: ${nextDate.getDateInWords()}`);