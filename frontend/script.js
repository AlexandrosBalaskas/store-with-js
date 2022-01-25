var homescreen = {
    render: async() => {
        var domProducts=`<div class='homeContainer'>`;
        const response = await fetch('http://localhost:4000/api/products');
        const resource = await response.json();
        resource.forEach((element) => {
            domProducts  = domProducts + 
            `
            <div class="item">
                <div class="img">
                    <a href="/store_site/frontend/#/product/${element.id}"><img src=${element.image}></a>
                </div>
                <a href="/store_site/frontend/#/product/${element.id}"><h3> ${element.name}</h3></a>
                <h2> $${element.price}</h2>
            </div>`;
        } )
        domProducts+= `</div>`
        return domProducts;
    }
}
var productscreen = {

    render: async() => {
        const urli = window.location.hash;
        const urlparts = urli.split("/");
        const response = await fetch(`http://localhost:4000/api/products/${urlparts[2]}`);
        const resource = await response.json();
        return `
        <div class="productContainer">
            <div>
                <img class="imgSmall" src=${resource.image}>
                <img class="imgSmall" src=${resource.image}>
                <img class="imgSmall" src=${resource.image}>
            </div>
            <img class="imgLarge" src=${resource.image}>
            <div class="details">
                <p>${resource.name}</p>
                <h1>$${resource.price}</h1>
                <a class="cartButton"  href="/store_site/frontend/#/cart/${resource.id}"><p>Add to Cart</p></a>           
            </div>
        </div>`;
    }
}
var getproduct = new Array;
var value = new Array;
var cartscreen = {
    render: async() => {
        // addToCart------------------------------------------
        const urli = window.location.hash;
        const urlparts = urli.split("/");
        console.log(urli)
        if(urlparts[2])
        {
        const response = await fetch(`http://localhost:4000/api/products/${urlparts[2]}`);
        const resource = await response.json();
        const product = JSON.stringify(resource);
        localStorage.setItem(resource.name,product);
        console.log('inside')
        }
        // loadCart--------------------------------------------
        console.log(localStorage);
        var displayProducts='';
        var totalPrice= 0;

        for (let i=0; i< localStorage.length; i++)
        {
            getproduct[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(value[i]==null || value[i]<=0)
            {
                value[i]=1;
            }
            displayProducts+=`
            <div class='cartItem'>
                <img src=${getproduct[i].image}>
                <p>${getproduct[i].name}</p>
                <h2>$${getproduct[i].price}</h2>
                <input type="number" id="${getproduct[i].id}" value="${value[i]}">
                <i class="fas fa-times" id="${getproduct[i].name}" ></i>
            </div>
            `;
            totalPrice+=(getproduct[i].price*value[i]);
        }
        
        console.log(getproduct);
        return `<div class='cartContainer'>${displayProducts}<div class='text'>Total:$${totalPrice}</div></div>`
    }
}

var url = '/';
const urlgetter = () => {
    const urli = window.location.hash;
    console.log(urli)
    const urlparts = urli.split("/");
    if (urlparts[1] && urlparts[2])
        url = url + urlparts[1] + "/:id";
    if (urlparts[1] && !urlparts[2])
        url = url + urlparts[1];
}
var routes = {
    "/" : homescreen,
    "/product/:id" : productscreen,
    "/cart/:id" : cartscreen,
    "/cart" : cartscreen
}

const router = async() => {
    urlgetter();
    var screen = routes[url];
    url='/';
    document.getElementById("main").innerHTML= await screen.render();
    const buy = document.querySelector('.text')
    console.log(buy)
    if (buy!=null){
        buy.addEventListener('click',()=>{
            getproduct.forEach(e=>{
                localStorage.removeItem(e.name);
                e.countInstock = e.countInstock - 1;
            })
            window.location.hash='#/cart'
            router();
        })
    }
    for (let i=0; i<localStorage.length; i++)
    {
        document.getElementById(getproduct[i].name).addEventListener('click', () =>{
            localStorage.removeItem(getproduct[i].name);
            window.location.hash='#/cart'
            router();
        })
        document.getElementById(getproduct[i].id).addEventListener('change', () =>{
            value[i]=document.getElementById(getproduct[i].id).value;
            router();
        })
    }
    
}    



window.addEventListener('load',router);
window.addEventListener('hashchange',router);


