import React, { useContext, useEffect,useState } from 'react'

import Style from '../styles/index.module.css'
import { HeroSection , Service ,BigNFTSlider, Subscribe, Title, Category, Filter, NFTCard, Collection, Follower, Audio, Slider, Brand, Video, Loader} from '../Components/componentIndex'
import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext'
import connectWallet from './connectWallet'
import { getTopCreators } from '../topCreator/topCreator'
const Home = () => {

  const {checkIfWalletConnected} = useContext(NFTMarketplaceContext)
  

  useEffect(()=>{
    checkIfWalletConnected()
  },[])

  const {fetchNFTs} = useContext(NFTMarketplaceContext)
  const [nfts,setNfts] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])

  const creators = getTopCreators(nfts);


  useEffect(()=>{
    fetchNFTs().then((item)=>{
      setNfts(item.reverse())
      setNftsCopy(item)
    })
  },[])
  
  return (
    <div className={Style.homePage}>
      <HeroSection />
      {/* <Service /> */}
      {/* <BigNFTSlider /> */}
      {/* <Title heading='Audio Colleciton' paragraph='Discover the most outstanding NFTS in all topics of life.'/>
      <Audio /> */}
      {/* {creators.length==0? <Loader />: <Follower Topcreator = {creators}/>} */}
      
      {/* <Slider />
      <Collection /> */}
      <Title heading='Featured NFTS' paragraph='Discover the most outstanding NFTS in all topics of life.'/>
      {/* <Filter /> */}
      <NFTCard NFTData = {nfts}/>
      {/* <Title heading='Browse by Category' paragraph='Explore the NFTS int the most featured categories'/> */}
      {/* <Category/> */}
      {/* <Subscribe /> */}
      {/* <Brand /> */}
      {/* <Video /> */}
      
    </div>
  )
}

export default Home;