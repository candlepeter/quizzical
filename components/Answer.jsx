import React from "react"

function Answer(props) {
    const {answer, showAnswer, onClick, checkResult} = props
    let opacity = checkResult ? "opacity" : ""
    return  <span 
                onClick={!checkResult ? onClick : null} 
                id={answer.id} 
                key={answer.id}
                className={`${showAnswer} ${opacity}`}
            >
                {answer.value}
            </span>
}

export default Answer