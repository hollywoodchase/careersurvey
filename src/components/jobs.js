import React, { Component } from "react";
import NotLoggedIn from "./notLoggedIn";
import axios from 'axios';
import "./jobs.css";

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
                this.setState({ info: [] });
                if (res.data.length < 1) {
                    //document.getElementById("startSurvey").style.visibility = "visible"
                    document.getElementById("cardTitle").innerHTML = 'No Job Results';
                }
                else {
                    const jobInfo = [];
                    document.getElementById("startSurvey").style.visibility = "hidden";
                    document.getElementById('cardTitle').innerHTML = 'Suggested Jobs';
                    for (let i = 0; i < res.data.length; i++) {
                        console.log("FOOL " + JSON.stringify(res.data[0]))
                        jobInfo.push({
                            id: res.data[i]._id,
                            title: res.data[i].title,
                            description: res.data[i].description,
                            educationNeeded: res.data[i].educationNeeded,
                            salary: res.data[i].medianSalary,
                            jobsAvailable: res.data[i].projectedJobs,
                            link: res.data[i].link,
                            hourly: res.data[i].hourlyWage,
                            rent: res.data[i].rent,
                            image: res.data[i].image,
                            selected: false
                        })
                    }
                    this.setState({ info: jobInfo })
                }
            });
    }
    saveJobs = (savedJob) => {
        console.log('PRINTING THIS');
        let id = savedJob.id;
        console.log(id);
        axios.post('/api/saved', {
            notes: id
        }).then((response) => {
            console.log('SAVEJOBS FUNCTION');
            console.log(response);
            const index = this.state.info.findIndex(job => job.id === savedJob.id);
            const newArray = [... this.state.info]
            newArray[index].selected = true
            this.setState({info: newArray} )
        }).catch(function (error) {
            console.log(error);
        });
    }

    renderJobResults = () => {
        return (
            <div className="container">
                <h3 id="cardTitle">No Job Results</h3>
                {this.state.info.map((info, index) => (
                    <div className="card mb-3">
                        {/* // key={info.id}> */}
                        <div className="row">
                            <div className="col-md-3">
                                <img className="img-fluid job-img" src={info.image} alt="job-image" />
                            </div>
                            <div className="col-md-9">
                                <div id="cardInfo" className="card-info" >
                                    <h3>{(info.title)}</h3>
                                    <p><strong>Description:</strong> {(info.description)}</p>
                                    <p><strong>Education Needed:</strong> {(info.educationNeeded)}</p>
                                    <p><strong>Median Salary:</strong> {(info.salary) + "/yr"}</p>
                                    <p><strong>Median Hourly Wage:</strong> {(info.hourly + "/hr")}</p>
                                    <p><strong>Rent You Could Afford:</strong> {(info.rent) + "/mo"}</p>
                                    <p><strong>Available Jobs:</strong> {(info.jobsAvailable)}</p>
                                    {/* Buttons */}
                                    <a href={(info.link)} target="_blank" className="infobtn seemoreButton btn btn-info"><h6>See More</h6></a>

                                      <button className={`infobtn btn ${info.selected ? "btn-warning" : "btn-secondary"} `} type="button" onClick={() => { this.saveJobs(info) }}>Save</button>
                                </div>
                            </div>

                        </div>
                    </div>

                ))}
                <div id="surveyBtnDiv">
                    <a href="/survey" id="startSurvey" className="btn button">Start Survey</a>
                </div>
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