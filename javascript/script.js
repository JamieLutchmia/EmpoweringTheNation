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

        var toast = document.getElementById("toast");

        toast.innerHTML = "Added to Cart!";
        toast.style.backgroundColor = "#008000";
    } else {
        var toast = document.getElementById("toast");

        toast.innerHTML = "Sorry, your browser does not support Web Storage...";
        toast.style.backgroundColor = "#E63833";
    }

    toast.className = "toast show";
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 5000);
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
                    document.getElementById("total2").innerHTML = "<p>Total Quote: R" + totalAmountWithVAT.toFixed(2) + "<p>(including " + (discount * 100) + "% discount and 15% VAT)" + "</p>";
        
                    toast.innerHTML = "Courses added to cart!";
                    toast.style.backgroundColor = "#008000";
                    
                    } else {
                    
                        toast.innerHTML = "Sorry, your browser does not support Web Storage...";
                        toast.style.backgroundColor = "#E63833";
                    }
            
                toast.className = "toast show";
                setTimeout(function() {
                    toast.className = toast.className.replace("show", "");
                }, 5000);
            }
        
            function clearCart() {
                if (typeof(Storage) !== "undefined") {
                    localStorage.removeItem("cartItems");
                    localStorage.removeItem("userName");
                    localStorage.removeItem("userPhone");
                    localStorage.removeItem("userEmail");
                    document.getElementById("total").innerHTML = "";

                    toast.innerHTML = "Cart cleared!";
                    toast.style.backgroundColor = "#008000";
                    
                    } else {
                    
                        toast.innerHTML = "Sorry, your browser does not support Web Storage...";
                        toast.style.backgroundColor = "#E63833";
                    }
            
                toast.className = "toast show";
                setTimeout(function() {
                    toast.className = toast.className.replace("show", "");
                }, 5000);
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

            function validateForm() {
                // First Validaiton
                var name = document.getElementById("name").value;
                var phone = document.getElementById("phone").value;
                var email = document.getElementById("email").value;
                var toast = document.getElementById("toast");
            
                if (name === "" || phone === "" || email === "") {
                    toast.innerHTML = "Fill in Required Fields.";
                    toast.style.backgroundColor = "#E63833";
                } else {
                    toast.innerHTML = "A consultant will be in contact with you.";
                    toast.style.backgroundColor = "#333";
                    toast.style.minWidth = "700px";
                    toast.style.marginLeft = "-325px";
                }
            
                toast.className = "toast show";
                setTimeout(function() {
                    toast.className = toast.className.replace("show", "");
                    toast.style.minWidth = "";
                    toast.style.marginLeft = "";
                }, 5000);
            
                // Second Validation
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
                    document.getElementById("name").value = "";
                }
            
                if (phoneInput.value.trim() === "") {
                    phoneError.textContent = "Phone number is required";
                    isValid = false;
                } else {
                    phoneError.textContent = "";
                    document.getElementById("phone").value = "";
                }
            
                if (emailInput.value.trim() === "") {
                    emailError.textContent = "Email address is required";
                    isValid = false;
                } else {
                    emailError.textContent = "";
                    document.getElementById("email").value = "";
                }
            
                return isValid;
            }
            