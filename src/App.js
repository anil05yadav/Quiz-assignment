import React,{ useState, useEffect } from 'react';
import { questions } from './Question';
import StarComp from './component/Star';
import ProgressBar from './component/Progress-bar';
import './App.css';


function App() {
  const [currentQuestion,setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerOptions, setAnswerOptions] = useState([]);
  const [userAnsSelections, setUserAnsSelections] = useState([]);
  const [percentage, setPercentage] = useState(0);
 

  /* Effect to get quiz percentage */
  useEffect(() => {
   if(userAnsSelections.length > 0) {
    const getCorrectAns = userAnsSelections.filter((item) => item === 1);
    setPercentage((getCorrectAns.length/questions.length)*100);
   }
  },[userAnsSelections]);


  /* Effect to shuffle questions After clicking next questions */
 useEffect(() => {
    function shuffleArray(combineAnswer) {
      for (var i = combineAnswer.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));            
          var temp = combineAnswer[i];
          combineAnswer[i] = combineAnswer[j];
          combineAnswer[j] = temp;
      }   
      return combineAnswer;
    }  
    const combineCorrectIncorrectAnswer = [...questions[currentQuestion].incorrect_answers, questions[currentQuestion].correct_answer];
    setAnswerOptions(shuffleArray(combineCorrectIncorrectAnswer));
 },[currentQuestion])

 const maintainUserPercentage = () => {
   /*
    1: represents correct values
    0: represents Incorrect values
    */
   if(answer === questions[currentQuestion].correct_answer) {
    setUserAnsSelections(userAns => [...userAns, 1]);
   }
   else {
    setUserAnsSelections(userAns => [...userAns, 0])
   }
 }

const handleClickNextQuestion=()=>{
   maintainUserPercentage();
   const nextQuestion = currentQuestion + 1;
   if(nextQuestion < questions.length ){
    setCurrentQuestion(nextQuestion);
   }else{
     alert('quiz are done.')
   } 
   setShowResult(false);
 }
 const handleAnswers=(answer)=>{
     setShowResult(true);
     setAnswer(answer);
 }

return (
    <div className="App">
      <div className="question">
        <h1>Question {currentQuestion + 1} of 20 </h1>
      </div>
      <div>
        <p>{unescape(questions[currentQuestion].category)}</p>
        <StarComp difficulty={unescape(questions[currentQuestion].difficulty)}/>
      </div>
      <div>
        <h2>{unescape(questions[currentQuestion].question)}</h2>
      </div>
      <div>
        {answerOptions.map((Answer,index)=>
        <button key={index} className='questions' onClick={()=>handleAnswers(Answer)}>{unescape(Answer)}</button>)}
      </div>
      <div>
        {showResult && (answer === questions[currentQuestion].correct_answer ? "Correct!" : "Wrong!")} 
      </div>
      <div>
        <button className='nextQuestion' onClick={handleClickNextQuestion}>nextQuestion</button>
      </div>
        <div className='progressbar'>
        <ProgressBar percent={percentage} />
      </div>
    </div>
  );
}

export default App;