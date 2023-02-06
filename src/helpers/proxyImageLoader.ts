/**
 * @param path Specifies image
 * @param size You can get from TMDB API
 * @param fallBack Can be specified if no image is provided
 * @returns proxyed and loaded image URL
 */

const proxyImageLoader = async (path: string, size: string, fallBack?: string, oneMoreAttempt?: boolean): Promise<string> => {

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
                    proxyImageLoader(path, size, fallBack, true)
                }, 2000);
        }

    });
}

export default proxyImageLoader