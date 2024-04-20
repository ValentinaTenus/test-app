import { AxiosError } from "axios";

export const errorCatch = (error: AxiosError<{message: string}>): string => {
    const message = error?.response?.data?.message;

    return message
    ? error.response && typeof error.response.data.message === 'object'
        ? message[0]
        : message
    : error.message
}