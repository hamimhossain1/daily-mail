// ---load all catagories ---//
const loadAllCatagories = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json();
    return data;
}

// ---display all catagories ---//
const displayAllCatagories = async (category) => {
    const data = await loadAllCatagories();
    // console.log(data.data.news_category);
    const newsCatagories = document.getElementById('news-category');
    data.data.news_category.forEach((category) => {
        const  {category_name} = category;
        // console.log(category.category_name)
        const div = document.createElement('div');
        div.classList.add('inline-block')
        div.innerHTML = `
        <button type="button" class="btn  ">${category_name}</button>
        `
        newsCatagories.appendChild(div)
    });
}

displayAllCatagories();