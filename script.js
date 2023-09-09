const startBtn = document.querySelector('.start-btn')
const popupInfo = document.querySelector('.popup-info')
const exitBtn = document.querySelector('.exit-btn')
const main = document.querySelector('.main')
const continueBtn = document.querySelector('.continue-btn')
const quizSection = document.querySelector('.quiz-section')
const quizBox = document.querySelector('.quiz-box')
const resultBox = document.querySelector('.result-box')
const tryAgainBtn = document.querySelector('.tryAgain-btn')
const goHomeBtn = document.querySelector('.goHome-btn')



startBtn.onclick = ()=>{
    popupInfo.classList.add('active')
    main.classList.add('active')
}

exitBtn.onclick = ()=>{
    popupInfo.classList.remove('active')
    main.classList.remove('active')
}

document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' || e.key === 'Esc'){
        popupInfo.classList.remove('active')
        main.classList.remove('active')
    }
})


continueBtn.onclick = ()=>{
    quizSection.classList.add('active')
    popupInfo.classList.remove('active')
    main.classList.remove('active')
    quizBox.classList.add('active')

    showQuestions(0)
    questionsCounter(1)
    headerScore()
}


tryAgainBtn.onclick = ()=>{
    quizBox.classList.add('active')
    resultBox.classList.remove('active')

    questionsCount = 0
    questionsNumb = 1
    userScore = 0

    showQuestions(questionsCount)
    questionsCounter(questionsNumb)
    nextBtn.classList.remove('enable')

    headerScore()
}


goHomeBtn.onclick = ()=>{
    quizSection.classList.remove('active')
    nextBtn.classList.remove('enable')
    resultBox.classList.remove('active')

    questionsCount = 0
    questionsNumb = 1
    userScore = 0

    showQuestions(questionsCount)
    questionsCounter(questionsNumb)
}

/* Getting questions from array */
let questionsCount = 0
let questionsNumb = 1
let userScore = 0
const nextBtn = document.querySelector('.next-btn')
const optionList = document.querySelector('.option-list')

nextBtn.onclick = ()=>{
    if(questionsCount < questions.length - 1){
        questionsCount++
        showQuestions(questionsCount)

        questionsNumb++
        questionsCounter(questionsNumb)

        nextBtn.classList.remove('enable')
    }else{
        showResultBox()
    }
}


const showQuestions = (index)=>{
    const questionText = document.querySelector('.question-text')    
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`
    
    let optionTag = `
        <div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>
    `
    optionList.innerHTML = optionTag

    const option = document.querySelectorAll('.option')
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)')
    }
}


const optionSelected = (answer)=>{
    let userAnswer = answer.textContent
    let correctAnswer = questions[questionsCount].answer
    let allOptions = optionList.children.length
    
    if(userAnswer === correctAnswer){
        answer.classList.add('correct')
        userScore += 1
        
        headerScore()
    }else{
        answer.classList.add('incorrect')

        for(let i = 0; i < allOptions; i++){
            if(optionList.children[i].textContent === correctAnswer){
                optionList.children[i].setAttribute('class', 'option correct')
            }
        }
    }    
    
    for(let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('disabled')
    }

    nextBtn.classList.add('enable')
}


const questionsCounter = (index)=>{
    const questionTotal = document.querySelector('.question-total')
    questionTotal.textContent = `${index}ª de ${questions.length} questões`
}


const headerScore = ()=>{
    const headerScoreText = document.querySelector('.header-score')
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`
}


const showResultBox = ()=>{
    quizBox.classList.remove('active')
    resultBox.classList.add('active')

    const scoreText = document.querySelector('.score-text')
    scoreText.textContent = `Você acertou ${userScore} de ${questions.length}`

    const circularProgress = document.querySelector('.circular-progress')
    const progressValue = document.querySelector('.progress-value')
    let progressStartValue = -1
    let progressEndValue = (userScore / questions.length) * 100
    let speed = 30

    let progress = setInterval(() => {
        progressStartValue++
        progressValue.textContent = `${progressStartValue}%`
        circularProgress.style.background = `conic-gradient(blue ${progressStartValue * 3}deg, rgba(255, 255, 255, .1) 0deg)`
        
        if(progressStartValue === progressEndValue){
            clearInterval(progress)
        }
    }, speed);
}