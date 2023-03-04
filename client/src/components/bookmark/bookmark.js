

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Logout from '../logout/logout'
import "./bookmark.css"
import { useSelector, useDispatch } from 'react-redux'
import { setBook } from '../../store/slices/bookSlice'
import { addToCart } from '../../store/slices/cartSlice'

const Bookmark = () => {
    const [list, setList] = useState([])
    const [uname, setUname] = useState("")
    const [item, setItem] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const bookdetails = useSelector((state) => {
        return state.carts
    })
    const handleEdit = (dt) => {
        dispatch(setBook(dt))
        navigate("/editbook")

    }

    const handleClick = async (d) => {
        let isPresent = false;
        for (let i = 0; i < bookdetails.length; i++) {
            if (bookdetails[i]._id === d._id) {
                isPresent = true
                console.log("found")
            }
        }
        // console.log("bookdetails", bookdetails)

        if (isPresent) {
            alert("Book is already present in your cart.")
        }
        else {
            setItem(d)
            alert("book has been added to your favorite list")
        }
    }
    useEffect(() => {
        dispatch(addToCart(item))
        // setBookdetails([...bookdetails,item])
    }, [item])
    const deletesingle = (id) => {
        let data = [id];
        let token = localStorage.getItem("Authorization");
        axios({
            method: "DELETE",
            //   url: "http://localhost:3001/delete",
            url: "https://soumya-bookstore-backend-application.onrender.com/delete",
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

    useEffect(() => {
        const token = localStorage.getItem("Authorization")
        axios({
            // url:"http://localhost:3001/books",
            url: "https://soumya-bookstore-backend-application.onrender.com/books",
            method: "get",
            headers: {
                authorization: token
            }
        }).then((res) => {
            console.log(res.data)
            setList([...res.data])
        }).catch((err) => {
            console.log(err)
        })
        axios({
            // url:"http://localhost:3001/uname",
            url: "https://soumya-bookstore-backend-application.onrender.com/uname",
            method: "get",
            headers: {
                authorization: token
            }
        }).then((res) => {
            console.log(res.data)
            setUname(res.data.toUpperCase())
        }).catch((err) => {
            console.log(err)
        })

    }, [])
    return (
        <div className='parent'>
            <h1> Books List</h1>
            <div className='child'>

                <p onClick={() => navigate("/favorite")} className="cart">Go to Cart</p>

                <p onClick={() => navigate("/addbook")} className="bbtn">Add new Book</p>
                <p className="para">Welcome! <span>{uname}</span></p>
                <Logout />
            </div>
            <div className='container'>
                {
                    list.map((k, i) => {
                        return (
                            <div key={k._id} className="cards" >
                                <img src={k.image} alt="loading"></img>
                                <p>Title : {k.title}</p>
                                <p>Tuthor Name : {k.author}</p>
                                <p>Description : {k.describe}</p>
                                <p>Publish_Date : {k.publishdate}</p>
                                <p>Publisher : {k.publisher}</p>
                                <div className='btns'>
                                    <button onClick={() => handleClick(k)} className="atc">Add to Cart</button>
                                    <button onClick={() => handleEdit(k)} className="edt">Edit book</button>
                                    <button onClick={() => deletesingle(k._id)} className="dlt">Delete</button>
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