$(document).ready(function() {

	$("#edit-search-theme-form-1").addClass("idleField");
	$("#edit-search-theme-form-1").focus(function() {
	    $(this).removeClass("idleField").addClass("focusField");  
	    if (this.value == this.defaultValue){  
		this.value = '';  
	    }  
	    if(this.value != this.defaultValue){  
		this.select();  
	    }  
        });  
	$("#edit-search-theme-form-1").blur(function() {
	    $(this).removeClass("focusField").addClass("idleField");  
	    if ($.trim(this.value) == ''){  
		this.value = this.defaultValue; 
	    }  
	});  

});
