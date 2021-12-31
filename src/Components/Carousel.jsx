// Carousel thanks to Kevin Murimi (https://www.section.io/engineering-education/how-to-create-a-carousel-using-react-class-components-and-tailwind-css/)

import React, {useState} from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";

function Carousel({carouselData}) {

    const [currentSlide, setCurrentSlide] = useState(0)

    const prevSlide = ()=>{
        currentSlide > 0 ? setCurrentSlide(currentSlide-1) : setCurrentSlide(carouselData.length-1)
    }

    const nextSlide = ()=>{
        currentSlide < carouselData.length-1 ? setCurrentSlide(currentSlide+1) : setCurrentSlide(0)
    }

    const loading = ()=>{
        return <h1>Loading...</h1>
    }

    const loaded = ()=>{
        return(<div className="mt-8">
        <div className="max-w-lg h-72 flex overflow-hidden relative">
        <AiOutlineLeft onClick={prevSlide} className='absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer' />
        <AiOutlineRight onClick={nextSlide} className='absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer' />
            <Swipe onSwipeLeft={nextSlide} onSwipeRight={prevSlide}>
                {carouselData.map((slide, index) => {
                    return (
                        <div key={index} className={
                            index === currentSlide
                                ? "block w-full h-auto object-cover"
                                : "hidden"
                            }>
                            <h1>{slide.name}</h1>
                            <img
                                src={slide.image}
                                alt="This is a carousel slide"
                                
                                
                            />
                        </div>
                    );
                })}
            </Swipe>
        </div>
      </div>)
    }

    return(
    <>
        {carouselData ? loaded() : loading()}
    </>
        
    )
}

export default Carousel