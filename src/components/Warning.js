import React,{ useEffect, useState } from 'react'

const Warning = (props) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
       setTimeout(() => {
            setVisible(false);
       }, props.delay);
    }, [props.delay]);

  return visible ? <div className="flex flex-col mb-4 bg-red-500 p-2 rounded-md">{props.message}</div> : <div />;
};

export default Warning
