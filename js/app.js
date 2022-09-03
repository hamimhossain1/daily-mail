// ---load all catagories ---//
const loadAllCatagories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    return data;
}

// ---display all catagories ---//
const displayAllCatagories = async (category_id) => {
    const data = await loadAllCatagories(category_id);
    // console.log(data.data.news_category);
    const newsCatagories = document.getElementById('news-category');
    data.data.news_category.forEach((category) => {
        const { category_id, category_name } = category;
        // console.log(category_id)
        // console.log(category.category_name)
        const div = document.createElement('div');
        div.innerHTML = `
        <button type="button" onclick="loadNewsInCategory('${category_id}')" class="btn">${category_name}</button>
        `
        newsCatagories.appendChild(div)
    });
}

// ---load news in a category ---//
const loadNewsInCategory = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsInCategory(data.data))
    // console.log(id)
}

// ---display news in category---//
const displayNewsInCategory = (newsData) => {
    const showNewsContainer = document.getElementById('show-news-container');
    showNewsContainer.textContent = '';
    newsData.forEach(data => {
        const { thumbnail_url, title, details, author, total_view, rating } = data;
        const { number } = rating;
        const { img, name, published_date } = author;
        console.log(data);
        const div = document.createElement('div');
        div.classList.add('card')
        div.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4 mb-3 ">
                        <img src="${thumbnail_url}" class=" rounded-start w-50" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${details.length > 100 ? details.slice(0, 200) + '...' : details}</p>
                            
                            <div class="d-flex justify-content-between mt-5">    
                                <div class="d-flex">
                                    <div>
                                        <img src="${img}" class=" rounded-pill " alt="..." style="width:50px">
                                    </div>
                                    <div class="ms-2">
                                        <p >${name}</p>
                                        <p  class="text-muted">${published_date}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3><i class="fa-regular fa-eye"> </i>${number}</h3>
                                </div>

                                <div>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star-half-stroke"></i>
                                </div>

                                <div>
                                    <button type="button" class="btn btn-secondary">View More <i class="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        showNewsContainer.appendChild(div);
    })
}


// displayNewsInCategory()


// const loadNewsInCategory = async (category_id) => { 
//     const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
//     const data = await res.json();
//     return data;
// }

// const displayNewsInCategory = async () => {
//     const data = await loadNewsInCategory();
//     console.log(data);
// }

// displayNewsInCategory();

displayAllCatagories();