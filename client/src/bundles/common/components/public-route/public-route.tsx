import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AppRoute } from '../../enums/app-routes.enum';
import { useAppSelector } from '../../hooks/use-app-selector';

const PublicRoute: FC = () => {
    const { user } = useAppSelector(({ auth }) => ({
        user: auth.user,
    }));

    return user ? <Navigate to={AppRoute.OPEN_DEALS} /> : <Outlet />;
};

export { PublicRoute };