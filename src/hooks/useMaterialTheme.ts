import { useEffect, useState } from "react"
import { themeFromSourceColor, applyTheme, QuantizerCelebi, Score, argbFromRgb } from "@material/material-color-utilities"

const useMaterialTheme = () => {
    const [image, setImage] = useState<HTMLImageElement>()
    const [themeLoaded, setThemeLoaded] = useState<boolean>(false)

    const setThemeImage: ((image: HTMLImageElement) => void) = (image: HTMLImageElement) => {
        setImage(image)
    }

    useEffect(() => {
        if (!image) return

        async function sourceColorFromImage(image: HTMLImageElement): Promise<number> {
            const imageBytes = await new Promise<Uint8ClampedArray>((resolve, reject) => {
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
                if (!context) return reject(new Error('Could not get canvas context'))

                canvas.width = image.width
                canvas.height = image.height
                context.drawImage(image, 0, 0)
                resolve(context.getImageData(0, 0, image.width, image.height).data);
            });

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
            return top
        }

        const materialTheme = async () => {
            const sourceColor: number = await sourceColorFromImage(image)
            const theme = themeFromSourceColor(sourceColor)
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            applyTheme(theme, { target: document.body, dark: false })
        }

        materialTheme().then(() => setThemeLoaded(true))

        return () => document.body.removeAttribute('style')

    }, [image])

    return [themeLoaded, setThemeImage, setThemeLoaded] as const
}


export default useMaterialTheme