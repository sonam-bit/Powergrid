const MysqlPool = require('../../app');
const config = require('../../config/databaseConfig.js');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const { userData } = require('./userService');
const secretKey = 'Powergrid';

const resultdb = (statusCode, data = null) => {
	return {
		statusCode: statusCode,
		data: data,
	};
};


let adminLogin = async (userId, password) => {
   
    var passwordMatch = false;

    try{
        var connection = config.connection;
        const response = await new Promise ((resolve, reject)=>{
            const query = "select * from admin where adminid= ?;";
            connection.query(query, [userId], (err,results)=>{
                if (err) reject(new Error(err.message));
				resolve(results);
            });

        });
        if(response.length>0)
        {
            if(response[0].password==password)
            {
                let adminData = {
                    admin_id: response[0].adminid,
                    password : response[0].password,
                }

                let token = jwt.sign(adminData,secretKey,{
                        expiresIn: 1800, // expires in 30min
                });

                let returnData = {
                    admin_id: response[0].adminid,
                    password : response[0].password,
                    token: token,
                }

                return resultdb(200, returnData);
            }
            else {
                return resultdb(400, 'Invalid Password');
            }
        }else {
            return resultdb(400, 'Invalid adminId');
        }

    }
    catch (err) {
		console.log(err);
		return resultdb(500, err);
	}

};
let getallIssues = async()=>{
    try {
        var connection = config.connection;
        const response = await new Promise((resolve, reject)=>{
            const query = "select * from issues order by dateTime DESC;";
            connection.query(query, (err,results)=>{
                if (err) reject(new Error(err.message));
				resolve(results);
            });

        });
        if(response.length>0)
      {
        let returnData =[];
        for(let i=0; i<response.length;i++)
        {
            let item= response[i];
            let resData = {
                issue_id: item.issue_id,
                user_id: item.user_id,
                category: item.category,
                subcategory: item.subcategory,
                location: item.location,
                urgency: item.urgency,
                iphost: item.iphost,
                title: item.title,
                description: item.description,
                attachement: item.attachement,
                date: item.dateTime,
                status: item.status,
            }
            returnData.push(resData);
        }
		return resultdb(200, returnData);
    }
  }
  catch(err){
    return resultdb(500, err);
  }

}
let changeStatus = async(req)=>{
    console.log("here's req" ,req.body);
    try{
        var connection = config.connection;
        
        let issue_id = req.body[1];
        let statusTo = req.body[0];
        if(statusTo == 2)
        {
        const response = await new Promise((resolve, reject)=>{
            const query = "delete from issues WHERE issue_id= ?;";
            connection.query(query,[issue_id], (err,results)=>{
                if (err) reject(new Error(err.message));
				resolve(results);
            });

        });

        }
        else{
            console.log("status is being changed to 1");
            const response = await new Promise((resolve, reject)=>{
            const query = "update issues SET status = ? WHERE issue_id= ?;";
            connection.query(query,[statusTo,issue_id], (err,results)=>{
                if (err) reject(new Error(err.message));
				resolve(results);
            });

        });

        }
        
        return resultdb(200, 'Status updated sucessfully');

    }
    catch(err)
    {
        console.log(err);
        return resultdb(500,err);
    }
}

let filterThemAll= async(req) =>{
    // console.log("hey there filter buttion");
     var title = req.body.title;
     if(title == '')
      title = 'undefined';
     var status = req.body.status;
     console.log(status);
     if(status == 3)
      status = 'undefined';
     var category = req.body.category;
     if(category=='all')
      category = 'undefined';
     var date = req.body.date;
     var orderBy = 'ASC';
    var parameter = [title, status, category];
    var factors = ['title', 'status', 'category'];
    var sqlQuery = '';
    var queryArray = [];
    var count =0;
     if(date=='latest')
      orderBy='DESC';
    for(let i=0; i<3;i++)
    {
        if(parameter[i]!='undefined')
        {
            sqlQuery += factors[i] + " = ? and ";
            queryArray[count] = parameter[i];
            count +=1;
        }
    }
    sqlQuery = sqlQuery.slice(0, sqlQuery.length - 4);
    console.log(sqlQuery);
    console.log(queryArray);
    if(sqlQuery.length==0)
    {
        try{
            var connection = config.connection;
            const response = await new Promise((resolve, reject)=>{
                const query = "select * from issues order by dateTime "+ orderBy +";";
                console.log(query);
                connection.query(query, queryArray, (err,results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            if(response.length>0)
            {
                let returnData =[];
                for(let i=0; i<response.length;i++)
                {
                    let item= response[i];
                    let resData = {
                        user_id: item.user_id,
                        category: item.category,
                        subcategory: item.subcategory,
                        location: item.location,
                        urgency: item.urgency,
                        iphost: item.iphost,
                        title: item.title,
                        description: item.description,
                        attachement: item.attachement,
                        date: item.dateTime,
                        status: item.status,
                    }
                    returnData.push(resData);
                }
                return resultdb(200, returnData);
            }
            else
            {
                return resultdb(200, []);
            }
          }
          catch(err){
            return resultdb(500, err);
          }

    }
    else
    {
        try{
            var connection = config.connection;
            const response = await new Promise((resolve, reject)=>{
                const query = "select * from issues WHERE "+ sqlQuery + "order by dateTime "+ orderBy +";";
                console.log(query);
                connection.query(query, queryArray, (err,results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            if(response.length>0)
            {
                let returnData =[];
                for(let i=0; i<response.length;i++)
                {
                    let item= response[i];
                    let resData = {
                        user_id: item.user_id,
                        category: item.category,
                        subcategory: item.subcategory,
                        location: item.location,
                        urgency: item.urgency,
                        iphost: item.iphost,
                        title: item.title,
                        description: item.description,
                        attachement: item.attachement,
                        date: item.dateTime,
                        status: item.status,
                    }
                    returnData.push(resData);
                }
                return resultdb(200, returnData);
            }
            else
            {
                return resultdb(200, []);
            }
          }
          catch(err){
            return resultdb(500, err);
          }

    }
}

let setremark = async(req) =>{
    try{
        var connection = config.connection;
        let remark = req.body.remark;
        let issue_id = req.body.issue_id;
        const response = await new Promise((resolve, reject)=>{
            const query = "update issues SET remark = ? WHERE issue_id= ?;";
            connection.query(query,[remark, issue_id], (err,results)=>{
                if (err) reject(new Error(err.message));
				resolve(results);
            });

        });

        return resultdb(200, 'remark updated sucessfully');

    }
    catch(err)
    {
        console.log(err);
        return resultdb(500,err);
    }

}
module.exports = {
    adminLogin,
    getallIssues,
    changeStatus,
    filterThemAll,
    setremark,
}



