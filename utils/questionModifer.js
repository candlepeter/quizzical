import { v4 as uuidv4 } from 'uuid';
import randomizeAnswers from "../utils/randomizeAnswers"

function questionModifer(object) {
    const modifiedObj = object.results
    return modifiedObj.map(obj => {
        const incorrectAnswers = obj["incorrect_answers"].map(answer => {
            return {id: uuidv4(), value: answer, selected: false}
        })
        const allAnswers = [{id: uuidv4(), value: obj["correct_answer"], selected: false}, ...incorrectAnswers]
        
        return {
            id: uuidv4(),
            category: obj.category,
            type: obj.type,
            difficulty: obj.difficulty,
            question: obj.question,
            correctAnswer: obj["correct_answer"],
            answers: randomizeAnswers(allAnswers)
        }
    })
}

export default questionModifer