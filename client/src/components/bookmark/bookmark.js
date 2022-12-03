

import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Logout from '../logout/logout'
import "./bookmark.css"

const Bookmark = () => {
    const [list, setList]=useState([])
    const navigate=useNavigate()
    
    useEffect(()=>{
        const token=localStorage.getItem("Authorization")
        axios({
            url:"http://localhost:3001/books",
            method:"get",
            headers:{
                authorization:token
            }
        }).then((res)=>{
            console.log(res.data)
            setList(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
  return (
    <div className='parent'>
        <h1> Books List</h1>
        <Logout/>
        <p onClick={()=>navigate("/addbook")} className="bbtn">Add new Book</p>
        <div className='container'>
            {
                list.map((k,i)=>{
                    return(
                        <div key={i} className="cards">
                            <img src="book.png" alt="image"></img>
                            <p>Title : {k.title}</p>
                            <p>Tuthor Name : {k.author}</p>
                            <p>Description : {k.describe}</p>
                            <p>Publish_Date : {k.publishdate}</p>
                            <p>Publisher : {k.publisher}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Bookmark