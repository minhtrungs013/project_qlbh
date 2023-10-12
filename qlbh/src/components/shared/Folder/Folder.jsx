
import React, { useEffect, useState } from 'react'
import usePrevious from '../hooks/UsePrevious';
import icon from './icon.png'
import './style.css'

export default function Folder({dataInput, onSelect, url, lableName, description}) {
    const [data, setData] = useState([])
    const prevCount = usePrevious(data)

    useEffect(() => {
     if(data !== prevCount){
        setData(dataInput)
     }
    }, [data, dataInput, prevCount])
    
    // const handleSelect = (value) => {
    //     onSelect() && onSelect(value);
    //   };

  return (
    <div>
        <div className="folder clearfix">
        <div className="folder-item">
        {/* <div className="folder-item" onClick={() => handleSelect('item')}> */}
            <div><img src={url!== "" ? url : icon} alt="" /></div>
            <p className="content">{lableName}</p>
          </div>
  </div></div>
  )
}