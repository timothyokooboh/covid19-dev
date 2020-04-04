<template>

  <div>
    <div class="portfolio-container">
      <div class="grid-item-1">
        
        <div class="profiles-container">
          <p class="name">Timothy <br> Okooboh</p>
          <p class="job-role"> Web Developer|Pharmacist
          <p>
            <span class="skill-1">Vue JS</span> <span class="skill-2">Laravel</span>
          </p>
          <p> 
            <span> <img src="../images/arrow.svg"> </span>
            <span> <a href="https://timothyokooboh.github.io/portfolio/dist/index.html" target="_blank" class="checkout-text"> Check out Portfolio </a> </span>
          </p>
        </div>

        <div class="photos-container">
          <img src="../images/timothy.png" class="photos" alt="">
        </div>

      </div>

      <div class="grid-item-2">

        <div class="profiles-container">
          <p class="name"> Isaiah <br> Sokunbi </p>
          <p class="job-role"> User Interface|User Experience
          <p>
            <span class="skill-1"> Adobe XD </span> <span class="skill-2"> Figma </span>
          </p>
          <p> 
            <span> <img src="../images/arrow.svg"> </span>
            <span> <a href="https://www.uplabs.com/bdisaiah" target="_blank" class="checkout-text"> Check out Portfolio </a> </span>
          </p>
        </div>

        <div class="photos-container">
          <img src="../images/isaiah.png" class="photos" alt="">
        </div>

      </div>

    </div>

    <div class="world-map"></div>
  </div>
  
</template>
<style scoped>

  * {
    box-sizing: border-box;
  }
  a {
    color: #a5acab;
    text-decoration: none;
  }
  .portfolio-container {
    background-image: url("../images/w2.svg");
    background-size: cover;
    background-position: center;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;
    column-gap: 100px;
    padding-top: 100px;
    padding-bottom: 250px;
    margin-top: -16px;
  }
  .name {
    color: #0081aa;
    font-weight: bold;
    font-size: 57px;
    line-height: 1.19;
  }
  .job-role {
     color: #cbcbcb;
     font-size: 18px;
  }
  .skill-1 {
    border-radius: 2px;
    background-color: #6fc3ff;
    color: #ffffff;
    padding: 5px 15px;
    font-size: 15px;
    margin-right: 10px;
  }
  .skill-2 {
    border-radius: 2px;
    background-color: #ff514e;
    color: white;
    padding: 5px 15px;
    font-size: 15px;
  }
  .checkout-sign {
    width: 11.1px;
    height: 17.1px;
    color: #0081aa;
    font-size: 16px;
    font-weight: bold;
  }
  .photos {
    width: 241.9px;
    height: 283.6px;
    margin-left: 50px;
    margin-top: 20px;
  }
  .grid-item-1 {
    display: flex;
  }
  .grid-item-2 {
    display: flex;
  }
 .world-map {
   background-image: url('../images/map.svg');
   background-position: center;
   background-size: cover;
   padding-top: 150px;
   transform: rotate(10deg);
   margin-top: -20px;
 }

 @media(max-width: 1284px) {
   .portfolio-container {
      grid-template-columns: 500px 500px;
      justify-content: center;
      column-gap: 50px;
    }
    .name {
      font-size: 40px;
    }
    .photos {
      width: 211.9px;
      height: 253.6px;
      margin-top: 20px;
      margin-left: 30px;
    }
  }
 @media(max-width: 1148px) {
   .portfolio-container {
      grid-template-columns: 500px;
      justify-content: center;
      row-gap: 50px;
      padding-top: 100px;
    }
    .name {
      font-size: 40px;
    }
    .photos {
      width: 211.9px;
      height: 253.6px;
      margin-top: 10px;
    }
    .world-map {
      margin-top: -110px;
    }
  }

  @media(max-width: 580px) {
    .portfolio-container {
      padding-left: 0px;
      padding-top: 100px;
    }
    .grid-item-1 {
      display: grid;
      grid-template-columns: auto;
      justify-content: center;
      text-align: center;
    }
    .grid-item-2 {
      display: grid;
      grid-template-columns: auto;
      justify-content: center;
      text-align: center;
    }
    .photos-container {
      grid-row: 1;
    }
    .world-map {
      margin-top: -170px;
    }
  }

  
</style>