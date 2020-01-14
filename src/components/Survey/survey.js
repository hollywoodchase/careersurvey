import React, { Component } from "react";

class Survey extends Component {
    // Setting the component's initial state
    state = {
        Q1: "",
        Q2: ""
    };


    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const question = event.target.name;

        // Updating the input's statef
        this.setState({
            [question]: value
        });
        console.log("Value: " + value)
        console.log("Question " + question)
    };

    handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        if (!this.state.Q1 || !this.state.Q2) {
            alert("Fill out your first and last name please!");
            // } else if (this.state.password.length < 6) {
            //     alert(
            //         `Choose a more secure password ${this.state.firstName} ${this.state
            //             .lastName}`
            //     );
        }
        else {
            alert(`Hello ${this.state.Q1} ${this.state.Q2}`);
        }

        this.setState({
            Q1: "",
            Q2: "",
        });
    };

    render() {
        // Notice how each input has a `value`, `name`, and `onChange` prop
        return (
            <div>
                {/* <p>
                    {this.state.Q1} {this.state.Q2}
                </p> */}
                {/* <input type="radio" name="gender" value="male" checked> Male<br></br> */}
                <form className="form">
                    <br></br>
                    {/* Question 1 */}
                 
                       <h5>Which hours would you prefer to work a shift?</h5>
                            <input
                                value="6 AM - 2 PM"
                                name="Q1"
                                onChange={this.handleInputChange}
                                type="radio"
                                placeholder="Q1"
                            /> 6 AM - 2 PM
                    <input
                                value="9 AM - 5 PM"
                                name="Q1"
                                onChange={this.handleInputChange}
                                type="radio"
                                placeholder="Q1"
                            /> 9 AM - 5 PM
                    <input
                                value="12 PM - 8 PM"
                                name="Q1"
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