import { OpenDeal } from '../../types/open-deal.type';

import styles from './styles.module.scss';

type OpenDealsItemProperties = {
    item: OpenDeal,
    image: string
}

const OpenDealsItem: React.FC<OpenDealsItemProperties> = (
    { item, image }) => {
        console.log(item, image)
    return (
        <div 
            className={styles.open_deal}
            style={{ backgroundImage: `url(${image})` }}
        >
            <div
                className={styles.open_deal_content}
            >
                <div  className={styles.open_deal_building}>
                    {item.buildingName}
                </div>
                <div  className={styles.open_deal_details}>
                   <p>{item.price}</p>
                   <p>{`Yield ${item.yield}`}</p>
                   <p> {`Sold ${item.sold}`}</p>
                   <p>{`Tiket - ${item.ticketPrice}`}</p>
                   <p>{`Days left ${item.daysLeft}`}</p>
                </div>
            </div> 
        </div>
    )
}

export { OpenDealsItem };