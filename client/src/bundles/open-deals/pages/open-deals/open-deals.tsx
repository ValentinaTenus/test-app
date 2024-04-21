import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

import { openDealsImages } from '~/assets/images/open-deals/open-deals-images.js';
import { AppRoute } from '~/bundles/common/enums/app-routes.enum.js';
import { DataStatus } from '~/bundles/common/enums/data-status.js';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';

import { OpenDealsItem } from '../../components/components.js';
import { actions as openDealsActions } from '../../store/index.js';
import styles from './styles.module.scss';

const OpenDeals = () => {
    const dispatch = useAppDispatch();

    const { openDeals, dataStatus } = useAppSelector(state => ({
        openDeals: state.openDeals.openDeals,
        dataStatus: state.openDeals.dataStatus
      }));
    
      const handleLoadOpenDeals = useCallback(
        () => dispatch(openDealsActions.getAll()),
        [dispatch]
      );

    useEffect(() => {
       handleLoadOpenDeals();
    }, [handleLoadOpenDeals]);

    return (
        <div className={styles.open_deals_page}>
            <div className={styles.open_deals_header}>
                <h2 className={styles.open_deals_heading}>Open Deals</h2>
                <Link to={AppRoute.ROOT}>
                    <HomeIcon className={styles.open_deals__home_button} size={25}/> 
                </Link>
            </div>
            <div className={styles.open_deals_items}>
                {openDeals && dataStatus === DataStatus.FULFILLED 
                    ? ( openDeals?.map((item, index) => (
                        <OpenDealsItem key={index} item={item} image={openDealsImages[index]}/>
                      )))
                    : <div>There are not open deals</div>
            }
            </div>
        </div>
    )
}

export { OpenDeals };