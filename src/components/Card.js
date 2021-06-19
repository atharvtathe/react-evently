import React from 'react'
import {
  Link
} from "react-router-dom";

const Card = (props) => {

    return <Link to={`/${props.id}`}>
        <div className="flex flex-col  rounded-lg overflow-hidden shadow-2xl w-80 h-64  ">
            <div>
                <img src={`http://localhost:5000/${props.image}`} alt={props.title} className="object-cover w-80 h-40"/>
            </div>
            <div className="text-lg py-1 px-1 font-medium text-gray-800">{props.title}</div>
        </div>
         </Link>    
        

}

export default Card
