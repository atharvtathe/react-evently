import React from 'react'
import { useState, useContext, useEffect } from 'react'
import Warning from './Warning';
import AuthContext from './auth-context'
import {
  useParams
} from "react-router-dom";
import Loader from "react-loader-spinner";
import { useHistory } from 'react-router-dom';



const UpdateEvent = () => {
    const history = useHistory();
    let { eventID } = useParams();
    const [isloading, setloading] = useState(true);

  const [title, Settitle] = useState('');
  const [description, Setdescription] = useState('');

  const [erroroftitle, Seterroroftitle] = useState(false);
  const [errorofdescription, Seterrorofdescription] = useState(false);

  const [aftersubmiterr, Setaftersubmiterr] = useState(false);
  
  const [message, Setmessage] = useState('');

  const authCtx = useContext(AuthContext);


  const titlehandler = event => {
    Settitle(event.target.value);
  };

  const descriptionhandler = event => {
    Setdescription(event.target.value);
  };

  const focushandlertitle = () => {
    Seterroroftitle(false);
  }
  const focushandlerdescription = () => {
    Seterrorofdescription(false);
  }

  const formsubmithandler = event => {
    event.preventDefault();

    if(title.trim().length < 5){
      Seterroroftitle(true); 
    }
    if(description.trim().length < 5){
      Seterrorofdescription(true); 
    }
    if((title.trim().length < 5) || (description.trim().length < 5)){
      return;
    }

    const requestOptions = {
        method: 'PATCH',
        headers: { 
            "Content-type": "application/json" ,
          'Authorization': `Bearer ${authCtx.token}`
        },
        body: JSON.stringify({
            title : title,
            description : description
        })
    };
    fetch(`http://localhost:5000/api/events/${eventID}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.message){
            Setmessage(data.message);
            // console.log(data);
            // console.log(message);
            Setaftersubmiterr(true);
          }else{
            // console.log(data);
            history.replace('/');
          }
        });
    }


      useEffect(() => {
          let mounted = true;
        
        const getdetails = async () => {
        const res = await fetch(`http://localhost:5000/api/events/${eventID}`);
        const result  = await res.json();
        let final;
        final = result.event;
        Settitle(final.title);
        Setdescription(final.description);
        }

        if(mounted) {
            getdetails();
            setloading(false);
        }
        
        return () => {
                mounted = false;
        }

    }, [eventID]);





    if(isloading === true) {
        return <div className="mx-auto px-5 py-10 text-center flex justify-center">
        <Loader
        type="Puff"
        color="#7C3AED"
        height={50}
        width={50}
        timeout={5000} //3 secs
        />
      </div>
    }

    return <form className="pt-7 max-w-2xl mx-auto px-5" encType="multipart/form-data">
      {aftersubmiterr && <Warning message={message} delay={5000}/>}
  <div className="flex flex-col mb-4">
    <label className="mb-2 font-medium text-lg text-grey-darkest" htmlFor="title">Title</label>
    <input className="border py-2 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-purple-800 rounded " type="text" name="title" id="title" onChange={titlehandler} onFocus={focushandlertitle} value={title || ""} />
    {erroroftitle && <p className="text-red-500 text-xs">min length 5 char</p>}
  </div>
  <div className="flex flex-col mb-4">
    <label className="mb-2 font-medium text-lg text-grey-darkest" htmlFor="description">Description</label>
    <textarea className="border py-2 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-purple-800 rounded" name="description" id="description" onChange={descriptionhandler} onFocus={focushandlerdescription} value={description || ""}></textarea>
    {errorofdescription && <p className="text-red-500 text-xs">enter atleast 5 characters!</p>}
  </div>
  
  <button className="block bg-purple-600 hover:bg-purple-800  text-white  text-lg mx-auto px-3 py-2 rounded" type="submit" onClick={formsubmithandler}>Submit</button>
</form>
}

export default UpdateEvent