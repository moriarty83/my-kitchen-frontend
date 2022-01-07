import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useAppState } from '../AppState';

const starterBaking = [
    {name: "All Purpose Flour", id: "1"},
    {name: "Baking Powder", id: "2"},
    {name: "Baking Soda", id: "3"},
    {name: "Sugar", id: "4"},
    {name: "Brown Sugar", id: "5"},
]

const starterHerbsSpices = [
    {name: "Salt", id: "11"},
    {name: "Pepper", id: "12"},
    {name: "Garlic Powder", id: "13"},
    {name: "Dried Oregano", id: "14"},
    {name: "Dried Dill", id: "15"},
    {name: "Dried Thyme", id: "16"},
    {name: "Ground Cinnamon", id: "17"},

]

const starterOilsSauces = [
    {name: "Olive Oil", id: "6"},
    {name: "Vegetable Oil", id: "7"},
    {name: "Red Wine Vinegar", id: "8"},
    {name: "White Wine Vinegar", id: "9"},
    {name: "Soy Sauce", id: "10"},
]

const starterDryGoods = [
    {name: "Rice", id: "56"},
    {name: "Brown Rice", id: "57"},
    {name: "Lentil", id: "58"},
    {name: "Angel Hair Pasta", id: "59"},
    {name: "Macaroni Pasta", id: "60"},   
]

const starterCannedGoods = [
    {name: "Black Beans", id: "26"},
    {name: "Red Kidney Beans", id: "27"},
    {name: "Chickpeas", id: "28"},
    {name: "Chicken Stock", id: "39"},
    {name: "Beef Stock", id: "30"},
    {name: "Vegetable Stock", id: "31"},
    {name: "Fish Stock", id: "38"},   
]

const starterMeatFish = [
    {name: "Chicken Breast", id: "36"},
    {name: "Chicken Thigh", id: "35"},
    {name: "Ground Beef", id: "33"},
    {name: "Salmon", id: "34"},
    {name: "Shrimp", id: "37"},
]

const starterProduce = [
    {name: "Lettuce", id: "47"},
    {name: "Tomato", id: "44"},
    {name: "Onion", id: "41"},
    {name: "Bell Pepper", id: "42"},
    {name: "Carrots", id: "43"},
    {name: "Radish", id: "51"},
    {name: "Potato", id: "46"},
    {name: "Green Bean", id: "48"},
    {name: "Lemon", id: "53"},
    {name: "Lime", id: "54"},
    {name: "Orange", id: "52"},
    {name: "Apple", id: "49"},
    {name: "Banana", id: "50"},   
]

const starterEggsDairy = [
    {name: "Egg", id: "18"},
    {name: "Butter", id: "20"},
    {name: "Milk", id: "21"},
    {name: "Mozzarella Cheese", id: "22"},
    {name: "Parmesan Cheese", id: "23"},
    {name: "Cheddar Cheese", id: "25"},
]

