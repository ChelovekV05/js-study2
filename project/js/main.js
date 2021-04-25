const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }

    getProduct(productId) {
        for (let product of this.goods) {
            if (product['id_product'] == productId) {
                return product;
            }
        }
    }
}


class ProductItem {
    constructor(product, img = '../unnamed.png'){
        this.title = product['product_name'];
        this.price = product.price;
        this.id = product['id_product'];
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class ProductCartItem extends ProductItem {
    constructor(product, img = '../unnamed.png') {
        super(product, img = '../unnamed.png');
        this.quantity = product.quantity;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <p>${this.quantity} шт</p>
                    <button class="buy-btn">Удалить</button>
                </div>
            </div>`
    }
}

class Cart {
    constructor() {
        this._getProducts()
          .then(data => {
              this.cartItem = data;
              this.cartProduct = this.cartItem['contents']
          })
        this.addEventCart();
    }

    _getProducts() {
        return fetch(`${API}/getBasket.json`)
          .then(result => result.json())
    }

    addEventCart() {
        this.eventOpenCart();
        this.eventCloseCart();
    }

    eventOpenCart() {
        let open = document.querySelector('.btn-cart');

        open.addEventListener('click', () => this.render());

        open.addEventListener('click', () => {
            (document.querySelector('.cart-overlay').
            classList.add('cart-overlay-active'))
        });
    }

    eventCloseCart() {
        let close =  document.querySelector('.cart-content-btn');

        close.addEventListener('click', () => this.clearCart());

        close.addEventListener('click', () => {
            (document.querySelector('.cart-overlay').
            classList.remove('cart-overlay-active'))
        });
    }

    render() {
        let cart = document.querySelector('.cart-content');
        for (let i = 0; i < this.cartProduct.length; i++) {
            const product = new ProductCartItem(this.cartProduct[i]);
            cart.insertAdjacentHTML('beforeend', product.render());
        }
        this.eventRemoveProduct();
    }

    clearCart() {
        let cart = document.querySelector('.cart-content');
        while (cart.children.length > 0) {
            cart.removeChild(cart.lastChild);
        }
    }

    addProduct(product) {
        for (let item of this.cartProduct) {
            if (item['id_product'] === product['id_product']) {
                item['quantity']++;
                return;
            }
        }
        product.quantity = 1;
        this.cartProduct.push(product);
    }

    eventRemoveProduct() {
        const cartItems = document.querySelector('.cart-content').
            getElementsByClassName('product-item');

        for (let item of cartItems) {
            item.addEventListener('click', () => {
                this.removeProduct(item.dataset.id);
            });
        }
    }

    removeProduct(productId) {
        for (let i = 0; i < this.cartProduct.length; i++) {
            if (this.cartProduct[i]['id_product'] != productId) continue;

            if (this.cartProduct[i].quantity > 1) {
                this.cartProduct[i].quantity--;
            } else {
                this.cartProduct.splice(i, 1);
            }
        }
        this.clearCart();
        this.render();
    }
}

class Shop {
    constructor() {
        this.productsList = new ProductsList();
        this.cart = new Cart();
    }

    eventLoadWindow() {
        window.onload = () => this.addProductToCart();
    }

    addProductToCart() {
        let productItems = document.getElementsByClassName('product-item');
        for (let product of productItems) {
            product.querySelector('.buy-btn').
                addEventListener('click', () => {
                       let productId = product.dataset.id;
                       this.cart.addProduct(this.productsList.getProduct(productId));
                })
        }
    }
}

const shop = new Shop();
shop.eventLoadWindow();



