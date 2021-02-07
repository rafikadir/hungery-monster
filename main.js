const inputMeal = document.getElementById('inputMeal');
const submit = document.getElementById('searchBtn');

submit.addEventListener('click', function(){
    searchMeal();
})

function searchMeal(){
    const search = inputMeal.value;
    const mealDiv = document.getElementById('mealsDiv');

    if(search.trim()) {
        
         //fetch search item
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then (res => res.json())
        .then (data => {

            if(data.meals === null) {
                //if no match food
                alert('Nothing Found! Try Again..');
            }

            else {
                // if match food
                const displayMeal = mealslist => {
                    console.log(mealslist);
                }

                mealDiv.innerHTML = data.meals.map (meal =>
                `<div class="col-lg-3">
                    <div onclick = displayDetails('${meal.idMeal}'); class="food-box">
                        <img src='${meal.strMealThumb}'>
                        <h4>${meal.strMeal}</h4>
                        <span>${meal.idMeal}</span>
                    </div>
                </div>`)
                .join('');  

                // console.log(data);
            }

        });
       
    }

    else {
        //if someone do empty search
        const searchArea = document.getElementById('SearchArea');
        const empty = document.createElement('h3');
        empty.innerText = "Meal Name Should Not be Empty!";
        searchArea.appendChild(empty);
    }
}

const displayDetails = mealDetails => {

    fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealDetails}`)
    .then (res =>res.json())
    .then (data => {
        const meal = data.meals;
        mealingradients(meal[0])
    });
}

const mealingradients = mealDetails =>{
    const ingradientName = document.getElementById('mealdetails');
    ingradientName.innerHTML = `
        <img src="${mealDetails.strMealThumb}">
        <h2>Ingredients</h2>
        <ol>
            <li>${mealDetails.strIngredient1}</li>
            <li>${mealDetails.strIngredient2}</li>
            <li>${mealDetails.strIngredient3}</li>
            <li>${mealDetails.strIngredient4}</li>
            <li>${mealDetails.strIngredient5}</li>
            <li>${mealDetails.strIngredient6}</li>
            <li>${mealDetails.strIngredient7}</li>
            <li>${mealDetails.strIngredient8}</li>
        </ol>
    `
}