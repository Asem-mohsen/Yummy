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



// Fetch
function getCategories() {
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

    response.forEach(category => {
        let box = document.createElement('div');
        box.className = 'w-13 md:32 box';
        box.innerHTML = `
                        <div class="meal">
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

function getArea() {
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

    response.forEach(area => {
        let box = document.createElement('div');
        box.className = 'w-13 md:32 box';
        box.innerHTML = `
                        <div class="area">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <p>${area.strArea}</p>
                        </div>
        `;
        boxes.appendChild(box);
    });
}