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


    // COULD BE CLEANER IN JQUERY



// var v = $("[name='skills[]']")[4]
// v.value



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

  newInput.innerHTML = '<div class="input-group"><input type="text" class="form-control" name="skills[]" placeholder="Enter skill"/><span class="input-group-btn"> <button id="btnNewSkill"  type="button" class="btn btn-default" aria-label="Left Align" onclick="createInput()"> <span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></span></div>';

    var section  = document.getElementById("dvSkillsSection");

    section.appendChild(newInput);
}

function removeInput(pos) {

  $("#dvSkillsSection div")[pos].remove('div-' + pos);

}
