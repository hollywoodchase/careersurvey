import React, { Component } from "react";
import axios from 'axios';


class Survey extends Component {
    // Setting the component's initial state
    constructor(props) {
        super(props);
        this.state = {
            shift: "",
            income: "",
            tech: "",
            health: "",
            education: "",
            people: "",
            subject: "",
            build: "",
            priority: "",
            where: "",
            environment: "",
            hands: "",
            error: false
        };
      }


    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const question = event.target.name;

        // Updating the input's state
        this.setState({
            [question]: value
        });
        console.log("Value: " + value)
        console.log("Question " + question)
    };

    handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        this.setState({error:false});
        if (!this.state.Q1 || !this.state.Q2) {
            this.setState({error:true});
            // } else if (this.state.password.length < 6) {
            //     alert(
            //         `Choose a more secure password ${this.state.firstName} ${this.state
            //             .lastName}`
            //     );
        }
        else {
            const surveyResults = {
                shift: this.state.shift,
                income: this.state.income,
                tech: this.state.tech,
                health: this.state.health,
                education: this.state.education,
                people: this.state.people,
                subject: this.state.subject,
                build: this.state.build,
                priority: this.state.priority,
                where: this.state.where,
                environment: this.state.environment,
                hands: this.state.hands
            };
    //         axios.post(`/api/surveyResults`, { user })
    //             .then(res => {
    //             console.log(res);
    //             console.log(res.data);
    //   })
        }

        
    };

    render() {
        // Notice how each input has a `value`, `name`, and `onChange` prop
        return (
            <div>
                <p>
                    {this.state.error ? "Error":""}
                </p>
                {/* <input type="radio" name="gender" value="male" checked> Male<br></br> */}
                <form className="form">
                    <br></br>
                    {/* Question 1 */}
                 
                       <h5>Which hours would you prefer to work a shift?</h5>
                            <input
                                value="daytime"
                                name="shift"
                                onChange={this.handleInputChange}
                                type="radio"
                                placeholder="Q1"
                            /> 6 AM - 2 PM
                    <input
                                value="daytime"
                                name="shift"
                                onChange={this.handleInputChange}
                                type="radio"
                                placeholder="Q1"
                            /> 9 AM - 5 PM
                    <input
                                value="varies"
                                name="shift"
                                onChange={this.handleInputChange}
                                type="radio"
                                placeholder="Q1"
                            /> 12 PM - 8 PM
                        {/* Question #2 */}

                        <h5>Do you wana Own a Boat?</h5>
                            <input
                                value="YES"
                                name="Q2"
                                onChange={this.handleInputChange}
                                type="radio"
                                placeholder="Q1"
                            /> YES
                    <input
                                value="NO"
                                name="Q2"
                                onChange={this.handleInputChange}
                                type="radio"
                                placeholder="Q1"
                            /> NO
                    <input
                                value="Maybe"
                                name="Q2"
                                onChange={this.handleInputChange}
                                type="radio"
                                placeholder="Q1"
                            /> Maybe
                       
                   

                    <br></br>
                    <button onClick={this.handleFormSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}

export default Survey;