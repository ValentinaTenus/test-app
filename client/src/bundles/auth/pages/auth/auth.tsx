import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import authImage from '~/assets/images/roads.png';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppDispatch } from '~/bundles/common/hooks/hooks.js';

import { SignInForm, SignUpForm } from '../../components/components.js';
import { actions as authActions } from '../../store/index.js';
import { type UserSignInRequestDto, type UserSignUpRequestDto } from '../../validation/validation.js';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { pathname } = useLocation();

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void dispatch(authActions.login(payload))
                .unwrap()
                .then(() => {
                    navigate(AppRoute.OPEN_DEALS);
                })
                .catch((error: Error) => {
                    toast.error(error.message)
                })
        },
        [dispatch, navigate],
    );

    const handleSignUpSubmit = 
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.register(payload))
                .unwrap()
                .then(() => {
                    navigate(AppRoute.OPEN_DEALS);
                })
                .catch((error: Error) => {
                    toast.error(error.message)
                })
        };

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AppRoute.LOG_IN: {
                return <SignInForm onSubmit={handleSignInSubmit} />;
            }
            case AppRoute.SIGN_UP: {
                return <SignUpForm onSubmit={handleSignUpSubmit} />;
            }
        }

        return null;
    };

    return (
        <div className={styles.auth}>
            <div className={styles.auth__container}>
                <section className={styles.auth__image_container}>
                    <img src={authImage} alt="roads" width={300} height={300}/>
                </section>
                <section className={styles.auth__form_container}>
                    <div className={styles.auth__form_content}>
                        {getScreen(pathname)}
                    </div>
                </section>
            </div>
        </div>
    );
};

export { Auth };
