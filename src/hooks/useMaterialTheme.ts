import { useEffect, useState } from "react"
import { themeFromSourceColor, applyTheme, QuantizerCelebi, Score, argbFromRgb } from "@material/material-color-utilities"

const useMaterialTheme = () => {
    const [imgPath, setImgPath] = useState<string>('')
    const [loaded, setLoaded] = useState<boolean>(false)

    const setImagePath: ((imgPath: string) => void) = (imgPath: string) => {
        imgPath && setImgPath(imgPath)
    }

    useEffect(() => {
        if (!imgPath) return

        async function sourceColorFromImage(): Promise<number> {

            const imageBytes = await new Promise<Uint8ClampedArray>((resolve, reject) => {
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
                if (!context) {
                    return reject(new Error('Could not get canvas context'))
                }
                let image = new Image()
                image.src = imgPath
                image.crossOrigin = "Anonymous"
                image.onload = () => {
                    canvas.width = image.width
                    canvas.height = image.height
                    context.drawImage(image, 0, 0)
                    resolve(context.getImageData(0, 0, image.width, image.height).data)
                }
            })

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
            const sourceColor: number = await sourceColorFromImage()
            const theme = themeFromSourceColor(sourceColor)
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            applyTheme(theme, { target: document.body, dark: false })
            setLoaded(true)
        }

        materialTheme()

        return () => document.body.removeAttribute('style')

    }, [imgPath])

    return [loaded, setImagePath] as const
}


export default useMaterialTheme