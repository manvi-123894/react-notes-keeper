import React , {useEffect} from 'react';
import {useGlobalContext} from './context'
import {Link} from 'react-router-dom'
import {FaTag , FaEdit, FaTrashAlt ,FaArrowLeft, FaTags} from 'react-icons/fa'
import './App.css'
import './Notes.css'
import './SingleNote.css'


const SingleNote = ({match}) => {
const {dispatch,handleEdit,handleDelete,notesArray,showModal } = useGlobalContext();

 const activeNote =   notesArray.find( note => note.id === match.params.id);


 return (
  <div className={`app-note-area single-note-app-container  ${showModal ? "transparent" : ""}`}>
      {
       activeNote && (
        <div className="single-note-container">
          <div  className="single-note-details">
            <div className="single-note-details-header">
              <h1 className="single-note-details-title">{activeNote.title}</h1>
            </div> 
    
            <p className="single-note-details-notes">{activeNote.notes}<br /> </p>

            <div className="single-note-details-feature">
              <div className="single-note-details-feature-subject">
                <FaTag className="single-note-details-feature-subject-icon"/>
                <p>{activeNote.subject}</p>      
              </div>
              <div className="single-note-details-feature-btns">
                <FaEdit className="edit feature-btn" onClick={() => handleEdit(activeNote.id)}/>
                <FaTrashAlt className="delete feature-btn"  onClick={() => handleDelete(activeNote.id)}/>
              </div>
             </div>
          </div>
          
        </div>
       )
      }

    <div className="back-home-div"> 
           <h1> Back To Home</h1>
          <Link to="/" className="back-home" > <FaArrowLeft/> </Link >
     </div>
      
     </div>
 );

}

export default SingleNote;