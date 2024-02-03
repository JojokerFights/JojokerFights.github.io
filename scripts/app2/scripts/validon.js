$(document).ready(function() {
        $("#registration").validate({
          rules: {
            firstname: "required",
            lastname: "required",
            email: {
              required: true,
              email: true
            },
            password: {
              required: true,
              minlength: 7
            }
          },
          messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            password: {
              required: "Please provide a password",
              minlength: "Your password must be at least 7 characters long"
            },
            email: "Please enter a valid email address"
          },
          submitHandler: function(form) {
            var formData = {
              firstname: $("#firstname").val(),
              lastname: $("#lastname").val(),
              email: $("#email").val(),
              password: $("#password").val()
            };
            // localStorage = привязан к домену
            // Сохранение на localStorage
            // Важно! При смене домена = сохранения пропадают
            if (validateFormData(formData)) {
              var usersDatabase = JSON.parse(localStorage.getItem("usersDatabase")) || [];
              usersDatabase.push(formData);
              localStorage.setItem("usersDatabase", JSON.stringify(usersDatabase));
              
              window.location.href = "indexr.html";
            }
          }
        });
        //Добавляем обработчик события для кнопки
        $("#registerButton").on("click", function() {
          $("#registration").submit();
        });
      });

      function validateFormData(formData) {
        
        // else validationinfo if to be needed
        return true;
      }
function toggleDrawer() {
      var drawer = document.getElementById("myDrawer");
      drawer.style.width = (drawer.style.width === "250px") ? "0" : "250px";
    }
