
import React, {useEffect, useState} from 'react'
import {
  useParams
} from "react-router-dom";
import Loader from "react-loader-spinner";


const Eventdetail = () => {
    let { eventID } = useParams();
    const [isloading, setloading] = useState(true);
    const [detail, setdetail] = useState([]);
    
    useEffect(() => {
        
        const getdetails = async () => {
        const res = await fetch(`${process.env.REACT_APP_backend_url}/api/events/${eventID}`);
        const result  = await res.json();
        let final;
        final = result.event;
        setdetail(final);
        setloading(false);
        }
    getdetails();
    }, [eventID]);

    if(isloading === true) {
        return <div className="mx-auto px-5 py-40 text-center flex justify-center">
        <Loader
        type="Puff"
        color="#7C3AED"
        height={50}
        width={50}
        timeout={5000} //3 secs
        />
      </div>
    }
    const {_id, title, image, description} = detail;
    const newdesc = description.split('\n').map((str,index) => <p key={index}>{str}</p>);
    
                return <div key={_id} className="max-w-4xl mx-auto py-3 px-4" >
                    <img src={`${process.env.REACT_APP_backend_url}/${image}`} alt={title} className="mx-auto"/>
                    <div className=" py-3 max-w-2xl mx-auto text-4xl font-bold">{title}</div>
                    <p className="mx-auto max-w-2xl font-bold">Details:</p>
                    <div className="max-w-2xl mx-auto ">{newdesc}</div>
                </div>

}

export default Eventdetail
