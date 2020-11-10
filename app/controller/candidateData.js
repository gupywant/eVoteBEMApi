const con = require('../config/db')

const add = (req,res,next) => {
    try{
    	const {
        	npm,
        	name,
        	candidate_class,
        	status
    	} = req.body;
    	const date = new Date();
    	let insert = {id_candidate: req.params.id, npm: npm, name: name, candidate_class: candidate_class, status: status, updated_at: date, created_at: date}
    	con.connect(function(err) {
    		con.query(`select * from candidate_data where id_candidate = ${req.params.id} and status = ${status}`, function (err, response, fields) {
				if(response.length === 0){
					con.query(`insert into candidate_data set ?`,insert, function (err, result, fields) {
				    	if (err) throw err;
				    	if(result.affectedRows === 1){
				    		return res.status(201).json({
						        'message': `Candidate data created successfully`,
						        'data': { id: result.insertId }
						    });
				    	}else{
				    		return res.status(400).json({
					            'code': 'BAD_REQUEST',
					            'message': 'something went wrong, Please try again'
					        });
				    	}
				    })
				}else{
					return res.status(400).json({
			            'code': 'BAD_REQUEST',
			            'message': `Candidate data with id ${req.params.id} and status ${status} already exists`
			        });
				}
			})
		})
    }catch{
    	return res.status(500).json({
            'code': 'SERVER_ERROR',
            'message': 'something went wrong, Please try again'
        });
    }
}
const getAll = (req,res,next) => {
    try{
    	con.connect(function(err) {
			con.query(`select * from candidate_data where id_candidate = ${req.params.id}`, function (err, result, fields) {
		    	if (err) throw err;	
		    	if(result.length > 0){
		    		return res.status(201).json({
				        'message': `Candidate data fetched successfully`,
				        'data': result
				    });
		    	}else{
		    		return res.status(404).json({
			            'code': 'NOT_FOUND',
			            'message': 'No candidates data found in the system'
			        });
		    	}
		    })
		})
    }catch{
    	return res.status(500).json({
            'code': 'SERVER_ERROR',
            'message': 'something went wrong, Please try again'
        });
    }
}
const getById = (req,res,next) => {
    try{
    	con.connect(function(err) {
    		con.query(`select * from candidate_data where id_data = ${req.params.id}`, function (err, result, fields) {
		    	if (err) throw err;	
		    	if(result.length > 0){
		    		return res.status(201).json({
				        'message': `Candidate with id ${result[0].id_candidate} fetched successfully`,
				        'data': result[0]
				    });
		    	}else{
		    		return res.status(404).json({
			            'code': 'NOT_FOUND',
			            'message': `No candidate data with id ${req.params.id} found in the system`
			        });
		    	}
		    })
		})
    }catch{
    	return res.status(500).json({
            'code': 'SERVER_ERROR',
            'message': 'something went wrong, Please try again'
        });
    }
}
const deleteById = (req,res,next) => {
    try{
    	con.connect(function(err) {
    		con.query(`delete from candidate_data where id_data = "${req.params.id}"`, function (err, result, fields) {
		    	if (err) throw err;	
		    	if(result.affectedRows === 1){
		    		return res.status(201).json({
				        'message': `Candidate with id ${req.params.id} deleted successfully`
				    });
		    	}else{
		    		return res.status(404).json({
			            'code': 'NOT_FOUND',
			            'message': `No candidate data with id ${req.params.id} found in the system`
			        });
		    	}
		    })
		})
    }catch{
    	return res.status(500).json({
            'code': 'SERVER_ERROR',
            'message': 'something went wrong, Please try again'
        });
    }
}
const update = (req,res,next) => {
    try{
    	const {
        	npm,
        	name,
        	candidate_class
    	} = req.body;
    	const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
    	con.connect(function(err) {
    		con.query(`update candidate_data set npm = "${npm}", name = "${name}", candidate_class = "${candidate_class}", updated_at ="${date}" where id_data = "${req.params.id}"`, function (err, result, fields) {
		    	if (err) throw err;	
		    	if(result.affectedRows === 1){
		    		return res.status(201).json({
				        'message': `Candidate with id ${req.params.id} updated successfully`,
				        'data': result[0]
				    });
		    	}else{
		    		return res.status(404).json({
			            'code': 'NOT_FOUND',
			            'message': `No candidate data with id ${req.params.id} found in the system`
			        });
		    	}
		    })
		})
    }catch{
    	return res.status(500).json({
            'code': 'SERVER_ERROR',
            'message': 'something went wrong, Please try again'
        });
    }
}
const test = (req,res,next) => {
    return res.status(200).json({
        'message': 'test'
    });
}

module.exports = {add: add, test: test, getAll: getAll, getById: getById, deleteById: deleteById, update: update}