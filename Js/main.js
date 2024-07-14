//Nav
function closeSideNav() {    
    $('#sideMenu').animate({ left: '-231px' }, 500, function() {
        $('.close-icon').hide();
        $('.burger-icon').show();
    });
    $('#navLinks').css({ opacity: 0, transform: 'translateY(100%)' });
}

function openSideNav() {    
    $('#sideMenu').animate({ left: '0px' }, 500, function() {
        $('.burger-icon').hide();
        $('.close-icon').show();
    });
    $('#navLinks').css({ opacity: 1, transform: 'translateY(0)' });
}

function toggleSideNav() {
    if ($('#sideMenu').css('left') === '0px') {
        closeSideNav();
    } else {
        openSideNav();
    }
}

getCategories();

// Clearing Boxes to Provent showing more than 2 tabs 
function clearBoxes() {
    let boxes = document.getElementById('boxes');
    boxes.innerHTML = ''; 
}

// Show Search
function showSearchInputs(){
    clearBoxes();
    let search = document.getElementById('search');
    search.innerHTML = ''; 
    let box = document.createElement('div');
            box.className = 'search';
    box.innerHTML = `
                <div class="input-container">
                    <input type="text" class="Input-Form" onkeyup="searchByName(this.value)" placeholder="Search By Name">
                    <span class="error-msg"></span>
                </div>
                <div class="input-container">
                    <input type="text" class="Input-Form" onkeyup="searchByFLetter(this.value)" placeholder="Search By First Letter">
                    <span class="error-msg"></span>
                </div>
    `;
    search.appendChild(box);
    
}

