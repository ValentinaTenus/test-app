import { Navigate, Outlet } from 'react-router-dom';

import { AppRoute, DataStatus } from '../../enums/enums';
import { useAppSelector } from '../../hooks/use-app-selector';

const PrivateRoute: React.FC = () => {
    const { user, dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
        user: auth.user,
    }));

    if (
        dataStatus !== DataStatus.FULFILLED &&
        dataStatus !== DataStatus.REJECTED
    ) {
        return null;
    }

    return user ? <Outlet /> : <Navigate to={AppRoute.ROOT} />;
};

export { PrivateRoute };
