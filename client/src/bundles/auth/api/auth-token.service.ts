import Cookies from 'js-cookie';

enum Tokens  {
    ACCESS_TOKEN = 'access-token',
    REFRESH_TOKEN = 'refresh-token'
}

const getAccessToken = () => {
    const accessToken = Cookies.get(Tokens.ACCESS_TOKEN)

    return accessToken || null
}

const saveTokenStorage = (accessToken: string) => {
    Cookies.set(Tokens.ACCESS_TOKEN, accessToken, {
        domain: 'localhost',
        sameSite: 'strict',
        expires: 1
    })
}

const removeFromStorage = () => {
    Cookies.remove(Tokens.ACCESS_TOKEN)
}

export { getAccessToken, saveTokenStorage, removeFromStorage, Tokens };