function searchByName(name) {
    if (name.trim() === '') {
        getIngredients();
        return;
    }
    document.getElementById('loader-wrapper').style.display = 'flex';
    const baseURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", baseURL, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            displayBoxesCategoryMeal(response.meals)
            document.getElementById('loader-wrapper').style.display = 'none';
        } else if (this.readyState == 4) {
            document.getElementById('loader-wrapper').style.display = 'none';
        }
    };

    xhttp.send();
}
function searchByFLetter(FLetter){
    if (FLetter.trim() === '') {
        getIngredients();
        return;
    }
    document.getElementById('loader-wrapper').style.display = 'flex';
    const baseURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${FLetter}`;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", baseURL, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            displayBoxesCategoryMeal(response.meals)
            document.getElementById('loader-wrapper').style.display = 'none';
        } else if (this.readyState == 4) {
            document.getElementById('loader-wrapper').style.display = 'none';
        }
    };

    xhttp.send();
}


// Show Categories
function getCategories() {
    clearBoxes();
    document.getElementById('loader-wrapper').style.display = 'flex';
    const baseURL = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", baseURL, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            let response = JSON.parse(this.responseText);
            displayBoxesCategories(response.categories)
            document.getElementById('loader-wrapper').style.display = 'none';
        } else if (this.readyState == 4) {
            alert("Error fetching Meals data");
            document.getElementById('loader-wrapper').style.display = 'none';
        }
    };

    xhttp.send();
}
function displayBoxesCategories(response) {
    let boxes = document.getElementById('boxes');
    boxes.innerHTML = ''; 

    response.slice(0, 20).forEach(category => {
        let box = document.createElement('div');
        box.className = 'w-13 md:32 box';
        box.innerHTML = `
                        <div class="meal" onclick="getCategoryMeals('${category.strCategory}')">
                            <img src="${category.strCategoryThumb}" width="250px" alt="${category.strCategory}">
                            <div class="layer">
                                <p>${category.strCategory}</p>
                                <p class="discreption">${category.strCategoryDescription}</p>
                            </div>
                        </div>
        `;
        boxes.appendChild(box);
    });
}
function getCategoryMeals(mealName){
    
    clearBoxes();
    document.getElementById('loader-wrapper').style.display = 'flex';
    const baseURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", baseURL, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            let response = JSON.parse(this.responseText);
            displayBoxesCategoryMeal(response.meals)
            document.getElementById('loader-wrapper').style.display = 'none';
        } else if (this.readyState == 4) {
            alert("Error fetching Meals data");
            document.getElementById('loader-wrapper').style.display = 'none';
        }
    };

    xhttp.send();
}
function displayBoxesCategoryMeal(response) {
    let boxes = document.getElementById('boxes');
    boxes.innerHTML = ''; 

    response.slice(0, 20).forEach(meal => {
        let box = document.createElement('div');
        box.className = 'w-13 md:32 box';
        box.innerHTML = `
                        <div class="meal" onclick="getMealDetails('${meal.idMeal}')">
                            <img src="${meal.strMealThumb}" width="250px" alt="${meal.strMeal}">
                            <div class="layer">
                                <p>${meal.strMeal}</p>
                            </div>
                        </div>
        `;
        boxes.appendChild(box);
    });
}


// Show Areas
function getArea() {
    clearBoxes();
    document.getElementById('loader-wrapper').style.display = 'flex';
    const baseURL = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", baseURL, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            let response = JSON.parse(this.responseText);
            displayBoxesAreas(response.meals)
            document.getElementById('loader-wrapper').style.display = 'none';
        } else if (this.readyState == 4) {
            alert("Error fetching Areas data");
            document.getElementById('loader-wrapper').style.display = 'none';
        }
    };

    xhttp.send();
}
function displayBoxesAreas(response) {
    let boxes = document.getElementById('boxes');
    boxes.innerHTML = ''; 

    response.slice(0, 20).forEach(area => {
        let box = document.createElement('div');
        box.className = 'w-13 md:32 box';
        box.innerHTML = `
                        <div class="area" onclick="getAreaMeals('${area.strArea}')">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <p>${area.strArea}</p>
                        </div>
        `;
        boxes.appendChild(box);
    });
}
function getAreaMeals(Area){
    
    clearBoxes();
    document.getElementById('loader-wrapper').style.display = 'flex';
    const baseURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", baseURL, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            let response = JSON.parse(this.responseText);
            displayBoxesAreaMeal(response.meals)
            document.getElementById('loader-wrapper').style.display = 'none';
        } else if (this.readyState == 4) {
            alert("Error fetching Meals data");
            document.getElementById('loader-wrapper').style.display = 'none';
        }
    };

    xhttp.send();
}
function displayBoxesAreaMeal(response){
    let boxes = document.getElementById('boxes');
    boxes.innerHTML = ''; 

    response.slice(0, 20).forEach(meal => {
        let box = document.createElement('div');
        box.className = 'w-13 md:32 box';
        box.innerHTML = `
                        <div class="meal" onclick="getMealDetails('${meal.idMeal}')">
                            <img src="${meal.strMealThumb}" width="250px" alt="${meal.strMeal}">
                            <div class="layer">
                                <p>${meal.strMeal}</p>
                            </div>
                        </div>
        `;
        boxes.appendChild(box);
    });
}

// Show Ingredients
function getIngredients() {
    clearBoxes();
    document.getElementById('loader-wrapper').style.display = 'flex';
    const baseURL = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", baseURL, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            let response = JSON.parse(this.responseText);
            displayBoxesIngredients(response.meals)
            document.getElementById('loader-wrapper').style.display = 'none';
        } else if (this.readyState == 4) {
            alert("Error fetching Areas data");
            document.getElementById('loader-wrapper').style.display = 'none';
        }
    };

    xhttp.send();
}
function displayBoxesIngredients(response) {
    let boxes = document.getElementById('boxes');
    boxes.innerHTML = ''; 

    if (!response || !Array.isArray(response)) {
        let messageBox = document.createElement('div');
        messageBox.className = 'w-13 md:32 box';
        messageBox.innerHTML = `
            <div class="text-white mt-5">
                <p>No ingredients available</p>
            </div>
        `;
        boxes.appendChild(messageBox);
        return;
    }

    response.slice(0, 20).forEach(Ingredient => {
        if(Ingredient.strDescription && Ingredient.strDescription.length !== 0){
            let box = document.createElement('div');
            box.className = 'w-13 md:32 box';
            box.innerHTML = `
                            <div class="Ingredients" onclick="getIngredientsMeals('${Ingredient.strIngredient}')">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                                <h6>${Ingredient.strIngredient}</h6>
                                <p>${Ingredient.strDescription}</p>
                            </div>
            `;
            boxes.appendChild(box);
        }
    });
}
function getIngredientsMeals(Meal) {  
    clearBoxes();
    document.getElementById('loader-wrapper').style.display = 'flex';
    const baseURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Meal}`;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", baseURL, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            displayBoxesAreaMeal(response.meals)
            document.getElementById('loader-wrapper').style.display = 'none';
        } else if (this.readyState == 4) {
            alert("Error fetching Meals data");
            document.getElementById('loader-wrapper').style.display = 'none';
        }
    };

    xhttp.send();
}

