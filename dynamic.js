$(document).ready(function(){

var db_rows={};
var row_counter=0;

function refresh(){


                if( $("#bd-header").text()=="Inputs"){
                                                                $.ajax({url:"api.json",
                                                                        type:"GET",
                                                                        data_type:"JSON",
                                                                        success:function(data){
                                                                                                  var j;
                                                                                                  var json=JSON.parse(data);
                                                                                                  for(var i in json[0]){
                                                                                                                   j=i[2].toString();

                                                                                                                   if ( $("#circle-"+j).attr("name")=="In"  ){
                                                                                                                     if( json[0][i]=="1" ){

                                                                                                                                                  $("#circle-"+j).css("background-color","green");
                                                                                                                     } else                     {

                                                                                                                                                  $("#circle-"+j).css("background-color","grey");
                                                                                                                     }
                                                                                                                   }
                                                                                                                 }
                                                                                               }
                                                                       });

                }

                if( $("#bd-header").text()=="Outputs"){
                                                                $.ajax({url:"api.json",
                                                                         type:"GET",
                                                                         data_type:"JSON",
                                                                         success:function(data){
                                                                                                   var j;
                                                                                                   var json=JSON.parse(data);
                                                                                                   for(var i in json[1]){
                                                                                                                    j=i[3].toString();

                                                                                                                    if ( $("#circle-"+j).attr("name")=="Out"  ){
                                                                                                                      if( json[1][i]=="1" ){

                                                                                                                                                   $("#circle-"+j).css("background-color","green");
                                                                                                                      } else                     {

                                                                                                                                                   $("#circle-"+j).css("background-color","grey");
                                                                                                                      }
                                                                                                                    }
                                                                                                                  }
                                                                                                }
                                                                        });


                }

                if( $("#bd-header2").text()=="Memory"){
                                                                var names=[];
                                                                var input=[];
                                                                var names2=[];
                                                                var input2=[];
                                                                for(var i in db_rows){
                                                                      if(($("#"+i).find("#col3").find("input").attr("name"))!=null){  input.push($("#"+i).find("#col3").find("input"));
                                                                                                                                      names.push($("#"+i).find("#col3").find("input").attr("name"));
                                                                                                                            }
                                                                      if(($("#"+i).find("#colh3").find("input").attr("name"))!=null){
                                                                                                                                      input2.push($("#"+i).find("#colh3").find("input"));
                                                                                                                                      names2.push($("#"+i).find("#colh3").find("input").attr("name"));
                                                                                                                            }



                                                                }


                                                                $.ajax({url:"api.json",
                                                                         type:"GET",
                                                                         data_type:"JSON",
                                                                         success:function(data){
                                                                                                   var j=$("input");
                                                                                                   var json=JSON.parse(data);

                                                                                                    for(var i=0;i<names.length;i++){


                                                                                                          for(var m in json[2]){

                                                                                                                if(names[i]==m){
                                                                                                                  input[i].val(json[2][m]);
                                                                                                                  break;
                                                                                                                }else{
                                                                                                                    input[i].val("");
                                                                                                                }
                                                                                                          }

                                                                                                    }
                                                                                                    for(var v=0;v<names2.length;v++){


                                                                                                          for(var b in json[3]){

                                                                                                                if(names2[v]==b){
                                                                                                                  input2[v].val(json[3][b]);
                                                                                                                  break;
                                                                                                                }else{
                                                                                                                    input2[v].val("");

                                                                                                                }
                                                                                                          }

                                                                                                    }


                                                                                                }
                                                                        });


              }

}






function evli_set_outputs(i){
  $("#btn-"+i.toString()+"-s").click(function(){
                                                   var j=i.toString();
                                                   $.ajax({
                                                            type: 'POST',
                                                            url: 'api.json',
                                                            data: JSON.parse('{ "Out'+j+'":1}' ),
                                                            dataType: 'json',
                                                            success: function() {  }
                                                    });

                      });

}


function evli_reset_outputs(i){
  $("#btn-"+i.toString()+"-r").click(function(){var j=i.toString();
                                                 $.ajax({
                                                          type: 'POST',
                                                          url: 'api.json',
                                                          data: JSON.parse('{ "Out'+j+'":0}' ),
                                                          dataType: 'json',
                                                          success: function() {  }
                                                  });

                      });

}


  $("#main").hide();
  $("#main2").hide();

$("#home").click(function(){
                               $("#main").hide();
                               $("#main2").hide();
});

  $("#out-btn").click(function(){
                                  $("#main2").hide();
                                  $("#main").show();
                                  $("#bd-header").text("Outputs");
                                  $("#bd-header2").text("");
                                  var j="";


                                  for(i=0;i<8;i++) {
                                    j=(i).toString();


                                     $("#col-"+j+"-hd").text("Q0."+i.toString());

                                     $("#btn-"+j+"-s").show();
                                     $("#btn-"+j+"-r").show();

                                     $("#btn-"+j+"-s").attr({"name":"Out"+j});
                                     $("#btn-"+j+"-r").attr({"name":"Out"+j});

                                     $("#circle-"+j).attr({"name":"Out"});
                                    }



                                    for(i=0;i<8;i++){
                                      evli_set_outputs(i);
                                      evli_reset_outputs(i);
                                    }


                                });






  $("#in-btn").click(function(){
                                 $("#main2").hide();
                                 $("#main").show();
                                 $("#bd-header").text("Inputs");
                                 $("#bd-header2").text("");



                                 for(i=0;i<8;i++) {
                                                     j=(i).toString();
                                                     $("#col-"+j+"-hd").text("I0."+j);
                                                     $("#btn-"+j+"-s").hide();
                                                     $("#btn-"+j+"-r").hide();

                                                     $("#circle-"+j).attr({"name":"In"});

                                                  }




                              });




  $("#mem-btn").click(function(){
                                   $("#main").hide();
                                   $("#main2").show();
                                   $("#bd-header2").text("Memory");
                                   $("#bd-header").text("");


  });




$("#add-db").click(function(){
                                var db_name;
                                var db_tag_name;
                                var counter="row"+row_counter.toString();
                                db_rows[counter]={ "db_name":"","db_tag_name":"" } ;
                               $("#main2").append(
                                                       '<div id="'+counter+'"  class="form-group row db">'+

                                                       '<div id="col1" class="col-sx-2 col-of-row">'+

                                                       '<div class="input-group mb-3 ">'+
                                                       '<div class="input-group-prepend">'+
                                                       '<span class="input-group-text" id="basic-addon1">DB</span>'+
                                                       '</div>'+
                                                       '<input type="text" class="form-control" placeholder="Data Block Name" aria-label="Username" aria-describedby="basic-addon1">'+
                                                       '</div>'+

                                                       '</div>'+


                                                       '<div id="col2" class="col-sx-2 col-of-row">'+

                                                       ' <div class="input-group mb-3 ">'+
                                                       '<div class="input-group-prepend">'+
                                                       '<span class="input-group-text" id="basic-addon1">Tag</span>'+
                                                       '</div>'+
                                                       '<input type="text" class="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1">'+
                                                       '</div>'+

                                                       '</div>'+



                                                       '<div id="col3" class="col-sx-2 col-of-row">'+

                                                      '<div class="input-group mb-3 ">'+
                                                      '<div class="input-group-prepend">'+
                                                      '<span class="input-group-text" id="basic-addon1">Value Now</span>'+
                                                      '</div>'+
                                                      '<input type="text" class="form-control" placeholder="Real time Value" aria-label="Username" aria-describedby="basic-addon1" readonly>'+
                                                      '</div>'+

                                                      '</div>'+

                                                      '<div id="col4" class="col-sx-2 col-of-row">'+

                                                     '<div class="input-group mb-3 ">'+
                                                     '<div class="input-group-prepend">'+
                                                     '<span class="input-group-text" id="basic-addon1">Change Value</span>'+
                                                     '</div>'+
                                                     '<input type="text" class="form-control" placeholder="Enter new Value" aria-label="Username" aria-describedby="basic-addon1">'+
                                                     '</div>'+

                                                     '</div>'+




                                                      '<div id="col5" class="col-sx-2 col-of-row">'+
                                                      '<button  type="button" class="btn btn-dark change-val">Write</button>'+
                                                      '<button  type="button" class="btn btn-dark rem-row">-</button>'+
                                                      '</div>'+

                                                      '</div>'
                               );

                               $("#main2").on("click",".change-val",function(events){
                                                                                      var counter=$(this).parents("div").eq(1).attr("id");

                                                                                      var new_val=$(this).parents("div").eq(1).find("#col4").find("input").val();

                                                                                      $.ajax({url:"api.json",
                                                                                              type:"POST",
                                                                                              data_type:"text",
                                                                                              data:('"'+db_rows[counter].db_name+'".'+db_rows[counter].db_tag_name+'='+new_val),
                                                                                              success:function(){}

                                                                                      });


                                                                                 });

                              $("#main2").on("click",".rem-row",function(events){  var counter=$(this).parents("div").eq(1).attr("id");

                                                                                  $(this).parents('div').eq(1).remove();

                                                                                  delete db_rows[counter];
                                                                                });

                              $("#main2").on("change","#col1",function(events) {
                                                                                 db_name= $(this).find("input").val() ;
                                                                                 var counter=$(this).parent().attr("id");
                                                                                 db_rows[counter].db_name=db_name;
                                                                                 $(this).parents('div').eq(0).find("#col3").find("input").attr("name",db_rows[counter].db_name+'.'+db_rows[counter].db_tag_name);

                                                                               });

                              $("#main2").on("change","#col2",function(events) { db_tag_name= $(this).find("input").val() ;
                                                                                 var counter=$(this).parent().attr("id");
                                                                                 db_rows[counter].db_tag_name=db_tag_name;
                                                                                 $(this).parents('div').eq(0).find("#col3").find("input").attr("name",db_rows[counter].db_name+'.'+db_rows[counter].db_tag_name);

                                                                               });


row_counter+=1;
});

$("#add-mem").click(function(){
                                var tag_name;

                                var counter="row"+row_counter.toString();
                                db_rows[counter]={ "tag_name":""} ;

                               $("#main2").append(
                                                       '<div id="'+counter+'"  class="form-group row db">'+



                                                       '<div id="colh2" class="col-sx-2 col-of-row">'+

                                                       ' <div class="input-group mb-3 ">'+
                                                       '<div class="input-group-prepend">'+
                                                       '<span class="input-group-text" id="basic-addon1">Tag</span>'+
                                                       '</div>'+
                                                       '<input type="text" class="form-control" placeholder="Tag Name" aria-label="Username" aria-describedby="basic-addon1">'+
                                                       '</div>'+

                                                       '</div>'+



                                                       '<div id="colh3" class="col-sx-2 col-of-row">'+

                                                      '<div class="input-group mb-3 ">'+
                                                      '<div class="input-group-prepend">'+
                                                      '<span class="input-group-text" id="basic-addon1">Value Now</span>'+
                                                      '</div>'+
                                                      '<input type="text" class="form-control" placeholder="Real time Value" aria-label="Username" aria-describedby="basic-addon1" readonly>'+
                                                      '</div>'+

                                                      '</div>'+

                                                      '<div id="colh4" class="col-sx-2 col-of-row">'+

                                                     '<div class="input-group mb-3 ">'+
                                                     '<div class="input-group-prepend">'+
                                                     '<span class="input-group-text" id="basic-addon1">Change Value</span>'+
                                                     '</div>'+
                                                     '<input type="text" class="form-control" placeholder="Enter new Value" aria-label="Username" aria-describedby="basic-addon1">'+
                                                     '</div>'+

                                                     '</div>'+




                                                      '<div id="colh5" class="col-sx-2 col-of-row">'+
                                                      '<button  type="button" class="btn btn-dark change-val">Write</button>'+
                                                      '<button  type="button" class="btn btn-dark rem-row">-</button>'+
                                                      '</div>'+

                                                      '</div>'
                               );




                               $("#main2").on("click",".change-val",function(events){
                                                                                      var counter=$(this).parents("div").eq(1).attr("id");

                                                                                      var new_val=$(this).parents("div").eq(1).find("#colh4").find("input").val();

                                                                                      $.ajax({url:"api.json",
                                                                                              type:"POST",
                                                                                              data_type:"text",
                                                                                              data:(db_rows[counter].tag_name+'='+new_val),
                                                                                              success:function(){}

                                                                                      });


                                                                                 });

                              $("#main2").on("click",".rem-row",function(events){  var counter=$(this).parents("div").eq(1).attr("id");

                                                                                  $(this).parents('div').eq(1).remove();

                                                                                  delete db_rows[counter];
                                                                                });


                              $("#main2").on("change","#colh2",function(events) { tag_name= $(this).find("input").val() ;
                                                                                  counter=$(this).parent().attr("id");
                                                                                 db_rows[counter].tag_name=tag_name;
                                                                                 $(this).parents('div').eq(0).find("#colh3").find("input").attr("name",db_rows[counter].tag_name);

                                                                               });


row_counter+=1;
});





 setInterval(refresh,1500);

 // $("#testbt").click(function(){ refresh();});

  });
