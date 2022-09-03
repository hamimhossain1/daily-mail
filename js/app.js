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
        const div = document.createElement('div', 'col-sm-12');
        div.innerHTML = `
        <button type="button" onclick="loadNewsInCategory('${category_id}')" class="btn " style="font-size:20px">${category_name}</button>
        `
        newsCatagories.appendChild(div)
    });
}

// ---load news in a category ---//
const loadNewsInCategory = (id) => {
    // --below spinner --//
    const spinnerShow = document.getElementById('spinner');
    spinnerShow.classList.remove('d-none');

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsInCategory(data.data))
    // console.log(id)
}

// ---display news in category---//
const displayNewsInCategory = (newsData) => {
    // console.log(newsData)

    //---below spinner---//
    const spinnerShow = document.getElementById('spinner');
    spinnerShow.classList.add('d-none');
    
    const showNewsContainer = document.getElementById('show-news-container');
    showNewsContainer.textContent = '';


     //------ number of news Found------//
     const newsFound = document.getElementById('total-found');
     newsFound.textContent = '';
     if(newsData.length > 0){
         newsFound.innerText = `${newsData.length} items found `
     }
     else{  
        newsFound.innerText = 'No news found'
     }

    

    newsData.forEach(data => {
        console.log(data)
        const { thumbnail_url, title, details, author, _id, rating } = data;
        const { number } = rating;
        const { img, name, published_date } = author;
        // console.log(_id);
        const div = document.createElement('div');
        div.classList.add('card', 'mb-5', 'shadow-lg', 'rounded')
        div.classList.add()
        div.innerHTML = `
                <div class="row ">
                    <div class="col-lg-3 text-center text-md-center text-lg-start ">
                        <img src="${thumbnail_url}" class=" rounded-start w-full " alt="...">
                    </div>
                    <div class="col-lg-9">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${details.length > 400 ? details.slice(0, 400) + '...' : details}</p>
                            
                            <div class="d-flex justify-content-between mt-5  flex-column flex-md-column flex-lg-row" style="margin-top: 100px">    
                                <div class="d-flex">
                                    <div>
                                        <img src="${img}" class=" rounded-pill " alt="..." style="width:50px">
                                    </div>
                                    <div class="ms-2">
                                        <p >${name ? name : 'Not available'}</p>
                                        <p  class="text-muted">${new Date(published_date).toDateString()}</p>
                                    </div>
                                </div>

                                <div class="d-flex">
                                
                                <h5 class="ms-2"><i class="fa-regular fa-eye"> </i>${number}</h5>
                                </div>

                                <div>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star-half-stroke"></i>
                                </div>

                                <div>
                                    <button onclick="loadModalData('${_id}')" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    View More
                                    <i class="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        showNewsContainer.appendChild(div);
        
    })
}

// ---load modal data--- //
const loadModalData = (news_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayModalData(data.data))

}

const displayModalData = (data) =>{
    console.log(data.image_url)
    
    const modalContent = document.getElementById('modal-dialog') 
    modalContent.textContent = '';

    data.forEach(data =>{
    console.log(data)
    const {total_view, author, rating} = data;
    const {name, img} = author;
    const {number, badge} = rating;
    
    const div = document.createElement('div');
    div.classList.add('modal-content');
    div.innerHTML = `

                    <div class="modal-body">
                    <div class="text-center">
                    <img src="${img}" class=" rounded-pill " alt="..." style="width:300px">

                    <h5 class="mt-2">Name: ${name ? name : 'No data available'}</h5>
                    <p class="mt-2">View: ${total_view ? total_view : 'No data available'}</p>

                    <p>Rating: ${number} </p>
                    <p>Badge: ${badge} </p>
                </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                
        `;
        modalContent.appendChild(div);
    });
}


loadNewsInCategory('01')

displayAllCatagories();