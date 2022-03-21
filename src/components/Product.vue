<template>
  <div class="product" v-bind:class="{ selected: delete_checkbox }">
    <input v-model="delete_checkbox" v-on:change="checkboxChange" type="checkbox" class="delete-checkbox">
    <div class="content">
      <span>{{product.sku}}</span>
      <span>{{product.name}}</span>
      <span>{{product.price}} $</span>

      <span v-if="product.type=='dvd'">Size: {{product.size}} MB</span>

      <span v-else-if="product.type=='furniture'">
        Dimension: {{product.height}}x{{product.width}}x{{product.length}}
      </span>

      <span v-else-if="product.type=='book'">Weight: {{product.weight}}KG</span>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: Object
  },

  data: function() {
    return {
      delete_checkbox : false
    }
  },

  methods: {
    checkboxChange() {
      if(this.delete_checkbox) {
        this.$emit('checkCheckbox', this.product.sku);
      } else {
        this.$emit('uncheckCheckbox', this.product.sku);
      }
      
    }
  }

}
</script>

<style scoped src="./../css/components/product.css"></style>