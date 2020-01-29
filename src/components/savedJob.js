import React, { Component } from "react";
import NotLoggedIn from "./notLoggedIn";
import axios from 'axios';
import "./jobs.css";

let jobInfo = [];

class Savedjobs extends Component {
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
        axios.get('/api/saved')
            .then(res => {
                if (res.data.length < 1) {
                    document.getElementById('cardTitle').innerHTML = 'No Saved Jobs';
                }
                else {
                    document.getElementById("startSurvey").style.visibility = "hidden"
                    document.getElementById('cardTitle').innerHTML = 'Saved Jobs'
                    for (let i = 0; i < res.data.length; i++) {
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
    deleteJobs = (info) => {
        let id = info.id;
        console.log('DELETING THIS');
        console.log(id);
        // axios.delete('/api/delete', {
        //     notes: id
        // }).then(function (response) {
        //     console.log('DELETE FUNCTION');
        //     console.log(response);
        // }).catch(function (error) {
        //     console.log(error);
        // });
    }

    renderSavedJobs  = () => { 
        return (
            <div className="container">
            <h3 id="cardTitle"></h3>
            {this.state.info.map((info, index) => (
                <div className="card mb-3">
                {/* key={info.id}> */}
                    <div className="row no-gutters">
                        <div className="col-md-4">
                        <img className="img-responsive job-img" src={info.image} alt="job-image"/>
                        </div>
                        <div className="col-md-8">
                            <div id="cardInfo" className="card-info" >
                                <h3>{(info.title)}</h3>
                                <p><strong>Description:</strong> {(info.description)}</p>
                                <p><strong>Median Salary:</strong> {(info.salary) + "/yr"}</p>
                                <p><strong>Median Hourly Wage:</strong> {(info.hourly + "/hr")}</p>
                                <p><strong>Affordable Rent:</strong> {(info.rent) + "/mo"}</p>
                                <p><strong>Available Jobs:</strong> {(info.jobsAvailable)}</p>
                                {/* Buttons */}
                                <a href={(info.link)} target="_blank" className="infobtn seemoreButton btn btn-info"><h6>See More</h6></a>
                                <a href="#" className="infobtn deleteButton btn btn-danger" onClick={() => { this.deleteJobs(info) }}><h6>Delete</h6></a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div id="surveyBtnDiv"><a href="/results" id="startSurvey" className="btn button">See Job Results</a></div>
        </div>
        )
    }

    render() {
        return <div>
        {this.props.isloggedin ? this.renderSavedJobs() : <NotLoggedIn />}
    </div>
    }
}
export default Savedjobs;