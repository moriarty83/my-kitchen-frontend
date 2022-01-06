import React, {useState, useEffect} from "react"
import Avatars from "../Avatars";
import {useAppState} from "../../AppState"

function Account(){
    const {state, dispatch} = useAppState();

    const localEmail = JSON.parse(window.localStorage.getItem("auth")).email

    /////////////////////
    // STATES
    ///////////////////////
    const [emailVisible, setEmailVisible] = useState(false)
    const [emailText, setEmailText] = useState(`${localEmail.substr(0, 1)}* * * * * ${localEmail.substr(-1+localEmail.indexOf('@'))}`)
    const [buttonText, setButtonText] = useState("Show")
    const [deleteRequested, setDeleteRequested] = useState(false)
    const [selected, setSelected] = useState(state.avatars[2])

    const [formData, setFormData] = useState({
        nickname: JSON.parse(window.localStorage.getItem("auth")).nickname
    })
    /////////////////////
    // FUNCTIONS
    ///////////////////////

    const getAvatar = ()=>{
        for (let element of state.avatars){
            if(element.file === JSON.parse(window.localStorage.getItem("auth")).icon){
            setSelected(element)}
        }
    }

    const handleChange = (event) =>{
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleShowHide = ()=>{
        if(emailVisible){
            setEmailText(`${state.email.substr(0, 1)}* * * * * ${state.email.substr(-1+state.email.indexOf('@'))}`)
            setEmailVisible(false)
            setButtonText("Show")
            return
        }
        if(!emailVisible){
            setEmailText(state.email)
            setEmailVisible(true)
            setButtonText("Hide")
            return
        }
    }

    const updateNickname = (event)=>{
        const newData = {nickname: formData.nickname, icon: selected.file }
        const token = state.token
        return fetch(state.url+ "/users/",{
            method: "put",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)

        })
        .then((response)=>{
            if(response.ok){
                return response.json()
            }
            else{
                if (response.status === 422){
                throw new Error("Could not add Ingredient. You may already have added this Ingredient")}
                else{
                    throw new Error("An error of type " + response.status + " occured")
                };
            }
        })
        // If no error, add to state.myIngredients.
        .then((responseJson) => {
            const user = responseJson.user
            dispatch({type: "auth", payload: user})
            window.localStorage.setItem("auth", JSON.stringify({ token, email: user.email, nickname: user.nickname, icon: user.icon, exp: responseJson.exp}))   

            console.log(user)
          })
          .catch((error) => {
            window.alert(error)
          });
      }

    const requestDelete = ()=>{
        fetch(state.url+ "/users/delete-request",{
            method: "get",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },
        })
        // Error Handler
        .then((response)=>{
            if(response.ok){
                setDeleteRequested(true)
            }
            else{
                if (response.status === 422){
                throw new Error("Could not add Ingredient. You may already have added this Ingredient")}
                else{
                    throw new Error("An error of type " + response.status + " occured")
                };
            }
        })
    }
    /////////////////////
    // USE EFFECT
    ///////////////////////
    useEffect(()=>{getAvatar()
}, [])

    /////////////////////
    // RENDER
    ///////////////////////
    return(
        <div className="m-8 flex justify-around">
            <div className="bg-gray-900 shadow-md border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 opacity-90 p-4">
                <h1 className="text-white font-bold text-2xl tracking-tight mb-2 dark:text-white underline">Your Account</h1>
                
                <table>
                    <tbody>
                        <tr>
                            <td className="p-4"><h3 className="text-white text-xl">Email</h3></td>
                            <td className="p-4"><h4 className="text-white">{emailText}</h4></td>
                            <td className="p-4"><button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 " onClick={handleShowHide}>{buttonText}</button></td>
                        </tr>
                        <tr>

                            <td className="p-4"><h3 className="text-white text-xl">Nickname</h3></td>
                            <td><input onChange={handleChange} type="text" name="nickname" id="" value={formData.nickname} /></td>
                            

                        </tr>

                        <tr>
                            <td className="p-4"><h3 className="text-white text-xl">Icon</h3></td>

                            <td>
                            <Avatars selected={selected} setSelected={setSelected}/>
                            </td>
                        </tr>

                        <tr>
                            
                            <td className="p-4"><button onClick={updateNickname} className="text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center">Update Profile</button></td>
                            
                            <td></td>
                            <td className="p-4">{deleteRequested ? <h3>Please Check your Email to Confirm Delete</h3> : <button className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center  dark:bg-red-600 dark:hover:bg-red-700" onClick={requestDelete}>Delete Account</button>}</td>
                        </tr>
                    </tbody>
                </table>
                
                {/* <div>
                <form onSubmit={updateNickname}>
                    <input className="text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 " type="submit" value="Change Nickname" />
                </form>
                    
                </div> */}


                
            </div>
        </div>
    )
}
export default Account