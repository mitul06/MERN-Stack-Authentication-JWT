export const setToken = (value) => {
    localStorage.setItem('token', value)
}

export const getToken = () => {
    let token = localStorage.getItem('token')
    return token
}

export const removeToken = (value) => {
    localStorage.removeItem(value)
}

