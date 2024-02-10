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
            
            // Здесь мы используем IIFE (Immediately Invoked Function Expression),
            // чтобы "захватить" текущее значение i для каждой кнопки
            (function(index) {
                button.onclick = function() { updateImage(index, img); };
            })(i);
            
            listItem.appendChild(img);
            listItem.appendChild(button);
            listContainer.appendChild(listItem);
        }
    }
   
    function updateImage(index, imgElement) {
        fetch('https://api.thecatapi.com/v1/images/search?size=small', {
            headers: { 'x-api-key': 'api_key=live_xuBbWHlLwy2BIScAAxftB9fBwsIZtBl268TFLf3dMtE5RZcq1cntWIzyzLmjUDQI' }
        })
        .then(response => response.json())
        .then(data => {
            imgElement.src = data[0].url;
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
