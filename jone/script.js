document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById("myRange");
    const output = document.getElementById("demo");
    const listContainer = document.getElementById("listContainer");
    output.innerHTML = slider.value; // Инициализация вывода начального значения слайдера

    function updateList() {
        while (listContainer.firstChild) {
            listContainer.removeChild(listContainer.firstChild);
        }

        let quantity = slider.value;
        for (let i = 1; i <= quantity; i++) {
            const listItem = document.createElement("li");
            listItem.classList.add("list-item");
            
            const img = document.createElement("img");
            img.src = "https://placehold.co/50";
            img.alt = "Изображение " + i;
            
            const button = document.createElement("button");
            button.textContent = "Обновить изображение";
            
            (function(index, imgElement) {
                button.onclick = function() { updateImage(index, imgElement); };
            })(i, img);
            
            listItem.appendChild(img);
            listItem.appendChild(button);
            listContainer.appendChild(listItem);
        }
    }

    // Функция задержки
    function delay(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }

    function updateImage(index, imgElement) {
        // Имитация задержки перед выполнением запроса
        delay(2000) // Задержка в 2000 мс (2 секунды)
        .then(() => fetch('https://api.thecatapi.com/v1/images/search?size=small', {
            headers: { 'x-api-key': 'YOUR_API_KEY' } // Замените на ваш ключ API
        }))
        .then(response => response.json())
        .then(data => {
            imgElement.src = data[0].url; // Обновление src изображения
        })
        .catch(error => console.error('Error:', error));
    }

    slider.oninput = function() {
        output.innerHTML = this.value;
        updateList(); // Обновляем список при каждом изменении слайдера
    };

    document.querySelector(".continue-button").addEventListener("click", updateList);

    updateList(); // Первоначальное заполнение списка
});