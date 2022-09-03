// ---load all catagories ---//
const loadAllCatagories = async () =>{
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
        const  {category_id, category_name} = category;
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
const loadNewsInCategory = (id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsInCategory(data.data))

    // console.log(id)
}

const displayNewsInCategory =  (newsData) => {
    
    newsData.forEach(data =>{
        console.log(data);
    })
}





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