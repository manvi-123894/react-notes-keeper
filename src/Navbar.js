import React,{useState} from 'react';
import {useGlobalContext} from './context'
import './Navbar.css'
import {FaBars , FaTimes, FaSearch, FaPlus} from 'react-icons/fa'

const Navbar = () => {

 
 
 const {showNav,showModal,dispatch,subjectArray,filterArray,searchFilter} = useGlobalContext();
 
 const [active,setActive] = useState(0);
 const [search,setSearch] = useState("");
 

 const handleFilter = (e,id) => {
   setActive(id);
   filterArray(e);
 }

 const handleSearch = (e) => {
   setSearch(e.target.value);
   searchFilter(e.target.value);
 }

  const handleSearchSubmit = ( e) => {
    e.preventDefault();
    searchFilter(search);
  }

    return (
      <>
      <nav className="nav">
       <FaBars className="bars" onClick={() => dispatch({type : "TOGGLE_NAV"})}/>

        <form className="search-form" onSubmit={ (e) =>  handleSearchSubmit(e)}>
           <input onChange={ (e) => handleSearch(e)} className="search" value={search}  placeholder="Search Your Notes"/>
          <button type="submit" className="search-icon-box">
            <FaSearch className="search-icon"/>
          </button>
        </form>

        <button className="add-note" onClick={() => dispatch({type : "TOGGLE_MODAL"})}>
          { showModal ? <FaTimes /> : <FaPlus/>}
        </button>
      </nav>
     <aside className={`side-navbar ${showNav? "show-nav" : ""}`}>
       <div className="header">
         <FaTimes className="fa-times" onClick={() => dispatch({type : "TOGGLE_NAV"})}/>
       </div>

       <div className="notes-subjects">
         {subjectArray.map( ( item,index) => {
            return <div className={`notes-subjects-label-div ${index === active ? "active" : ""}`} key={index} onClick={(e) => handleFilter(e,index)} >
             <p>{item}</p>
            </div>
         })}
       </div>
     </aside>
      </>
    );
}

export default Navbar;