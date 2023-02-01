/**
 * @param path Specifies image
 * @param size You can get from TMDB API
 * @param fallBack Can be specified if no image is provided
 * @returns proxyed and loaded image URL
 */

const proxyImageLoader = async (path: string, size: string, fallBack?: string): Promise<string> => {

    if (!path) return fallBack ?? ''

    return new Promise((res) => {
        let url = 'https://image.tmdb.org/t/p/' + size + path
        let image = new Image()
        image.crossOrigin = "Anonymous"
        image.src = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=' + encodeURIComponent(url)
        image.onload = () => {
            res(image.src)
        }
        image.onerror = () => {
            res('/img/no_image.png')
        }

    });
}

export default proxyImageLoader