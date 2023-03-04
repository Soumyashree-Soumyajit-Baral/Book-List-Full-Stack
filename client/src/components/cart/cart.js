
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../../store/slices/cartSlice'


const Favorite = () => {
    const dispatch = useDispatch()
    const bookdetails = useSelector((state) => {
        return state.carts
    })
    const handleRemove = (dt) => {
        // console.log(dt)
        let idx;
        for (let i = 0; i < bookdetails.length; i++) {
            if (dt === bookdetails[i]._id) {
                idx = i
            }
        }
        dispatch(removeFromCart(idx))
    }

    return (
        <div className='parent'>
            <h1> Favorite Books</h1>
            <div className='container'>
                {
                    bookdetails.map((v, i) => {
                        if (v.title) {
                            return (
                                <div key={i} className="cards">
                                    <img src={v.image} alt="loading"></img>
                                    <p>Title : {v.title}</p>
                                    <p>Tuthor Name : {v.author}</p>
                                    <p>Description : {v.describe}</p>
                                    <p>Publish_Date : {v.publishdate}</p>
                                    <p>Publisher : {v.publisher}</p>
                                    <div className="btns">
                                        <button onClick={() => handleRemove(v._id)}>Remove</button>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default React.memo(Favorite)