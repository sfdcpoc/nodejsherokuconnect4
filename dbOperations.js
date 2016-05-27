module.exports = {
  getRecords: function(req, res) {    
        var pg = require('pg');  
		pg.defaults.ssl = true;
        //You can run command "heroku config" to see what is Database URL from Heroku belt      
        var conString = "postgres://ldlctcszunhhga:Dfp279cmYBqJhlRU5_n70jmBhc@ec2-107-20-198-81.compute-1.amazonaws.com:5432/dfc15ih8savtnf";
        


		var client = new pg.Client(conString);
        client.connect();

        var query = client.query("select * from salesforce.Employee__c");
        query.on("row", function (row, result) { 
            result.addRow(row); 
        });

        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
  },
    

   addRecord : function(req, res){
        var pg = require('pg');
		pg.defaults.ssl = true;
        
        var conString = "postgres://ldlctcszunhhga:Dfp279cmYBqJhlRU5_n70jmBhc@ec2-107-20-198-81.compute-1.amazonaws.com:5432/dfc15ih8savtnf";
        var client = new pg.Client(conString);

        client.connect();
		var fullName = req.query.fName + " " + req.query.lName;
		
		var d = new Date();//"dddd, mmmm dS, yyyy, h:MM:ss TT");
		var formattedString = d.getFullYear() + "-"	+ d.getMonth() + "-" + d.getDay() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
		
        var query = client.query("insert into salesforce.Employee__c (name, firstName__c, lastName__c, e_mail__c, createddate) "+ 
                                "values ('" + fullName + "','"+req.query.fName+"','"+req.query.lName+"','"+ req.query.email + "','" + formattedString + "')");
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });

    },
    
     delRecord : function(req, res){
        var pg = require('pg');
		pg.defaults.ssl = true;
        
        var conString = "postgres://ldlctcszunhhga:Dfp279cmYBqJhlRU5_n70jmBhc@ec2-107-20-198-81.compute-1.amazonaws.com:5432/dfc15ih8savtnf";
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "Delete from salesforce.Employee__c Where id ="+req.query.id);
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });

    },
    
    createTable : function(req, res){
        var pg = require('pg'); 
		pg.defaults.ssl = true;
        
        var conString = "postgres://ldlctcszunhhga:Dfp279cmYBqJhlRU5_n70jmBhc@ec2-107-20-198-81.compute-1.amazonaws.com:5432/dfc15ih8savtnf";
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "CREATE TABLE employee"+
                                    "("+
                                      "firstname character varying(50),"+
                                      "lastname character varying(20),"+
                                      "email character varying(30),"+
                                      "mobile character varying(12),"+
                                      "id serial NOT NULL"+
                                    ")");
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Table Schema Created');
            res.end();  
        });

    },
    
    dropTable : function(req, res){
        var pg = require('pg'); 
		pg.defaults.ssl = true;
        
        var conString = "postgres://ldlctcszunhhga:Dfp279cmYBqJhlRU5_n70jmBhc@ec2-107-20-198-81.compute-1.amazonaws.com:5432/dfc15ih8savtnf";
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "Drop TABLE employee");
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Table Schema Deleted');
            res.end();  
        });

    }

    
};