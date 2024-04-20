import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../common/hooks/use-app-selector';
import { AppRoute } from '../../common/enums/app-routes.enum';
import styles from './styles.module.scss';

const MainPage = () => {
    const { user } = useAppSelector(state => ({
        user: state.auth.user
      }));
    
    const navigate = useNavigate();

    const handleStart = useCallback(() => {
        if(user){
            navigate(AppRoute.OPEN_DEALS)
        } else {
            navigate(AppRoute.LOG_IN)
        }
    }, [navigate, user]);

    return (
        <div className={styles.main_page}>
            <div className={styles.main_page_container}>
                <h1 className={styles.main_page__header}
                >
                    The chemical  negatively charged
                </h1>
                <div className={styles.main_page__content}>
                    <p className={styles.main_page__text}>
                        Numerous calculations predict, and experiments confirm, 
                        that the force field reflects the beam, while the mass
                         defect is not formed. The chemical compound is negatively charged. 
                         Twhile the mass defect is 
                    </p>
                    <button
                        onClick={handleStart}
                        className={styles.main_page__button}
                    > Get Started</button>
                </div>
            </div>
        </div>
    )
}

export { MainPage };