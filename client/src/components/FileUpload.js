import {React,useState} from 'react'
import axios from 'axios';
import './FileUpload.css';
const FileUpload = ({contract,account,provider}) => {
  const [file,setFile]=useState(null);
  const [fileName,setFileName]=useState("No Image Selected!!");

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      const formData=new FormData();
      formData.append("file",file);
      
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: 'a76e9d48d690ce4441c9',
          pinata_secret_api_key: 'e330dbad69f9341c9c9a2d8da85ad1695bd59ab23a3ee04f4c644f6b04c6fb49' ,
          "Content-Type": "multipart/form-data",
        },
      });
      const ImgHash=`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      contract.add(account,ImgHash);
      alert("image Uploaded");
      setFile("No Image Selected!!");
      setFile(null);
    }
    catch(e){
      alert(e)
    }
  }
  const retrieve=(e)=>{
    const data=e.target.files[0];
    console.log(data);
    const reader=new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend=()=>{
      setFile(e.target.files[0]);
    }
    setFileName(e.target.files[0].name);
    e.preventDefault();
  }
  return (
    <div className='top'>
      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor='file-upload' className='choose'>
          Choose Image
        </label>
        <input disabled={!account} type='file' id='file-upload' name='data' onChange={retrieve}/>
        <span className='textarea'>Image:{fileName}</span>
        <button type='submit' className='upload' disabled={!file}>Upload File</button>
      </form>
    </div>
  )
}

export default FileUpload;