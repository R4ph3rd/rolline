<template>
  <select :name="name" :id="name">
      <option value="hide">- {{name}} -</option>
      <option v-for="item in list" :key="item" :value="item">{{item}}</option>
  </select>
</template>

<script>
export default {
    name: 'List',
    props:{
        list: {
            type: Array,
            required :true
        },
        name:{
            type:String,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
$select-color: #fff;
$select-background: #c0392b;
$select-width: 220px;
$select-height: 40px; 

select{
    padding: 10px 15px 10px 15px;
    border: $r-color-dark04 1px solid;
    border-radius:8px;
    background: none;
    box-shadow:$r-shadow-02dp; 
    color:$r-color-light01;


    & option{

        &:hover{
            background-color: $r-color-primary
        }
    }
}


.select-hidden {
  display: none;
  visibility: hidden;
  padding-right: 10px;
}
.select {
  cursor: pointer;
  display: inline-block;
  position: relative;
  font-size: 16px;
  color: $r-color-light04;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.select-styled {
  position: absolute; 
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $r-layer-02dp;
  padding: 8px 15px;
  transition : 0.2s ease-in;

  &:after {
    content:"";
    width: 0;
    height: 0;
    border: 7px solid transparent;
    border-color: $select-color transparent transparent transparent;
    position: absolute;
    top: 16px;
    right: 10px;
  }
  
  &:hover {
    background-color: darken($r-layer-02dp, 2);
  }
  &:active, &.active {
    background-color: darken($r-layer-02dp, 5);
    &:after {
      top: 9px;
      border-color: transparent transparent $select-color transparent;
    }
  }
}

.select-options {
  display: none; 
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  z-index: 999;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: darken($r-layer-02dp, 5);

  li {
    margin: 0;
    padding: 12px 0;
    text-indent: 15px;
    border-top: 1px solid darken($r-layer-02dp, 10);
    transition: all 0.15s ease-in;
    
    &:hover {
      color: $r-layer-02dp;
      background: $r-color-primary;
    }

    &[rel="hide"] {
      display: none;
    }
  }
} 
</style>