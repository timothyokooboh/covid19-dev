<template>
  <div class="navbarContainer">   
    <ul class="">
      <router-link tag="li" active-class ="active" exact to="/" >
        <a>Covid-19 Dashboard</a>
      </router-link>
      <router-link tag="li" active-class ="active" to="/developer" >
        <a>Developer</a>
      </router-link>
    </ul>
  </div>
  
</template>

<script>
export default {
  
}
</script>

<style scoped>
  ul{
    display: flex;
    justify-content: flex-start;
  }

  ul li {
    list-style-type: none;
    padding-top: 30px;
    padding-right: 20px;
    padding-bottom: 10px;
  }
  
   ul li a {
     color: #0081aa;
     text-decoration: none;
     font-size: 20px;
   }  
   .active:after {
     content: '';
     display: block;
     margin: 0 auto;
     width: 100%;
     margin-bottom: 20px;
     border-bottom: 3px solid #73BCD4;
   }
   .navbarContainer {
     background-color: #E7F7FF;
   }

   
   
</style>