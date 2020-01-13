import React, { Component } from "react";


function surveybuttons () {
    return (
        <section>
            <a className='list' href='/survey'>Start Survey</a>
            <br></br>
            <a className='list' href='/results'>See results</a>
        </section>
    );
}

export default surveybuttons;