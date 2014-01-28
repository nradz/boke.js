function ajax(){

	//The object that does the 'magic' of ajax. It must
	//suport CORS.
	rq = new XMLHttpRequest();
	if ("withCredentials" in rq){}
	else if(typeof XDomainRequest != "undefined"){
		rq = new XDomainRequest();
	}
	else{
		throw (console.error("Your browser doesn't support CORS."));
	}


	//params initialized as default.
	this._url = null;
	this._method = "GET";
	this._async = true;
	this._data = null;



	//default values for each of the states of the request.
	_uninitialized = function(res){};
	_open = function(res){};
	_sent = function(res){};
	_receiving = function(res){};
	_loaded = function(res){};

	//default vaur to a 404 error
	this._error404 = function(res){};


	//This calls the function corresponding to each of 
	//the states of the application.
	rq.onreadystatechange = function(){
		if(rq.readyState == 4 && rq.status == 200){
			_loaded(rq.responseText);
		}
		else if(rq.readyState == 4 && rq.status == 400){
			this._error404();
		}

	}



///////////////////functions/////////////////////////
	
	//This sets the target url
	this.url = function(param){
		if(typeof(param) !== 'undefined'){
			this._url = param;
		}
		else{
			console.log('The parameter is undefined.');
		}
		return this;
	}

	//This sets if the request is asynchronous or not.
	this.async = function(param){
		if(typeof(param) !== 'undefined'){
			this._async = param;
		}
		else{
			console.log('The parameter is undefined.');
		}
		return this;
	}

	//This sets the request method
	this.method = function(param){
		if(typeof(param) !== 'undefined'){
			this._method = param;
		}
		else{
			console.log('The parameter is undefined.');
		}
		return this;
	}
	
	//This sets a function that will be called when 
	//the request is completed.
	this.complete = function(func){
		_loaded = func;

		return this;
	}

	//This sets a function that will be called when
	//the request is a 404 error.
	this.notFound = function(func){
		_error404 = func;

		return this;
	}


	//This function does the requests to the defined server
	this.request = function(params){

		//parameters of the request with default values
		var method = this._method;
		var url = this._url;
		var async = this._async;
		var data = this._data;
		
		/////////////////////////////////////////////////////
		//check the parameters
		
		if(typeof(params) !== 'undefined'){

			
			if(params.method != null){
				method = params.method;
			}

			if(params.url != null){
				url = params.url;
			}			

			if(params.async != null){
				async = params.async;
			}

			if(params.data != null){
				data = params.data;
			}
		}	
		
		//////////////////////////////////////////////////////
		
		rq.open(method, url, async);

		if(data != null){
			rq.send(data);
		}
		else{
			rq.send();
		}		

		return this;		

	}
	
}