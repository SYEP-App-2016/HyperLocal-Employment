$(document).ready(function(){
    $('.expBtn').click(function(){
        $('.expForm').show();
        $(this).hide();
    });

    $('.expForm').hide();

    $('.eduBtn').click(function(){
        $('.eduForm').show();
        $(this).hide();
    });

    $('.eduForm').hide();

    $('.volBtn').click(function(){
        $('.volForm').show();
        $(this).hide();
    });

    $('.volForm').hide();

    var catergories = ['Agriculture, Food and Natural Resources', 'Architecture and Construction', 'Arts, Audio/Video Technology and Communications', 'Business Management and Administration', 'Education and Training', 'Finance', 'Government and Public Administration', 'Health Science', 'Hospitality and Tourism', 'Human Services', 'Information Technology', 'Law, Public Safety, Corrections and Security', 'Manufacturing', 'Marketing, Sales and Service', 'Science, Technology, Engineering and Mathematics', 'Transportation, Distribution and Logistics'];

    var options = $("#catergories");
    for(var i = 0; i < catergories.length; i++){
      options.append($("<option/>").val(catergories[i]).text(catergories[i]));
    }

    var options = $("#catergories2");
    for(var i = 0; i < catergories.length; i++){
      options.append($("<option/>").val(catergories[i]).text(catergories[i]));
    }

    var options = $("#catergories3");
    for(var i = 0; i < catergories.length; i++){
      options.append($("<option/>").val(catergories[i]).text(catergories[i]));
    }

    $('.edu_edit').click(function(){
        var indx = $(this).attr('value');
    var a = $(this).parents()[3];

    // $(b).append('<div class="panel panel-default">Here I am!!!</div>');
    // a[3].append('Here I am!');
    });

    var p = 1;

    $("#btnNext").click(function(){

      $(".step-" + p).hide();
      $(".step-" + (++p)).show();

      if(p > 3) {
        $(this).hide();
        checkPage();
        return;
      }
    });

    $("#btnBack").click(function(){

      if(p < 3 || p === 1) {
        $(this).hide();
      }

      $(".step-" + p).hide();
      $(".step-" + (--p)).show();

      if(p > 3) {
        $(this).show();
        $("#btnNext").show();
        checkPage();
        return;
      }

    });

    function checkPage() {
      if(p > 3) {
        $("#btnNextPage").show();
      } else {
        $("#btnNextPage").hide();
      }
    }

});

var inputs = 0;

function createInput(){

  var i = $("#dvSkillsSection div:last-child");

  $("button span:last-child").attr("class", "glyphicon glyphicon-minus");


  $("button:last-child").attr("onclick", "removeInput(" + inputs + ")");

  var newInput =  document.createElement("div");

  var c = document.createAttribute("class");
      c.value = "form-group div-" + (++inputs);
  var d = document.createAttribute("data-input");
      d.value = inputs;

  newInput.setAttributeNode(c);
  newInput.setAttributeNode(d);

  newInput.innerHTML = '<div class="input-group"><input type="text" class="form-control" name="req_skills[]" placeholder="Enter skill"/><span class="input-group-btn"> <button id="btnNewSkill"  type="button" class="btn btn-default" aria-label="Left Align" onclick="createInput()"> <span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></span></div>';

    var section  = document.getElementById("dvSkillsSection");

    section.appendChild(newInput);
}

function removeInput(pos) {

  $("#dvSkillsSection div")[pos].remove('div-' + pos);

}
