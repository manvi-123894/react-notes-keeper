import React from 'react'
import './Notes.css'
import {useGlobalContext} from './context'
import {FaTag , FaEdit, FaTrashAlt ,FaArrowRight, FaTags} from 'react-icons/fa'
import { Link} from 'react-router-dom'

const Notes = ({subject,title,notes,id}) => {

 const {dispatch,handleEdit,handleDelete} = useGlobalContext();
 

 return (
       <div  className="single-note">
            <div className="single-note-header">
              <h1 className="single-note-title">{title.slice(0,8)}</h1>
              
             <Link className="read-more" to={`/${id}`}> 
                 <FaArrowRight />
             </Link>
            </div> 
     
     
            <p className="single-note-notes">{notes.slice(0,150)}<br /> </p>

            <div className="single-note-feature">
              <div className="single-note-feature-subject">
                <FaTag className="single-note-feature-subject-icon"/>
                <p>{subject.slice(0,15)}</p>
                 
              </div>
              <div className="single-note-feature-btns">
                <FaEdit className="edit feature-btn" onClick={() => handleEdit(id)}/>
                <FaTrashAlt className="delete feature-btn"  onClick={() => handleDelete(id)}/>
              </div>
            </div>
      </div>
 );
}

export default Notes;