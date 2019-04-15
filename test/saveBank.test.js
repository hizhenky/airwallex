const server = require('../src/getEnv.js');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

var postBank = function(postBody, expectBody, expectStatus, done) {
	request(server).post('/bank').send(postBody).end(function(err, res){
		if (err) throw err;
		expect(res.status).to.equal(expectStatus);  
		expect(res.body).to.eql(expectBody);
		done();
	});
};

describe('payment_method', function() {
	this.retries(3);
	this.timeout(3000);

    it.only('TC001 - 001 - payment_method - mandatory, value should be either LOCAL or SWIFT - LOCAL - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {"success": "Bank details saved"};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC001 - 002 - payment_method - mandatory, value should be either LOCAL or SWIFT - SWIFT - 200',function(done) {
        var postBody = {
            'payment_method': 'SWIFT',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC001 - 003 - payment_method - mandatory, value should be either LOCAL or SWIFT - null - 400',function(done) {
        var postBody = {
            'payment_method': '',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "'payment_method' field required, the value should be either 'LOCAL' or 'SWIFT'"};;
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC001 - 004 - payment_method - mandatory, value should be either LOCAL or SWIFT - any other - 400',function(done) {
        var postBody = {
            'payment_method': 'OTHER',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "'payment_method' field required, the value should be either 'LOCAL' or 'SWIFT'"};;
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


});

describe('band_country_code', function() {
	this.retries(3);
	this.timeout(3000);

    it.only('TC002 - 001 - bank_country_code - mandatory, can be one of US, AU, CN - US - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC002 - 002 - bank_country_code - mandatory, can be one of US, AU, CN - AU - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC002 - 003 - bank_country_code - mandatory, can be one of US, AU, CN - CN - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC002 - 004 - bank_country_code - mandatory, can be one of US, AU, CN - null - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': '',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "'bank_country_code' is required, and should be one of 'US', 'AU', or 'CN'"};;
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC002 - 005 - bank_country_code - mandatory, can be one of US, AU, CN - any other - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'us',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "'bank_country_code' is required, and should be one of 'US', 'AU', or 'CN'"};;
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


});

describe('account name', function() {
	this.retries(3);
	this.timeout(3000);

    it.only('TC003 - 001 - account name - mandatory, any character, length from 2 to 10 - null - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': '',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "'account_name' is required"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC003 - 002 - account name - mandatory, any character, length from 2 to 10 - length 1 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'a',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "Length of account_name should be between 2 and 10"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC003 - 003 - account name - mandatory, any character, length from 2 to 10 - length 2 - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'ai',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC003 - 004 - account name - mandatory, any character, length from 2 to 10 - length 5 ,contains special character - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'wall$',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC003 - 005 - account name - mandatory, any character, length from 2 to 10 - length 10 - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex1',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC003 - 006 - account name - mandatory, any character, length from 2 to 10 - length 11 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex12',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "Length of account_name should be between 2 and 10"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


});


describe('accountnumber', function() {
	this.retries(3);
	this.timeout(3000);
	
    it.only('TC004 - 001 - account number - mandatory, for US, account number is 1-17 character long, can be any character - for US, null - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'US',
            'account_name': 'airwallex',
            'account_number': '',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "'account_number' is required"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 002 - account number - mandatory, for US, account number is 1-17 character long, can be any character - for US, length 1 - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'US',
            'account_name': 'airwallex',
            'account_number': '1',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 003 - account number - mandatory, for US, account number is 1-17 character long, can be any character - for US, length 10, contains special character - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'US',
            'account_name': 'airwallex',
            'account_number': '123456789$',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 004 - account number - mandatory, for US, account number is 1-17 character long, can be any character - for US, length 17 - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'US',
            'account_name': 'airwallex',
            'account_number': '12345678901234567',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 005 - account number - mandatory, for US, account number is 1-17 character long, can be any character - for US, length 18 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'US',
            'account_name': 'airwallex',
            'account_number': '123456789012345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "Length of account_number should be between 1 and 17 when bank_country_code is 'US'"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 006 - account number - mandatory, for AU, account number is 6-9 character long, can be any character - for AU, null - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'AU',
            'account_name': 'airwallex',
            'account_number': '',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "'account_number' is required"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 007 - account number - mandatory, for AU, account number is 6-9 character long, can be any character - for AU, length 5 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'AU',
            'account_name': 'airwallex',
            'account_number': '12345',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "Length of account_number should be between 6 and 9 when bank_country_code is 'AU'"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 008 - account number - mandatory, for AU, account number is 6-9 character long, can be any character - for AU, length 6 - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'AU',
            'account_name': 'airwallex',
            'account_number': '123456',
            'swift_code': 'ICBCCNBJ',
            'bsb': '123456',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 009 - account number - mandatory, for AU, account number is 6-9 character long, can be any character - for AU, length 8 - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'AU',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '123456',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 010 - account number - mandatory, for AU, account number is 6-9 character long, can be any character - for AU, length 9 - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'AU',
            'account_name': 'airwallex',
            'account_number': '123456789',
            'swift_code': 'ICBCCNBJ',
            'bsb': '123456',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 011 - account number - mandatory, for AU, account number is 6-9 character long, can be any character - for AU, length 10 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'AU',
            'account_name': 'airwallex',
            'account_number': '1234567890',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "Length of account_number should be between 6 and 9 when bank_country_code is 'AU'"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 012 - account number - mandatory, for CN, account number is 8-20 character long, can be any character - for CN, null - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "'account_number' is required"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 013 - account number - mandatory, for CN, account number is 8-20 character long, can be any character - for CN, length 7 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '1234567',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "Length of account_number should be between 7 and 11 when bank_country_code is 'CN'"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 014 - account number - mandatory, for CN, account number is 8-20 character long, can be any character - for CN, length 8 - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 015 - account number - mandatory, for CN, account number is 8-20 character long, can be any character - for CN, length 15 - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '123456789012345',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 016 - account number - mandatory, for CN, account number is 8-20 character long, can be any character - for CN, length 20 - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678901234567890',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC004 - 017 - account number - mandatory, for CN, account number is 8-20 character long, can be any character - for CN, length 21 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '123456789012345678900',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "Length of account_number should be between 8 and 20 when bank_country_code is 'CN'"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


});


describe('check swift_code', function() {
	this.retries(3);
	this.timeout(3000);


    it.only('TC005 - 001 - swift_code - mandatory when payment method is SWIFT - for SWIFT, null - 400',function(done) {
        var postBody = {
            'payment_method': 'SWIFT',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': '',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "'swift_code' is required when payment method is 'SWIFT'"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC005 - 002 - swift_code - mandatory when payment method is SWIFT - for other method, null - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': '',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC005 - 003 - swift_code - swift code should be either 8 or 11 characters - length 7 - 400',function(done) {
        var postBody = {
			 "payment_method": "SWIFT",
			 "bank_country_code": "US",
			 "account_name": "Myaccount",
			 "account_number": "12345678",
			 "swift_code": "2ssdUS2890",
			 "bsb": "",
			 "aba": "232323422"};
        var expectBody = {"error": "Length of swift_code should be 8 or 11"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC005 - 004 - swift_code - the 5th and 6th character of swift code should match the bank country code - length 8, match country code in 5th-6th - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC005 - 005 - swift_code - the 5th and 6th character of swift code should match the bank country code - length 8, any other in 5th-6th - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCUBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "the 5th and 6th character of swift code should match the bank country code"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC005 - 006 - swift_code - swift code should be either 8 or 11 characters - length 9 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJU',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "Length of swift_code should be 8 or 11"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC005 - 007 - swift_code - swift code should be either 8 or 11 characters - length 10 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJUP',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "Length of swift_code should be 8 or 11"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC005 - 008 - swift_code - the 5th and 6th character of swift code should match the bank country code - length 11, match country code in 5th-6th, contains special character - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJUI$',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC005 - 009 - swift_code - the 5th and 6th character of swift code should match the bank country code - length 11, any other in 5th-6th - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCUBJABC',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "the 5th and 6th character of swift code should match the bank country code"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC005 - 010 - swift_code - swift code should be either 8 or 11 characters - length 12 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJABCD',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "Length of swift_code should be 8 or 11"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


});


describe('check bsb', function() {
	this.retries(3);
	this.timeout(3000);
	

    it.only('TC006 - 001 - bsb - mandatory when bank country is AU - for AU, null - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'AU',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "'bsb' is required when bank country code is 'AU'"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC006 - 002 - bsb - mandatory when bank country is AU - for AU, length 6,contains special character - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'AU',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': 'ABCDE$',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC006 - 003 - bsb - mandatory when bank country is AU - for other country, null - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC006 - 004 - bsb - 6 characters - length 5 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'AU',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': 'ABCDE',
            'aba': '',
            };
        var expectBody = {"error": "Length of 'bsb' should be 6"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC006 - 005 - bsb - 6 characters - length 6 - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'AU',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': 'ABCDEF',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC006 - 006 - bsb - 6 characters - length 7 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'AU',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': 'ABCDEFG',
            'aba': '',
            };
        var expectBody = {"error": "Length of 'bsb' should be 6"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


});

describe('check bsb', function() {
	this.retries(3);
	this.timeout(3000);
	

    it.only('TC007 - 001 - aba - mandatory when bank country is US - for US, null - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'US',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody = {"error": "'aba' is required when bank country code is 'AU'"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC007 - 002 - aba - mandatory when bank country is US - for US, length 9, contains special character - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'US',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': 'ABCDEFGH$',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC007 - 003 - aba - mandatory when bank country is US - for other country, null - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'CN',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': '',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC007 - 004 - aba - 9 characters - length 8 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'US',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': 'ABCDEFGH',
            };
        var expectBody = {"error": "Length of 'aba' should be 9"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC007 - 005 - aba - 9 characters - length 9 - 200',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'US',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': 'ABCDEFGHI',
            };
        var expectBody =  {'success': 'Bank details saved'};
        var expectStatus = 200;
        postBank(postBody, expectBody, expectStatus, done);
    });


    it.only('TC007 - 006 - aba - 9 characters - length 10 - 400',function(done) {
        var postBody = {
            'payment_method': 'LOCAL',
            'bank_country_code': 'US',
            'account_name': 'airwallex',
            'account_number': '12345678',
            'swift_code': 'ICBCCNBJ',
            'bsb': '',
            'aba': 'ABCDEFGHIJ',
            };
        var expectBody = {"error": "Length of 'aba' should be 9"};
        var expectStatus = 400;
        postBank(postBody, expectBody, expectStatus, done);
    });

});


