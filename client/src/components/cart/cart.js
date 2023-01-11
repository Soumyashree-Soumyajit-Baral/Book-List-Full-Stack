
import React,{ useContext} from 'react'
import Logout from '../logout/logout'
import { context } from '../context/context'

const Favorite = () => {
    const {bookdetails, setBookdetails}=useContext(context)
   
  return (
    <div className='parent'>
        <h1> Favorite Books</h1>
        <Logout/>
        <div className='container'>
            {
                bookdetails.map((v,i)=>{
                    if(v.title){
                        return (
                            <div key={i} className="cards">
                                <img src={v.image} alt="loading"></img>
                                <p>Title : {v.title}</p>
                                <p>Tuthor Name : {v.author}</p>
                                <p>Description : {v.describe}</p>
                                <p>Publish_Date : {v.publishdate}</p>
                                <p>Publisher : {v.publisher}</p>
                            </div>
                        ) 
                    }
                    
                    // return(
                    //     <div key={i} className="cards">
                    //         <img src={k.image} alt="loading"></img>
                    //         <p>Title : {k.title}</p>
                    //         <p>Tuthor Name : {k.author}</p>
                    //         <p>Description : {k.describe}</p>
                    //         <p>Publish_Date : {k.publishdate}</p>
                    //         <p>Publisher : {k.publisher}</p>
                    //     </div>
                    // )
                })
            }
        </div>
    </div>
  )
}

export default React.memo(Favorite)