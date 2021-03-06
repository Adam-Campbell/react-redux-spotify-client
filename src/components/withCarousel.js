import React, { Component } from 'react';
import CarouselControls from './CarouselControls';


const withCarousel = Component => {
    return class extends React.Component {
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
                                                <Component
                                                    item={item}
                                                    key={index}
                                                />
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
}

export default withCarousel;