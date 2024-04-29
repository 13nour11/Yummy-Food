// ------------------------------------ Variables
let rowData = document.getElementById('rowData');
let searchContainer = document.getElementById('searchContainer');

// inputs flags
let nameFlagInput = false;
let emailFlagInput = false;
let phoneFlagInput = false;
let ageFlagInput = false;
let passFlagInput = false;
let rePassFlagInput = false;

// ================================================================
// loading Screen
$('body').ready(()=>{
    searchByName('').then(()=>{
        $(document).ready(() => {
            searchByName("").then(() => {
                $(".loading-screen").fadeOut(500)
                $("body").css("overflow", "visible")
            })
        })
    })
})
// when click on the menu icon
$('.open').click(()=>{
    if($('.left-side-menu').css('left')=='0px'){
        closeNav()
    }else{
        openNav()
    }
});
// open side navbar
function openNav(){
    $('.left-side-menu').animate(
        {'left':'0'}
    ,500);
    $(".open").removeClass("fa-align-justify");
    $(".open").addClass("fa-xmark");

    for(let i=0;i<5;i++){
        $('.nav-links li').eq(i).animate(
            {'top':'0'}
        ,(i+5)*100)
    }
}
// close side navbar
function closeNav(){
    let menuWidth = $('.left-side-menu .menu').outerWidth();
    $('.left-side-menu').animate(
        {'left': -menuWidth}
    ,500);
    $(".open").addClass("fa-align-justify");
    $(".open").removeClass("fa-xmark");

    $('.nav-links li').animate(
        {'top':'300'}
    ,500)

}
closeNav(); // to make the left side nav not be shown (closed)


// this code not working by jquery but working well by css
// $('.inner').hover(
//     ()=>{$('.desc').css('transform','translateY(0)')},
//     ()=>{$('.desc').css('transform','translateY(100%)')}
// );


