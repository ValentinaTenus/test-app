import { Link } from 'react-router-dom';
import { useCallback } from 'react';

import { FormGroup, Input } from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/enums';
import { useAppDispatch, useAppForm, useFormFieldCreator } from '~/bundles/common/hooks/hooks';

import { DEFAULT_SIGN_UP_PAYLOAD } from '../../constants/constants';
import { actions as authActions } from '../../store/index';
import { type UserSignUpRequestDto, userSignUpValidation } from '../../validation/sign-up-form-validation';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const dispatch = useAppDispatch();

    const { control, errors, handleSubmit } =
        useAppForm<UserSignUpRequestDto>({
            defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
            validationSchema: userSignUpValidation,
        });
 
    const handleFormSubmit = useCallback(
        (event: React.BaseSyntheticEvent): void => {
            event.preventDefault()
            handleSubmit(onSubmit)(event);
        },
        [handleSubmit, onSubmit],
    );

    const handleLinkClick = useCallback(() => {
        dispatch(authActions.setError(null));
    }, [dispatch]);

    return (
        <>
            <div className={styles.registration__header}>
                <h1 className={styles.registration__title}>Sign Up</h1>
            </div>
            <form
                className={styles.registration__form}
                onSubmit={handleFormSubmit}
            >
                <FormGroup
                    className={styles.form_group}
                    error={errors.name}
                    label="Name"
                >
                    <Input
                        type="text"
                        placeholder="Name"
                        {...useFormFieldCreator({ name: 'name', control })}
                    />
                </FormGroup>
               
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
                        type="text"
                        placeholder="Password"
                        {...useFormFieldCreator({ name: 'password', control })}
                    />
                </FormGroup>
                
                <button
                    type='submit'
                    className={styles.registration__form__button}
                >
                    Sign Up
                </button>

                <p className={styles.registration__message}>
                    Already have an account? Go to
                    <Link
                        onClick={handleLinkClick}
                        to={AppRoute.LOG_IN}
                        className={styles.registration__link}
                    >
                        Log In
                    </Link>
                </p>
            </form>
        </>
    );
};

export { SignUpForm };
