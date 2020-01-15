import React, { Component } from 'react'
import Surveybuttons from './Survey/surveyButtons';

class Home extends Component {
    constructor() {
        super()
    }


    render() {
        const imageStyle = {
            width: 400
        }
        return (
            <div>
                <p>It's good to be home</p>
                <img style={imageStyle} src="https://images.adsttc.com/media/images/581b/ef01/e58e/cef1/4500/0137/slideshow/1635_06.jpg" />

                <Surveybuttons/>
            </div>
        )

    }
}

export default Home
