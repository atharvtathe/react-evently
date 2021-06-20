import React, {useEffect, useState, useContext} from 'react'
// import Card from './Card'
import Loader from "react-loader-spinner";
import AuthContext from './auth-context'
import {
  Link
} from "react-router-dom";
import Warning from './Warning';



const Myevents = () => {
    const authCtx = useContext(AuthContext);
    const [isloading, setloading] = useState(true);
    const [deleteclick, setdeleteclick] = useState(false);
    const [events, setEvents] = useState([]);
    const [aftersubmiterr, Setaftersubmiterr] = useState(false);
  
  const [message, Setmessage] = useState('');


    const deletehandler = (eventID) => {
        const requestOptions = {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${authCtx.token}`
        },
    };
    fetch(`${process.env.REACT_APP_backend_url}/api/events/${eventID}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.message){
            Setmessage(data.message);
            // console.log(data);
            // console.log(message);
            Setaftersubmiterr(true);
            setdeleteclick(true);
          }else{
            // console.log(data);
            setdeleteclick(true);
          }
        });
    }
    
    
    useEffect(() => {
        let mounted = true;

        const getevents = async () => {
        const requestOptions = {
        headers: { 
          'Authorization': `Bearer ${authCtx.token}`
        },
        };
        const res = await fetch(`${process.env.REACT_APP_backend_url}/api/events/myevents/${authCtx.userid}`, requestOptions);
        const result  = await res.json();
        // console.log(result)
        let final;
        final = result.events;
        setEvents(final);
        setloading(false);
    }
      if(mounted){
          getevents();
      }
      return () => {
                mounted = false;
        }
    }, [authCtx.userid, authCtx.token, deleteclick]);

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
    if(events.length === 0){
        return <p className="text-4xl mx-auto px-3 pt-10 text-center">You have no events!</p>
    }
    return ( <div className="lg:max-w-5xl mx-auto grid gap-x-4 gap-y-7 lg:grid-cols-3 lg:gap-x-7 md:grid-cols-2 md:max-w-3xl   pt-7 justify-items-center px-5" >
            {events.map((single) => {
                const {_id, title, image} = single;
                // return <Card key={_id} id={_id} title={title} image={image} />
                return <div key={_id} className="flex flex-col  rounded-lg overflow-hidden shadow-2xl w-80 h-64  ">
            <div>
                <img src={`${process.env.REACT_APP_backend_url}/${image}`} alt={title} className="object-cover w-80 h-40"/>
            </div>
            <div className="text-lg py-1 px-1 font-medium text-gray-800">{title}</div>
            <div className="flex justify-between py-2">
                <div><Link to={`/edit/${_id}`} className="block bg-purple-600 hover:bg-purple-800  text-white  text-lg mx-auto px-3 py-2 rounded">Update</Link></div>
                <div><button className="block bg-purple-600 hover:bg-purple-800  text-white  text-lg mx-auto px-3 py-2 rounded" onClick={() => deletehandler(_id)} >Delete</button></div>
                
            </div>
            {aftersubmiterr && <Warning message={message} delay={5000}/>}
        </div> 
         
            })}
        </div>
    )
}

export default Myevents
