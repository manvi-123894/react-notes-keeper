import React from 'react';
import './Modal.css'
import { FaTimes} from 'react-icons/fa'
import {useGlobalContext} from './context'

const Modal = () => {
 const {showModal,dispatch,details, setDetails ,handleSubmit}= useGlobalContext();

  const handleChange = (e) => {
      setDetails({
        ...details,
        [e.target.name] : e.target.value
      });
  }


  return (
    <section className="modal">
      <div className="modal-close-btn">
         <FaTimes onClick={() => dispatch({type : "TOGGLE_MODAL"})}/>
      </div>
      <div className="modal-header">
        <h1 className="modal-title">Create Your Note</h1>
      </div>
      <div className="modal-form">
         <form className="form" onSubmit={(e) => handleSubmit(e)}>
           <div className="subject">
            <h1>Subject</h1>
            <input  name="subject" type="text" value={details.subject} onChange={(e) => handleChange(e)}/>
           </div>
           <div className="title">
            <h1>Title</h1>
            <input name="title" type="text" value={details.title} onChange={(e) => handleChange(e)}/>
           </div>
           <div className="notes">
            <h1>Write Your Note Here :</h1>
           <textarea  name="notes"  cols="30" rows="10" value={details.notes} onChange={(e) => handleChange(e)}></textarea>
           </div>

           <div className="btn">
              <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
           </div>
         </form>
      </div>
    </section>
  );
}

export default Modal;
