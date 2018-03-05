import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import CarouselControls from './CarouselControls';
import { imageSizePicker } from '../imageSizePicker';

/*
Working out translateX offset.
First need to work out how much I need to offset by for each 'page' --
    100 / this.state.slides.length

call this offsetUnit

Then calculate
    (this.state.currentSlide * offsetUnit) - offsetUnit

*/

class Carousel extends Component {
    
    constructor(props) {
        super(props);
        this.convertToSubArrays = this.convertToSubArrays.bind(this);
        this.calculateSliderOffset = this.calculateSliderOffset.bind(this);
        this.setPage = this.setPage.bind(this);
        this.state = {
            slides: this.convertToSubArrays(this.props.itemsArray, this.props.itemsPerSlide),
            currentSlide: 1
        };
    }

    convertToSubArrays(initialArr, arrSize) {
        const arr = [...initialArr];
        const subArrs = [];
        while(arr.length) {
            subArrs.push(arr.splice(0, arrSize));
        } 
        return subArrs;
    }

    calculateSliderOffset() {
        const offsetUnit = 100 / this.state.slides.length;
        return (this.state.currentSlide * offsetUnit) - offsetUnit;
    }

    setPage(e, num) {
        e.preventDefault();
        this.setState({currentSlide: num});
    }

    render() {
        return (
            <div className="carousel">
                <div className="carousel__inner-container">
                    <h1 className="heading heading--regular">{this.props.title}</h1>
                    <div 
                        className="carousel__sliding-container"
                        style={{
                            width: `${this.state.slides.length * 100}%`,
                            transform: `translateX(-${this.calculateSliderOffset()}%)`
                        }}
                    >
                    
                        {
                            this.state.slides.map((slide, index) => (
                                <div key={index} className="carousel__content-holder">
                                    {
                                        slide.map((item, index) => (
                                            <Card
                                                cardTitle={item.albumName}
                                                cardImage={imageSizePicker(item.albumImage, 250, 250)}
                                                cardDestination={`/album/${item.albumID}`}
                                                isRounded={false}
                                                key={index}
                                            >
                                                <p className="card__text--small">{item.artistName}</p>
                                            </Card>
                                        ))
                                    }
                                </div>
                            ))}


                    </div>
                    <CarouselControls 
                        totalPages={this.state.slides.length}
                        currentPage={this.state.currentSlide}
                        setPage={this.setPage}
                    />
                </div>
            </div>
        );
    }
}

Carousel.propTypes = {
    itemsArray: PropTypes.array,
    itemsPerSlide: PropTypes.number
}

export default Carousel;