// Show Meal Details
function getMealDetails(mealId){
    
    clearBoxes();
    document.getElementById('loader-wrapper').style.display = 'flex';
    const baseURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", baseURL, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            let response = JSON.parse(this.responseText);
            displayMealDetails(response.meals)
            document.getElementById('loader-wrapper').style.display = 'none';
        } else if (this.readyState == 4) {
            alert("Error fetching Meals data");
            document.getElementById('loader-wrapper').style.display = 'none';
        }
    };

    xhttp.send();
}
function displayMealDetails(response){
    let ingredients = [];
    let measures = [];

    let boxes = document.getElementById('boxes');
    boxes.innerHTML = ''; 

    response.forEach(meal => {
            for (let i = 1; i <= 20; i++) {
                let ingredient = meal[`strIngredient${i}`];
                let measure = meal[`strMeasure${i}`];
        
                if (ingredient && ingredient.trim() !== "") {
                    ingredients.push(ingredient);
                }
                if (measure && measure.trim() !== "") {
                    measures.push(measure);
                }
            }
        
            let ingredientsList = ingredients.map(ingredient => `<li><span>${ingredient}</span></li>`).join('');
            let measuresList = measures.map(measure => `<li><span>${measure}</span></li>`).join('');
            let box = document.createElement('div');
            box.className = 'meal-details';
            box.innerHTML = `
                            <div class="w-[50%]">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                <h2 class="text-white">${meal.strMeal}</h2>
                            </div>
                            <div class="w-[50%]">
                                <h3>Instructions</h3>
                                <p>${meal.strInstructions}</p>
                                <hr>
                                <ul class="text-white list">
                                    <li>Area: ${meal.strArea}</li>
                                    <li>Category: ${meal.strCategory}</li>
                                    <li>Recipes: <ul class="nested-list">${ingredientsList}</ul></li>
                                    <li>Tags: <ul class="nested-list">${measuresList}</ul></li>
                                </ul>
                                <div class="btns">
                                    <a href="${meal.strSource}" class="source-btn">Source</a>
                                    <a href="${meal.strYoutube}" class="Youtube-btn">Youtube</a>
                                </div>
                            </div>
            `;
            boxes.appendChild(box);
    });
}
// Cotact Us Form
function showContacts(){
    clearBoxes();
    let boxes = document.getElementById('boxes');
    let box = document.createElement('div');
    box.className = 'w-13 md:32 box';
    box.innerHTML = `
        <div class="contact-us">
            <div class="input-container">
                <input type="text" class="Input-Form" placeholder="Enter Your Name" id="name">
                <span class="error-msg"></span>
            </div>
            <div class="input-container">
                <input type="email" class="Input-Form" placeholder="Enter Your Email" id="email">
                <span class="error-msg"></span>
            </div>
            <div class="input-container">
                <input type="number" class="Input-Form" placeholder="Enter Your Phone" id="phone">
                <span class="error-msg"></span>
            </div>
            <div class="input-container">
                <input type="number" class="Input-Form" placeholder="Enter Your Age" id="age">
                <span class="error-msg"></span>
            </div>
            <div class="input-container">
                <input type="password" class="Input-Form" placeholder="Enter Your Password" id="password1">
                <span class="error-msg"></span>
            </div>
            <div class="input-container">
                <input type="password" class="Input-Form" placeholder="Confirm Your Password" id="password">
                <span class="error-msg"></span>
            </div>
        </div>
        <button class="btn" id="submit" disabled>Submit</button>
    `;
    boxes.appendChild(box);

    const inputs = box.querySelectorAll('.Input-Form');
    const submitButton = document.getElementById('submit');
    
    const regexPatterns = {
        name: /^[A-Za-z\s]{3,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\d{10}$/,
        age: /^\d{1,3}$/,
        password1: /^[A-Za-z0-9@#$%^&+=]{6,}$/,
        password: /^[A-Za-z0-9@#$%^&+=]{6,}$/
    };
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
            checkAllInputs();
        });

        input.addEventListener('input', function() {
            validateInput(this);
            checkAllInputs();
        });
    });

    function validateInput(input) {
        const errorMsg = input.nextElementSibling;
        const pattern = regexPatterns[input.id];
        
        if (!pattern.test(input.value.trim())) {
            errorMsg.textContent = 'Invalid input';
            errorMsg.style.color = 'red';
        } else {
            errorMsg.textContent = '';
        }
    }

    function checkAllInputs() {
        const allValid = Array.from(inputs).every(input => {
            const pattern = regexPatterns[input.id];
            return pattern.test(input.value.trim());
        });

        submitButton.disabled = !allValid;
    }
}