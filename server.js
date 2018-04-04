var http = require('http'); 
var fs = require('fs'); 
var path = require('path'); 
var url = require('url'); 
var qs = require('querystring');
var form_html = fs.readFileSync("./form.html", "utf8");
var server = http.createServer(); 

server.on('request', function(req,res){ 
	var path = url.parse(req.url).pathname;
	console.log("--->", path, req.method)

	// Default page when client sends the GET request
	if(req.method === 'GET' && path === '/'){
		res.writeHead(200, {"Content-Type": "text/html"}); 
		res.write(form_html); 
		res.end();

	}
	// User page -- list all users
	else if(req.method === 'GET' && path === '/users.html'){
        if (!fs.existsSync('./data/users.json')) {
        	res.writeHead(200, {"Content-Type": "text/html"});  
			res.write("<!DOCTYPE html><html><head><title>JSON server</title><meta charset='utf-8'></head><body ><div class='tab'><form method='get' action='/'><button type='submit'>Homepage</button></form><form method='get' action='/users.html'><button type='submit'>Users</button></form></div><h1>No user file</h1></body><style>body{background-color: #FAEBD7;}h1{text-align: center;}h4{text-align: center;}form{text-align: center;}	.tab {overflow: hidden;background-color: #f1f1f1;}	.tab button {margin-left: 10%;background-color: inherit;float: left;border: none;outline: none;cursor: pointer;padding: 14px 16px;transition: 0.3s;font-size: 17px;}	.tab button:hover {background-color: #FFDAB9;color: #FF6347;}	.tab button.active {background-color: #ccc;}"); 
	        res.end();
		    console.log("NO user file")
		}
		else{
			var table_body = '', result;
			fs.readFile('./data/users.json', 'utf8', function(err, data){
				if(err) console.log(err);
				console.log("aaaa"+data+"bbbb")
				if(data != "") {
					result = JSON.parse(data);
					console.log("aaaa"+result+"bbbb")
				}
			});

			setTimeout(function(){
				if(result){
					console.log("USER DATA---->\n", result)
					for(var user in result){
						if(typeof(result[user].fname) == "object" && result[user].fname.length > 1){
							for(var i  = 0; i < result[user].fname.length; i++){
								table_body = table_body + "<tr><td>"+result[user].fname[i]+"</td><td>"+result[user].lname[i]+"</td><td>"+result[user].birthday[i]+"</td><td>"+result[user].email[i]+"</td><td>"+result[user].phone[i]+"</tr>";
							}
						}
						else if(typeof(result[user].fname) == "string"){
							table_body = table_body + "<tr><td>"+result[user].fname+"</td><td>"+result[user].lname+"</td><td>"+result[user].birthday+"</td><td>"+result[user].email+"</td><td>"+result[user].phone+"</tr>";

						}
					}
					res.writeHead(200, {"Content-Type": "text/html"});  
					res.write("<!DOCTYPE html><html><head><title>JSON server</title><meta charset='utf-8'></head><body ><div class='tab'><form method='get' action='/''><button type='submit'>Homepage</button></form><form method='get' action=/users.html><button type='submit'>Users</button></form></div><h1>Users</h1><div><table id='table'><tr><th> First Name</th><th> Last Name</th><th> Birthday</th><th> Email</th><th> Phone Number</th></tr><tbody id='userTable'>"+table_body+"</tbody></table></div><br><form  method='post' action='/users.html/delete_all'><button type='submit' id='DeleteAll'>Delete All</button></form></body><style>body{background-color: #FAEBD7;}h1{text-align: center;}h4{text-align: center;}form{text-align: center;}.tab {overflow: hidden;background-color: #f1f1f1;}.tab button {margin-left: 10%;background-color: inherit;float: left;border: none;outline: none;cursor: pointer;padding: 14px 16px;transition: 0.3s;font-size: 17px;}.tab button:hover {background-color: #FFDAB9;color: #FF6347;}.tab button.active {background-color: #ccc;}button{border: 2px solid #FFE4E1;padding: 10px;border-radius: 50px 25px;}button:hover {background-color: #FFDAB9; color: #FF6347;}table, td, th {    border: 1px solid #ddd;text-align: left;}table {margin-left: 10%; border-collapse: collapse;width: 80%;}th, td {padding: 15px;}#DeleteAll{clear: left;}</style>")
					res.end(); 
				}
				else{
					res.writeHead(200, {"Content-Type": "text/html"});  
					res.write("<!DOCTYPE html><html><head><title>JSON server</title><meta charset='utf-8'></head><body ><div class='tab'><form method='get' action='/'><button type='submit'>Homepage</button></form><form method='get' action='/users.html'><button type='submit'>Users</button></form></div><h1>No user file</h1></body><style>body{background-color: #FAEBD7;}h1{text-align: center;}h4{text-align: center;}form{text-align: center;}	.tab {overflow: hidden;background-color: #f1f1f1;}	.tab button {margin-left: 10%;background-color: inherit;float: left;border: none;outline: none;cursor: pointer;padding: 14px 16px;transition: 0.3s;font-size: 17px;}	.tab button:hover {background-color: #FFDAB9;color: #FF6347;}	.tab button.active {background-color: #ccc;}"); 
			        res.end();
				}
			}, 500);
		}
	}
	// Add user to user.json file 
	else if (req.method === 'POST' && path === '/'){ 
		var ele ='', old_data; // get the info of the current
		var arr_users = []; // store the user objects in array

		// read the existing JSON user file
		if (!fs.existsSync('./data/users.json')) {
		    var createStream = fs.createWriteStream("./data/users.json");
		}
		else{
			req.on('data', function(data){ 
				ele += data.toString(); 
			}); 

			req.on('end', function(){ 
				var a = fs.readFile('./data/users.json',function(err, data){
					if(err) console.log(err);
					if(data != "")  {
						var old_data = JSON.parse(data);
					}
					for(var user in old_data){
						arr_users.push(old_data[user]);
					}

					var postObj = qs.parse(ele);
					arr_users.push(postObj);
					console.log("!!!!!arr_users===>", arr_users)
					fs.writeFile('./data/users.json', JSON.stringify(arr_users) , 'utf-8', function(err){
						if(err) console.log(err);
					}); 

					var alert = "<script>window.alert('Submit Successfully!!')</script>"
					res.write(form_html+alert); 
					res.end(); 
				});
			});
		}
	} 
	// Sent back user.json file
	else if(req.method === 'GET' && path === '/data/users.json'){
		res.writeHead(200, { "Content-Type": "application/json" });
		if (!fs.existsSync('./data/users.json')) {
			res.write("[]"); 
			res.end(); 
		}
		else{
			fs.readFile('./data/users.json', 'utf8', function(err, result){
				if(err) console.log(err);

				var users_json = result;
				res.write(users_json); 
				res.end(); 
			});		
		}
	}
	// Delete all users
	else if (req.method === 'POST' && path === '/users.html/delete_all'){ 

		if (!fs.existsSync('./data/users.json')) {
		    res.writeHead(200, {"Content-Type": "text/html"}); 
			res.write("<!DOCTYPE html><html><head><title>JSON server</title><meta charset='utf-8'></head><body ><div class='tab'><form method='get' action='/'><button type='submit'>Homepage</button></form><form method='get' action='/users.html'><button type='submit'>Users</button></form></div><h1>No user file</h1></body><style>body{background-color: #FAEBD7;}h1{text-align: center;}h4{text-align: center;}form{text-align: center;}	.tab {overflow: hidden;background-color: #f1f1f1;}	.tab button {margin-left: 10%;background-color: inherit;float: left;border: none;outline: none;cursor: pointer;padding: 14px 16px;transition: 0.3s;font-size: 17px;}	.tab button:hover {background-color: #FFDAB9;color: #FF6347;}	.tab button.active {background-color: #ccc;}"); 
			console.log("NO user file")
			res.end();
		}
		else{
			fs.unlinkSync('./data/users.json');
			res.writeHead(200, {"Content-Type": "text/html"}); 
			res.write("<!DOCTYPE html><html><head><title>JSON server</title><meta charset='utf-8'></head><body ><div class='tab'><form method='get' action='/'><button type='submit'>Homepage</button></form><form method='get' action='/users.html'><button type='submit'>Users</button></form></div><h1>Delete Successfully!</h1></body><style>body{background-color: #FAEBD7;}h1{text-align: center;}h4{text-align: center;}form{text-align: center;}	.tab {overflow: hidden;background-color: #f1f1f1;}	.tab button {margin-left: 10%;background-color: inherit;float: left;border: none;outline: none;cursor: pointer;padding: 14px 16px;transition: 0.3s;font-size: 17px;}	.tab button:hover {background-color: #FFDAB9;color: #FF6347;}	.tab button.active {background-color: #ccc;}"); 
			res.end();
		}
	}
	else { 
		res.writeHead(404); 
		res.write('404 Not Found !!'); 
		res.end() 
	} 
}); 

server.listen(20464); 
console.log('Magic is happening on port 20464 =_=');



