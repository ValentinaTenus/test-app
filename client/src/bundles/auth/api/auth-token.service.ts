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
    const domain = process.env.NODE_ENV === 'production' ? '.onrender.com' : 'localhost';
    Cookies.set(Tokens.ACCESS_TOKEN, accessToken, {
        domain: domain,
        sameSite: 'none',
        expires: 1,
        secure: true,
    })
}

const removeFromStorage = () => {
    Cookies.remove(Tokens.ACCESS_TOKEN)
}

export { getAccessToken, saveTokenStorage, removeFromStorage, Tokens };