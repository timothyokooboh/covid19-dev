<template>
  <div>

    <div>
      <div class="grid-container-1">
        <div class="grid-item-1">
          Based on real time open source data from WHO, Johns Hopkins and other reliable sources.
          <div style="font-size: 14px; margin-top: 10px"> (Except data from North & South Korea) </div>
        </div>
        
        <div class="grid-item-2">
          <input v-model="country" placeholder="Search Country" id="input-country">
           <span>
              <button @click="getData" :disabled=" country=='' || !isNaN(country) " class="btn btn-primary">Get Data
              </button>
            </span>
            <div v-show="loading" class="loading">Loading data...</div>
        </div>
      </div>
      

       <div class="result-banner">
         
         <div class="error-message" v-if="error"> {{errorMessage}} </div>

          <h4 class="result-owner">Covid-19 <span > {{displayedCountry}} </span> <span v-if="displayedCountry == ''"> Global data</span> <br> <span class="day">({{getDay}}) </span></h4>

          <div class="resultContainer">         
            <div> 
              <div class="result-item-heading"> Total </div>
              <div class="resultItem total"> 
                <div class="resultItem-text"> {{ getTotal | returnZero }} </div>
              </div>
            </div>

            <div> 
              <div class="result-item-heading"> New (last 24hrs) </div>
              <div class="resultItem new"> 
                <div class="resultItem-text"> {{ getNew | returnZero }} </div>
              </div>
            </div>

            <div> 
              <div class="result-item-heading">Active</div>
              <div class="resultItem active"> 
                <div class="resultItem-text"> {{ getActive | returnZero }} </div>
              </div>
            </div>

            <div> 
              <div class="result-item-heading">Critical </div>
              <div class="resultItem critical"> 
                <div class="resultItem-text"> {{ getCritical | returnZero }} </div>
              </div>
            </div>

            <div> 
              <div class="result-item-heading">Recovered</div>
              <div class="resultItem recovered"> 
                <div class="resultItem-text"> {{ getRecovered | returnZero }} </div>
              </div>
            </div>

            <div> 
              <div class="result-item-heading">Total Deaths</div>
              <div class="resultItem deaths"> 
                <div class="resultItem-text"> {{ getDeaths | returnZero }} </div>
              </div>
            </div>

            <div> 
              <div class="result-item-heading"> Deaths (last 24hrs) </div>
              <div class="resultItem new-deaths"> 
                <div class="resultItem-text"> {{ getNewDeaths | returnZero }} </div>
              </div>
            </div>

          </div>

        <div class="chart-container">
          <div class="learn-more">
            Corona virus (Covid-19) is a newly discovered infectious disease. <br> Protect yourself and others by washing your hands and not touching your eyes and nose. <br><br>
            <p>
               <a href="https://www.who.int/health-topics/coronavirus#tab=tab_2" target="_blank" class="learn-more-button text-white"> Learn more </a>
            </p>
          </div>
          <div class="covid19-container">
            <canvas ref="covid19" ></canvas> 
          </div>
        </div>
        
     </div>
       </div>
     
  </div>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js'

