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

const imageLoader = async (path: string | null, size: string, fallBack?: string, oneMoreAttempt?: boolean): Promise<string> => {

    if (!path) return fallBack ?? ''

    return new Promise((res) => {
        let url = 'https://image.rutmdb.ru/t/p/' + size + path
        let image = new Image()
        image.src = url
        image.onload = () => {
            res(image.src)
        }
        image.onerror = () => {
            if (!oneMoreAttempt)
                setTimeout(() => {
                    console.log('One more attemt to load image')
                    imageLoader(path, size, fallBack, true)
                }, 2000);
        }

    });
}

export default imageLoader