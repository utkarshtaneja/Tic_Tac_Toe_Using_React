import React, { useRef, useState } from 'react';
import "./TicTacToe.css";
import cross_icon from "../Assets/cross.png";
import circle_icon from "../Assets/circle.png";

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleref = useRef(null);

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const toggle = (e, num) => {
    if(lock || data[num] !== ""){
      return 0;
    }

    if(count % 2 === 0){
      e.target.innerHTML = `<img src = ${cross_icon} >`;
      data[num] = "X";
      setCount(count + 1);
    }
    else{
      e.target.innerHTML = `<img src = ${circle_icon} >`;
      data[num] = "O";
      setCount(count + 1);
    }
    checkWin()
  }

  const checkWin = () => {
    for(let i = 0; i < winningConditions.length; i++){
      let [a, b, c] = winningConditions[i];
      if(data[a]!== "" && data[b]!== "" && data[c]!== ""){
        if(data[a] === data[b] && data[b] === data[c]){
          return won(data[a]); 
        }
      }
    }
    
    if(count === 8){
      return won("")
    }
  }


  const won = (winner) => {
    setLock(true);
    
    let icon;
    if(winner === ""){
      titleref.current.innerHTML = "Ooops ! No one wins.";
    }
    else{
      if (winner === "X") {
        icon = cross_icon;
      } else {
        icon = circle_icon;
      }
      
      const img = document.createElement("img");
      img.src = icon;
      img.alt = winner;
      
      titleref.current.innerHTML = `Congratulations,  `;
      titleref.current.appendChild(img);
      titleref.current.innerHTML += ` wins!`;
    }
  }

  const reset = () => {
    setCount(0);
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleref.current.innerHTML = "Tic Tac Toe In <span> React </span>";
    const boxes = document.querySelectorAll('.boxes');
    boxes.forEach(box => box.innerHTML = '');
  }

  return (
    <div className='container'>
      <h1 className='title' ref={titleref}>Tic Tac Toe In <span>  React </span> </h1>
      <div className="board">

        <div className="row1">
          <div className="boxes" onClick={(e) => {toggle(e, 0)}}></div>
          <div className="boxes" onClick={(e) => {toggle(e, 1)}}></div>
          <div className="boxes" onClick={(e) => {toggle(e, 2)}}></div>
        </div>

        <div className="row2">
          <div className="boxes" onClick={(e) => {toggle(e, 3)}}></div>
          <div className="boxes" onClick={(e) => {toggle(e, 4)}}></div>
          <div className="boxes" onClick={(e) => {toggle(e, 5)}}></div>
        </div>

        <div className="row3">
          <div className="boxes" onClick={(e) => {toggle(e, 6)}}></div>
          <div className="boxes" onClick={(e) => {toggle(e, 7)}}></div>
          <div className="boxes" onClick={(e) => {toggle(e, 8)}}></div>
        </div>

      </div>
      <button className='reset' onClick={reset}>Reset</button>
    </div>
  )
}

export default TicTacToe;