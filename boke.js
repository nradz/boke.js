
function boke(){


	this.ajax = function(params){
		var bokeAux = this;
		var rq = new XMLHttpRequest();
		var url = undefined;
		var type = params.type || "GET";			
		var async = true;
		var data = params.data || undefined;
		var dataType = params.dataType || 'text';
		var success = params.success || function(aux){};


		if(params.url !== undefined){
			url = params.url;
		}
		else{
			log.error("Url is undefined.");
		}


		if(params.async !== undefined){
			async = params.async;
		}


		rq.onreadystatechange = function(){
			if(rq.readyState == 4){
				bokeAux.success_callback(rq.responseText,
				 dataType, success);
			}
		}

		rq.open(type, url, async);

		if(data !== undefined){
			rq.send(data);
		}
		else{
			rq.send();
		}

	};

	this.success_callback = function(data, dataType, success){
		var res = undefined;
		if(dataType === "text"){}
		else if(dataType === "json"){
			res = JSON.parse(data);
		}
		else{
			log.error("Not valid dataType: " + dataType);
		}

		success(res);			

	};

}