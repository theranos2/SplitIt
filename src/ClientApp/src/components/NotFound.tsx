import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            {/* <img src={PageNotFound}  /> */}
            <p style={{textAlign:"center"}}>
                404 Not Found
                <Link to="/">Go Home </Link>
            </p>
        </div>
    );
};

export default NotFound;