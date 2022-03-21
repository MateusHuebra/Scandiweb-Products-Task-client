<template>
  <Header title='Product List'>
    <button><router-link to="/add-product">ADD</router-link></button>
    <button v-on:click="massDelete" id="delete-product-btn">MASS DELETE</button>
  </Header>

  <main>
    <div class="container">

      <div v-if="loading" class="products">
        <Product-skeleton v-for="i in 4" :key="i" />
      </div>
      <div v-else class="products">
        <Product
          v-for="product in products"
          :key="product.sku"
          :product="product"
          v-on:checkCheckbox="selectProduct"
          v-on:uncheckCheckbox="unselectProduct"
        />
      </div>
    </div>
  </main>
  
</template>

<script>
import Header from '../components/Header.vue'
import Product from '../components/Product.vue'
import ProductSkeleton from '../components/ProductSkeleton.vue'
import Axios from '../axios.js';

export default {
  name: 'ProductsList',
  components: {
    Header,
    Product,
    ProductSkeleton
  },

  data: function () {
    return {
      products: [],
      selectedProducts: [],
      loading: true
    }
    
  },

  mounted() {
    this.get();
  },

  methods: {
    get() {
      Axios.get('product/getAll')
        .then((response) => {
          this.loading=false;
          this.products = response.data;
        })
    },

    selectProduct(sku) {
      this.selectedProducts.push(sku);
    },
    unselectProduct(sku) {
      this.selectedProducts.splice(this.selectedProducts.indexOf(sku), 1);
    },

    massDelete() {
      Axios.delete('product/massDelete?skus='+this.selectedProducts.join(';'))
        .then(() => {
          this.products = this.products.filter(product => !this.selectedProducts.includes(product.sku));
          this.selectedProducts = [];
        })
    }
  }
}
</script>

<style src="./../css/views/productlist.css"></style>