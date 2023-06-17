import 'setimmediate'

if (!global.setImmediate) {
  global.setImmediate = setTimeout
}

import { NFTMarketplaceProvider } from '../context/NFTMarketplaceContext';
import '../styles/globals.css'

import { NavBar, Footer } from "../Components/componentIndex";
import { Component } from 'react';

const MyApp = ({Component, pageProps})=>{
   return <div>
      <NFTMarketplaceProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer/>
      </NFTMarketplaceProvider>
   </div>;
};

export default MyApp;
