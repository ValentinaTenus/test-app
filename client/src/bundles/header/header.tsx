import { Link, useLocation} from 'react-router-dom';
import clsx from 'clsx'

import { AppRoute } from '../common/enums/app-routes.enum.js';
import { User } from '../user/types/user.type.js';
import styles from './styles.module.scss';

type HeaderProperties = {
  onUserLogout?: React.MouseEventHandler<HTMLButtonElement>;
  user: User | null;
};

const Header: React.FC<HeaderProperties> = ({ user, onUserLogout }) => {
  const { pathname } = useLocation();
  const isAuthPage = (pathname === AppRoute.LOG_IN) || (pathname === AppRoute.SIGN_UP);

  return (
    <div className={styles.header}>
      {user && (
        <div className={styles.header_button_container}>
            <button
                className={clsx(styles.header__button, styles.header__logout_button)}
                onClick={onUserLogout}
                type='button'
            >
                LogOut
            </button>
        </div>
      )}
      {!user && !isAuthPage && (
        <div className={styles.header_button_container}>
            <Link to={AppRoute.LOG_IN}>
                <button
                    className={clsx(styles.header__button, styles.header__login_button)}
                >Log In</button>
            </Link>
            <Link to={AppRoute.SIGN_UP}>
                <button
                    className={clsx(styles.header__button, styles.header__sign_up_button)}
                >Sign Up</button>
            </Link>
        </div>
       
      )}
    </div>
  );
};

export { Header };
