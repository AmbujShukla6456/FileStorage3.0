import {React,useEffect} from 'react';
import "./Modal.css";
const Modal = ({setModalOpen,contract}) => {
  const sharing=async()=>{
    const addr=document.querySelector('.address').value;
    await contract.allow(addr);
    console.log('shared');
  }
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='title'>Share With</div>
            <div className='body'>
            <input placeholder='Enter Address' className='address' type='text'></input>
            </div>
            <form id='MyForm'>
              <select id="selectNumber">
                <option className='address'>People with Access</option>
              </select>
            </form>
            <div className='footer'>
              <button onClick={()=>{
                setModalOpen(false);
              }} id="cancelBtn">cancel</button>
              <button onClick={()=>sharing()}>Share</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Modal