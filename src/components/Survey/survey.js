import React, { Component } from 'react';
import "./survey.css";
import qBank from "./questionFile";
import axios from "axios";

class Survey extends Component {
    state = {
        questionBank: [],
        selectedAnswers: []
    };

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
        console.log(index)
        const array = this.state.selectedAnswers
        console.log(array)
        if (index !== -1) {
            array.splice(index, 1)
            this.setState({ selectedAnswers: array })
        }
    }

    setSelectedAnswers = (e) => {
        e.preventDefault();
        const key = e.target.getAttribute("questionid")
        const index = this.state.selectedAnswers.findIndex(i => i.questionId === key)
        this.checkAnswers(key)

        this.setState({
            selectedAnswers: [...this.state.selectedAnswers,
            { "answertext": e.target.textContent, "questionId": e.target.getAttribute("questionid") }]

        })

    }

    submitAnswers = () => {
        // axios.post('/surveyComplete', this.state.selectedAnswers)
        //     .then(response => {
        //         console.log('hahaha');
        //         console.log(response.data);   
        //     });
        const result = this.state.selectedAnswers
        axios.post('/api/surveyComplete', {
            result: result
        })
            .then(function (response) {
                console.log(response);
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

    render() {
        return (
            <div className="container" >
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
                < div className="questionBox" >
                    <button className="btn btn-success btn-block" onClick={this.submitAnswers}>Submit</button>
                </div >

            </div >
        );
    }
}

export default Survey;