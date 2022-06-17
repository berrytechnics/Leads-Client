<template>
  <div>
  </div>
  <div class="row">
    <div class="col-sm-12">
      <Leads></Leads>
    </div>
  </div>
</template>
<script>
import Leads from './components/LeadsComponent.vue';
export default {
  name: 'app',
  data(){
    return{
      isLoading:true
    }
  },
  components: {
    Leads,
  },
  mounted(){
  }
}; 
</script>

<style>
*{
    box-sizing: border-box;
    font-size:1rem;
    font-family: Helvetica, Arial, sans-serif;
}
/* For mobile phones: */
[class*="col-"] {width: 100%;}
@media only screen and (min-width: 600px) {
/* For tablets: */
.col-sm-1 {width: 8.33%;}
.col-sm-2 {width: 16.66%;}
.col-sm-3 {width: 25%;}
.col-sm-4 {width: 33.33%;}
.col-sm-5 {width: 41.66%;}
.col-sm-6 {width: 50%;}
.col-sm-7 {width: 58.33%;}
.col-sm-8 {width: 66.66%;}
.col-sm-9 {width: 75%;}
.col-sm-10 {width: 83.33%;}
.col-sm-11 {width: 91.66%;}
.col-sm-12 {width: 100%;}
}
@media only screen and (min-width: 768px) {
/* For desktop: */
.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}
}
[class*="col-"] {
    float: left;
    padding: 15px;
    /* border: 1px solid red; */
}
.img-responsive{
    max-width:100%;
    height:auto;
}
.row::after {
    content: "";
    clear: both;
    display: table;
}
#loading {
  position: absolute;
  z-index: 1000;
  background-color: white;
  height: 100vh;
  width: 100vw;
  text-align: center;
  line-height: 100vh;
}
h1{
  font-size:2rem;
}
.hide{
  display:none;
  /* visibility:hidden; */
}
</style>