onmessage = async (e) => {
    try {
        const response = await fetch(e.data)
        const fileBlob = await response.blob()
        const imgBitmap = await createImageBitmap(fileBlob)
        if (fileBlob.type === "image/jpeg" || fileBlob.type === "image/png")
            postMessage({
                url: URL.createObjectURL(fileBlob),
                imgBitmap
            })
    } catch (e) {
        return null;
    }
}