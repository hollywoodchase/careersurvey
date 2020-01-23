import React, { Component } from "react";
import axios from 'axios';
import "./jobs.css";

let jobInfo = [];

class Jobs extends Component {
    state = {
        info: [],
    };

    componentDidMount() {
        this.getJobs();
    }

    getJobs = () => {
        axios.get('/api/jobs')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    console.log("FOOL " + JSON.stringify(res.data[0]))
                    jobInfo.push({
                        id: res.data[i]._id,
                        title: res.data[i].title,
                        description: res.data[i].description,
                        salary: res.data[i].medianSalary,
                        jobsAvailable: res.data[i].projectedJobs,
                        link: res.data[i].link
                    })
                }
                this.setState({ info: jobInfo })         
            });
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h3>Suggested Jobs</h3>
                </div>
                <div className="card-body">
                    {this.state.info.map((info, index) => (
                        <div className="card-info">
                            <h4 className="card-title">{JSON.stringify(info.title)}</h4>
                            <p className="card-description">Description: {JSON.stringify(info.description)}</p>
                            <p className="card-salary">Median Salary: {JSON.stringify(info.salary)}</p>
                            <p className="card-jobsAvailable">Available Jobs: {JSON.stringify(info.jobsAvailable)}</p>
                            <a href={JSON.stringify(info.link)} className="infobtn seemoreButton btn btn-info"><h6>See More</h6></a>
                            <a href="#" className="infobtn saveButton btn btn-secondary"><h6>Save</h6></a>
                            <a href="#" className="infobtn deleteButton btn btn-danger"><h6>Delete</h6></a>
                        </div>
                    ))}
                </div>
            </div>

        )
    }

}

export default Jobs;

// return (
//     <div>
//         <div className="jobs-container" >
//             {this.state.info.map((info, index) => (
//                 <p key={info.id}>

//                     Title: {JSON.stringify(info.title)}
//                     <br></br>
//                     Description: {JSON.stringify(info.description)}
//                     <br></br>
//                     Median Salary: {JSON.stringify(info.salary)}
//                     <br></br>
//                     Jobs Available: {JSON.stringify(info.jobsAvailable)}
//                     <br></br>
//                     Website: {JSON.stringify(info.link)}

//                 </p>
//             ))}
//         </div>
//     </div>
// )