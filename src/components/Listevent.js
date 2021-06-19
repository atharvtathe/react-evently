import React from 'react'
import { useState, useContext } from 'react'
import Warning from './Warning';
import AuthContext from './auth-context'



const Listevent = () => {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

  const [title, Settitle] = useState('');
  const [description, Setdescription] = useState('');

  const [erroroftitle, Seterroroftitle] = useState(false);
  const [errorofdescription, Seterrorofdescription] = useState(false);
  const [erroroffile, Seterroroffile] = useState(false);

  const [aftersubmiterr, Setaftersubmiterr] = useState(false);
  
  const [message, Setmessage] = useState('');

  const authCtx = useContext(AuthContext);


  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

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
    if(isFilePicked === false) {
      Seterroroffile(true);
    }

    if(title.trim().length < 5){
      Seterroroftitle(true); 
    }
    if(description.trim().length < 5){
      Seterrorofdescription(true); 
    }
    if((title.trim().length < 5) || (description.trim().length < 5) || (isFilePicked === false)){
      return;
    }

    const formData = new FormData();

		formData.append('image', selectedFile);
    formData.append('title', title);
    formData.append('description', description);

    const requestOptions = {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${authCtx.token}`
        },
        body: formData
    };
    fetch('http://localhost:5000/api/events/event', requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.message){
            Setmessage(data.message);
            console.log(data);
            console.log(message);
            Setaftersubmiterr(true);
          }else{
            console.log(data);
          }
        });
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
  <div className="flex flex-col mb-4">
    <label className="mb-2 font-medium text-lg text-grey-darkest" htmlFor="image">Image</label>
    <input type="file" id="image" name="image" onChange={changeHandler} accept=".jpg, .png, .jpeg" required/>
    {erroroffile && <p className="text-red-500 text-xs">Choose image!</p>}
  </div>
  
  <button className="block bg-purple-600 hover:bg-purple-800  text-white  text-lg mx-auto px-3 py-2 rounded" type="submit" onClick={formsubmithandler}>Submit</button>
</form>
}

export default Listevent
