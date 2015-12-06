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
            fetch_and_display_posts("OLD");
            $("#latest_link").click();
        }
    }   
    xhr.send();
});

var page=0;
//var status = "NEXT";
function fetch_and_display_posts(status)
{
	//var chkEmpty ="EMPTY";
	//var dateCnt =15;
	if (status=="OLD"){
	page = page+1;
	}else
	
	if (status=="NEW"&&page>1){
	page = page-1;
	}else
	
	if (status=="LATEST"&&page>1){
	page = 1;	
	}
	
	
	
	var xhr = new XMLHttpRequest();
	
	//while(chkEmpty == "EMPTY"){
	
    
    xhr.open("GET", "http://alzlanka.org/test/wp-admin/admin-ajax.php?action=posts&page=" + encodeURIComponent(page));
    xhr.onload = function(){
		//alert(xhr.responseText);
        
		//alert(posts_array);

		if(xhr.responseText == "FALSE")
        {
            $("#logout_link").click();
			//chkEmpty ="FALSE";
        }
		else {


		var posts_array = JSON.parse(xhr.responseText);
        var html = '<ul data-role="listview" data-inset="true">';
		
		var prevDate = '';
        for(var count = 1; count < posts_array.length; count++)
        {
            var title = posts_array[count][0];
            var link = posts_array[count][1];
            var date = posts_array[count][2];
            //var image = posts_array[count][3];
			
			if(date!=prevDate){
				 html = html + '<li data-role="list-divider">' + date +'<!--<span class="ui-li-count">'+posts_array[0]+'</span>-->';
				}

            html = html + '<li><a href="#single" onClick="post_content(\''+link+'\');"><p><b>'+title+'</b></p>'+
						 // '<p>categories</p>'+
						  
                		  '</a></li>'
			prevDate = date;			  
							
        }
		//chkEmpty ="TRUE";
		html = html +'</li></ul>'
        document.getElementById("latest-content").innerHTML = html;
						var $list = $('#latest-content');
						if ($list.hasClass('ui-listview')) {//this listview has already been initialized so refresh it
							$list.listview('refresh');
						} else {//this list needs to be initialized
							$list.trigger('create');
						}
						
						
    }//else
	
	}//onload
	
    xhr.send();
	
	
	//}//while
}


function post_content(urllink)
{
	
	var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://alzlanka.org/test/wp-admin/admin-ajax.php?action=single&link=" + encodeURIComponent(urllink));
    xhr.onload = function(){
		//alert(xhr.responseText);
        
		//alert(posts_array);

		if(xhr.responseText == "FALSE")
        {
            $("#logout_link").click();
			//chkEmpty ="FALSE";
        }
		else {


		var post_array = JSON.parse(xhr.responseText);
		var title = post_array[0];
		var content = post_array[1];
        var html = '<h3>'+title+'</h3><br>'+content;
		document.getElementById("single-content").innerHTML = html;
	
						
    }//else
	
	}//onload
	
    xhr.send();
	
	
}



function login()
{
	
   var username = document.getElementById("username").value;
   var password = document.getElementById("password").value;
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
            fetch_and_display_posts("OLD");
            $("#latest_link").click();
        }
    }   
    xhr.send();
}

function logout()
{
	

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://alzlanka.org/test/wp-admin/admin-ajax.php?action=logout");
    xhr.onload = function(){
		//alert(xhr.responseText);
        if(xhr.responseText == "TRUE")
        {
           
            $("#logout_link").click();
        }
    }   
    xhr.send();
}

function open_browser(link)
{
    window.open(link, '_blank', 'location=yes');
}