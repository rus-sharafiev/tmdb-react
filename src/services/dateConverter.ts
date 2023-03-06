export const localDate = (d: string) => {
    if (!d) return 'Не объявлена'
    let date = new Date(d)
    return date.toLocaleString('ru', { dateStyle: "long" })
}