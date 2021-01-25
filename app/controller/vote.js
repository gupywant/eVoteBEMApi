const con = require('../config/db')

const vote = (req,res,next) => {
    try{
    	const {
    		token,
    		id_candidate
    	} = req.body;
    	const date = new Date();
    	con.connect(function(err) {
			con.query(`select * from students where token = "${token}"`, function (err, student, fields) {
		    	if (err) throw err;	
		    	if(student.length > 0){
			    	con.connect(function(err) {
						con.query(`select * from vote where npm = "${student[0].npm}"`, function (err, vote, fields) {
					    	if (err) throw err;	
					    	if(vote.length < 1){
			    				let insert = {npm: student[0].npm, id_candidate: id_candidate, created_at: date}
					    		con.connect(function(err) {
									con.query(`insert into vote set ?`,insert, function (err, result, fields) {
								    	if (err) throw err;
								    	if(result.affectedRows === 1){
											con.connect(function(err) {
									    		con.query(`update candidate set total_vote = total_vote + 1 where id_candidate = ${id_candidate}`, function (err, resultU, fields) {
											    	if (err) throw err;	
											    	if(resultU.affectedRows === 1){
											    		return res.status(201).json({
													        'message': `Candidate with id ${id_candidate} has been voted successfully`
													    });
											    	}else{
											    		return res.status(404).json({
												            'code': 'NOT_FOUND',
												            'message': `No candidate with id ${id_candidate} found in the system`
												        });
											    	}
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
					    		return res.status(400).json({
						            'code': 'BAD_REQUEST',
						            'message': 'You have been already vote'
						        });
					    	}
					    })
					})
				}else{
		    		return res.status(404).json({
			            'code': 'NOT_FOUND',
			            'message': 'Your token not valid'
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
const count = (req,res,next) => {
    try{
    	con.connect(function(err) {
			con.query(`select * from candidate`, function (err, result, fields) {
		    	if (err) throw err;	
		    	if(result.length > 0){
		    		return res.status(201).json({
				        'message': `candidate fetched successfully`,
				        'data': result
				    });
		    	}else{
		    		return res.status(404).json({
			            'code': 'NOT_FOUND',
			            'message': 'No announcement found in the system'
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
module.exports = {count: count, vote: vote}