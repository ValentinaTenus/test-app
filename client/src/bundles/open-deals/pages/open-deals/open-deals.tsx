import { useEffect, useCallback } from 'react';

import { openDealsImages } from '~/assets/images/open-deals/open-deals-images.js';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';

import { OpenDealsItem } from '../../components/components.js';
import { actions as openDealsActions } from '../../store/index.js';
import styles from './styles.module.scss';
import { DataStatus } from '~/bundles/common/enums/data-status.js';

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
            <h2 className={styles.open_deals_header}>Open Deals</h2>
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