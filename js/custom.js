$(document).ready(function(){  
    //smooth scroll
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        var target = $(this.getAttribute('href'));
        if( target.length ) {        
            $('html, body').stop().animate({
                scrollTop: target.offset().top-50
            }, 800);
        }
    });
    //Nav active Class add/remove
    $('.nav-item').on('click', function(event) {
        $('.nav-item').removeClass('active');
        $(this).addClass('active');
    });
});


<script data-cfasync="false" type="text/javascript" src="form-submission-handler.js"></script>
<script>
(function() {
  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function(k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      
      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail
      = form.dataset.email || ""; // no email by default

    return {data: formData, honeypot: honeypot};
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }

    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          form.reset();
          var formElements = form.querySelector(".form-elements")
          if (formElements) {
            formElements.style.display = "none"; // hide form
          }
          var thankYouMessage = form.querySelector(".thankyou_message");
          if (thankYouMessage) {
            thankYouMessage.style.display = "block";
          }
        }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
  }
  
  function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();

</script>





function formValidation()
{
	
	var uname = document.EmailForm.name;
	var uemail = document.EmailForm.email;

	var uphone = document.EmailForm.phone;
	if(allLetter(uname))
	{
			
		if(phonenumber(uphone))
		{
							
							
			if(ValidateEmail(uemail))
			{
				alert('Your Data Successfully Submit.!');
				//.focus();
				return true;
			} 
							
		} 
	}

	return false;

} 


function allLetter(uname)
{ 
	var letters = /^[A-Za-z]+$/;
	if(uname.value.match(letters) || uname.value.length>3)
	{
		return true;
	}
	else
	{
		alert('Your Name must have alphabet characters only');
		uname.focus();
		return false;
	}
}


function ValidateEmail(uemail)
{
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //[a-z0-9]+@[a-z]+\.[a-z]{2,3}
	if(uemail.value.match(mailformat))
	{
		return true;
	}
	else
	{
		alert("You have entered an invalid email address!");
		uemail.focus();
		return false;
	}
}




function phonenumber(uphone)
{
  var phoneno = /^\(?([880]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(uphone.value.match(phoneno))
     {
	   return true;
	 }
   else
     {
	   alert("Not a valid Phone Number");
	   return false;
     }
}








