$(document).ready(function(){
    var catergories = ['Agriculture, Food and Natural Resources', 'Architecture and Construction', 'Arts, Audio/Video Technology and Communications', 'Business Management and Administration', 'Education and Training', 'Finance', 'Government and Public Administration', 'Health Science', 'Hospitality and Tourism', 'Human Services', 'Information Technology', 'Law, Public Safety, Corrections and Security', 'Manufacturing', 'Marketing, Sales and Service', 'Science, Technology, Engineering and Mathematics', 'Transportation, Distribution and Logistics'];

        var options = $("#catergories");
        for(var i = 0; i < catergories.length; i++){
          options.append($("<option/>").val(catergories[i]).text(catergories[i]));
        }

})
