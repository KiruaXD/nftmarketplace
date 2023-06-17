import React , {useState, useEffect} from 'react'
import { RiUserFollowFill,  RiUserUnfollowFill, RiAwardLine} from 'react-icons/ri'
import Style from './Follower.module.css'
import FollowerTabCard from './FollowerTabCard/FollowerTabCard'
import images from '../../img'


const Follower = ({Topcreator}) => {
  // const CardArray =[images.user1, images.user2, images.user10, images.user3, images.user4, images.user5, images.user6, images.user7];
  const FollowingArray = [images.user1,images.user5, images.user6, images.user7, images.user4, images.user5, images.user6, images.user7];
  const NewsArray = [images.user10, images.user2, images.user1, images.user3, images.user4, images.user5, images.user6, images.user7];

  const [popular, setPopular] = useState(true)
  const [following, setFollowing] = useState(false)
  const [news, setNews] = useState(false)

  

  const openPopular = () =>{
    if(!popular){
      setPopular(true)
      setFollowing(false)
      setNews(false)
    }
  }

  const openFollower = () =>{
    if(!following){
      setPopular(false)
      setFollowing(true)
      setNews(false)
    }
  }

  const openNews = () =>{
    if(!news){
      setPopular(false)
      setFollowing(false)
      setNews(true)
    }
  }
  return (
    <div className={Style.followerTab}>
      <div className={Style.followerTab_title}>
        <h2>Top Creators List..</h2>
        <div className={Style.followerTab_tabs}>
          {/* <div className={Style.followerTab_tabs_btn}>
            <button onClick={()=>openPopular()}>
              <RiUserFollowFill/> Popular
            </button>
            <button onClick={()=>openFollower()}>
              <RiUserFollowFill/>Following
            </button>
            <button onClick={()=>openNews()}>
              <RiUserFollowFill/>Noteworthy
            </button>
          </div> */}
        </div>
      </div>
      {popular&& (
        <div className={Style.followerTab_box}>
          {Topcreator.map((el , i)=>(
            <FollowerTabCard key={i+1} i={i} el={el} />
          ))

          }
        </div>
      )
      }

      {following&& (
        <div className={Style.followerTab_box}>
          {FollowingArray.map((el , i)=>(
            <FollowerTabCard key={i+1} i={i} el={el} />
          ))

          }
        </div>
      )
      }

      {news&& (
        <div className={Style.followerTab_box}>
          {NewsArray.map((el , i)=>(
            <FollowerTabCard key={i+1} i={i} el={el} />
          ))

          }
        </div>
      )
      }

      {/* <div className={Style.foloowerTab_box}>
        <div className={Style.followerTab_member_box}>
          <a href="#">Show me more</a>
          <a href="#">Become, author</a>
        </div>
      </div> */}
    </div>
  )
}

export default Follower