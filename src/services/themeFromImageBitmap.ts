import { Theme, themeFromSourceColor } from "@material/material-color-utilities"

const themeFromImageBitmap = async (image: ImageBitmap): Promise<Theme> => {

    const sourceColorFromImageBitmap = async (image: ImageBitmap): Promise<number> => {
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
                console.log('Your browser doesn\'t support web workers.')
                reject(0)
            }
        })
    }

    const sourceColor: number = await sourceColorFromImageBitmap(image)
    return themeFromSourceColor(sourceColor)
}

export default themeFromImageBitmap