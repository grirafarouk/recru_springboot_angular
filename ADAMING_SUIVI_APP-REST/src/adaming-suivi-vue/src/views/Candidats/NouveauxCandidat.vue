<template>
<div class="panel-body">
        <Tree></Tree>


 </div>


</template>
<script>
import FicheService from '@/services/entretienService/EntretienService'
import cSwitch from '@/components/Switch'
import CompetenceService from '@/services/administrationService/CompetenceService'
import Tree from '@/views/Candidats/Tree'
export default {
  data () {
    return {
       
    }
  },
  computed: {
    RDVLangue() {
        return this.translate('RDVLangue')
      }
    },
   
   created(){
    var vm = this;
    $(document).ready(function() {
  $(".file-tree").filetree({
    animationSpeed: 'fast',
      collapsed: true,
  });
});
    
  },
    components: {
    Tree
    },
  methods: { 
      
                     
                        
    
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.clearfix{
    max-height : 50px;
}
.row-fluid p{
    font-size: 0.9em;
}
.col-xs-6{
    padding: 0px;
    margin: 0px;
}
.col-xs-7{
    padding: 0px;
    margin: 0px;
    width: 700px;
}
.card{
    padding: 0px;
    margin: 0px;
    height:990px;
}
.col-xs-5{
    padding: 0px;
    margin: 0px;
    width: 520px;
}
.col-xs-12{
    padding: 0px;
    padding-top: 10px;
    margin: 0px;

}

.input-group-addon{
    font-size: 0.8em;
}
.input-group input{
    
    font-size: 0.8em;

}
</style>
