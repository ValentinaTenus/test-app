enum Tokens  {
    ACCESS_TOKEN = 'access-token',
    REFRESH_TOKEN = 'refresh-token'
}

const getAccessToken = () => {
    const accessToken = localStorage.getItem(Tokens.ACCESS_TOKEN);
    return accessToken || null;
}

const saveTokenStorage = (accessToken: string) => {
    localStorage.setItem(Tokens.ACCESS_TOKEN, accessToken);
}

const removeFromStorage = () => {
    localStorage.removeItem(Tokens.ACCESS_TOKEN);
}

export { getAccessToken, saveTokenStorage, removeFromStorage, Tokens };