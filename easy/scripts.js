function selectCategory(category) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'questions.json', true);
    xhr.onload = function() {
        if (this.status === 200) {
            const questions = JSON.parse(this.responseText);
            const categoryQuestions = questions.filter(q => q.category === category);
            if (categoryQuestions.length > 0) {
                const questionIndex = Math.floor(Math.random() * categoryQuestions.length);
                const question = categoryQuestions[questionIndex];
                if (question) {
                    document.getElementById('question').innerText = question.question;
                    const options = document.getElementById('popup').getElementsByTagName('button');
                    let correctAnswerIndex = -1;
                    question.options.sort(() => Math.random() - 0.5).forEach((option, index) => {
                        options[index].innerText = option.text;
                        options[index].addEventListener('click', () => {
                            options[index].classList.add(option.correct ? 'correct' : 'incorrect');
                            if (option.correct) {
                                correctAnswerIndex = index;
                            }
                            setTimeout(() => {
                                if (correctAnswerIndex >= 0) {
                                    document.getElementById('correctAnswer').innerText = `La bonne réponse était : ${question.options[correctAnswerIndex].text}`;
                                }
                            }, 500);
                            setTimeout(() => {
                                document.getElementById('popup').classList.add('hidden');
                                location.reload()
                            }, 5000);
                        });
                    });
                    categoryQuestions.splice(questionIndex, 1);
                    document.getElementById('popup').classList.remove('hidden');
                }
            }
        }
    };
    xhr.send();
}