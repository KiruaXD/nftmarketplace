import React from 'react'
import Link from 'next/link'


import Style from './HelpCenter.module.css'
const HelpCenter = () => {
  const helpCenter = [
    {
      name:'About',
      link:'aboutus'
    },
    {
      name:'Contact Us',
      link:'contactus'
    },
    {
      name:'Sign up',
      link:'signUp'
    },
    {
      name:'Login',
      link:'login'
    },
    {
      name:'Subscription',
      link:'subscription'
    }
  ]
  return (
    <div >
      {
        helpCenter.map((el,i)=>(
          <div className={Style.box} key = {i+1}>
            <Link href = {{pathname : `${el.link}`}}>{el.name}</Link>
          </div>
        ))
      }
    </div>
  )
}

export default HelpCenter