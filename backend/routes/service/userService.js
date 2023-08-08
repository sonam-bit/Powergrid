const MysqlPool = require('../../app');
const config = require('../../config/databaseConfig.js');
const mysql = require('mysql2');
const SALT_WORK_FACTOR = 10;
const { response } = require('express');
const { rejects } = require('assert');
const { error } = require('console');
const { constants } = require('fs');
const { deserialize } = require('v8');
const jwt = require('jsonwebtoken');
const secretKey = 'Powergrid';




const resultdb = (statusCode, data = null) => {
	return {
		statusCode: statusCode,
		data: data,
	};
};

let loginUser = async (userId, password) => {
   
    var passwordMatch = false;

    try{
        var connection = config.connection;
        const response = await new Promise ((resolve, reject)=>{
            const query = "select * from user where userid= ?;";
            connection.query(query, [userId], (err,results)=>{
                if (err) reject(new Error(err.message));
				resolve(results);
            });

        });
        if(response.length>0)
        {
            if(response[0].password==password)
            {
                let userData = {
                    user_id: response[0].userid,
                    password: response[0].password,
                };
                let token = jwt.sign(userData, secretKey, {
                    expiresIn: 1800, // expires in 30min
                });
                let returnData = {
                    user_id: response[0].userid,
                    password: response[0].password,
                    token: token,
                };
                return resultdb(200, returnData);
            }
            else {
                return resultdb(400, 'Invalid Password');
            }
        }else {
            return resultdb(400, 'Invalid userId');
        }

    }
    catch (err) {
		console.log(err);
		return resultdb(500, err);
	}

};
let userData = async (userid) =>{
    try{
        console.log("userData");
        console.log(userid);
        var connection = config.connection;
        const resultQuery = await new Promise((resolve, reject)=>{
            const query = 'select * from user where userid = ?;';
            connection.query(query, [userid], (err, results)=>{
                if (err) reject(new Error(err.message));
				resolve(results);
            });
        });
        if (resultQuery.length > 0) {
			return resultdb(200, resultQuery);
		} else {
			return resultdb(404, 'User not found');
		}

    }catch(err){
        console.log(err);
		return resultdb(500, err);
    }
}
let uploadPdf =async(req) =>
{
    try{
    console.log(uploadPdf);
    const date1 = new Date();
    const status=0;
    console.log("date "+ date1);
    // console.log(req.attachement);
    var connection = config.connection;
    const resultQuery= await new Promise((resolve, reject)=>{
        const query = 'INSERT INTO issues(user_id,category,subcategory,location,urgency,iphost,title,description,attachement,dateTime)VALUES(?,?,?,?,?,?,?,?,?,?);';
        console.log(query);
        connection.query(query,
            [req.user_id,
            req.category, 
            req.subcategory,
            req.location, 
            req.urgency,
            req.iphost,
            req.title,
            req.description,
            req.attachement,
            date1,
            status,
        ],
        (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
        }
        );
    });
       return resultdb(200, 'Issue sent');
    }
    catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}
let getHistory = async (data) =>{
//   console.log(data);
  try{
    var connection = config.connection;
    const response = await new Promise((resolve, reject)=>{
        const query = "select * from issues WHERE user_id= ? order by dateTime DESC";
        connection.query(query, [data], (err,results)=>{
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
                issue_id: item.issue_id,
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
                remark: item.remark,
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

let getImg = async (req) => {
	try {
        console.log("get image service ");
		const path = req.body.attachement.data;
        console.log("here it is",path);
		return await path;
	} catch (err) {
		return resultdb(404, err);
	}
}

let filterThem = async(req) =>{
    console.log("hey there filter buttion");
     var title = req.body.title;
     if(title == '')
      title = 'undefined';
     var status = req.body.status;
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
                        remark: item.remark,
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
                        remark: item.remark,
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

let getIssueStatus = async(req) =>{
    try{
        let user_id = req.body.user_id;
        console.log(user_id);
        var connection = config.connection;
        const response = await new Promise((resolve, reject)=>{
            const query = "select count(issue_id) as total from issues WHERE user_id= ? ";
            connection.query(query, [user_id], (err,results)=>{
                if(err) reject(new Error(err.message));
                resolve(results);
            });
        });
        var connection = config.connection;
        const response1 = await new Promise((resolve, reject)=>{
            const query = "select count(issue_id) as approved from issues WHERE user_id= ? AND status = 1";
            connection.query(query, [user_id], (err,results)=>{
                if(err) reject(new Error(err.message));
                resolve(results);
            });
        });
        // console.log("hello");
        // console.log("Approved Issues ", response1[0].approved);
        // console.log("Total Issues ", response[0].total);
        let returnData =[];
        let resData = {
            totalIssues : response[0].total,
            approvedIssues : response1[0].approved,
        }
        console.log(resData);
        returnData.push(resData);
        return resultdb(200, returnData);
        
    }
    catch(err)
    {
        return resultdb(500, err);
    }
}

module.exports = {
    loginUser,
    userData,
    uploadPdf,
    getHistory,
    filterThem,
    getImg,
    getIssueStatus,
}

