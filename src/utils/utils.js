export const handleStatus = resp => {
    if (resp.ok) {
        return resp.json()
    }
    return Promise.reject(resp)
}