
import { Link, useNavigate } from "react-router-dom";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

 
function ItemSlider ({type, items}){
 
const loading =()=>{return <h1>Loading...</h1>}
const loaded = ()=>{
    const slides = items.map((element, index)=>{
        if(type==="ingredient"){
            return(            
            <div id="whoobe-3fery" className="w-full md:w-64 justify-center items-center bg-gray-600 shadow-lg rounded-lg flex flex-col m-4 drop-shadow-lg">
                <h4 className="border-b-2 text-white text-3xl mb-4" id="whoobe-3mr7n">{element.name}</h4>
                <img src={element.image} alt="img" title="img" className="h-64 object-cover rounded-lg drop-shadow-lg" id="whoobe-ixxe5" />
                <button value="button" className="my-4 px-4 py-2  text-white hover:bg-sky-400 bg-sky-500 rounded-lg drop-shadow-sm" id="whoobe-jkkr2"><Link to={"/mykitchen/ingredients/" + element.id}>Details</Link></button>
            </div>)
            }
            else {
                return(
            <div key={index}>
            <h2>{element.name}</h2>
            <img src={element.image}/>
            </div>
            )}
        })
    
        return slides
    }

return(
<Slider autoplay={2000}>
    {items ? loaded() : loading()}
</Slider>
)
}

export default ItemSlider