import './App.css';
import React, {useEffect, useState} from 'react';
import webSocket from 'socket.io-client'
import Ramen from './Ramen.json'

function App() {
    const [BtnOpen,setBtnOpen]=useState(false);
    const [people,setpeople]=useState(0);
    const [ws,setWs] = useState(null);
    const [NumberOfPeople,setNumberOfPeople]=useState(1);
    useEffect(()=>{
        setWs(webSocket('http://localhost:8000'));
    },[])
    useEffect(()=>{
        if(ws){
            console.log('Success connect!')
            ws.on('Message', message => {
                console.log(message);
            })
            ws.on('People', message => {
                setpeople(message);
            })

        }
    },[ws]);
    const Submit=()=>{
        ws.emit('Reservation','It\'s me');
    }

    return (
        <div className="App">
            <div className="App-div">
                <h1>一蘭拉麵</h1>
                <h2>目前排隊人數 : {people} 人</h2>
                <div className='App-div-div'>
                    <h3>人數 : </h3>
                    <input className='App-input' value={NumberOfPeople} type="number"
                           onChange={(e)=>{
                               if(e.target.value<=0){
                                   e.target.value=1;
                               }
                               else if(e.target.value>4){
                                   e.target.value=4
                               }
                               else{
                                   setNumberOfPeople(e.target.value);
                               }
                           }
                           }/>
                </div>
                {Ramen.Datas.map((item,index)=>{
                    return(
                        <div className="Ramen">
                            <h1 className="title">{item.Type}</h1>
                            {item.Mens.map((InnerItem,InnerIndex)=>{
                                return (
                                    <div className="Mens">
                                        <h2>{InnerItem.Name}</h2>
                                        <p>{InnerItem.Details}</p>
                                        <p>{InnerItem.Price}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
                }
            </div>
            <button onClick={Submit}>
                <h1>Reservate a person</h1>
            </button>
        </div>
    );
}

export default App;
