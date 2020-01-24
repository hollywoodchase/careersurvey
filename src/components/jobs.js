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
                if (res.data.length < 1) {
                    document.getElementById('cardTitle').innerHTML = 'No Results';
                    document.getElementById('surveyBtnDiv').innerHTML = 'Restart Survey';
                }
                else {
                    document.getElementById("startSurvey").style.visibility = "hidden"
                    document.getElementById('cardTitle').innerHTML = 'Suggested Jobs'
                    for (let i = 0; i < res.data.length; i++) {
                        console.log("FOOL " + JSON.stringify(res.data[0]))
                        jobInfo.push({
                            id: res.data[i]._id,
                            title: res.data[i].title,
                            description: res.data[i].description,
                            salary: res.data[i].medianSalary,
                            jobsAvailable: res.data[i].projectedJobs,
                            link: res.data[i].link,
                            hourly: res.data[i].hourlyWage,
                            rent: res.data[i].rent,
                            image: res.data[i].url
                        })
                    }
                    this.setState({ info: jobInfo })
                }
            });
    }

    render() {
        return (

            <div className="card">
                <div className="card-header">
                    <h3 id="cardTitle"></h3>
                </div>
                <div className="card-body">
                    {this.state.info.map((info, index) => (
                        <div className="card-info">
                            <h3 className="info card-title">{JSON.stringify(info.title)}</h3>
                            <p className="info card-description">Description:</p> <p className="info">{JSON.stringify(info.description)}</p>
                            <p className="info card-salary">Median Salary: {JSON.stringify(info.salary)+ "/yr"}</p>
                            <p className="info card-hourly">Median Hourly Wage: {JSON.stringify(info.hourly + "/hr")}</p>
                            <p className="info card-rent">Affordable rent: {JSON.stringify(info.rent) + "/mo"}</p>
                            <p className="info card-jobsAvailable">Available Jobs: {JSON.stringify(info.jobsAvailable)}</p>
                            <img src={JSON.stringify(info.image)} />
                            {/* Buttons */}
                            <a href={JSON.stringify(info.link)} target="_blank" className="infobtn seemoreButton btn btn-info"><h6>See More</h6></a>
                            <a href="#" className="infobtn saveButton btn btn-secondary"><h6>Save</h6></a>
                            <a href="#" className="infobtn deleteButton btn btn-danger"><h6>Delete</h6></a>
                        </div>
                    ))}
                </div>
                <div id="surveyBtnDiv"><a href="/survey" id="startSurvey" className="btn btn-secondary"><h4>Start Survey</h4></a></div>
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