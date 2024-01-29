function submitForm() {
    var userInput = document.getElementById("commentInput").value.trim();
    var messageContainer = document.getElementById("messageContainer");
    messageContainer.innerHTML = "";
    // Проверка на пустое значение
    if (!userInput) {
        showMessage("Please enter a comment.", "error");
        return;
    }
    // Проверка на наличие запрещенных слов
    var forbiddenWords = ["badwords.txt", "badwords1.txt"]; 
    for (var i = 0; i < forbiddenWords.length; i++) {
        if(userInput.toLowerCase().includes(forbiddenWords[i])) {
        showMessage("Inappropriate language is not allowed.", "error");
    return;
    }
}

    var commentsHistory = JSON.parse(localStorage.getItem('commentsHistory')) || [];
    // Проверка на уникальность комментария
    if (commentsHistory.includes(userInput)) {
        showMessage("This comment already exists.", "error");
        return;
    }
    commentsHistory.unshift(userInput);
    commentsHistory = limitComments(commentsHistory, 5);
    localStorage.setItem('commentsHistory', JSON.stringify(commentsHistory));
    displayComments(commentsHistory);
    showMessage('Comment submitted successfully!', 'success');
}

function showMessage(message, type) {
    var messageContainer = document.getElementById("messageContainer");
    var messageElement = document.createElement("div");

    messageElement.textContent = message;
    messageElement.className = type; // Добавление класса для стилизации (например, "error" или "success")

    // Очищаем предыдущие сообщения перед добавлением нового
    messageContainer.innerHTML = "";

    // Добавляем новое сообщение
    messageContainer.appendChild(messageElement);
}

function limitComments(comments, limit) {
    return comments.slice(0, limit);
}
// Функция для отображения комментариев
// Функция для отображения комментариев
function displayComments(comments) {
    var resultElement = document.getElementById("result");

    // Находим элемент списка <ul>
    var ulElement = resultElement.querySelector(".rese");

    //Очищаем содержимое элемента списка <ul>
    ulElement.innerHTML = "";

    // Добавляем заголовок "&s"
    var headerLiElement = document.createElement("li");
    headerLiElement.style.color = "#F0E68C";
    headerLiElement.textContent = "Your last comments:";
    ulElement.appendChild(headerLiElement);
    // Перебирем комментарии и добавляем каждый в виде элемента списка <li>
    comments.forEach(function(comment, index) {
        var liElement = document.createElement("li");
        liElement.textContent = (index + 1) + ": " + comment;
        ulElement.appendChild(liElement);
    });
}
window.onload = function() {
    var commentsHistory = JSON.parse(localStorage.getItem('commentsHistory')) || [];
    displayComments(commentsHistory);
};
