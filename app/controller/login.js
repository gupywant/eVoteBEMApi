const jwt = require('jsonwebtoken')

const test = (req,res,next) => {
    return res.status(200).json({
        'message': 'test'
    });
}

const login = (req,res,next) => {
	const {
        username,
        password,
    } = req.body;
	try{	
		if(username == "web@student.gunadarma.ac.id" && password == "1234"){
			const options = {
				expiresIn: '1d'
			};

			var token = jwt.sign({ id: 1 },"inih salt key buat encrypt",options);

		    return res.status(200).json({
		        'message': `user with id 0 fetched successfully`,
		        'data': { auth: true,id: 1 ,token:token }
		    });
		}else{
			return res.status(401).json({
		        'message': `Invalid username or password`,
		    });
		}
	}catch(error){
		return res.status(500).json({
            'code': 'SERVER_ERROR',
            'message': 'something went wrong, Please try again'
        });
	}
}

module.exports = {test:test, login:login}
