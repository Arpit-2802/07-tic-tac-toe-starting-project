import { useState } from "react"
export default function Player({initialName,symbol,isActive})
{

    const[playerName,setName]=useState(initialName)
    const[isEdit,setEdit]=useState(false)

    function handleEdit()
    {
        setEdit((editing)=>!editing);
    }


    function handleChange(event)
    {
        console.log(event)
        setName(event.target.value)
    }

    let EditablePlayerName=<span className="player-name">{playerName}</span>
    //let buttonCaption='Edit'
    if(isEdit){
        EditablePlayerName= <input type="text" required value={playerName} onChange={handleChange}/>
        //buttonCaption="Save"
    }

    return(
        <li className={isActive? 'active': undefined}>
            <span className="player">
              {EditablePlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEdit? 'Save' : 'Edit'}</button>
          </li>
    )
}