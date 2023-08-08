const express = require('express');
const MysqlPool = require('../../app');
const router = express.Router();
const userService = require('../service/userService');
const adminService = require('../service/adminService');
const path = require('path');
const moment = require('moment');
const bcrypt = require('bcrypt');
const fs = require('fs');
const multer = require('multer');


async function getUserData(req, res) {
	try {
		console.log('get user here');
		console.log(req.body);
		let returnData = await userService.userData(req.body.user_id);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
		return res.status(200).json(err);
	}
}
async function loginUser(req, res) {
	try {
		console.log('login user');
		const userid = req.body.userid;
		const password = req.body.password;
		console.log("loginUser Controller ");
		let returnData = await userService.loginUser(userid,password);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
		return res.status(200).json(err);
	}
}
async function uploadPdf(req,res)
{
	const user_id = req.body.user_id;
	const category = req.body.category;
	const subcategory = req.body.subcategory;
	const location = req.body.location;
	const urgency = req.body.urgency;
	const iphost = req.body.iphost;
	const title = req.body.title;
	const description = req.body.description;
	const attachement = req.body.file;
	const data = {
		user_id: user_id,
		category: category,
		subcategory: subcategory,
		location: location,
		urgency:urgency,
		iphost: iphost,
		title: title,
		description: description,
		attachement: attachement,
	}
	try{
		let returnData = await userService.uploadPdf(data);
		return res.status(200).json(returnData);
	}
	catch(err)
	{
		console.log(err);
		return res.status(200).json(err);
	}
}

async function getHistory(req, res)
{
	console.log("GetHistory controller was here");
	try {
		let returnData = await userService.getHistory(req.body.user_id);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}

}
async function getImage(req, res)
{
	console.log("GetImage controller");
	try {
		let returnData = await userService.getImg(req);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
	
}
async function filter(req, res)
{
	console.log("GetFilter controller");
	try {
		let returnData = await userService.filterThem(req);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}

}

async function getIssueStatus(req, res)
{
	console.log("what the issue");
	try{
		console.log(req.body);
		let returnData = await userService.getIssueStatus(req);
		return res.status(200).json(returnData);
	}
	catch(err)
	{
		console.log(err);
	}
}



router.post('/getuser', getUserData);
router.post('/login', loginUser);
router.post('/uploadPdf',uploadPdf);
router.post('/getHistory', getHistory);
router.post('/getImg', getImage);
router.post('/filter', filter);
router.post('/getIssueStatus', getIssueStatus);

module.exports = router;