import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title } from "../Components/componentIndex";
import FollowerTabCard from "../Components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";


import {NFTMarketplaceContext} from "../context/NFTMarketplaceContext"

const author = () => {
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "db4ff74hf99999f9974hf774f99f"
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "db4ff74hf99999f9974hf774f99f"
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "db4ff74hf99999f9974hf774f99f"
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "db4ff74hf99999f9974hf774f99f"
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "db4ff74hf99999f9974hf774f99f"
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "db4ff74hf99999f9974hf774f99f"
    },
  ];

  const [collectables, setCollectables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  const {fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTMarketplaceContext)

  const [nfts, setNfts] = useState([])
  const [myNFTs, setMyNFTs] = useState([])

  useEffect(()=>{
    fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items)=>{
      setNfts(items)
    })
  },[])


  useEffect(()=>{
    fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items)=>{
      setMyNFTs(items)
    })
  },[])

  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground2} />
      <AuthorProfileCard currentAccount={currentAccount}/>
      <AuthorTaps
        setCollectables={setCollectables}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
      />

      <AuthorNFTCardBox
        collectables={collectables}
        created={created}
        like={like}
        follower={follower}
        following={following}
        nfts={nfts}
        myNFTs={myNFTs}
      />
      {/* <Title
        heading="Popular Creators"
        paragraph="Click on music icon and enjoy NTF music or audio
"
      />
      <div className={Style.author_box}>
        {followerArray.map((el, i) => (
          <FollowerTabCard i={i} el={el} />
        ))}
      </div> */}

      {/* <Brand /> */}
    </div>
  );
};

export default author;