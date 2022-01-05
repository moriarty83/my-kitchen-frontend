import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useAppState } from '../AppState';

const starterBaking = [
    {name: "All Purpose Flour", id: "40"},
    {name: "Baking Powder", id: "53"},
    {name: "Baking Soda", id: "50"},
    {name: "Sugar", id: "52"},
    {name: "Brown Sugar", id: "148"},
]

const starterHerbsSpices = [
    {name: "Salt", id: ""},
    {name: "Pepper", id: ""},
    {name: "Ground Cinnamon", id: ""},
    {name: "Garlic Powder", id: ""},
    {name: "Dried Oregano", id: ""},

]

const starterCooking = [
    {name: "Olive Oil", id: ""},
    {name: "Vegatable Oil", id: ""},
    {name: "Red Wine Vinegar", id: ""},
    {name: "Garlic", id: ""},
    {name: "", id: ""},
]

const starterDryGoods = [
    {name: "White Rice", id: ""},
    {name: "Brown Rice", id: ""},
    {name: "Chicken Stock", id: ""},
    {name: "Spaghetti", id: ""},
    {name: "", id: ""},   
]

const starterFruts = [
    {name: "Apples", id: ""},
    {name: "Bananas", id: ""},
    {name: "Grapes", id: ""},
    {name: "Pears", id: ""},
    {name: "Blueberries", id: ""},   
]

const starterVeg = [
    {name: "", id: ""},
    {name: "", id: ""},
    {name: "", id: ""},
    {name: "", id: ""},
    {name: "", id: ""},   
]

const starterRefridgerator = [
    {name: "", id: ""},
    {name: "", id: ""},
    {name: "", id: ""},
    {name: "", id: ""},
    {name: "", id: ""},
]

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function WelcomeModal({formData, setUserData}) {
    const {state, dispatch} = useAppState();
    const navigate = useNavigate();
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [starterIngredients , setStarterIngredients ] = useState();

    const handleChange = (event)=>{
        console.log(event.target)
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
        const user = formData
        const body = {formData: formData, starterIngredients: starters}
        console.log(body)
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
        <button className='text-white' onClick={openModal}>Delete</button>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Welcome to MyKitchen</h2>
            
            <p>You'll want to start by adding some things to MyIngredients</p>
            <p>MyIngredients should contain items you almost always have on hand. 
                This way, when you search for recipes, you can see how many ingredients 
                you probably already have in the house.</p>
            <form onSubmit={handleSubmit}>
                <p>Baking</p>
                <table>
                    <tbody>
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
                
            
            <input type="submit" className="text-white text-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value="Continue" />
            <button className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={closeModal}>Skip</button>

            </form>
            <button onClick={closeModal}>close</button>
        </Modal>
        </div>
    );
}

export default WelcomeModal