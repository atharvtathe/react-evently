import React, {useEffect, useState} from 'react'
import Card from './Card'
import Loader from "react-loader-spinner";

const Home = () => {
    const [isloading, setloading] = useState(true);
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        const getevents = async () => {
        const res = await fetch('http://localhost:5000/api/events/eventslist');
        const result  = await res.json();
        let final;
        final = result.event;
        setEvents(final);
        setloading(false);
    }
    getevents();
    }, []);

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
    return (
        <div className="lg:max-w-5xl mx-auto grid gap-x-4 gap-y-7 lg:grid-cols-3 lg:gap-x-7 md:grid-cols-2 md:max-w-3xl   pt-7 justify-items-center px-5" >
            {events.map((single) => {
                const {_id, title, image} = single;
                return <Card key={_id} id={_id} title={title} image={image} />
            })}
        </div>
    )
}

export default Home
