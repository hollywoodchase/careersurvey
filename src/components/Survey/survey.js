import React, { Component } from 'react';
import "./survey.css";
import qBank from "./questionFile";
import axios from "axios";
import NotLoggedIn from "../notLoggedIn"

class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: [],
            selectedAnswers: [],
            errors: ""
        };
    }
    

    getQuestions = () => {
        this.setState({
            questionBank: qBank
        })
    };

    sortAnswers = () => {
        const array = this.state.selectedAnswers
        array.sort((a, b) => {
            return a.questionId - b.questionId
        })
        this.setState({ selectedAnswers: array })
    }

    checkAnswers = (id) => {
        const index = this.state.selectedAnswers.findIndex(i => i.questionId === id)
        const array = this.state.selectedAnswers
        if (index !== -1) {
            array.splice(index, 1)
            this.setState({ selectedAnswers: array })
        }
    }

    setSelectedAnswers = (e) => {
        e.preventDefault();
        const key = e.target.getAttribute("questionid")
        this.checkAnswers(key)

        this.setState({
            selectedAnswers: [...this.state.selectedAnswers,
            { "answertext": e.target.textContent, "questionId": e.target.getAttribute("questionid") }]

        })
    }

    submitAnswers = () => {
        const result = this.state.selectedAnswers;
        axios.post('/api/surveyComplete', {
            result: result
        })
            .then(function (response) {
                window.location.replace("/surveyComplete");
            })
            .then(function (response) {
                window.location.replace("/jobs");
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get('/api/jobs', {})
            .then(function (response) {
                console.log('yayayaya');
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getQuestions();
    }

    makeAnswerButtons = (answers, questionId) => {
        return answers.map((text, index) => {

            const selectedBtn = this.state.selectedAnswers.some(answerObj => answerObj.answertext === text)

            let btnStyle = "btn-primary";

            if (selectedBtn) {
                btnStyle = "btn-chosen"
            }
            return (<button key={index} className={`btn btn-block ${btnStyle}`} questionid={questionId} onBlur={this.toggleBtnClass} onClick={
                this.setSelectedAnswers
            }>
                {text}
            </button>)
        })
    }

    checkAllAnswers = () => {
        if (this.state.selectedAnswers.length === 12 ) {
            this.submitAnswers();
        } else {
            this.setState({errors: "Please answer every question"})
        }
    }

    renderSurvey = () => {
        return (
            <div className="survey-container" >
                <div className="title">Career Survey</div>

                {this.state.questionBank.length > 0 &&
                    this.state.questionBank.map(
                        ({ question, answers, questionId }) =>
                            <div className="questionBox" key={questionId}>

                                <div className="question">{question}</div>
                                {this.makeAnswerButtons(answers, questionId)}
                            </div>

                    )
                }
                <div className="errorBox">{this.state.errors}</div>
                < div className="questionBox" >
                    <button className="btn btn-submit btn-block" onClick={this.checkAllAnswers}>Submit</button>
                </div >

            </div >
        );
    }

    render() {

        return <div>
           {this.props.isloggedin ? this.renderSurvey() : <NotLoggedIn />}
        </div>
        
    }
}

export default Survey;