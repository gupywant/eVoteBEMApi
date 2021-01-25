const jwt = require('jsonwebtoken')
const con = require('../config/db')
const hash = require('password-hash');
const {spawn} = require('child_process');

const test = (req,res,next) => {
	return res.status(201).json({
	    'message': `Test API requested successfully`
	});
    con.connect(function(err) {
		con.query(`select * from admin where id_admin = 1`, function (err, admin, fields) {
	    	if (err) throw err;	
	    	if(admin.length > 0){
				console.log(admin[0].id_admin)
	    		return res.status(201).json({
			        'message': `Admin fetched successfully`,
			        'data': admin
			    });
	    	}else{
	    		return res.status(404).json({
		            'code': 'NOT_FOUND',
		            'message': 'No Admin found in the system'
		        });
	    	}
	    })
	})
}

const login = (req,res,next) => {
	const {
        username,
        password,
    } = req.body;
	try{
		con.connect(function(err) {
			con.query(`SELECT * FROM admin where username = "${username}" limit 1`, function (err, result, fields) {
		    	if (err) throw err;	    	
				if(result.length > 0){
					if(hash.verify(password, result[0].password)){
						const options = {
							expiresIn: '365d'
						};
						var token = jwt.sign({ id: 1 },"inih salt key buat encrypt",options);
						con.connect(function(err) {
							con.query(`update admin set token = "${token}"`, function (err, result, fields) {
						    	if (err) throw err;
						    })
						})
					    return res.status(200).json({
					        'message': `user with id ${result[0].id_admin} fetched successfully`,
					        'data': { auth: true,id: result[0].id_admin ,token:token }
					    });
					}else{
						return res.status(401).json({
				        	'message': `Invalid username or password`,
				    	});
					}
				}else{
					return res.status(401).json({
				        'message': `Invalid username or password`,
				    });
				}
		  	});
		});
	}catch(error){
		return res.status(500).json({
            'code': 'SERVER_ERROR',
            'message': 'something went wrong, Please try again'
        });
	}
}

const loginMhs = async (req,res,next) => {
	try{
		let dataToSend
		let largeDataSet = []
		let data = []
		const {
	        username,
	        password,
	    } = req.body;
	    const date = new Date();
	    con.connect(function(err) {
			con.query(`SELECT * FROM students where username = "${username}" limit 1`, function (err, result, fields) {
		    	if (err) throw err;	    	
				if(result.length > 0){
					if(hash.verify(password, result[0].password)){
						const options = {
							expiresIn: '365d'
						};
						var token = jwt.sign({ id: result[0].npm },"inih salt key buat encrypt",options);
						con.connect(function(err) {
							con.query(`update students set token = "${token}"`, function (err, result, fields) {
						    	if (err) throw err;
						    })
						})
					    return res.status(200).json({
					        'message': `user with id ${result[0].npm} fetched successfully`,
					        'data': { auth: true,id: result[0].npm ,token:token }
					    });
					}else{
						return res.status(401).json({
				        	'message': `Invalid username or password`,
				    	});
					}
				}else{
					// spawn new child process to call the python script
					const python = spawn('python', ['_login.py', username, password])

					// collect data from script
					python.stdout.on('data', function (data) {
						largeDataSet.push(data)
					})

					// in close event we are sure that stream is from child process is closed
					python.on('close', (code) => {
						const data = JSON.parse(largeDataSet)
						if(data.status === 'loged'){
							let insert = {npm: data.npm, student_name: username, username: username, password: hash.generate(password), updated_at: date, created_at: date}
				    		con.connect(function(err) {
								con.query(`insert into students set ?`,insert, function (err, result, fields) {
							    	if (err) throw err;
							    	if(result.affectedRows === 1){
							    		const options = {
											expiresIn: '7d'
										};
										var token = jwt.sign({ id: insert.npm },"inih salt key buat encrypt",options);
										con.connect(function(err) {
											con.query(`update students set token = "${token}"`, function (err, result, fields) {
										    	if (err) throw err;
										    	return res.status(200).json({
											        'message': `student with id ${insert.npm} loged successfully`,
											        'data': { auth: true, id: insert.npm ,token:token }
											    });
										    })
										})
							    	}else{
							    		return res.status(400).json({
								            'code': 'BAD_REQUEST',
								            'message': 'something went wrong, Please try again'
								        });
							    	}
							    })
							})
						}else{
							return res.status(401).json({
					        	'message': `Invalid username or password`,
					    	});
						}

					})
				}
		  	});
		});   
	}catch(error){
		return res.status(500).json({
            'code': 'SERVER_ERROR',
            'message': 'something went wrong, Please try again'
        });
	}
}

module.exports = {test:test, login:login, loginMhs: loginMhs}
