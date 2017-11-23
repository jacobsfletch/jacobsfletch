var async = require('async'),
	keystone = require('keystone'),
	ObjectId = require('mongoose').Types.ObjectId,
	User = keystone.list('User');
/**
 * Get a User by ID
 */
exports.get = function(req, res) {
	User.model.findById(req.params.id).exec(function(err, item) {

		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('User not found');

		res.apiResponse({
			user: item
		});
	});
};

/**
 * Get User Autofill
 */
exports.autofill = function(req, res) {
	function escapeRegExp(str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}

	var name = req.params.name;
			name = escapeRegExp(name);
			name = name.split(' ');
	var fname = new RegExp('^' + name[0], "i");
	var lname = name[1] ? new RegExp('^' + name[1], "i") : new RegExp('^.', "i");

	if(req.user.canAccessKeystone) {
		User.model.find({
			'name.first': {
				 $regex: fname
			},
			'name.last': {
				 $regex: lname
			}
		})
			.select('name profile_image.url email dob address.city')
			//.where({_id : { $nin : exclude_players}}) Need to exclude players that have been selected
			.exec(function(err, item) {

			if (err) return res.apiError('database error', err);
			if (!item) return res.apiError('No users found');
			res.apiResponse(item);
		});
	}else {
		User.model.find({
			$or : [
				{ _id : req.user._id },
				{ adminUser : req.user._id },
				{ privacy : 'public'},
				{ $or : [
						{friends : {$in : [req.user._id]}},
						{privacy : 'friends'}
				]}
			],
			'name.first': {
				 $regex: fname
			},
			'name.last': {
				 $regex: lname
			}
		})
			.select('name profile_image.url email dob address.city')
			//.where({_id : { $nin : exclude_players}}) Need to exclude players that have been selected
			.exec(function(err, item) {

			if (err) return res.apiError('database error', err);
			if (!item) return res.apiError('No users found');
			res.apiResponse(item);
		});
	}
};

/**
 * Register a User
 */
exports.create = function(req, res) {
	var locals = res.locals;

	var item = new User.model(),
		userdata = (req.method == 'POST') ? req.body : req.query;

	data = {};
	data.email = userdata.email.toLowerCase();
	data.password = userdata.password;
	data.password_confirm = userdata.password_confirm;
	data.canAccessKeystone = false;
	data.name = userdata.name;
	data.height = userdata.height;
	data.dob = userdata.dob;
	data.experience = Number(userdata.experience);
	data.gender = userdata.gender;
	data.phone = userdata.phone;
	data.profile_image_upload = userdata.profile_image_upload ? userdata.profile_image_upload : null;

    data['name.first'] = userdata['name.first'];
    data['name.last'] = userdata['name.last'];
    data['address.street1'] = userdata['address.street1'];
	data['address.street2'] = userdata['address.street2'];
	data['address.city'] = userdata['address.city'];
	data['address.state'] = userdata['address.state'];
	data['address.postcode'] = userdata['address.postcode'];
	User.model.findOne({ email: data.email }).exec(function(err, result) {
		if (result) {
			res.apiError('A user with this email already exists.');
		}else {
			addUser();
		}
	});

	function addUser() {
        // Create new user
        var newUser = new User.model(data);

        // Save new user to db
		newUser.save(function(err) {
			if (err) {
                // Return create error if there was an error
				return res.apiError('create error', err);
			}else {
                // Return user if succesfully saved
                return res.apiResponse(newUser);
			}

		});
	}
}

/**
 * Update User
 */
exports.update = function(req, res) {
	User.model.findById(req.params.id).exec(function(err, item) {
        if(process.env.ENVIORNMENT != 'development') {
		    if (req.user._id.toString() !== item._id.toString() && req.user._id.toString() !== item.adminUser.toString() && !req.user.canAccessKeystone) return res.apiError('You don\'t have permissions to edit this user');
        }
        if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		var userdata = (req.method == 'POST') ? req.body : req.query;

		data = {};
		data.email = userdata.email.toLowerCase();
		data.password = userdata.password;
		data.password_confirm = userdata.password_confirm;
		data.canAccessKeystone = false;
		data.name = userdata.name;
		data.dob = userdata.dob;
		data.phone = userdata.phone;
		data.profile_image_upload = userdata.profile_image_upload ? userdata.profile_image_upload : null;
		data['address.street1'] = userdata['address.street1'];
		data['address.street2'] = userdata['address.street2'];
		data['address.city'] = userdata['address.city'];
		data['address.state'] = userdata['address.state'];
		data['address.postcode'] = userdata['address.postcode'];
		data.address.address.postcode = userdata.address.address.postcode;

		User.model.findOne({ email: data.email})
		.exec(function(err, result) {
			if(result && result._id.toString() !== req.params.id) return res.apiError('A user with this email already exists. If you don\'t know the player\'s email, you can leave this field blank. If you are trying to add a player with this email address, it appears they already have a Macker account. Try searching for them by entering their name in the "Name" field.', err);
			item.getUpdateHandler(req).process(data, function(err) {
				if (err) return res.apiError('create error', err);

				res.apiResponse({
					success : true,
					user : item
				});

			});
		});

	});
}

/**
 * Login User
 */

exports.login = function(req, res) {
	var locals = res.locals,
		item = new User.model(),
		data = (req.method == 'POST') ? req.body : req.query;

	keystone.session.signin({ email: data.email, password: data.password }, req, res,
		function()	{
			return res.apiResponse({
				success: true,
				user: req.user
			})
		},
		function(err){
			return res.apiError('There was trouble logging you in, please try again.', err);
		});
}

/**
 * Remove User by ID
 */
exports.remove = function(req, res) {
    var data = (req.method == 'POST') ? req.body : req.query;
    var id = data.id;
	User.model.findById(id)
    .exec(function(err, item) {
    	if(item) {
            if(process.env.ENVIORNMENT != 'development') {
    		    var canEdit = req.user._id.toString() == item._id.toString() || req.user.canAccessKeystone;
    		    if (!canEdit) return res.apiError('You don\'t have edit priviliages of this player', 'no permissions');
            }
    		User.model.remove({
    			_id: id
    		},function(err){
    			if (err) return res.apiError('Sorry, there was an issue removing this player.', err);
    			res.apiResponse({
    				success: true,
    				user: item
    			});
    		});
    	}else {
            return res.apiError('This player doesn\'t exists', 'player doesn\'t exist');
        }
	});
};
