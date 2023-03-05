onmessage = async (e) => {
    try {
        const response = await fetch(e.data)
        const fileBlob = await response.blob()
        if (fileBlob.type === "image/jpeg" || fileBlob.type === "image/png")
            postMessage(URL.createObjectURL(fileBlob))
    } catch (e) {
        return null;
    }
}