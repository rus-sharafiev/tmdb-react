import { argbFromRgb, QuantizerCelebi, Score } from "@material/material-color-utilities"

onmessage = function (e) {
    console.log('Worker: Message received from main script')
    const imageBytes: Uint8ClampedArray = e.data

    const pixels: number[] = []
    for (let i = 0; i < imageBytes.length; i += 4) {
        const r = imageBytes[i]
        const g = imageBytes[i + 1]
        const b = imageBytes[i + 2]
        const a = imageBytes[i + 3]
        if (a < 255) {
            continue
        }
        const argb = argbFromRgb(r, g, b)
        pixels.push(argb)
    }

    const result = QuantizerCelebi.quantize(pixels, 128)
    const ranked = Score.score(result)
    const top = ranked[0]
    postMessage(top)
}