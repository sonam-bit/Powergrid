const express = require('express');
const MysqlPool = require('../../app');
const router = express.Router();
const adminService = require('../service/adminService');
const path = require('path');
const moment = require('moment');
const bcrypt = require('bcrypt');
const fs = require('fs');
const multer = require('multer');

async function adminLogin(req,res)
{
	console.log("admin login controller");
    try {
		console.log('admin user');
		const userid = req.body.userid;
		const password = req.body.password;
		console.log("adminLogin Controller ");
		let returnData = await adminService.adminLogin(userid,password);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
		return res.status(200).json(err);
	}
    
}

async function getallIssues(req,res)
{
	console.log("get all isues admin controller");
    try {
		let returnData = await adminService.getallIssues();
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
		return res.status(200).json(err);
	}
    
}
async function changeStatus(req,res)
{
	console.log("Change the status controller");
	try{
		let returnData = await adminService.changeStatus(req);
		return res.status(200).json(returnData);
	}
	catch(err)
	{
		console.log(err);
		return res.status(200).json(err);
	}
}

async function filterallRows(req, res)
{
	console.log("GetFilter controller");
	try {
		let returnData = await adminService.filterThemAll(req);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}

}

async function setremark(req, res)
{
	console.log("set remark controller");
	try {
		let returnData = await adminService.setremark(req);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}

}


router.post('/adminLogin', adminLogin);
router.post('/getallIssues', getallIssues);
router.post('/changeStatus', changeStatus);
router.post('/filterallRows', filterallRows);
router.post('/setremark', setremark);
module.exports = router;