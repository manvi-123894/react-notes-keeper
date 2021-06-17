import React, {useEffect} from 'react'
import {useGlobalContext} from './context'

const Caution = () => {
 const {cautionContent,showCaution} = useGlobalContext();

 useEffect(() => {
  const timeout = setTimeout( ()=> {
   showCaution()
  },3000);

  return () => clearTimeout(timeout);
 })

 return (
    <p className={`caution-para ${cautionContent.type}`}> {cautionContent.message} </p>
 );
}

export default Caution;