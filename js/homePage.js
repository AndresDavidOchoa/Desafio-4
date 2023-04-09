const productsContainer = document.getElementById('productsContainer');
const addToShoppingCartButtons = document.querySelectorAll(".add-to-cart");
const shoppingCartItemsContainer = document.querySelector(".shoppingCartItemsContainer");
const buyButton = document.querySelector(".comprarButton");

(async () => {

    const { value: Pais } = await Swal.fire({
        title: 'Bienvenido',
        text: 'Selecciona tu pais',
        confirmButtonText: 'Seleccionar',
        padding: '2rem',
        footer: '<a href="">¿Por que debo dar esa informacion?</a>',
        input: 'select',
        inputPlaceholder: 'Pais',
        inputValue: '',
        inputOptions: {
            España: 'España',
            Argentina: 'Argentina',
            Chile: 'Chile',
            Mexico: 'Mexico'
        }
    });

    if (Pais) {
        Swal.fire({
            title: `Seleccionaste ${Pais}`,
            position: 'bottom-end',
            width: '20%',
            backdrop: false ,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        });
    }

})()



const hardcodedProductsArr = [
    {
        id: '0',
        name: 'Polera',
        price: '$19.99',
        imgSrc: 'assets/red-t-shirt.png',
    },
    {
        id: '1',
        name: 'Polera',
        price: '$19.99',
        imgSrc: 'assets/red-t-shirt.png'
    },
    {
        id: '2',
        name: 'Poleron',
        price: '$19.99',
        imgSrc: 'assets/b-hoodie.png'
    },
    {
        id: '3',
        name: 'Poleron',
        price: '$19.99',
        imgSrc: 'assets/b-hoodie.png'
    },
    {
        id: '4',
        name: 'Jeans',
        price: '$19.99',
        imgSrc: 'assets/jeans.png'
    },
    {
        id: '5',
        name: 'Jeans',
        price: '$19.99',
        imgSrc: 'assets/jeans.png'
    },
]

//PARA DESPUES: función para renderizar el carrito y sus productos
// function renderCartProducts() {
// window.localStorage.
//    JSON.parse()
// }

/*

*/
function addToCart(product) {
    const parsedElement = JSON.stringify(product);

    window.localStorage.setItem(product.id, parsedElement)
    renderCartProducts()


}

function getProductCardElement(product) {

    const productCard = document.createElement('div');
    const imgContainer = document.createElement('div');
    const imgElem = document.createElement('img');
    const productTitle = document.createElement('h2');
    const productTitleText = document.createTextNode(product.name);
    const productPrice = document.createElement('p');
    const productPriceText = document.createTextNode(product.price);
    const addToCartButton = document.createElement('button');
    const addToCartButtonText = document.createTextNode('Add to Cart');


    productCard.className = 'card';

    imgContainer.className = 'img-container';

    imgElem.className = 'item-image';
    imgElem.src = product.imgSrc;
    imgElem.alt = product.name;

    productTitle.className = 'card-title';

    productPrice.className = 'price';

    addToCartButton.className = 'add-to-cart';


    imgContainer.appendChild(imgElem);
    productTitle.appendChild(productTitleText);
    productPrice.appendChild(productPriceText);
    addToCartButton.appendChild(addToCartButtonText);
    addToCartButton.addEventListener('click', () => addToCart(product));

    productCard.appendChild(imgContainer);
    productCard.appendChild(productTitle);
    productCard.appendChild(productPrice);
    productCard.appendChild(addToCartButton);

    return productCard;
};

function renderProducts() {

    hardcodedProductsArr.forEach(
        (product) => {
            const productCardElement = getProductCardElement(product);

            productsContainer.appendChild(productCardElement);
        }
    );
}

addToShoppingCartButtons.forEach(addToCartButton => {

    addToCartButton.addEventListener("click", addToCartClick);

});

buyButton.addEventListener("click", buyButtonClick);


function addToCartClick(e) {

    const button = e.target;
    const item = button.closest(".card");

    const itemTitle = item.querySelector(".card-title").textContent;
    const itemPrice = item.querySelector(".price").textContent;

    addItemToShoppingCart(itemTitle, itemPrice);

}

function addItemToShoppingCart(itemTitle, itemPrice) {

    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
    );
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[
                i
            ].parentElement.parentElement.parentElement.querySelector(
                '.shoppingCartItemQuantity'
            );
            elementQuantity.value++;
            updateTotal();
            return;
        }
    }


    const shoppingCartRow = document.createElement("div")
    shoppingCartContent = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>

        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>

        <div class="col-4">
            <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;

    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow.querySelector(".buttonDelete").addEventListener("click", removeShoppingCartItem);

    shoppingCartRow.querySelector(".shoppingCartItemQuantity").addEventListener("change", quantityChaged);

    updateTotal()
}

function updateTotal() {

    let total = 0;
    const shoppingCartTotal = document.querySelector(".shoppingCartTotal"
    );

    const shoppingCartItems = document.querySelectorAll(".shoppingCartItem"
    );

    shoppingCartItems.forEach((shoppingCartItem) => {

        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(".shoppingCartItemPrice"
        );
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace("$", "")
        );
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(".shoppingCartItemQuantity"
        );
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value
        );

        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });

    shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`
}

function removeShoppingCartItem(e) {
    const buttonClicked = e.target;
    buttonClicked.closest(".shoppingCartItem").remove();
    updateTotal();
}

function quantityChaged(e) {
    const input = e.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateTotal();
}

function buyButtonClick() {
    shoppingCartItemsContainer.innerHTML = ""
    updateTotal()
    alert("Gracias por comprar, vuelva pronto")
}

renderProducts();

