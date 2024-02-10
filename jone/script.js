document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById("myRange");
    const output = document.getElementById("demo");
    const listContainer = document.getElementById("listContainer");
    output.textContent = slider.value;

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
            button.textContent = "Ещё";
            // Используем немедленно вызываемое функциональное выражение (IIFE) для правильной обработки замыкания
            (function(index, imgElement) {
                button.addEventListener("click", function() { updateImage(index, imgElement); });
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
            headers: { 'this-u-polo ' } // Замените на ваш ключ API
        }))
        .then(response => response.json())
        .then(data => {
            imgElement.src = data[0].url; // Обновление src изображения безопасным способом
        })
        .catch(error => console.error('Error:', error));
    }

    slider.oninput = function() {
        output.textContent = this.value; // Обновляем текст безопасным способом
        updateList(); // Обновляем список при каждом изменении слайдера
    };

    document.querySelector(".continue-button").addEventListener("click", updateList);

    updateList(); // Первоначальное заполнение списка
});
