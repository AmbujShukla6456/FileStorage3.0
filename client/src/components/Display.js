import {React,useState} from 'react'
import './Display.css';
const Display = ({contract,account}) => {
  const [data,setData]=useState('');
  const getData=async()=>{
    let dataArray;
    const otherAccount=document.querySelector('.address').value;
    try{
    if(otherAccount){
      dataArray=await contract.display(otherAccount);
      console.log(dataArray);
    }
    else{
      dataArray=await contract.display(account);
      console.log(dataArray);
    }
  
  const empty=Object.keys(dataArray).length === 0;

  if(!empty){
    const str=dataArray.toString();
    const str_array=str.split(",");
    console.log(str);
    console.log(str_array);
    const images=str_array.map((item,i)=>{
      return (
        <a href={item} key={i} target='_blank' rel="noreferrer">
          <img
            key={i}
            src={item}
            alt="new"
            className='image-list'
          ></img>
        </a>
      )
    })
    setData(images);
  }
  
}catch(e){
  console.log("No access");
}
  }
  return (<>
    <div className='image-list'>{data}</div>
    <input type="text" placeholder='Enter Address' className='address'></input>
    <button className='center button' onClick={getData}>Get Data</button>
    </>
  )
}

export default Display