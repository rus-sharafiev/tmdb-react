import { Part } from "../types/collection"

const releaseDateAsc = (a: Part, b: Part) => {
    const strA = a.release_date === '' ? '3000-01-01' : a.release_date
    const strB = b.release_date === '' ? '3000-01-01' : b.release_date
    if (strA < strB) {
        return -1;
    }
    if (strA > strB) {
        return 1;
    }
    return 0;
}

export default releaseDateAsc