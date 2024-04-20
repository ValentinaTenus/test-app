import { type UseFormSetError } from 'react-hook-form';
import { useEffect } from 'react';

import { DataStatus } from '../enums/data-status';
import { useAppSelector } from './use-app-selector';

type ErrorFieldValues = {
    email: string;
    password: string;
};

type UseFormErrorPayload = {
    setError: UseFormSetError<ErrorFieldValues>;
};

type ReturnValue = {
    dataStatus: DataStatus;
};

const useFormError = ({ setError }: UseFormErrorPayload): ReturnValue => {
    const { error, dataStatus } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (error) {
            const {  message } = error;
            setError('root', {
                message,
            });
        }
    }, [setError, error]);

    return {
        dataStatus,
    };
};

export { useFormError };
