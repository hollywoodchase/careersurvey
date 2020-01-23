import React, { Component } from "react";
import axios from 'axios';


let jobData = [];
let jobDescription = [];
let jobInfo = [];

class Jobs extends Component {
    state = {
        info: [],
        title: [],
        description: []
        // author: "",
        // synopsis: ""
    };

    componentDidMount() {
        this.getJobs();
    }

    getJobs = () => {
        axios.get('/api/jobs')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    console.log("FOOL " + JSON.stringify(res.data[0]))
                    // jobData.push(res.data[i].title);
                    // jobDescription.push(res.data[i].description);
                    jobInfo.push({
                        id: res.data[i]._id,
                        title: res.data[i].title,
                        description: res.data[i].description,
                        salary: res.data[i].medianSalary,
                        jobsAvailable: res.data[i].projectedJobs,
                        link: res.data[i].link
                    })
                }

                // this.setState({ title: jobData })
                // this.setState({ description: jobDescription})
                this.setState({ info: jobInfo })
                // this.display();
                // console.log("Job Title " + this.state.title[0])
                // console.log("=======================================")
                // console.log("Job description " + this.state.description[0])
                // console.log("=======================================")
                // console.log("THIS IS NEW " + JSON.stringify(this.state.info[0]));
            });
    }

    // display = () => {
    //     for (let i = 0; i < this.state.title.length; i++) {
    //         console.log("Job Title: " + this.state.title[i])
    //         console.log("Job ID " + this.state.id[i])
    //     }

    // }

    render() {
        // const jobs = this.state.title.map((title, key) =>
        //     <li key={this.state.id}>{title.}</li>
        // );

        // {this.state.books.map(book => (
        //     <ListItem key={book._id}>
        //       <Link to={"/books/" + book._id}>
        //         <strong>
        //           {book.title} by {book.author}
        //         </strong>
        //       </Link>
        //       <DeleteBtn onClick={() => this.deleteBook(book._id)} />
        //     </ListItem>
        //   ))}

        //   {this.state.people.map((person, index) => (
        //     <p>Hello, {person.name} from {person.country}!</p>
        // ))} 

        return (
            <div>

                {this.state.info.map((info, index) => (
                    <p key={info.id}>

                        Title: {JSON.stringify(info.title)}
                        <br></br>
                        Description: {JSON.stringify(info.description)}
                        <br></br>
                        Median Salary: {JSON.stringify(info.salary)}
                        <br></br>
                        Jobs Available: {JSON.stringify(info.jobsAvailable)}
                        <br></br>
                        Website: {JSON.stringify(info.link)}

                    </p>
                ))}

            </div>
        )
    }

}

export default Jobs;

// {"HI" + JSON.stringify(jobData)}
// {this.state.title.map((title, index) => (
//     <p>Job: {title}</p>
//     ))}
//     {this.state.description.map((description, index) => (
//     <p>description: {description}</p>
//     ))}
