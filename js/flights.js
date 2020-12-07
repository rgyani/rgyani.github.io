jQuery(document).ready(function(){
        $( "#idFrom" ).autocomplete({
          source: airports
        });
        $( "#idTo" ).autocomplete({
          source: airports
        });

        $( "#idDate" ).datepicker({dateFormat:"DD, d MM, yy"});

});