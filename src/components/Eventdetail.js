
import React, {useEffect, useState} from 'react'
import {
  useParams
} from "react-router-dom";


const Eventdetail = () => {
    let { eventID } = useParams();
    const [isloading, setloading] = useState(true);
    const [detail, setdetail] = useState([]);
    
    useEffect(() => {
        
        const getdetails = async () => {
        const res = await fetch(`http://localhost:5000/api/events/${eventID}`);
        const result  = await res.json();
        let final;
        final = result.event;
        setdetail(final);
        setloading(false);
        }
    getdetails();
    }, [eventID]);

    if(isloading === true) {
        return <div>
           <h1>Loading....</h1>
        </div>
    }
    const {_id, title, image, description} = detail;
    const newdesc = description.split('\n').map((str,index) => <p key={index}>{str}</p>);
    
                return <div key={_id} className="max-w-4xl mx-auto py-3 px-4" >
                    <img src={`http://localhost:5000/${image}`} alt={title} className="mx-auto"/>
                    <div className=" py-3 max-w-2xl mx-auto text-4xl font-bold">{title}</div>
                    <p className="mx-auto max-w-2xl font-bold">Details:</p>
                    <div className="max-w-2xl mx-auto ">{newdesc}</div>
                </div>

}

export default Eventdetail
