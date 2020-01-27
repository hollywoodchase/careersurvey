import React, { Component } from "react";
import NotLoggedIn from "./notLoggedIn";
import axios from 'axios';
import "./jobs.css";
let jobInfo = [];

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
        }
    };

    componentDidMount() {
        if (this.props.isloggedin) {
            this.getJobs();
        } 
    };

    getJobs = () => {
        axios.get('/api/jobs')
            .then(res => {
                if (res.data.length < 1) {
                    document.getElementById('cardTitle').innerHTML = 'No Results';
                    document.getElementById('startSurvey').innerHTML = 'Restart Survey';
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
                            image: res.data[i].image
                        })
                    }
                    this.setState({ info: jobInfo })
                }
            });
    }
    saveJobs = (info) => {
        console.log('PRINTING THIS');
        let id = info.id;
        console.log(id);
        axios.post('/api/saved', {
            notes: id
        }).then(function (response) {
            console.log('SAVEJOBS FUNCTION');
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    renderJobResults = () => {
        return (
            <div className="container">
                <h3 id="cardTitle"></h3>
                {this.state.info.map((info, index) => (
                    <div className="card mb-3"> 
                    // key={info.id}>
                        <div className="row">
                            <div className="col-md-3">
                                <img className="img-fluid job-img" src={info.image} alt="job-image" />
                            </div>
                            <div className="col-md-9">
                                <div id="cardInfo" className="card-info" >
                                    <h3>{(info.title)}</h3>
                                    <p><strong>Description:</strong> {(info.description)}</p>
                                    <p><strong>Median Salary:</strong> {(info.salary) + "/yr"}</p>
                                    <p><strong>Median Hourly Wage:</strong> {(info.hourly + "/hr")}</p>
                                    <p><strong>Affordable Rent:</strong> {(info.rent) + "/mo"}</p>
                                    <p><strong>Available Jobs:</strong> {(info.jobsAvailable)}</p>
                                    {/* Buttons */}
                                    <a href={(info.link)} target="_blank" className="infobtn seemoreButton btn btn-info"><h6>See More</h6></a>
                                    <a href="#" className="infobtn saveButton btn btn-secondary" onClick={() => { this.saveJobs(info) }}><h6>Save</h6></a>
                                    {/* <a href="#" className="infobtn deleteButton btn btn-danger"><h6>Delete</h6></a> */}
                                </div>
                            </div>

                        </div>
                    </div>

                ))}
                <div id="surveyBtnDiv"><a href="/survey" id="startSurvey" className="btn btn-secondary"><h4>Start Survey</h4></a></div>
            </div>
        )
    }


    render() {
        return <div>
        {this.props.isloggedin ? this.renderJobResults() : <NotLoggedIn />}
    </div>
    }
}
export default Jobs;