const customStyles = {
  content: {
    height: '90%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto',
    margin: '1em',
    padding: '1em',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function WelcomeModal({formData, setUserData, selected}) {
    const {state, dispatch} = useAppState();
    const navigate = useNavigate();
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [starterIngredients , setStarterIngredients ] = useState();

    const handleChange = (event)=>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.name;

        setStarterIngredients({...starterIngredients, [id]: value});
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        const starters = []
        for(const item in starterIngredients){
            if(starterIngredients[item]===true){
                starters.push({ingredient_id: item})
            }
        }
        const user = {...formData, icon: selected.file}
        const body = {formData: user, starterIngredients: starters}
        createUser(body)
    }

    const createUser = (body)=>{
        if(formData.password !== formData.confirm_password){
                window.alert("Passwords Do Not Match")
                return
            }
            else{
                return fetch(state.url+ "/users/",{
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                })
                .then( response => response.json()
                )
                .then((data) => {setUserData(data)
                })
            }
      }

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
        <button className='w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1' onClick={openModal}>Delete</button>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            
        >
            <div className='my-8 h-full'>
            <h2 className='copperplate text-3xl text-center'>Welcome to MyKitchen</h2>
            
            <p className='my-4'>You'll want to start by adding some things to MyIngredients</p>
            <p className='my-4'>MyIngredients should contain items you almost always have on hand. 
                This way, when you search for recipes, you can see how many ingredients 
                you probably already have in the house.</p>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-row flex-wrap justify-around border-solid border-black border-2 items-start'>
                    <table className='m-4'>
                        <tbody>
                            <tr>
                                <th className='copperplate'>Baking</th>
                            </tr>
                        {starterBaking.map((ing, index)=>{
                            return (
                                <tr key={index}>
                                    <td>
                                        <label className='text-black min-w-36' htmlFor={ing.name}>{ing.name}</label>
                                    </td>
                                    <td>
                                        <input onChange={handleChange} type="checkbox" name={ing.id} id="" />
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <table className='m-4'>
                        <tbody>
                            <tr>
                                <th className='copperplate'>Oils/Sauces</th>
                            </tr>
                        {starterOilsSauces.map((ing, index)=>{
                            return (
                                <tr key={index}>
                                    <td>
                                        <label className='text-black min-w-36' htmlFor={ing.name}>{ing.name}</label>
                                    </td>
                                    <td>
                                        <input onChange={handleChange} type="checkbox" name={ing.id} id="" />
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <table className='m-4'>
                        <tbody>
                            <tr>
                                <th className='copperplate'>Herbs & Spices</th>
                            </tr>
                        {starterHerbsSpices.map((ing, index)=>{
                            return (
                                <tr key={index}>
                                    <td>
                                        <label className='text-black min-w-36' htmlFor={ing.name}>{ing.name}</label>
                                    </td>
                                    <td>
                                        <input onChange={handleChange} type="checkbox" name={ing.id} id="" />
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <table className='m-4'>
                        <tbody>
                            <tr>
                                <th className='copperplate'>Dry Goods</th>
                            </tr>
                        {starterDryGoods.map((ing, index)=>{
                            return (
                                <tr key={index}>
                                    <td>
                                        <label className='text-black min-w-36' htmlFor={ing.name}>{ing.name}</label>
                                    </td>
                                    <td>
                                        <input onChange={handleChange} type="checkbox" name={ing.id} id="" />
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <table className='m-4'>
                        <tbody>
                            <tr>
                                <th className='copperplate'>Canned Goods</th>
                            </tr>
                        {starterCannedGoods.map((ing, index)=>{
                            return (
                                <tr key={index}>
                                    <td>
                                        <label className='text-black min-w-36' htmlFor={ing.name}>{ing.name}</label>
                                    </td>
                                    <td>
                                        <input onChange={handleChange} type="checkbox" name={ing.id} id="" />
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <table className='m-4'>
                        <tbody>
                            <tr>
                                <th className='copperplate'>Meat & Fish</th>
                            </tr>
                        {starterMeatFish.map((ing, index)=>{
                            return (
                                <tr key={index}>
                                    <td>
                                        <label className='text-black min-w-36' htmlFor={ing.name}>{ing.name}</label>
                                    </td>
                                    <td>
                                        <input onChange={handleChange} type="checkbox" name={ing.id} id="" />
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <table className='m-4'>
                        <tbody>
                            <tr>
                                <th className='copperplate'>Produce</th>
                            </tr>
                        {starterProduce.map((ing, index)=>{
                            return (
                                <tr key={index}>
                                    <td>
                                        <label className='text-black min-w-36' htmlFor={ing.name}>{ing.name}</label>
                                    </td>
                                    <td>
                                        <input onChange={handleChange} type="checkbox" name={ing.id} id="" />
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <table className='m-4'>
                        <tbody>
                            <tr>
                                <th className='copperplate'>Eggs & Dairy</th>
                            </tr>
                        {starterEggsDairy.map((ing, index)=>{
                            return (
                                <tr key={index}>
                                    <td>
                                        <label className='text-black min-w-36' htmlFor={ing.name}>{ing.name}</label>
                                    </td>
                                    <td>
                                        <input onChange={handleChange} type="checkbox" name={ing.id} id="" />
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            
            <input type="submit" className="text-white text-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value="Continue" />
            </form>
            </div>
        </Modal>
        </div>
    );
}

export default WelcomeModal