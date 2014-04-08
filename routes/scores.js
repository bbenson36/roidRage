//------------------------------------------------------------------
//
// This is some dummy score data
//
//------------------------------------------------------------------
var scores = [
	{
		id : 0,
		name : 'Brian',
		score : 10000,
		date : '03-April-2014',
		time : '18:40'
	},
	{
		id : 1,
		name : 'Steve',
		score : 20000,
		date : '04-April-2014',
		time : '14:20'
	}],
	nextId = 2;

//------------------------------------------------------------------
//
// Report all scores back to the requester.
//
//------------------------------------------------------------------
exports.all = function(request, response) {
	console.log('find all scores called');
	response.writeHead(200, {'content-type': 'application/json'});
	response.end(JSON.stringify(scores));
};

//------------------------------------------------------------------
//
// Add a new score to the server data.
//
//------------------------------------------------------------------
exports.add = function(request, response) {
	console.log('add new score called');
	console.log(request.query.name);
	console.log(request.query.score);
	
	var now = new Date();
	scores.push( {
		id : nextId,
		name : request.query.name,
		score : request.query.score,
		date : now.toLocaleDateString(),
		time : now.toLocaleTimeString()
	});
	nextId++;
	
	clean(scores);
	scores.sort(function(a,b){
		return  b.score - a.score;
	});
	
	if(scores.length > 10){
		scores.length = 10;
	}
	
	response.writeHead(200);
	response.end();
};

function clean (scores){
	var i = 0;
	for (i = 0; i < scores.length; i+=1){
		if(scores[i].name === ''){
			scores[i].name = 'anon';
		}
	}
	
}