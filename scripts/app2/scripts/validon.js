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
            // localStorage = Tied to the domain
            // <!----Saves at localStorage--->
            // Important! When changing the domain = saves autoClear
            if (validateFormData(formData)) {
              var usersDatabase = JSON.parse(localStorage.getItem("usersDatabase")) || [];
              usersDatabase.push(formData);
              localStorage.setItem("usersDatabase", JSON.stringify(usersDatabase));
             // <!---- Only your domain----> not another 
             // even if another domain opens in another tab
              window.location.href = "#";//Think how to add
            }
          }
        });
        
        //Adding an event handler for the button.
        $("#registerButton").on("click", function() {
          $("#registration").submit();
        });
      });

      function validateFormData(formData) {
        
        //Add validateFormData if to be needed(optional)
              
        return true;
      }
