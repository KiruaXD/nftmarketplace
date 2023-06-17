import React , {useState, useContext, useEffect }from 'react'
import Web3Modal from "web3Modal"
import {ethers } from "ethers"
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import {create as ipfsHttpClient} from "ipfs-http-client"
import { NFTMarketplaceABI, NFTMarketplaceaddress } from './constants'
import { headers } from '../next.config'


// console.log("add",NFTMarketplaceaddress)
// console.log("abi",NFTMarketplaceABI)
// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")
const subdomain='nftmarketproject.infura-ipfs.io'
const projectId = '2R1N6QNlsfkzmpxMBQm8HXsTYCd'
const projectSecretKey = '282403ecc00604f4167c4600f83d9a4f'
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
    "base64"
)}`;


const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers:{
        authorization: auth
    }
})

const fetchContract= async(signerOrProvider) => new ethers.Contract(
    NFTMarketplaceaddress,
    NFTMarketplaceABI,signerOrProvider
    )

const connectingWithSmartContract = async()=>{
    try{
        
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
 
        const provider = new ethers.providers.Web3Provider(connection)
    
        const signer = await provider.getSigner()
        // console.log(signer.getAddress())
        const contract = await fetchContract(signer)
        console.log(contract.signer)
        return contract
    }catch(error){
        console.log(error)
        console.log("Somwthing went wrong while connecting with contract")
    }
}

export const NFTMarketplaceContext = React.createContext();





export const  NFTMarketplaceProvider = ({children})=>{

    

    const titleData= "Discover , collect , and sell NFTs"


    const [error, setError] = useState("")
    const [openError, setOpenError] = useState(false)

    const [currentAccount, setCurrentAccount] = useState("")
    const router = useRouter()

    const checkIfWalletConnected = async() => {
        try{
            if(!window.ethereum) return setOpenError(true),setError("Install MetaMask")


            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            })

            if(accounts.length){
                setCurrentAccount(accounts[0])
            }else{
                console.log("No Account found")
                setOpenError(true)
            }
           
        }
        catch (error){
            console.log(error)
            console.log("Something wrong while connecting to wallet")
            setError("Something wrong while connecting to wallet")
            setOpenError(true)
        }
    }

    useEffect(()=>{
        checkIfWalletConnected()
    },[])


    const connectWallet = async() =>{
        try {
            if(!window.ethereum) return
            (
                setOpenError(true),setError("Install MetaMask")
            ) 

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            
                setCurrentAccount(accounts[0])
                // window.location.reload();


        } catch (error) {
            console.log(error)
            setError("Error while connecting to wallet")
            setOpenError(true)
        }
    }

    const uploadToIPFS = async(file)=>{
        try {
            const added = await client.add({content:file})
            const url = `https://${subdomain}/ipfs/${added.path}`
            // const url = `http://${subdomain}/ipfs/`
            return url;
        } catch (error) {
            setError("Error Uploading to IPFS")
            setOpenError(true)
            console.log("Error Uploading to IPFS", (error))
        }
    }

    const createNFT = async(name, price, image, description, router)=>{
        
            
            if(!name || !description || !price || !image)
            return setError("Data is missing"),setOpenError(true)
            const data = JSON.stringify({name,description, image})
            try {
                const added = await client.add(data)

                const url = `https://${subdomain}/ipfs/${added.path}`


                await createSale(url, price)
                router.push('/searchPage')
            } 
            catch (error) {
                setError("Error while creating NFT")
                console.log(error)
            console.log("Error while creating NFT")
            setOpenError(true)
        }
    }


    const createSale = async(url , formInputPrice , isReselling , id) =>{
        try {

            const price = ethers.utils.parseUnits(formInputPrice, "ether")
            const contract= await connectingWithSmartContract()
            // console.log(contract)
            const listingPrice = await contract.getListingPrice();
            console.log(listingPrice)

            const transaction = !isReselling ? await contract.createToken(url , price, {
                value: listingPrice.toString()
            }): await contract.resellToken(id, price,{
                value: listingPrice.toString(),
            })

            await transaction.wait()
            
            // console.log(transaction)
            
        } catch (error) {
            console.log(error)
            console.log("Error while creating NFT")
            setError("Error while creating nfts"),setOpenError(true)
        }
    }


    const fetchNFTs= async()=>{
        try{
            const provider =new ethers.providers.JsonRpcProvider()
            const contract = await fetchContract(provider)
            console.log(contract)
            const data = await contract.fetchMarketItems();

            const items = await Promise.all(
                data.map(async({tokenId, seller, owner , price: unformattedPrice})=>{
                    const tokenURI = await contract.tokenURI(tokenId)

                    const {
                        data: {image, name, description},

                    } = await axios.get(tokenURI)

                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),"ether"
                    )

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI
                    }
                })
            )
            return items
        }catch(error){
            console.log(error)
            console.log("Error while fetching NFTS")
            setOpenError(true)
            setError("Error while fetching NFTS")
        }
    }


    useEffect(()=>{
       fetchNFTs();
    },[])

    const fetchMyNFTsOrListedNFTs = async(type)=>{
        try {
            const contract = await connectingWithSmartContract()
            const data = type== "fetchItemsListed" ?  await contract.fetchItemsListed(): 
            await contract.fetchMyNFTs();

            const items = await Promise.all(
                data.map(async ({tokenId, seller, owner, price: unformattedPrice})=>{
                    const tokenURI = await contract.tokenURI(tokenId)
                    const {
                        data : {image, name, description},
                    } = await axios.get(tokenURI)
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    )

                    return{
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                    }
                })
            )

            return items
        } catch (error) {
            console.log(error)
            console.log("Error while fetching nfts")
            setOpenError(true)
            setError("Error while fetching NFTS")
        }
    }

    useEffect(()=>{
        fetchMyNFTsOrListedNFTs
    },[])
    

    const buyNFT = async(nft)=>{
        try {const contract = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(nft.price.toString(),"ether")

            console.log(price)

            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
              
            });


            await transaction.wait()
            router.push('/author')
            
        } catch (error) {
            console.log(error)
            console.log("Error while buying NFT")
            setOpenError(true)
            setError("Error while buying NFTS")
        }
    }

    return (
        <NFTMarketplaceContext.Provider value={{currentAccount,checkIfWalletConnected,createNFT,uploadToIPFS,connectWallet,titleData,fetchMyNFTsOrListedNFTs,buyNFT,currentAccount,fetchNFTs,createSale,setOpenError,openError,error}}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
}