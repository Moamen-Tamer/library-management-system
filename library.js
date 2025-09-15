"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Library {
    authors;
    genres;
    years;
    books;
    dates;
    names;
    booksDatabase;
    constructor() {
        this.authors = ["Alice Monroe", "David Carter", "Clara Hughes", "Mark Wilson", "Emma Blake", "Lucas Reed", "Sophia Turner"].map(author => author.toLowerCase());
        this.genres = ["Fantasy", "Thriller", "Romance", "Adventure", "Mystery", "Science Fiction"].map(genre => genre.toLowerCase());
        this.years = [2018, 2019, 2020, 2021, 2022, 2023];
        this.books = ["Echoes of Eternity", "Shadows in the Mist", "Whispers of Tomorrow", "The Silent Voyage", "Beneath the Ashes", "The   Forgotten Path", "Dreams of Solitude", "The Crimson Hour", "Winds of Change", "Fragments of Dawn", "Veil of Secrets", "Stormbound", "Golden Horizon", "Whispering Leaves", "The Iron Oath", "Shattered Reflections", "Ocean of Silence", "Fading Stars", "Burning Skies", "The Hidden Realm", "Frostbound", "Petals of Time", "Broken Chains", "Crimson Veins", "Waves of Tomorrow"].map(title => title.toLowerCase());
        this.dates = [];
        this.names = [];
    }
    dash(character = '-') {
        console.log(character.repeat(45));
    }
    isString(value) {
        return typeof value === 'string';
    }
    isNumber(value) {
        return typeof value === 'number';
    }
    isStringOrNumber(value) {
        if (this.isString(value) || this.isNumber(value)) {
            return true;
        }
        return false;
    }
    displayError(error) {
        if (error instanceof Error) {
            console.log(`error: ${error.message}`);
        }
        else {
            console.log(String(error));
        }
    }
    async fetchBooks(key) {
        console.log(`searching for ${key}`);
        return new Promise((resolve, reject) => {
            const networkDelay = (Math.random() * 1500) + 500;
            setTimeout(() => {
                this.booksDatabase = [
                    { title: this.books[0], author: this.authors[0], genre: this.genres[0], year: this.years[1] },
                    { title: this.books[1], author: this.authors[1], genre: this.genres[1], year: this.years[3] },
                    { title: this.books[2], author: this.authors[0], genre: this.genres[2], year: this.years[2] },
                    { title: this.books[3], author: this.authors[2], genre: this.genres[3], year: this.years[3] },
                    { title: this.books[4], author: this.authors[3], genre: this.genres[4], year: this.years[1] },
                    { title: this.books[5], author: this.authors[1], genre: this.genres[0], year: this.years[4] },
                    { title: this.books[6], author: this.authors[4], genre: this.genres[2], year: this.years[0] },
                    { title: this.books[7], author: this.authors[3], genre: this.genres[1], year: this.years[2] },
                    { title: this.books[8], author: this.authors[2], genre: this.genres[5], year: this.years[1] },
                    { title: this.books[9], author: this.authors[5], genre: this.genres[0], year: this.years[3] },
                    { title: this.books[10], author: this.authors[6], genre: this.genres[4], year: this.years[2] },
                    { title: this.books[11], author: this.authors[1], genre: this.genres[3], year: this.years[0] },
                    { title: this.books[12], author: this.authors[4], genre: this.genres[0], year: this.years[3] },
                    { title: this.books[13], author: this.authors[2], genre: this.genres[2], year: this.years[5] },
                    { title: this.books[14], author: this.authors[5], genre: this.genres[1], year: this.years[1] },
                    { title: this.books[15], author: this.authors[3], genre: this.genres[5], year: this.years[4] },
                    { title: this.books[16], author: this.authors[0], genre: this.genres[3], year: this.years[5] },
                    { title: this.books[17], author: this.authors[6], genre: this.genres[2], year: this.years[0] },
                    { title: this.books[18], author: this.authors[4], genre: this.genres[1], year: this.years[2] },
                    { title: this.books[19], author: this.authors[5], genre: this.genres[0], year: this.years[4] },
                    { title: this.books[20], author: this.authors[1], genre: this.genres[5], year: this.years[3] },
                    { title: this.books[21], author: this.authors[2], genre: this.genres[4], year: this.years[1] },
                    { title: this.books[22], author: this.authors[6], genre: this.genres[0], year: this.years[4] },
                    { title: this.books[23], author: this.authors[3], genre: this.genres[2], year: this.years[3] },
                    { title: this.books[24], author: this.authors[0], genre: this.genres[1], year: this.years[2] }
                ];
                if (this.isString(key)) {
                    const keyTitle = key.toLowerCase();
                    const foundByText = this.booksDatabase.filter(book => book.title === keyTitle || book.author === keyTitle || book.genre === keyTitle);
                    if (foundByText.length > 0) {
                        return resolve(foundByText);
                    }
                    return reject(`"${keyTitle}" is not found`);
                }
                else if (this.isNumber(key)) {
                    const foundByYear = this.booksDatabase.filter(book => book.year === key);
                    if (foundByYear.length > 0) {
                        return resolve(foundByYear);
                    }
                    return reject(`we don't have book released in ${key}`);
                }
                else {
                    throw new Error("invalid input");
                }
            }, networkDelay);
        });
    }
    async borrowBook(clientName, book) {
        try {
            if (this.isString(clientName) && this.isString(book)) {
                const bookTitle = book.toLowerCase();
                const wantedBook = await this.fetchBooks(bookTitle);
                if (wantedBook) {
                    if (this.dates.some(entry => entry.title === bookTitle && entry.client === clientName)) {
                        throw new Error("This book is already borrowed");
                    }
                    console.log(`${bookTitle} borrowed successfully ...`);
                    console.log(`you can have it for 3 days from now`);
                    this.dates.push({ title: wantedBook[0].title, client: clientName, borrowDate: Date.now() });
                    if (!this.names.some(name => name.client === clientName)) {
                        this.names.push({ client: clientName, penalty: 0 });
                    }
                    return wantedBook;
                }
                else {
                    throw new Error(`"${wantedBook}" is not found`);
                }
            }
            else {
                throw new Error("invalid input");
            }
        }
        catch (error) {
            this.displayError(error);
            return null;
        }
    }
    async returnBook(clientName, book) {
        try {
            if (this.isString(clientName) && this.isString(book)) {
                const bookTitle = book.toLowerCase();
                const checkBorrow = this.dates.find(item => item.title === bookTitle && item.client === clientName);
                if (checkBorrow) {
                    const now = Date.now();
                    const threeDays = 3 * 24 * 60 * 60 * 1000;
                    this.dates = this.dates.filter(book => book.title !== bookTitle);
                    if ((now - checkBorrow.borrowDate) <= threeDays) {
                        return `${bookTitle} returned successfully ...`;
                    }
                    const penaltyFees = 10;
                    console.log(`Book returned but you exceeded the 3 days, you need to pay $${penaltyFees}`);
                    const index = this.names.findIndex(name => name.client === clientName);
                    if (index >= 0) {
                        this.names[index].penalty += penaltyFees;
                        return `$${penaltyFees} penalty added`;
                    }
                    else {
                        throw new Error("couldn't find your data");
                    }
                }
                else {
                    return "you didn't borrow that book";
                }
            }
            else {
                throw new Error("invalid input");
            }
        }
        catch (error) {
            this.displayError(error);
            return null;
        }
    }
    async payPenalty(clientName) {
        try {
            if (this.isString(clientName)) {
                const checkName = this.names.find(name => name.client === clientName);
                if (checkName) {
                    checkName.penalty = 0;
                    return `penalty paid succesfully ...`;
                }
                return `there's no penalty for "${clientName}"`;
            }
            else {
                throw new Error("invalid input");
            }
        }
        catch (error) {
            this.displayError(error);
            return null;
        }
    }
    async singleSearch(key) {
        try {
            if (this.isStringOrNumber(key)) {
                const result = await this.fetchBooks(key);
                return result;
            }
            else {
                throw new Error("invalid input");
            }
        }
        catch (error) {
            this.displayError(error);
            return null;
        }
    }
    async multiSearch(keys) {
        try {
            if (!Array.isArray(keys)) {
                throw new Error("invalid input");
            }
            const allStrings = keys.every(item => typeof item === "string");
            const allNumbers = keys.every(item => typeof item === "number");
            const allSameType = allStrings || allNumbers;
            if (!allSameType) {
                throw new Error("all keys must be the same type (string or number)");
            }
            const keysPromises = keys.map(key => this.singleSearch(key));
            const results = await Promise.allSettled(keysPromises);
            return results;
        }
        catch (error) {
            this.displayError(error);
            return null;
        }
    }
    async displayBooks(filterFn = null) {
        try {
            if (this.booksDatabase && this.booksDatabase.length > 0) {
                const list = filterFn ? this.booksDatabase.filter(filterFn) : this.booksDatabase;
                list.forEach(book => {
                    console.log(`title: ${book.title}\nauthor: ${book.author}\ngenre: ${book.genre}\nyear: ${book.year}`);
                    this.dash();
                });
                return list;
            }
            else {
                throw new Error("we don't have books at the moment");
            }
        }
        catch (error) {
            this.displayError(error);
            return null;
        }
    }
}
//# sourceMappingURL=type.js.map
