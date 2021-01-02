import React, { useState } from 'react';
import { questions } from './questions';
import M from 'materialize-css';
import history from './history'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animationSlideIn, transition } from './animations'

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const [fiftyFifty, setFiftyFifty] = useState(2);
    const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
    const [hints, setHints] = useState(3);

    const handelAnswerBtnClick = (isCorrect) => {
        if(isCorrect){
        correctAnswer()		
        setScore(score + 1)
        } else wrongAnswer()

        const nextQuestion = currentQuestion + 1;
        if(nextQuestion < questions.length){
        setCurrentQuestion(nextQuestion)
        } else {
        setShowScore(true)
        }
    }

    const handleResetBtnClick = () => {
        setCurrentQuestion(0)
        setShowScore(false)
        setScore(0)
        history.push('/')
    }

    const showOptions = () => {
        const btns = Array.from(document.getElementsByTagName('BUTTON'))
        btns.forEach(btn => {
            if(btn.style.visibility = 'hidden'){
                btn.style.visibility = 'visible'
            }
        })
    }

    const correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        showOptions()
        setUsedFiftyFifty(false)
    }

    const wrongAnswer = () => {
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        showOptions()
        setUsedFiftyFifty(false)
    }

    const grabElements = () => {
        const elemResults = Array.from(document.getElementsByClassName('wrong'))
        return elemResults
    }

    const onClick5050 = () => {
        const wrongAnswers = grabElements()
        const randomNumber = Math.round(Math.random() * 2);
        console.log(wrongAnswers, randomNumber)
        wrongAnswers.forEach((answer, index)=>{
            if(randomNumber !== index && fiftyFifty > 0 && usedFiftyFifty === false){
                answer.style.visibility = 'hidden'
            }
        });
        setFiftyFifty(fiftyFifty - 1)
        setUsedFiftyFifty(true)
    }

    const onClickHints = () => {
        const wrongAnswers = grabElements()
        const randomNumber = Math.round(Math.random() * wrongAnswers.length)
        console.log(wrongAnswers)
        wrongAnswers.forEach((answer, index) => {
            if(randomNumber === index && hints > 0){
                answer.style.visibility = 'hidden'
            }
        });
        setHints(hints - 1)
    }

    return (
        <motion.div 
            className='app-container'   
            initial='out'
            animate='end'
            exit='out'
            variants={animationSlideIn}
            transition={transition}
        >
            {showScore ? (
                <div className='score-section'>
                    You scored {score} out of {questions.length}
                    <Link to='/' ><button onClick={handleResetBtnClick} className='reset-btn'>Reset</button></Link>
                </div>
            ) : (
                <>
                    <div className='question-section'>
                        <div className='question-text'>{questions[currentQuestion].questionText}</div>
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}/{questions.length}</span>
                            <span className={fiftyFifty === 0 ? 'empty' : 'fifty-fifty'} onClick={usedFiftyFifty && fiftyFifty > 0 ? null : onClick5050 }>50/50 {fiftyFifty <= 0 ? '(0)' : `(${fiftyFifty})`}</span>
                            <span className={hints === 0 ? 'empty' : 'hints'} onClick={hints < 0 ? null : onClickHints }>hints {hints <= 0 ? '(0)' : `(${hints})`}</span>
                        </div>
                    </div>
                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map(answer => (
                            <button 
                                className={!answer.isCorrect ? 'wrong' : ''}
                                onClick={()=>handelAnswerBtnClick(answer.isCorrect)}
                            >
                                    {answer.answerText}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </motion.div>
    );
    }

    export default Quiz;
