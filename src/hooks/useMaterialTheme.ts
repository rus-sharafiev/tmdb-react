import { useEffect, useState } from "react"
import { themeFromSourceColor, applyTheme, QuantizerCelebi, Score, argbFromRgb } from "@material/material-color-utilities"

const useMaterialTheme = () => {
    const [image, setImage] = useState<HTMLImageElement>()
    const [themeLoaded, setThemeLoaded] = useState<boolean>(false)

    const setThemeImage: ((image: HTMLImageElement) => void) = (image: HTMLImageElement) => {
        setImage(image)
    }

    useEffect(() => {
        if (!themeLoaded) document.body.removeAttribute('style')
    }, [themeLoaded])

    useEffect(() => {
        if (!image) return

        async function sourceColorFromImage(image: HTMLImageElement): Promise<number> {

            return new Promise((resolve, reject) => {

                if (window.Worker) {
                    const themeWorker = new Worker("/theme-worker.js");

                    const imageBytes = new Promise<Uint8ClampedArray>((resolve, reject) => {
                        const canvas = document.createElement('canvas')
                        const context = canvas.getContext('2d')
                        if (!context) return reject(new Error('Could not get canvas context'))

                        canvas.width = image.width
                        canvas.height = image.height
                        context.drawImage(image, 0, 0)
                        resolve(context.getImageData(0, 0, image.width, image.height).data);
                    });

                    imageBytes.then(res => themeWorker.postMessage(res))

                    themeWorker.onmessage = function (e) {
                        resolve(e.data)
                    }
                } else {
                    console.log('Your browser doesn\'t support web workers.');
                }
            })
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