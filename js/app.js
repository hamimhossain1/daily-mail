
const loadAllCatagories = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json();
    return data;
}

const displayAllCatagories = async () => {
    const data = await loadAllCatagories();
    // console.log(data.data.news_category);
    const newsCatagories = document.getElementById('news-category');
    data.data.news_category.forEach(category => {
        const  {category_name} = category
        console.log(category_name)

        newsCatagories.innerHTML = `
        <h1>Hello world</h1>
        `
    });

    // console.log(data)
}

displayAllCatagories();