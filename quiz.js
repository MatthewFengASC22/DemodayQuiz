const questions = [
    {
        question: "When was Monkeypox discovered in Monkeys?",
        optionA: "2022",
        optionB: "1910",
        optionC: "1970",
        optionD: "1958",
        correctOption: "optionD"
    },

    {
        question: "When was Monkeypox discovered in Humans?",
        optionA: "1910",
        optionB: "1970",
        optionC: "2022",
        optionD: "1958",
        correctOption: "optionB"
    },

    {
        question: "Where was Monkeypox Discovered in Humans?",
        optionA: "The Democratic Republic of Congo",
        optionB: "Indonesia",
        optionC: "France",
        optionD: "Denmark",
        correctOption: "optionA"
    },

    {
        question: "Where was Monkeypox discovered in Monkeys?",
        optionA: "France",
        optionB: "The Democratic Republic of Congo",
        optionC: "Denmark",
        optionD: "Indonesia",
        correctOption: "optionC"
    },

    {
        question: "Which is NOT a symptom of Monkeypox.",
        optionA: "Fevers",
        optionB: "Swollen Lymph Nodes",
        optionC: "Chills",
        optionD: "Runny Nose",
        correctOption: "optionD"
    },

    {
        question: "How does Monkeypox Spread?",
        optionA: "Through Intmate Contact",
        optionB: "Through Yawning",
        optionC: "Through Dancing",
        optionD: "Through Phone Calls",
        correctOption: "optionA"
    },

    {
        question: "What is Monkeypox?",
        optionA: "A pet name",
        optionB: "A type of Animal",
        optionC: "A disease",
        optionD: "A pokemon",
        correctOption: "optionC"
    },

    {
        question: "What can you do to stop Monkeypox from spreading if you are infected?",
        optionA: "Stay home and quarantine yourself",
        optionB: "Meet with Family and Friends",
        optionC: "Travel",
        optionD: "Go to the deli",
        correctOption: "optionA"
    },

    {
        question: "What should you NOT do if there are people around you getting infected? ",
        optionA: "Stay Home",
        optionB: "Wear a Mask",
        optionC: "Be wary of your Surroundings",
        optionD: "Go out Maskless and get close to infected people",
        correctOption: "optionD"
    },

    {
        question: `What is a symptom of Monkeypox?`,
        optionA: "Exessive Yawning",
        optionB: "Exhaustion",
        optionC: "Uncontrollable Laughter",
        optionD: "Runny Nose",
        correctOption: "optionB"
    },

]

let shuffledQuestions = [] 

function handleQuestions() { 

    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }


    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ 
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {
    let remark = null
    let remarkColor = null

    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
