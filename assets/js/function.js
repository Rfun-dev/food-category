export async function getCategory(){
    $.ajax({
        url : 'https://www.themealdb.com/api/json/v1/1/categories.php',
        type : "GET",
        dataType : 'json',
        success : function(response){
            response.categories.map((item) => {
                renderCategory(item)
                if(item.strCategory == 'Beef'){
                    renderTagline(item)
                }
            })
        }, fail : function(err){
            console.log(err.message)
        } 
    })
}

export async function getCategoryFoodByName(category){
    $.ajax({
        url : `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`,
        type : 'GET',
        dataType : 'json',
        success : function(response){
            removeElementFoodCategory()
            response.meals.map((item) => {
                renderCategoryByName(item)
            })
        }
    })
}

function removeElementFoodCategory(){
    $('#food-category').remove()
}


function renderCategory(item){
    const maxlength = 300
    var descValue = item.strCategoryDescription
    if(item.strCategoryDescription.length > maxlength){
        descValue = item.strCategoryDescription.substring(0,maxlength).concat("...")
    }
    $('#food-category').append(
        `<div class="menu_item">
            <a href="?category=${item.strCategory}" class="menu_item_title">
                <img src="${item.strCategoryThumb}" class="menu_item_img">
                <h3>${item.strCategory}</h3>
                <p class="menu_item_desc">
                ${descValue}</p>
            </a>    
        </div>`
    )
}

function renderTagline(item){
    $('#tagline').append(
        `<div class="flex">
            <div class="flex-right">
                <p>Lets to explore the kind of food</p>
                <h1>A taste you'll remember.</h1>
            </div>
            <div class="flex-left" id="tagline-image">
                <img src="${item.strCategoryThumb}">
            </div>
        </div>`
    )
}

function renderCategoryByName(item){
    $('#food-detail').append(
        `<div class="menu_item">
            <img src="${item.strMealThumb}">
                <h3>${item.strMeal}</h3>
        </div>`
    )
}
