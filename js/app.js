
const loadAllCatagories = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json();
    return data;
}

const displayAllCatagories = async () => {
    const data = await loadAllCatagories();
    const newsCatagories = document.getElementById('news-category');
    data.forEach(category => {

        newsCatagories.innerHTML = `
        
        `
    });

    console.log(data)
}

displayAllCatagories();