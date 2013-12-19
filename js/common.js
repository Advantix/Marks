var itemImgURL = "http://advantixcrm.com/prj/mitech/images/item/";
var defaultImgURL = "logo_miapps.png";
var serviceAppURL = "http://advantixcrm.com/prj/mitech/index.php/api/appconfig/Mg";
var resData = JSON.parse(window.localStorage.getItem('RestInfoDet'));//alert(resData.id);
if(resData!=null) {	
	restId = resData.id;
	menuId = resData.menu;
	//alert(menuId);
	var serviceMenuURL = "http://advantixcrm.com/prj/mitech/index.php/api/catlist/Mg/"+restId+"/"+menuId;
}
var store_id= 'Mg';
var serviceURL = "http://advantixcrm.com/prj/mitech/index.php/api/";

var dataAppConfig = JSON.parse(window.localStorage.getItem('configData'));

if(dataAppConfig==null) {
	//alert('null');
	$.getJSON(serviceAppURL, function(data) {
		window.localStorage.setItem('configData',JSON.stringify(data)); // store local storage		
		history.go(0);
	});
}

if(dataAppConfig!=null) {		
	$("#bodyId").css("background-image", "url("+dataAppConfig.AppConfig.bg_image+")");
	$("#bodyId").css("background-repeat", "repeat-x");
	$("#bodyId").css("background-position", "top");
	$("#bodyId").css("background-color", "#000");
	file_name=get_path_filename();
	htmlData='<div style="float:left; text-align:center; padding-bottom: 8px; width:100%;"><div  class="clearfix head-top"><div class="head-img"><img src="'+dataAppConfig.AppConfig.store_logo+'" alt=""></div> <h1 class="head-span">'+dataAppConfig.AppConfig.store_name+'</h1></div></div><div class="ui-ltop-icon">';
	if(file_name=='index.html') { 
		htmlData+='<a href="register.html" rel="external"><img src="img/singin-btn.png" alt=""></a>';
	} else {
		htmlData+='<a href="#" onclick="goPrevious();" rel="external"><img src="img/back_btn.png" alt=""></a>';
	}
	htmlData+='</div><div  class="ui-top-icon-right"> <a href="#"  onclick="refresh();" rel="external"><img src="img/refresh-btn.png" alt=""></a></div>';
	$('#headerContId').html(htmlData);
} 

var userData = JSON.parse(window.localStorage.getItem('userData'));

var welcomeDiv = window.localStorage.getItem('welcomeDiv');

if(userData!=null) {
	var carDataGetcnt = JSON.parse(window.localStorage.getItem('carDatas'));
	var carDataGetDealCnt = JSON.parse(window.localStorage.getItem('dealItemsId'));
	
	
	if(carDataGetDealCnt!=null) {
		cartCount = 1;
	} else if(carDataGetcnt!=null) {
		var cartItemCntView=carDataGetcnt.items.length;
		cartCount = cartItemCntView;
	} else {
		cartCount = 0;
	}
		
	window.localStorage.setItem('welcomeDiv','<ul class="clearfix"><li>'+userData.user_data.fname+'</li><li>|</li><li><span ><a href="#" id="logoutBtnId" rel="external" style=" color:#fff;">logout</a></span></li><li>|</li><li><span><a href="checkout.html" id="cartBtnId" rel="external" style=" color:#fff;">Cart <span style="color:#ff0000">['+cartCount+']</span></a></span></li></ul><div  class="ui-menu-right"> <a href="myaccount.html" rel="external"><img src="img/icon_menu.png" alt=""></a></div>'); // store local storage
	var welcomeDiv = window.localStorage.getItem('welcomeDiv');
	
	$('#userName').html(welcomeDiv);
} else {
	var carDataGetcnt = JSON.parse(window.localStorage.getItem('carDatas'));
	var carDataGetDealCnt = JSON.parse(window.localStorage.getItem('dealItemsId'));
	
	
	if(carDataGetDealCnt!=null) {
		cartCount = 1;
	} else if(carDataGetcnt!=null) {
		var cartItemCntView=carDataGetcnt.items.length;
		cartCount = cartItemCntView;
	} else {
		cartCount = 0;
	}
	
	window.localStorage.setItem('welcomeDiv','<ul class="clearfix"><li>Guest <span style="color:#fff">User</span></li><li>|</li><li><span><a href="checkout.html" id="cartBtnId" rel="external" style=" color:#fff;">Cart <span style="color:#ff0000">['+cartCount+']</span></a></span></li><li>|</li><li><span ><a href="#" id="logoutBtnId" rel="external" style="color:#fff">Login</a></span></li></ul><div  class="ui-menu-right"><a href="myaccount.html" rel="external"><img src="img/icon_menu.png" alt=""></a></div>'); // store local storage
	var welcomeDiv = window.localStorage.getItem('welcomeDiv');
	$('#userName').html(welcomeDiv);
	
}

$("#logoutBtnId").click(function() {
	window.localStorage.removeItem('userData');
	$("#loginFrmId").show();
	$("#registerFrmId").hide();	
	$("#addrFrmId").hide();
	$("#userName").hide();
	window.localStorage.setItem('form_active','#loginFrmId'); // store local storage
	//window.localStorage.setItem('form_inactive','#registerFrmId'); // store local storage
	window.location.href='register.html';
});


function checkConnection() {
	var networkState = navigator.network.connection.type;

	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';

	if(states[networkState] == 'Unknown connection' || states[networkState] == 'No network connection') {
		alert('Connection type: ' + states[networkState]);
		return false;
	} else {
		alert('Connection type: ' + states[networkState]);
		return true;
	}
}

catId=getUrlVars()["catId"];
itemId=getUrlVars()["itemId"];
itemType=getUrlVars()["type"];
orderId=getUrlVars()["orderId"];
delitemId=getUrlVars()["delitemId"];
dealId=getUrlVars()["dealId"];
chkitemid=getUrlVars()["chkitemid"];



function goPrevious() { // used in showMenu.html

	history.go(-1);
	
}

function refresh() { // used in showMenu.html
	$.getJSON(serviceAppURL, function(data) {		
		window.localStorage.setItem('configData',JSON.stringify(data)); // store local storage	
		var restDet = JSON.parse(window.localStorage.getItem('configData'));
		RestIndex = window.localStorage.getItem('RestInfoDetIndex');
		//alert(RestIndex);
		if(RestIndex!=null) {
			window.localStorage.setItem('RestInfoDet',JSON.stringify(restDet.RestInfo[RestIndex])); 
			// store local storage
		}
		history.go(0);
	});
	
	
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function get_path_filename() {
	var path=window.location.pathname;
	var Filename= path.split('/').pop();
	return Filename;
}
function capitalize (text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}