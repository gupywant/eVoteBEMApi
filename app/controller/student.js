const con = require('../config/db')

const getAll = (req,res,next) => {
    try{
    	con.connect(function(err) {
			con.query(`select *,((select (username is not null) as status from vote where vote.npm = students.npm) is not null) as status_vote from students`, function (err, result, fields) {
		    	if (err) throw err;	
		    	if(result.length > 0){
		    		return res.status(201).json({
				        'message': `Students fetched successfully`,
				        'data': result
				    });
		    	}else{
		    		return res.status(404).json({
			            'code': 'NOT_FOUND',
			            'message': 'No students found in the system'
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

module.exports = {getAll: getAll}