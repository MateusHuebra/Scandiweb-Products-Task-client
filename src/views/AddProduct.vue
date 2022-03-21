<template>
  <Header title='Product Add'>
    <button v-on:click="save" >Save</button>
    <button><router-link to="/">Cancel</router-link></button>
  </Header>

  <main>
    <div class="container">
      <form id="product_form">

        <div class="row">
          <label for="sku">SKU</label>
          <input v-model="sku" type="text" name="sku" id="sku">
        </div>

        <div class="row">
          <label for="name">Name</label>
          <input v-model="name" type="text" name="name" id="name">
        </div>
        
        <div class="row">
          <label for="price">Price ($)</label>
          <input v-model="price" type="number" name="price" id="price" min="0.01" step="any" placeholder='0.00'>
        </div>

        <div class="row">
          <label for="productType">Type Switcher</label>
          <select v-model="type" name="productType" id="productType">
            <option value="n" selected>Type Switcher</option>
            <option value="dvd">DVD</option>
            <option value="furniture">Furniture</option>
            <option value="book">Book</option>
          </select>
        </div>

        <transition name="slide-fade">
          <div v-if="type=='dvd'">

            <div class="row">
              <label for="size">Size (MB)</label>
              <input v-model="size" type="text" name="size" id="size" min="0.01" step="any" placeholder='0.00'>
            </div>

            <div class="row">
              <p>Please, provide the DVD storage size</p>
            </div>

          </div>

          <div v-else-if="type=='furniture'">

            <div class="row">
              <label for="height">Height (CM)</label>
              <input v-model="height" type="text" name="height" id="height" min="0.01" step="any" placeholder='0.00'>
            </div>

            <div class="row">
              <label for="width">Width (CM)</label>
              <input v-model="width" type="text" name="width" id="width" min="0.01" step="any" placeholder='0.00'>
            </div>

            <div class="row">
              <label for="length">Length (CM)</label>
              <input v-model="length" type="text" name="length" id="length" min="0.01" step="any" placeholder='0.00'>
            </div>

            <div class="row">
              <p>Please, provide the furniture dimensions</p>
            </div>

          </div>

          <div v-else-if="type=='book'">

            <div class="row">
              <label for="weight">Weight (KG)</label>
              <input v-model="weight" type="text" name="weight" id="weight" min="0.01" step="any" placeholder='0.00'>
            </div>

            <div class="row">
              <p>Please, provide the book weight</p>
            </div>

          </div>
        </transition>

        <transition name="slide-fade">
          <div v-if="notification" class="row notification">
            <p>{{notification}}</p>
          </div>
        </transition>

      </form>
    </div>
  </main>
</template>

<script>
import Header from '../components/Header.vue'
import Axios from '../axios.js';

export default {
  name: 'AddProduct',
  components: {
    Header
  },

  data: function () {
    return {
      sku: null,
      name: null,
      type: 'n',
      price: null,
      size: null,
      height: null,
      width: null,
      length: null,
      weight: null,
      notification: null
    }
    
  },

  methods: {
    save() {
      if(!this.validate()) {
        return;
      }
      let product = new Object;
      product.sku = this.sku;
      product.name = this.name;
      product.type = (this.type==='n')?null:this.type;
      product.price = Number.parseFloat(this.price).toFixed(2)
      switch (this.type) {
        case 'dvd':
          product.size = Number.parseFloat(this.size).toFixed(2);
          break;
        case 'furniture':
          product.height = Number.parseFloat(this.height).toFixed(2);
          product.width = Number.parseFloat(this.width).toFixed(2);
          product.length = Number.parseFloat(this.length).toFixed(2);
          break;
        case 'book':
          product.weight = Number.parseFloat(this.weight).toFixed(2);
          break;
      }

      Axios.post('/product/save', JSON.stringify(product))
        .then((response) => {
          console.log('then: '+response);
          this.$router.push({ name: 'ProductsList' });
        })
        .catch((response) => {
          console.log('catch: '+response);
          this.notification = response;
        })
    },

    validate() {
      const isBaseFieldsFilled = (this.sku && this.name && this.price);
      const isDVDFieldsFilled = (this.type==='dvd' && this.size);
      const isFurnitureFieldsFilled = (this.type==='furniture' && this.height && this.width && this.length);
      const isBookFieldsFilled = (this.type==='book' && this.weight);

      if(!(isBaseFieldsFilled && (isDVDFieldsFilled || isFurnitureFieldsFilled || isBookFieldsFilled))) {
        this.notification = 'Please, submit required data';
        return false;
      }

      const isBaseFieldsValid = (/[A-z0-9]{1,12}/.test(this.sku) && /[A-z 0-9]{1,32}/.test(this.name) && /[0-9]{1,7}(.[0-9]{1,2})?/.test(this.price));
      const isDVDFieldsValid = (this.type==='dvd' && /[0-9]{1,7}(.[0-9]{1,2})?/.test(this.size));
      const isFurnitureFieldsValid = (this.type==='furniture' && /[0-9]{1,7}(.[0-9]{1,2})?/.test(this.height) && /[0-9]{1,7}(.[0-9]{1,2})?/.test(this.width) && /[0-9]{1,7}(.[0-9]{1,2})?/.test(this.length));
      const isBookFieldsValid = (this.type==='book' && /[0-9]{1,7}((.[0-9]{1,2})?)?/.test(this.weight));

      if(!(isBaseFieldsValid && (isDVDFieldsValid || isFurnitureFieldsValid || isBookFieldsValid))) {
        this.notification = 'Please, provide the data of indicated type';
        return false;
      }

      this.notification = null;
      return true;
    }
  }

}
</script>

<style src="./../css/views/addproduct.css"></style>