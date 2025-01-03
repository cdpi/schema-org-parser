class Parser {
    constructor() {
    }
    parse(text) {
        let json = JSON.parse(text);
    }
    async parseFromString(text) {
        let json = JSON.parse(text);
        return [];
    }
}
export {};
