const imageLoader = async (url: string) => {
    return new Promise((res) => {
        let img = new Image();
        img.src = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=' + encodeURIComponent(url);
        img.onload = () => {
            res(img.src)
        }
    });
}

export default imageLoader