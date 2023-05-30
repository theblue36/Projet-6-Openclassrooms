let categories = [];
let works = [];
let worksFiltered = [];
const projects = document.querySelector('.projects');
const gallery = document.querySelector('.gallery')

async function getCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        const data = await response.json();
        categories = data;

        projects.innerHTML = '<li class="all active">Tous</li>';
        projects.innerHTML += categories.map((category) => {
            return `<li data-id=${category.id}>${category.name}</li>`
        }).join(' ');
    } catch (error) {
        console.log(error);
    }
}

async function getWorks() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const data = await response.json();
        works = data;
        displayFigureWorks(works);
    } catch (error) {
        console.log(error);
    }
}

async function filterWorks() {
    const buttonsFilter = document.querySelectorAll('.projects li');
    worksFiltered = works;

    buttonsFilter.forEach((button) => button.addEventListener('click', () => {

        buttonsFilter.forEach((buttonFilter) => buttonFilter.classList.remove('active'));
        button.classList.add('active');

        /*        if (button.classList.contains('all')) {
                    worksFiltered = works;
                } else {
                    worksFiltered = works.filter(work => work.categoryId == button.dataset.id);
                }*/

        worksFiltered = button.classList.contains('all')
            ? works
            : works.filter(work => work.categoryId == button.dataset.id);

        displayFigureWorks(worksFiltered);
    }))
}

function displayFigureWorks(dataWorks) {
    gallery.innerHTML = dataWorks.map((work) => {
        return `<figure>
                <img src=${work.imageUrl} alt=${work.title}>
                <figcaption>${work.title}</figcaption>
            </figure>`
    }).join(' ');
}

window.addEventListener('DOMContentLoaded', async () => {
    await getCategories();
    await getWorks();
    await filterWorks();
})