const api = {

    async get(url: string): Promise<unknown> {
        let response = await fetch(url)

        if (response.status !== 200)
            return this.error(response)

        return response.json()
    },

    error(res: Response): ApiError {
        return {
            error: {
                status: res.status,
                data: res.statusText
            }
        }
    }
}

export default api

export interface ApiError {
    error: {
        status: Response['status'],
        data: Response['statusText']
    }
}