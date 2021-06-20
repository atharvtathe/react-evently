import React from 'react'
import {
  Link
} from "react-router-dom";

const Card = (props) => {

    return <Link to={`/detail/${props.id}`}>
        <div className="flex flex-col  rounded-lg overflow-hidden shadow-2xl w-80 h-64  ">
            <div>
                <img src={`${process.env.REACT_APP_backend_url}/${props.image}`} alt={props.title} className="object-cover w-80 h-40"/>
            </div>
            <div className="text-lg py-1 px-1 font-medium text-gray-800">{props.title}</div>
        </div>
         </Link>    
        

}

export default Card