// ================================================================
// api
// ------------------------------- display meals
function displayMeals(arr){
    let cartoona = ``;
    for(let i=0; i<arr.length; i++){
        cartoona += `
        <div class="col-md-3">
            <div class="inner position-relative overflow-hidden" onclick="getMealDetails(${arr[i].idMeal})"> <!---->
                <img src="${arr[i].strMealThumb}" alt="" class="w-100 d-block rounded"/>
                <div class="desc bg-white bg-opacity-75 rounded overflow-hidden text-center p-2 position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center">
                    <h3>${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>
        `
        ;
    }
    rowData.innerHTML = cartoona;
}
// ------------------------------- meals at the first
async function getMeals(){
    rowData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    response = await response.json();
    console.log(response.meals);
    displayMeals(response.meals);

    $('.inner-loading-screen').fadeOut(300);
}
getMeals();
// ------------------------------- categories
async function getAllCategories(){
    rowData.innerHTML = '';
    searchContainer.innerHTML = '';

    $('.inner-loading-screen').fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();

    // console.log(response.categories); // arr of categories
    displayCategories(response.categories);

    $('.inner-loading-screen').fadeOut(300);
}
// getAllCategories()
function displayCategories(catArr){
    
    let cartoona = ``;
    for(let i =0; i<catArr.length;i++){
        cartoona += `
        <div class="col-md-3">
            <div class="inner position-relative overflow-hidden" onclick="getMealCategories('${catArr[i].strCategory}')"> <!--strCategory-->
                <img src="${catArr[i].strCategoryThumb}" alt="" class="w-100 d-block rounded"/>
                <div class="desc bg-white bg-opacity-75 rounded overflow-hidden text-center p-2 position-absolute top-0 bottom-0 start-0 end-0">
                    <h3>${catArr[i].strCategory}</h3>
                    <p class="mb-0">${catArr[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>
                </div>
            </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona;
}
// when click on nav-link 'categories' 
$('#cat').click(()=>{
    getAllCategories()
    closeNav()
})

// ------------------------------- Area
async function getArea(){
    rowData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(300);

    searchContainer.innerHTML = '';

    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    response = await response.json();
    // console.log(response.meals); // get array of areas
    displayArea(response.meals);

    $('.inner-loading-screen').fadeOut(300);

}
// getArea()
function displayArea(areaArr){
    let cartoona = ``;
    for(let i =0; i<areaArr.length; i++){
        cartoona += `
        <div class="col-md-3">
            <div class="inner text-center text-white area" onclick="getMealsArea('${areaArr[i].strArea}')">
                <i class="fa-solid fa-house-laptop fa-4x "></i>
                <h3>${areaArr[i].strArea}</h3>
            </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona;
}
// when click on nav-link 'area' 
$('#area').click(()=>{
    getArea()
    closeNav()
})

// ------------------------------- ingridients
async function getIngredients(){
    rowData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(300);

    searchContainer.innerHTML = '';
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    console.log(response.meals.slice(0,20)); // get array of only 20 meals ingredients  
    displayIngredients(response.meals.slice(0,20));

    $('.inner-loading-screen').fadeOut(300);
}
// getIngredients()
function displayIngredients(ingredArr){
    let cartoona = ``;
    for(let i =0; i<ingredArr.length; i++){
        cartoona +=`
        <div class="col-md-3">
            <div class="inner position-relative text-center text-white" onclick="getMealsIngredients('${ingredArr[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${ingredArr[i].strIngredient}</h3>
                <p>${ingredArr[i].strDescription.split(' ').slice(0,20).join(' ')}</p>
            </div>
        </div>
        `;
    }
    rowData.innerHTML = cartoona;
}
// when click on nav-link 'ingredients' 
$('#ingred').click(()=>{
    getIngredients()
    closeNav()
})

// ------------------------------- main meal ingrediend
async function getMealsIngredients(ingredients){
    rowData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    response = await response.json();
    console.log(response.meals.slice(0,20));
    displayMeals(response.meals.slice(0,20));

    $('.inner-loading-screen').fadeOut(300);
}
// ------------------------------- meal categories
async function getMealCategories(mealName){ // mealName
    rowData.innerHTML = "";
    $('.inner-loading-screen').fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`);
    response = await response.json();
    console.log(response.meals.slice(0,20));
    displayMeals(response.meals.slice(0,20));

    $('.inner-loading-screen').fadeOut(300);
}
// getMealCategories('Seafood')
// ------------------------------- meals area
async function getMealsArea(area){
    rowData.innerHTML = "";
    $('.inner-loading-screen').fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();
    console.log(response.meals.slice(0,20));
    displayMeals(response.meals.slice(0,20));

    $('.inner-loading-screen').fadeOut(300);
}
// getMealsArea('Canadian');
// ------------------------------ 
async function getMealDetails(mealID){
    closeNav();
    rowData.innerHTML = "";
    $('.inner-loading-screen').fadeIn(300);

    searchContainer.innerHTML = '';

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    response = await response.json();
    console.log(response.meals[0]);
    // console.log(response.meals[0].strMeasure1 +' '+ response.meals[0].strIngredient1);

    displayMealDetails(response.meals[0]);

    $('.inner-loading-screen').fadeOut(300);
}
// getMealDetails(52874);
function displayMealDetails(meal){
    searchContainer.innerHTML = '';
    let ingredients = ``;
    for(let i = 1; i<=20; i++){ // begin from 1 because the ingredients and measures at the api start at the object (meal) from 1 
        if(meal[`strIngredient${i}`]){
            ingredients += `<li class=" alert alert-success p-1 m-2 ">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
        // console.log(meal[`strMeasure${i}`]);
    }
    
    let tags = meal.strTags?meal.strTags.split(","):[];
    // console.log(tags);
    let tagsStr = ``;
    for(let i =0; i<tags.length;i++){
        tagsStr += `<li class=" alert alert-danger p-1 m-2 ">${tags[i]}</li>`
    }
    
    let cartoona = `
        <div class="col-md-4">
            <div class="inner text-white">
                <img src="${meal.strMealThumb}" alt="" class="w-100 d-block rounded">
                <h2>${meal.strMeal}</h2>
            </div>
        </div>
        <div class="col-md-8">
            <div class="inner text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area: </span> ${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span> ${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex flex-wrap">
                    ${ingredients}
                </ul>
                <h3>Tags: </h3>
                <ul class="list-unstyled d-flex flex-wrap">
                    ${tagsStr}
                </ul>
                <a href="${meal.strSource}" class="btn btn-success" target="_blank">Source</a>
                <a href="${meal.strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>

            </div>
        </div>`;
    
    rowData.innerHTML = cartoona;
}
// ------------------------------- display search structure
function showSearchInputs(){   
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6">
            <div class="inner">
                <input type="text" class="form-control text-white" placeholder="Search By Name" oninput="searchByName(this.value)"/>
            </div>
        </div>
        <div class="col-md-6">
            <div class="inner">
                <input type="text" class="form-control text-white" placeholder="Search By First Letter" oninput="searchByfirstLetter(this.value)"/>
            </div>
        </div>
    </div>
    ` ;
    rowData.innerHTML = '';
}
$('#search').click(()=>{
    showSearchInputs();
    closeNav();
})
// Search By Name
async function searchByName(str){
    closeNav();
    rowData.innerHTML='';
    $('.inner-loading-screen').fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${str}`);
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    // console.log(response.meals);
    // displayMeals(response.meals)

    $('.inner-loading-screen').fadeOut(300);
}
// Search By First Letter
async function searchByfirstLetter(str){
    closeNav();
    rowData.innerHTML='';
    $('.inner-loading-screen').fadeIn(300);

    str == '' ? str='a' : '';
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${str}`);
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    // console.log(response.meals);
    // searchByfirstLetter(response.meals)

    $('.inner-loading-screen').fadeOut(300);
}
// ------------------------------- contacts
$('#contact').click(()=>{
    showContacts()
    closeNav();
})
function showContacts(){
    rowData.innerHTML = `
    <div class="contact d-flex justify-content-center align-items-center flex-column min-vh-100"> 
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="inner">
                        <input type="text" class="form-control" placeholder="Enter Your Name" id="nameInput" oninput="inputsValidatin()"/>
                        <div class="alert alert-danger mt-2 w-100 d-none" id="nameAlert">
                            Special characters and numbers not allowed
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="inner">
                        <input type="email" class="form-control" placeholder="Enter Your Email" id="emailInput" oninput="inputsValidatin()"/>
                        <div class="alert alert-danger mt-2 w-100 d-none" id="emailAlert">
                            Email not valid *exemple@yyy.zzz
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="inner">
                        <input type="text" class="form-control" placeholder="Enter Your Phone" id="phoneInput" oninput="inputsValidatin()"/>
                        <div class="alert alert-danger mt-2 w-100 d-none" id="phoneAlert">
                            Enter valid Phone Number
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="inner">
                        <input type="number" class="form-control" placeholder="Enter Your Age" id="ageInput" oninput="inputsValidatin()"/>
                        <div class="alert alert-danger mt-2 w-100 d-none" id="ageAlert">
                            Enter valid age
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="inner">
                        <input type="password" class="form-control" placeholder="Enter Your Password" id="passInput" oninput="inputsValidatin()"/>
                        <div class="alert alert-danger mt-2 w-100 d-none" id="passAlert">
                            Enter valid password *Minimum eight characters, at least one letter and one number:*
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="inner">
                        <input type="password" class="form-control" placeholder="Repassword" id="rePassInput" oninput="inputsValidatin()"/>
                        <div class="alert alert-danger mt-2 w-100 d-none" id="rePassAlert">
                            Enter valid repassword
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn btn-outline-danger mt-3" id='submitBtn' disabled >Submit</button>
    </div>
    `;

    $('#nameInput').focus(()=>{
        nameFlagInput = true;
    })
    $('#ageInput').focus(()=>{
        ageFlagInput = true;
    })
    $('#emailInput').focus(()=>{
        emailFlagInput = true;
    })
    $('#passInput').focus(()=>{
        passFlagInput = true;
    })
    $('#rePassInput').focus(()=>{
        rePassFlagInput = true;
    })
    $('#phoneInput').focus(()=>{
        phoneFlagInput = true;
    })
}
// ------------------------------- Inputs Validation
// Name Validation
function nameValidation(){
    let regex = /^[a-zA-Z]+$/;
    let nameInput = document.getElementById("nameInput");
    // return (regex.test(nameInput) );
    return (regex.test(nameInput.value));
}

// Email Validation
function emailValidation(){
    // let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let emailInput = document.getElementById('emailInput');
    return(regex.test(emailInput.value));
}

// Phone Validation
function phoneValidation(){
    // phone number formats, such as:
    // - (123) 456-7890
    // - 123-456-7890
    // - 123.456.7890
    // - 1234567890
    // - +91 (123) 456-7890
    const regex = /^\+?[\d()-.\s]{3,}$/; 
    // const regex = /^[\+/]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    let phoneInput = document.getElementById('phoneInput');
    return(regex.test(phoneInput.value));
}

// Age Validation
function ageValidation(){
    const regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    let ageInput = document.getElementById('ageInput');
    return regex.test(ageInput.value);
}

// Password Validation
function passValidation(){
    const regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    return regex.test(passInput.value);
}

// Repassword Validation
function rePassValidation(){
    // the alert must be declared here because they are built by js when click on contacts navLink
    let passInput = document.getElementById('passInput');
    let rePassInput = document.getElementById('rePassInput');

    return rePassInput.value == passInput.value;
}

// ------------------------------- 
function inputsValidatin(){
    // the alert must be declared here because they are built by js when click on contacts navLink
    let nameAlert = document.getElementById('nameAlert');
    // console.log(nameAlert.classList);
    let emailAlert = document.getElementById('emailAlert');
    let phoneAlert = document.getElementById('phoneAlert');
    let passAlert = document.getElementById('passAlert');
    let rePassAlert = document.getElementById('rePassAlert');
    let ageAlert = document.getElementById('ageAlert');
    let submitBtn = document.getElementById('submitBtn');

    if(nameFlagInput){
        if(nameValidation()==true){
            nameAlert.classList.add('d-none');
        }
        else{
            nameAlert.classList.add('d-block');
            nameAlert.classList.remove('d-none');
        }
    }

    if(emailFlagInput){
        if(emailValidation()){
            emailAlert.classList.add('d-none');
        }
        else{
            emailAlert.classList.add('d-block');
            emailAlert.classList.remove('d-none');
        }
    }
    
    if(phoneFlagInput){
        if(phoneValidation()==true){
            phoneAlert.classList.add('d-none');
        }
        else{
            phoneAlert.classList.add('d-block');
            phoneAlert.classList.remove('d-none');
        }
    }

    if(passFlagInput){
        if(passValidation()){
            passAlert.classList.add('d-none');
        }
        else{
            passAlert.classList.add('d-block');
            passAlert.classList.remove('d-none');
        }
    }

    if(rePassFlagInput){
        if(rePassValidation()){
            rePassAlert.classList.add('d-none');
        }
        else{
            rePassAlert.classList.add('d-block');
            rePassAlert.classList.remove('d-none');
        }
    }

    if(ageFlagInput){
        if(ageValidation()==true){
            ageAlert.classList.add('d-none');
        }
        else{
            ageAlert.classList.add('d-block');
            ageAlert.classList.remove('d-none');
        }
    }

    if(nameValidation() && ageValidation() && emailValidation() && passValidation() && rePassValidation() && phoneValidation()){
        submitBtn.removeAttribute('disabled');
    }else{
        submitBtn.setAttribute('disabled');
    }
}