Vue.component('products-comp',{
    props:['showed','addproduct'],
    template: ` <div class="products">
                    <div v-for="product of showed" :key='product.id_product' class="product-item">
                        <img :src="product.img" alt="some img" class='product_img'>
                        <div class='product_info'>
                            <h3 class='product_name'>{{product.product_name}}</h3>
                            <p class='product_price'>Стоимость: {{product.price}} рублей</p>
                            <button class="buy-btn" :id="product.id_product" @click='$emit("addproduct",product)'>Купить</button>
                        </div>
                    </div>
                </div>
`
})