export default {
  data(){
    return {
      loading: true,
      errorMessage: '',
      country: '',
      total: '',
      critical: '',
      recovered: '',
      deaths: '',
      active: '',
      new: '', //new cases
      newDeaths: '',
      day: '',
      countryWithoutSpace: '',
      error: false,
      success: false,
      displayedCountry: ''
    }
  },

   computed: {
     getTotal: {
       get(){
         return this.total
       },
       set(value){
         this.total = value
       }
     },

      getCritical: {
         get(){
         return this.critical
       },
       set(value){
         this.critical = value
       } 
      },

      getRecovered: {
        get(){
         return this.recovered
       },
       set(value){
         this.recovered = value
       }   
      },

      getDeaths: {
        get(){
         return this.deaths
       },
       set(value){
         this.deaths = value
       } 
      },

      getNewDeaths: {
        get(){
         return this.newDeaths
       },
       set(value){
         this.newDeaths = value
       } 
      },

      getActive: {
        get(){
         return this.active
       },
       set(value){
         this.active = value
       } 
      },

      getNew: {
        get(){
         return this.new
       },
       set(value){
         this.new = value
       } 
      },

      getDay: {
        get(){
         return this.day
       },
       set(value){
         this.day = value
       } 
      },

    },

    filters:{
        returnZero(value){
          if(value == null) {
            return 0
          } else {
            return value;
          }
        },
        
    },

  methods: {
    
    getData(){
        this.loading = true
        this.countryWithoutSpace = this.country.replace(/\s/g, '-');
        console.log(this.countryWithoutSpace)
       axios.get(`https://covid-193.p.rapidapi.com/statistics?country=${this.countryWithoutSpace}`, {

          "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "a6fc0a08femshec59c1a0bc330d1p1feee7jsn3e4030a358da"
          }
          })
          .then(res => {
            console.log(res.data)
            this.loading = false
            this.showCountry = true
            this.total = res.data.response[0].cases.total
            this.new = res.data.response[0].cases.new
            this.critical = res.data.response[0].cases.critical
            this.active = res.data.response[0].cases.active
            this.recovered = res.data.response[0].cases.recovered
            this.deaths = res.data.response[0].deaths.total
            this.newDeaths = res.data.response[0].deaths.new
            this.getDay = res.data.response[0].day
            this.error = false
            this.success = true
            this.displayedCountry = this.country
            
            let chart = this.$refs.covid19.getContext('2d')
            Chart.defaults.scale.gridLines.display = false;
           
            new Chart(chart, {
      
          type:'bar',
          
          data: {
            labels: [`Total (${this.country})`, `New (${this.country})`, `Active (${this.country})`, `Critical (${this.country})`, `Recovered (${this.country})`, `Deaths (${this.country})`, `New Deaths (${this.country})`],
            datasets: [{
              label: 'Covid-19',
              data: [
                
                this.getTotal,
                this.getNew,
                this.getActive,
                this.getCritical,
                this.getRecovered,
                this.getDeaths,
                this.getNewDeaths      
              ],
              backgroundColor:[
                '#ffdf5b',
                '#ffac4d',
                '#73dfdf',
                '#73c4ff',
                '#73ffc4',    
                '#ff5353',                    
                '#ff8585'                    
              ],
              borderWidth: 0.2,
              
            }],
          },

          options:{
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                  categoryPercentage: 0.5,
                  barPercentage: 1.0
              }],
             
            },
            title:{
              display: true,
              text:'Covid-19',
              fontSize: 14
            },
            legend: {
              display:false,
              position: 'top',
              labels: {
                fontColor: 'red'
              }
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }
            },
            tooltips: {
              enabled: true
            },

          },
          
        })
              })
              .catch(err => {
                this.error= true
                console.log(err);
                this.errorMessage = 'Oops! An error occured. Ensure you spelled the country correctly'
          });
        },
        
     },


     mounted(){
        
        axios.get("https://covid-193.p.rapidapi.com/statistics?country=all", {

          "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "a6fc0a08femshec59c1a0bc330d1p1feee7jsn3e4030a358da"
          }
          })
          .then(res=> {
            console.log(res.data.response)
            this.loading = false
            this.total = res.data.response[0].cases.total
            this.new = res.data.response[0].cases.new
            this.critical = res.data.response[0].cases.critical
            this.active = res.data.response[0].cases.active
            this.recovered = res.data.response[0].cases.recovered
            this.deaths = res.data.response[0].deaths.total
            this.newDeaths = res.data.response[0].deaths.new
            this.getDay = res.data.response[0].day
            
            let chart = this.$refs.covid19.getContext('2d')
            Chart.defaults.scale.gridLines.display = false;
            
            new Chart(chart, {
      
          type:'bar', 
          
          data: {
            labels: [`Total (global)`, `New (global)`, `Active (global)`, `Critical (global)`, `Recovered (global)`, `Deaths (global)`, `New Deaths (global)`],
            datasets: [{
              label: 'Covid-19',
              
              data: [
                this.getTotal,
                this.getNew,
                this.getActive,
                this.getCritical,
                this.getRecovered,
                this.getDeaths,
                this.getNewDeaths        
              ],
              backgroundColor:[
                '#ffdf5b',
                '#ffac4d',
                '#73dfdf',
                '#73c4ff',
                '#73ffc4',    
                '#ff5353',                    
                '#ff8585'                     
              ],
              borderWidth: 0.2,
              
            }],
          },

          options:{
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                  categoryPercentage: 0.5,
                  barPercentage: 1.0
              }],
              
            },
            title:{
              display: true,
              text:'Covid-19',
              fontSize: 14
            },
            legend: {
              display:false,
              position: 'top',
              labels: {
                fontColor: 'red'
              }
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }
            },
            tooltips: {
              enabled: true
            } 
      },
    })
          })
          .catch(err => {
            console.log(err);
          });
        }
 
}
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .result-banner {
    background: url('../images/map.svg');
    background-position: center;
    background-size: cover;
    margin-top: -5px;
  }

  .grid-container-1 {
    display: grid;
    grid-template-columns:400px 600px;
    grid-column-gap: 50px;
    justify-content: center;
    background-image: url("../images/w.svg");
    background-position: center;
    background-size: cover;
    padding: 100px 0px 250px 80px;
    margin-top: -17px;
  }

  .grid-item-1 {
    color: #0081aa;
    font-weight: bold;
    font-size: 35px;
  }
  .grid-item-2 {
    margin-top: 50px;
  }
  
  #input-country {
    width: 600px;
    height: 61px;
    border-radius: 40px;
    border-right:none;
    padding-left: 10px;
    font-weight: 100;
    letter-spacing: 0.44px; 
    border: 10px solid #E7F7FF;   
    outline: none;
  }

  .btn-primary {
    border-radius: 30px;
    letter-spacing: 0.84px;
    padding: 5px 25px;
    margin-left: -170px;
    border-radius: 27px;
    border: solid 1px #dbf3ff;  
    outline: none !important;  
    font-size: 23.9px;  
  }
  .resultContainer {
    display: grid;
    grid-template-columns: 200px 200px 200px 200px;
    justify-content: center;
    grid-column-gap: 20px;
    text-align: center;
  }
  .chart-container {
    display: grid;
    grid-template-columns: 300px 500px;
    justify-content: center;
    grid-column-gap: 60px;
    margin-top: 100px;    
  }
  .resultItem {    
    width: 200px; 
    height: 150px;  
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .resultItem-text {
    color: white;
    letter-spacing: 3.84px;
    font-weight: bold;
    font-size: 25px;
  }
  .result-item-heading {
    color: #9f9f9f;
    font-weight: bold;
    font-size: 19px;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .total {
    background-color: #ffdf5b;
  }
  .new {
    background-color: #ffac4d;
  }
  .active {
    background-color: #73dfdf;
  }
  .critical {
    background-color: #73c4ff;
  }
  .recovered {
    background-color: #73ffc4;
  }
  .deaths {
    background-color: #ff5353;
  }
  .new-deaths {
    background-color: #ff8585;
  }

  .loading {
    text-align: center;
    font-size: 20px;
    margin-top: 40px;
  }

  .covid19-container {
    border-radius: 4px;
    box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    height: 400px;  
    margin-bottom: 50px;  
  }

  .learn-more-button {
    background-color: #0081aa;
    color: #fff;
    padding: 8px;
    border-radius: 4px;
    letter-spacing: 0.48px;
  }

  a {
    text-decoration: none;
  }

  .learn-more {
    line-height: 2.5rem;
  }

  .error-message {
    color: rgb(200, 50, 50);
    text-align: center;
    font-size: 18px;
  }
 
 .result-owner {
   text-align: center;
 }

 .day {
    color: #ff5353;
    font-weight: bold;
  }

  @media (max-width: 1200px) {
    .grid-container-1 {
       grid-template-columns: 300px 500px;
    } 
     #input-country {
      width: 500px;      
    }
 
  }
  @media (max-width: 1033px) {
    .grid-container-1 {
       grid-template-columns: 300px 400px;
       padding-left: 20px;
       column-gap: 30px;
    } 
     #input-country {
      width: 400px;      
    }
 
  }

  @media (max-width: 911px) {
    .grid-container-1 {
      display: grid;
      grid-template-columns: 400px;   
      justify-content: center;
    }
    .grid-item-1 {
      text-align: center;
    }
    #input-country {
      width: 370px;
      height: 55px;  
      border: 10px solid #E7F7FF;    
    }
    .btn-primary {      
      margin-left: -140px;  
      font-size: 16px;   
    }
    .resultContainer {
      display: grid;
      grid-template-columns: 200px 200px 200px;
    }
    .chart-container {
      display: grid;
      grid-template-columns: 200px 400px;
      justify-content: center;
      grid-column-gap: 20px;
      margin-top: 100px;    
    }
  }

  @media (max-width: 659px) {
     
    .resultContainer {
      display: grid;
      grid-template-columns: 200px 200px;
    }
    .chart-container {
      display: grid;
      grid-template-columns: 400px;
      justify-content: center;
      grid-row-gap: 20px;
      margin-top: 100px;    
    }
    .covid19-container {
      grid-row: 1;
      height: 300px; 
      margin-bottom: 0px;
    }
    .learn-more {
      margin-bottom: 20px;
    }
  }

  @media (max-width: 476px) {
    .grid-container-1 {
      display: grid;
      grid-template-columns: 350px; 
      padding-left: 0px;  
    }
    #input-country {
      width: 310px;
      height: 55px;  
      border: 10px solid #E7F7FF;    
    }
    .btn-primary {      
      margin-left: -140px;  
      font-size: 16px;   
    }
  }

  @media (max-width: 458px) {
    .resultContainer {
      display: grid;
      grid-template-columns: 140px 140px;
      grid-column-gap: 5px;
    }
    .resultItem {    
      width: 130px;
      height: 130px;      
    }
    .resultItem-text {
      font-size: 20px;
    }
    .result-item-heading {
      font-size: 16px;
      margin-top: 20px;
    }
    .grid-item-1 {
    color: #0081aa;
    font-weight: bold;
    font-size: 25px;
    }
    .chart-container {
      display: grid;
      grid-template-columns: 300px;
      margin-top: 50px;    
    }

    .loading {
      margin-top: 10px;
    }
    
  }

  @media (max-width: 417px) {
    .grid-container-1 {
      display: grid;
      grid-template-columns: 340px;   
    }
     #input-country {
      width: 310px;
      height: 55px;    
    }
    .btn-primary {      
      margin-left: -100px;  
      font-size: 16px;  
      padding: 5px 10px; 
    } 
  }
  @media (max-width: 350px) {
    .grid-container-1 {
      display: grid;
      grid-template-columns: 300px;   
    }
     #input-country {
      width: 250px;
      height: 55px;    
    }
    .btn-primary {      
      margin-left: -80px;   
    } 
  }
</style>