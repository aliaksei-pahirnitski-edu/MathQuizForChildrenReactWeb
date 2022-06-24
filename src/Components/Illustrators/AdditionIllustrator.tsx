import React from 'react';

const AdditionIllustrator = (props:{a:number, b:number}) : JSX.Element => {
    return <div><b>{props.a}</b> + <b>{props.b}</b></div>
}

export default AdditionIllustrator;