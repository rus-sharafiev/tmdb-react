const decOfNum = (number: number, titles: string[]) => {

    let decCache: number[] = [], decCases = [2, 0, 1, 1, 1, 2]

    if (!decCache[number])
        decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)]

    return titles[decCache[number]];
}

const convertRuntime = (time: number) => {

    let hours = (time / 60)
    let rhours = Math.floor(hours)
    let minutes = (hours - rhours) * 60
    let rminutes = Math.round(minutes)
    if (rhours === 0) {
        return rminutes + ' ' + decOfNum(rminutes, ['минута', 'минуты', 'минут'])
    } else if (rminutes === 0) {
        return rhours + ' ' + decOfNum(rhours, ['час', 'часа', 'часов'])
    } else {
        return rhours + ' ' + decOfNum(rhours, ['час', 'часа', 'часов']) + ' ' + rminutes + ' ' + decOfNum(rminutes, ['минута', 'минуты', 'минут'])
    }

}

export default convertRuntime