const proxyImageLoader = async (path: string, size: string): Promise<string> => {
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