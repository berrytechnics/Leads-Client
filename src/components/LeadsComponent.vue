<template>
<LoadingScreen v-if="isLoading"></LoadingScreen>
<div class="row hide" id="leadsDiv">
  <div class="col-12">
    <h1>{{title}}</h1>
    <button @click="getLeads">View {{leadType=='converted' ? 'unconverted': 'converted'}} leads</button>&nbsp;
    <span> <b>{{totalLeads}}</b> {{leadType}} leads</span>
    <br><br>
    <select @change="filterLeads" name="store" id="store" class="lead-filter" v-model="select">
      <option value="*">All Locations</option>
      <option value="OKC-Memorial">Oklahoma City</option>
      <option value="Fort Smith">Fort Smith</option>
      <option value="Fayetteville">Fayetteville</option>
      <option value="71st">71st</option>
      <option value="41st">41st</option>
      <option value="Bixby">Bixby</option>
      <option value="Broken Arrow">Broken Arrow</option>
      <option value="Jenks">Jenks</option>
      <option value="Owasso">Owasso</option>
      <option value="Brookside">Brookside</option>
    </select>
    <hr>
    <table class="lead-table">
      <thead>
        <tr class="lead-table-head">
          <th>Date</th>
          <th>Location</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Device</th>
          <th>Issue</th>
          <th>Price</th>
          <th>Contact</th>
          <!-- <th>Delete</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="lead in leads" :key="lead._id" >
          <!-- <td>{{$filters.timeAgo(lead.date)}}</td> -->
          <td><b>{{new Date(lead.date).toLocaleDateString()}}</b><br />{{$filters.timeAgo(lead.date)}}</td>
          <td>{{lead.location}}</td>
          <td>{{lead.name}}</td>
          <td>{{lead.phone}}</td>
          <td>{{lead.email}}</td>
          <td>{{lead.make}} {{lead.model}}</td>
          <td>{{lead.issue}}</td>
          <td>{{lead.price||"No Quote"}}</td>
          <td v-if="this.leadType == 'converted'"><b>converted</b></td>
          <td v-if="this.leadType == 'unconverted'">
            <div class="row">
              <div class="col">
                <label for="lead-responded">Responded</label>
              </div>
              <div class="col">
                <input id="lead-responded" class="lead-check"  type="checkbox" @click="saveLead(lead)" v-model="lead.responded">
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="lead-converted">Converted</label>
              </div>
              <div class="col">
                <input id="lead-converted" class="lead-check"  type="checkbox" @click="saveLead(lead)" v-model="lead.converted">
              </div>
            </div>
          </td>
          <!-- <td @click="saveLead(lead,true)" class="lead-delete"><span class="lead-delete-text">-</span></td> -->
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
<script>
import LoadingScreen from './LoadingComponent.vue';
import axios from 'axios';
export default {
  data(){
    return{
      leadType:'loading...',
      isLoading:true,
      title:"Leads",
      allLeads:[{}],
      leads:[{}],
      select:"*"
    }
  },
  components:{
    LoadingScreen
  },
  methods:{
    getLeads(){
      if(this.leadType == 'converted' || this.leadType == 'loading...') {
        this.isLoading = true;
        axios
          .get('https://pd-leads.herokuapp.com/leads')
          // .get('http://localhost:3000/leads')
          .then(res=>{
            // console.log(res.data)
            this.allLeads=res.data
            this.leads = this.allLeads
          })
          .finally(()=>{
            this.leadType = 'unconverted';
            this.isLoading = false;
            document.querySelector('#leadsDiv').style.display = 'block'
          })
      }
      if(this.leadType == 'unconverted'){
        this.isLoading = true;
        axios
          .get('https://pd-leads.herokuapp.com/convertedLeads')
          // .get('http://localhost:3000/convertedLeads')
          .then(res=>{
            // console.log(res.data)
            this.allLeads=res.data
            this.leads = this.allLeads
          })
          .finally(()=>{
            this.leadType = 'converted'
            this.isLoading = false;
            document.querySelector('#leadsDiv').style.display = 'block'
          })
      }
    },
    filterLeads(){
      setTimeout(()=>{this.select !== "*" ? this.leads = this.allLeads.filter(lead=>lead.location === this.select) : this.leads = this.allLeads},1)
    },
    saveLead(lead,hidden=false){
      let leadData = lead;
      hidden ? leadData.hidden = true : leadData.hidden = false;
      setTimeout(()=>{
        axios
          .post('https://pd-leads.herokuapp.com/leads',leadData)
          .then(res=>this.$toast.show(res.data))
      },1)
      setTimeout(this.$toast.clear, 3000);
    }
  },
  computed:{
    totalLeads(){
      return this.leads.length
    }
  },
  mounted(){
    this.getLeads()
  }
};
</script>
<style>
.lead-check{
  height:1.5rem;
  width:1.5rem;
  float:right;
}
.lead-filter{
  box-sizing:border-box;
  width:100%;
  height:2rem;
  padding:.2rem;
  margin-bottom:.2rem;
}
.lead-delete {
  text-align:center;
  color:black;
}
.lead-delete:hover{
  cursor:pointer;
  color:red;
}
.lead-delete-text{
  font-family:impact;
  font-size:3rem;
}
.lead-hide{
  display:none;
}
.lead-table{
  border-collapse:collapse;
}
.lead-tr:after {
    content: ""; /* This is necessary for the pseudo element to work. */ 
    display: block; /* This will put the pseudo element on its own line. */
    margin: 0 auto; /* This will center the border. */
    width: 50%; /* Change this to whatever width you want. */
    padding-top: 20px; /* This creates some space between the element and the border. */
    border-bottom: 1px solid black; /* This creates the border. Replace black with whatever color you want. */
}
.lead-tr:hover{
  background-color: rgb(244,244,244);
}
</style>