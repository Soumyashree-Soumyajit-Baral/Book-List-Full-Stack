import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "./addbook.css"

const Addbook = () => {
    const [add, setAdd]=useState({})
    const navigate=useNavigate()
    const handleAdd=()=>{
        const token=localStorage.getItem("Authorization")
        axios({
            url:"http://localhost:3001/books",
            method:"post",
            headers:{
                authorization:token
            },
            data:{
                title:add.title,
                isbn:add.isbn,
                author:add.author,
                describe:add.describe,
                publishdate:add.publishdate,
                publisher:add.publisher
            }
        }).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <>
            <div className="add-container">
                <div className="add-innerContainer">
                    <form>
                        <h2>Create new book</h2>
                        
                        <div>
                            <input type="text" placeholder="Title"  name="title" onChange={(e) => { setAdd({ ...add, title: e.target.value }) }}></input>
                        </div>
                        <div>
                            <input type="text" placeholder="ISBN"  name="isbn" onChange={(e) => { setAdd({ ...add, isbn: e.target.value }) }}></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Author"  name="author" onChange={(e) => { setAdd({ ...add, author: e.target.value }) }}></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Description"  name="describe" onChange={(e) => { setAdd({ ...add, describe: e.target.value }) }}></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Publish_Date"  name="publishdate" onChange={(e) => { setAdd({ ...add, publishdate: e.target.value }) }}></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Publisher"  name="publisher" onChange={(e) => { setAdd({ ...add, publisher: e.target.value }) }}></input>
                        </div>
                        <div>
                            <button onClick={handleAdd}>Submit</button>
                        </div>
                        <div>
                            <button onClick={() => navigate("/bookmark")} className="btn">Show books</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
export default Addbook
