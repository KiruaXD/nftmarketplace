/** @type {import('next').NextConfig} */
module.exports={
  reactStrictMode: false,
  
  webpack: true,
  webpack: (config) =>
  {
    config.resolve.fallback = {fs:false };
    return config;
  },
  images:{

    domains: ['nftmarketproject.infura-ipfs.io','infura-ipfs.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nftmarketproject.infura-ipfs.io',
        port:'',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'infura-ipfs.io',
        port:'',
        pathname: '/ipfs/**',
      },
    ],
  
  },
 
}


