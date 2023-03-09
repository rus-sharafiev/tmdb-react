export const imageSize = {
    backdrop: {
        w300: "w300",
        w780: "w780",
        w1280: "w1280",
        original: "original"
    },
    logo: {
        w45: "w45",
        w92: "w92",
        w154: "w154",
        w185: "w185",
        w300: "w300",
        w500: "w500",
        original: "original"
    },
    poster: {
        w92: "w92",
        w154: "w154",
        w185: "w185",
        w342: "w342",
        w500: "w500",
        w780: "w780",
        original: "original"
    },
    profile: {
        w45: "w45",
        w185: "w185",
        h632: "h632",
        original: "original"
    },
    still: {
        w92: "w92",
        w185: "w185",
        w300: "w300",
        original: "original"
    }
}

/**
 * @param path - Specifies image
 * @param size Image size from the TMDB API, or import { imageSize } from 'imageLoader'
 * @param fallBack Can be specified if no image is provided
 * @returns proxyed and loaded image URL
 */

const loadImage = async (url: string): Promise<string> => {

    return new Promise((res) => {
        let image = new Image()
        image.crossOrigin = "Anonymous"
        image.onload = () => {
            res(image.src)
        }
        image.onerror = (e) => {
            console.log(e)
        }
        image.src = url
    });
}


const imageLoader = (path: string | null, size: string, fallBack?: string, bitmap?: boolean): Promise<string | { img: string, bitmap: ImageBitmap }> | string => {

    if (!path) return fallBack ?? ''

    // let url = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=' + encodeURIComponent('https://image.tmdb.org/t/p/' + size + path)

    let url = 'https://image.rutmdb.ru/t/p/' + size + path

    return new Promise((resolve, reject) => {
        const worker = new Worker(bitmap ? "/image-worker-bitmap.js" : "/image-worker.js")
        worker.onmessage = async (event) => {
            const url = event.data.url
            let img = await loadImage(url)
            if (bitmap) resolve({ img, bitmap: event.data.imgBitmap })
            resolve(img)
        }
        worker.postMessage(url)
    })
}

export default imageLoader