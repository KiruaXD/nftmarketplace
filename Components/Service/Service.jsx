import React from 'react'
import Image from 'next/image';
import images from '../../img'

import Style from './Service.module.css';

const Service = () => {
  return (
    <div className={Style.service}>
        <div className={Style.service_box}>
            <div className={Style.service_box_item}>
                <Image src={images.service1} alt="Filter & Discover" width={100} height={200}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 1</span>
                </p>
                <h3>Filter & Discover</h3>
                <p>
                    Connect with wallet, discover , buy NFts , sell your NFTS and earn money
                </p>
            </div>
            <div className={Style.service_box_item}>
                <Image src={images.service2} alt="Filter & Discover" width={100} height={200}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 2</span>
                </p>
                <h3>Connect Wallet</h3>
                <p>
                    Connect with wallet, discover , buy NFts , sell your            money
                </p>
            </div>
            <div className={Style.service_box_item}>
                <Image src={images.service3} alt="Filter & Discover" width={100} height={200}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 3</span>
                </p>
                <h3>Start Trading</h3>
                <p>
                    Connect with wallet, discover , buy NFts , sell your            money
                </p>
            </div>
            <div className={Style.service_box_item}>
                <Image src={images.service4} alt="Filter & Discover" width={100} height={200}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 1</span>
                </p>
                <h3>Start trading</h3>
                <p>
                    Connect with wallet, discover , buy NFts , sell your            money
                </p>
            </div>
        </div>
    </div>
  )
}

export default Service;