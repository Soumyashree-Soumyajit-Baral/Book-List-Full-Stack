

import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Logout from '../logout/logout'
import "./bookmark.css"
import { context } from '../context/context'

const Bookmark = () => {
    const [list, setList]=useState([])
    const [item, setItem]=useState({})
    const {bookdetails, setBookdetails}=useContext(context)
    const navigate=useNavigate()
    const handleClick=async(d)=>{
        await setItem(d)
        console.log(item._id)
        let isPresent=false;
        for(let i=0;i<bookdetails.length;i++){
            if(bookdetails[i]._id===d._id){
                isPresent=true
            }
        }
        console.log(isPresent)
        if(isPresent){
            alert("Book is already present in your cart.")
        }else{

            setBookdetails([...bookdetails,item])
            alert("book has been addes to your favorite list")
        }

        // setBookdetails([...bookdetails,item])
        // setBookdetails([])
        console.log(bookdetails)
    }
    const deletesingle = (id) => {
        let data = [id];
        let token = localStorage.getItem("Authorization");
        axios({
          method: "DELETE",
          url: "http://localhost:3001/delete",
          headers: {
            authorization: token,
          },
          data: {
            deleteitems: data,
          },
        });
        
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
        alert("book will be deleted !")
      };
    
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
        <p onClick={()=>navigate("/favorite")} className="cart">Go to Cart</p>
        <Logout/>
        <p onClick={()=>navigate("/addbook")} className="bbtn">Add new Book</p>
        <div className='container'>
            {
                list.map((k,i)=>{
                    return(
                        <div key={k._id} className="cards" >
                            <img src={k.image} alt="loading"></img>
                            <p>Title : {k.title}</p>
                            <p>Tuthor Name : {k.author}</p>
                            <p>Description : {k.describe}</p>
                            <p>Publish_Date : {k.publishdate}</p>
                            <p>Publisher : {k.publisher}</p>
                            <div className='btns'>
                            <button onClick={async()=>await handleClick(k)} className="atc">Add to Cart</button>
                            <button onClick={()=>deletesingle(k._id)} className="dlt">Delete</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Bookmark