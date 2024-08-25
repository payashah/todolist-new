import React from 'react'
import "./DeleteAllModal.css"
import ReactDOM from "react-dom"

export default function DeleteAllModal({ accept, reject }) {



    return ReactDOM.createPortal(
        <div className='modals-parent active'>
            <div className='deleteAllModal'>
                <h1 className='deleteAllModal-title'> آیا از حذف همه موارد اطمینان دارید ؟</h1>
                <div className='deleteAllModal-btnBox'>
                    <button className='deleteAllModal-btnBox-btn yes' onClick={accept}>yes</button>
                    <button className='deleteAllModal-btnBox-btn no' onClick={reject}>No</button>
                </div>
            </div>
        </div>, document.getElementById("modals-parent")
    )
}