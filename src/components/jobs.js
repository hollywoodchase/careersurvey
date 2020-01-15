import React, { Component } from "react";
import axios from 'axios';

class Jobs extends Component {
    componentDidMount() {
        axios.get('/api/jobs')
        .then(response => {
            console.log(response.data);
            console.log('hahaha');
        });
    }
    render() {
        return <h1>hello</h1>;
    };
}
export default Jobs;
