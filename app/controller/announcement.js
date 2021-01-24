const con = require('../config/db')

const create = (req,res,next) => {
    try{
    	const {
    		token,
        	title,
        	image,
        	content
    	} = req.body;
    	const date = new Date();
    	con.connect(function(err) {
		con.query(`select * from admin where id_admin = 1`, function (err, admin, fields) {
		    	if (err) throw err;	
		    	if(admin.length > 0){
    				let insert = {id_admin: admin[0].id_admin, title: title, image: image, content: content, updated_at: date, created_at: date}
		    		con.connect(function(err) {
						con.query(`insert into announcement set ?`,insert, function (err, result, fields) {
					    	if (err) throw err;
					    	if(result.affectedRows === 1){
					    		return res.status(201).json({
							        'message': `Announcement created successfully`,
							        'data': { id: result.insertId }
							    });
					    	}else{
					    		return res.status(400).json({
						            'code': 'BAD_REQUEST',
						            'message': 'something went wrong, Please try again'
						        });
					    	}
					    })
					})
		    	}else{
		    		return res.status(404).json({
			            'code': 'NOT_FOUND',
			            'message': 'No Admin found in the system'
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
			con.query(`select * from announcement`, function (err, result, fields) {
		    	if (err) throw err;	
		    	if(result.length > 0){
		    		return res.status(201).json({
				        'message': `Announcement fetched successfully`,
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
const getById = (req,res,next) => {
    try{
    	con.connect(function(err) {
    		con.query(`select * from announcement where id_announcement = ${req.params.id}`, function (err, result, fields) {
		    	if (err) throw err;	
		    	if(result.length > 0){
		    		return res.status(201).json({
				        'message': `Announcement with id ${result[0].id_announcement} fetched successfully`,
				        'data': result[0]
				    });
		    	}else{
		    		return res.status(404).json({
			            'code': 'NOT_FOUND',
			            'message': `No Announcement with id ${req.params.id} found in the system`
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
    		con.query(`delete from announcement where id_announcement = "${req.params.id}"`, function (err, result, fields) {
		    	if (err) throw err;	
		    	if(result.affectedRows === 1){
		    		return res.status(201).json({
				        'message': `Announcement with id ${req.params.id} deleted successfully`
				    });
		    	}else{
		    		return res.status(404).json({
			            'code': 'NOT_FOUND',
			            'message': `No announcement data with id ${req.params.id} found in the system`
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

module.exports = {create: create, getAll: getAll, getById: getById, deleteById: deleteById}