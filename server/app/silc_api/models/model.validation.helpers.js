const User = require('../models/user/user.model');
const SILCGroup = require('../models/silc/silc_group.model');
const Membership = require('../models/silc/membership.model');
const Loan = require('../models/silc/loan.model');
const Saving = require('../models/silc/saving.model');
const ShareOut = require('../models/silc/share_out.model');
const SocialFund = require('../models/silc/social_fund.model');
const Fine = require('../models/silc/fine.model');
const CashBook = require('../models/silc/cash_book.model');

function isValidNationalID(national_id){
	return /^[0-9]{6}\/[0-9]{2}\/[1,2]{1}$/i.test(national_id);
}

function isValidPassportID(passport_id){
	return /^ZN(\d)(?!0\1+$)\d{5}$/i.test(passport_id);
}

function isValidDrivingLicense(driving_license){
	return /(\d)(?!0\1+$)\d{5}$/i.test(driving_license);
}
function isValidEmail(email){
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i.test(email);
}

async function silcGroupIdExists(v, callback){                    
    try {
        let silc_group = SILCGroup.findById(v);
        if(silc_group){
            console.log('SILC Group found: ', silc_group._id);
            return true;
        }
        return false;
        
    } catch (error) {
        return callback(error, false);
    }
}

async function userIdExists(v, callback){                    
    try {
        let user = User.findById(v);
        if(user){
            console.log('User found: ', user._id);
            return true;
        }
        return false;
        
    } catch (error) {
        return callback(error, false);
    }
}

async function identificationNotDuplicate(v, type){
	try {
		let found_records = await User.find({'identification.id_value': v,'identification.id_type': type});
		if(found_records){
			return false;
		}
		return true;
	} catch (error) {
		return false;
	}
}

ValidationMessages = {
    invalidEmailMsg: 'Invalid email address',
    invalidDrivingLicenseMsg: 'Invalid driving license ID',
    invalidNationalIDMsg: 'Invalid national ID',
    invalidPassportMsg: 'Invalid passport ID',
    invalidPhoneMsg: 'Invalid phone number',
    invalidGroupIDMsg: 'Invalid Group ID(s).The Group ID(s) must be valid existing group id(s)',
    groupAlreadyExists: 'Group already exists',
    duplicateIdentification: 'A user with same ID already exists',
    phoneAlreadyExists: 'User with same phone number already exists',
    invalidUserIdMsg: 'Invalid User ID(s).The User ID(s) must be valid existing user id(s)'
}

module.exports = {
    isValidDrivingLicense,
    isValidNationalID,
    isValidPassportID,
    silcGroupIdExists,
    identificationNotDuplicate,
    isValidEmail,
    ValidationMessages,
    userIdExists
}