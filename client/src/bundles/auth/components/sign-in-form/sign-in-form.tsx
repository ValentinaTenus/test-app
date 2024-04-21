import { Link } from 'react-router-dom';
import { useCallback } from 'react';

import { FormGroup, Input, Spinner } from '~/bundles/common/components/components';
import { AppRoute, DataStatus} from '~/bundles/common/enums/enums';
import { useAppForm, useFormFieldCreator, useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';

import { DEFAULT_SIGN_IN_PAYLOAD } from '../../constants/constants';
import { actions as authActions } from '../../store/index';
import { type UserSignInRequestDto, userSignInValidation } from '../../validation/validation';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const dispatch = useAppDispatch();

    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus
    }));

    const { control, errors, handleSubmit } =
        useAppForm<UserSignInRequestDto>({
            defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
            validationSchema: userSignInValidation,
        });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );
    const handleLinkClick = useCallback(() => {
        dispatch(authActions.setError(null));
    }, [dispatch]);

    return (
        <>
            <div className={styles.login__header}>
                <h1 className={styles.login__title}>Login</h1>
            </div>
            <form
                className={styles.login__form}
                onSubmit={handleFormSubmit}
            >
                <FormGroup
                    className={styles.form_group}
                    error={errors.email}
                    label="Email"
                >
                    <Input
                        type="email"
                        placeholder="Email"
                        {...useFormFieldCreator({ name: 'email', control })}
                    />
                </FormGroup>
                <FormGroup
                    className={styles.form_group}
                    error={errors.password}
                    label="Password"
                >
                    <Input
                        type='text'
                        placeholder="Password"
                        {...useFormFieldCreator({ name: 'password', control })}
                    />
                </FormGroup>
                <p className={styles.forgot_password}>Forgot password?</p>
                <button
                    className={styles.login__form__button}>
                    {dataStatus === DataStatus.PENDING
                    ? (
                        <Spinner />
                    ) :  <span>Sign In</span>}
                   
                </button>
                <p className={styles.login__message}>
                    Don't have account?
                    <Link
                        onClick={handleLinkClick}
                        to={AppRoute.SIGN_UP}
                        className={styles.login__link}
                    >
                        Sign Up
                    </Link>
                </p>
            </form>
        </>
    );
};

export { SignInForm };
