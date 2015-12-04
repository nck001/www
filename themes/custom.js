// JavaScript Document

// A $( document ).ready() block.
$( document ).ready(function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://alzlanka.org/test/wp-admin/admin-ajax.php?action=login");
    xhr.onload = function(){
        if(xhr.responseText == "FALSE")
        {
            //alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
			err='Wrong Username and Password';
			document.getElementById("error").innerHTML= err;
        }
        else if(xhr.responseText == "TRUE")
        {
            fetch_and_display_posts();
            $("#latest_link").click();
        }
    }   
    xhr.send();
});

function fetch_and_display_posts()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://alzlanka.org/test/wp-admin/admin-ajax.php?action=posts&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
    xhr.onload = function(){
		//alert(xhr.responseText);
        var posts_array = JSON.parse(xhr.responseText);
		//alert(posts_array);

		if(xhr.responseText == "FALSE")
        {
            alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
        } else {



        var html = '<ul data-role="listview" data-inset="true">';
		

        for(var count = 0; count < posts_array.length; count++)
        {
            var title = posts_array[count][0];
            var link = posts_array[count][1];
            var date = posts_array[count][2];
            //var image = posts_array[count][3];

            html = html + '<li data-role="list-divider">' + date +'<span class="ui-li-count">2</span><li><a href="#single"><h2>'+title+'</h2>'+
						  '<p>categories</p>'+
						  '<p class="ui-li-aside"><strong>6:24</strong>PM</p>'+
                		  '</a></li>'
							
        }
		html = html +'</li></ul>'
        document.getElementById("latest-content").innerHTML = html;
						var $list = $('#latest-content');
						if ($list.hasClass('ui-listview')) {//this listview has already been initialized so refresh it
							$list.listview('refresh');
						} else {//this list needs to be initialized
							$list.trigger('create');
						}
    }
	
	}
	
    xhr.send();
}

var username = '';
var password = '';

function login()
{
	
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
	var err = '';
    if(username == "")
    {
        //alert("Please enter username", null, "Username Missing", "OK");
		err = "Please enter username";
		document.getElementById("error").innerHTML= err;
        return;
    }

    if(password == "")
    {
        //alert("Please enter password", null, "Password Missing", "OK"); 
		err = 'Please enter password'; 
		document.getElementById("error").innerHTML= err;
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://alzlanka.org/test/wp-admin/admin-ajax.php?action=login&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
    xhr.onload = function(){
        if(xhr.responseText == "FALSE")
        {
            //alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
			err='Wrong Username and Password';
			document.getElementById("error").innerHTML= err;
        }
        else if(xhr.responseText == "TRUE")
        {
            fetch_and_display_posts();
            $("#latest_link").click();
        }
    }   
    xhr.send();
}

function open_browser(link)
{
    window.open(link, '_blank', 'location=yes');
}