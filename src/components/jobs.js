import React, { Component } from "react";
import axios from 'axios';

let yes = [];

class Jobs extends Component {

    componentDidMount() {
        axios.get('/api/jobs')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    yes.push(res.data[i].title);
                }
                console.log('results');
                console.log(yes);
                // console.log(response.data[0].title);
            });
    }

    render() {
        return (
            <div>
                {yes}
            </div>
        )
    }
}

export default Jobs;
