const productContainer = document.getElementById("container-cards");
const formInput = document.getElementById("search");
const btn = document.getElementById("daynight");

let post = [];

async function fetchAPI() {
    try{
        const res = await fetch("https://restcountries.com/v3.1/all")
        post = await res.json();
        generator(post);
    } catch(error){
        console.log("Xatolik", error)
    }
}

function generator(product){
    productContainer.innerHTML = '';

    product.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <img src="${element.flags.svg}" alt="Flag of ${element.name.common}">
        <h3>${element.name.common}</h3>
        `;

        productContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", fetchAPI);

formInput.addEventListener("input", search);

function search(){
    const searchValue = formInput.value.trim().toLowerCase();

    if(searchValue === ''){
        generator(post);
        return;
    }

    const filtered = post.filter(country => country.name.common.toLowerCase().includes(searchValue)
    );

    if(filtered.length > 0){
        generator(filtered);
    } else{
        productContainer.innerHTML = '<p style="color: red;">Hech narsa topilmadi</p>'
    }
}

btn.addEventListener("click", () =>{
    if(document.body.classList.toggle("dark-mode")){
        btn.textContent = '☀️';
    } else{
        btn.textContent = '🌙'
    }
})