import React, {useState} from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import Style from './NFTCard.module.css'
import {BsImages} from 'react-icons/bs'
import Image from 'next/image'
import images from '../../img'
import Link from 'next/link'

const NFTCard = ({NFTData}) => {
    // const featureArray = [1,2,3,4,5,6,7,8,9]
    const [like, setLike] = useState(true)
    const likeNft = ()=>{
        if(!like)
            setLike(true)
        else
            setLike(false)
    }
  return (
    <div className={Style.nftcard}>
        
        {NFTData.map((el, i)=>(
            <Link href={{pathname: "/NFT-details", query: el}}>
            <div className={Style.nftcard_box} key={i+1}>
                <div className={Style.nftcard_box_img}>
                    <Image src= {el.image} alt='NFT images'
                    width={600}
                    height={600}
                    className={Style.nftcard_box_img_img}
                    layout='responsive'/>
                </div>

                <div className={Style.nftcard_box_update}>
                    <div className={Style.nftcard_box_update_left}>
                        <div className={Style.nftcard_box_update_left_like}
                        onClick= {()=>likeNft()}>
                            {like?(<AiOutlineHeart />) : ( <AiFillHeart className= {Style.nftcard_box_update_left_like_icon}/>)}
                            {""} 22
                        </div>
                    </div>

                    <div className={Style.nftcard_box_update_right}>
                        <div className={Style.nftcard_box_update_right_info}>
                            <small>Remaining Time</small>
                            <p>3h : 15m : 20s</p>
                        </div>
                    </div>
                </div>

                <div className={Style.nftcard_box_update_details}>
                    <div className={Style.nftcard_box_update_details_price}>
                        <div className={Style.nftcard_box_update_details_price_box}>
                            <h4>{el.name} #{el.tokenId}</h4>

                            <div className={Style.nftcard_box_update_details_price_box_box}>
                                <div className={Style.nftcard_box_update_details_price_box_bid}>
                                    <small>Current Bid</small>
                                    <p>{el.price}ETH</p>
                                </div>

                                <div className={Style.nftcard_box_update_details_price_box_stock}>
                                   <small>61 in stock</small> 
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className={Style.nftcard_box_update_details_category}>
                        <BsImages />
                    </div>
                </div>
            </div>
            </Link>

        ))

        }
    </div>
  )
}

export default NFTCard