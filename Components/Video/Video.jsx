import React from 'react'
import Image from 'next/image'
import Style from './Video.module.css'
import images from '../../img'

const Video = () => {
  return (
    <div className={Style.Video}>
        <div className={Style.Video_box}>
            <h1>
                <span>🎬</span> The Videos
            </h1>
            <p>
                Check Out our hottest videos . view more and share more 
                perspectives on just about any topic . Everone's welcome.
            </p>

            <div className={Style.Video_box_frame}>
                <div className={Style.Video_box_frame_left}>
                    <Image 
                        src={images.nftvideo}
                        alt='Video Image'
                        width={1920}
                        height={1080}
                        objectFit='cover'
                        className={Style.Video_box_frame_left_img}
                        
                    />
                </div>

                <div className={Style.Video_box_frame_right}>Hey</div>
            </div>
        </div>
    </div>
  )
}

export default Video