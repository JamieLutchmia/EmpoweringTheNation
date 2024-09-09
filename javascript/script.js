function addToCart(courseName, price) {
    // Check if localStorage is supported
    if (typeof(Storage) !== "undefined") {
        if (!localStorage.getItem("cartItems")) {
            localStorage.setItem("cartItems", JSON.stringify([]));
        }

        // Retrieve cartItems from localStorage
        var cartItems = JSON.parse(localStorage.getItem("cartItems"));

        // Add the selected course to cartItems
        cartItems.push({ name: courseName, price: price });

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        alert("Added to Cart!");
    } else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}

            function retrieveUserDetails() {
                document.getElementById("name").value = localStorage.getItem("userName") || "";
                document.getElementById("phone").value = localStorage.getItem("userPhone") || "";
                document.getElementById("email").value = localStorage.getItem("userEmail") || "";
            }
        
            window.onload = function() {
                retrieveUserDetails();
                displaySelectedCourses();
            };
        

            function validateForm() {
                var nameInput = document.getElementById("name");
                var phoneInput = document.getElementById("phone");
                var emailInput = document.getElementById("email");
            
                var nameError = document.getElementById("name-error");
                var phoneError = document.getElementById("phone-error");
                var emailError = document.getElementById("email-error");
            
                var isValid = true;
            
                if (nameInput.value.trim() === "") {
                    nameError.textContent = "Name is required";
                    isValid = false;
                } else {
                    nameError.textContent = "";
                }
            
                if (phoneInput.value.trim() === "") {
                    phoneError.textContent = "Phone number is required";
                    isValid = false;
                } else {
                    phoneError.textContent = "";
                }
            
                if (emailInput.value.trim() === "") {
                    emailError.textContent = "Email address is required";
                    isValid = false;
                } else {
                    emailError.textContent = "";
                }
            }


            function updateCart() {
                if (typeof(Storage) !== "undefined") {
                    var selectedCourses = [];
                    var checkboxes = document.querySelectorAll('input[name="course"]:checked');
                    checkboxes.forEach(function(checkbox) {
                        selectedCourses.push({
                            name: checkbox.value,
                            price: checkbox.value === "First Aid" || checkbox.value === "Sewing" || checkbox.value === "Landscaping" || checkbox.value === "Life Skills" ? 1500 : 750
                        });
                    });
        
                    localStorage.setItem("cartItems", JSON.stringify(selectedCourses));
        
                    var totalAmount = selectedCourses.reduce(function(acc, course) {
                        return acc + course.price;
                    }, 0);
        
                    var discount = 0;
                    if (selectedCourses.length === 2) {
                        discount = 0.05;
                    } else if (selectedCourses.length === 3) {
                        discount = 0.10;
                    } else if (selectedCourses.length > 3) {
                        discount = 0.15;
                    }
        
                    var discountedAmount = totalAmount - (totalAmount * discount);
                    var totalAmountWithVAT = discountedAmount * 1.15;
        
                    document.getElementById("total").innerHTML = "<p>Total Quote: R" + totalAmountWithVAT.toFixed(2) + "<p>(including " + (discount * 100) + "% discount and 15% VAT)" + "</p>";
        
                } else {
                    alert("Sorry, your browser does not support Web Storage...");
                }
            }
        
            function clearCart() {
                if (typeof(Storage) !== "undefined") {
                    localStorage.removeItem("cartItems");
                    localStorage.removeItem("userName");
                    localStorage.removeItem("userPhone");
                    localStorage.removeItem("userEmail");
                    alert("Cart cleared!");
                    document.getElementById("total").innerHTML = "";
                } else {
                    alert("Sorry, your browser does not support Web Storage...");
                }
            }
        
            function displaySelectedCourses() {
                if (typeof(Storage) !== "undefined") {
                    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
                    if (cartItems) {
                        cartItems.forEach(function(course) {
                            var checkboxes = document.querySelectorAll('input[name="course"]');
                            checkboxes.forEach(function(checkbox) {
                                if (checkbox.value === course.name) {
                                    checkbox.checked = true;
                                }
                            });
                        });
                    }
                }
            }