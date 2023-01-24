const proxyImageLoader = async (path: string, size: string): Promise<string> => {
    return new Promise((res) => {
        let url = 'https://image.tmdb.org/t/p/' + size + path
        let img = new Image()
        img.src = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=' + encodeURIComponent(url)
        img.onload = () => {
            res(img.src)
        }
        img.onerror = () => {
            res('/img/no_image.png')
        }

    });
}

export default proxyImageLoader