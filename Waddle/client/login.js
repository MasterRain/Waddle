//
import { Template } from 'meteor/templating';

//gives javascript variable things -- 
import { ReactiveVar } from 'meteor/reactive-var';

var courseChoice;

// sets up variables for when needed
Template.login.onCreated(
	function loginOnCreated() {
	//this.logInScreen = new ReactiveVar(true);

	Session.set('logInScreen', true);
	Session.set('email1', "");
	Session.set('emailConfimation', "");
	Session.set('password', "");
	Session.set('passwordConfirmation' , "");
	Session.set('passwordsEqual', false);
	Session.set('emailsEqual', false);
	Session.set('emailValid', false);
	Session.set('isLect', true);
	Session.set('fname', "");
	Session.set('lname', "");
});

/*
Template.newAcc.onCreated( function(){
	// must bind to `document.body` as element will be replaced during re-renders
  // add the namespace `.tplquestions` so all event handlers can be removed easily
  $(document.body).on('change.tplquestions', '#isStudent', function(e){
     // handler
  });
  // add the namespace `.tplquestions` so all event handlers can be removed easily
  $(document.body).on('change.tplquestions', '#isLect', function(e){
     // handler
  });
 });

 Template.newAcc.destroyed( function(){
   // remove all event handlers in the namespace `.tplquestions`
   $(document.body).off('.tplquestions');
 }); 
*/

Template.login.helpers({
	logInScreen(){
		return Session.get('logInScreen');
	}
})

Template.newAcc.helpers({
	courses() {
		return Courses.find();
	}, 

	isLect(){
		return Session.get('isLect');
	}

});

//links to html page
import './login.html';

Meteor.subscribe('courses', {onReady: function(){

}});

Template.oldAcc.events({

	'click #goCreateAcc' : function(e,t){
		e.preventDefault();
		Session.set('logInScreen', false);
	},

	'click .signInButton' : function (e,t)
	{
		e.preventDefault();
		Meteor.loginWithPassword(Session.get('email1'), Session.get('password'), function(error){if (!!error) {alert(error.reason)} else {Router.go('/')}});	
	},
	'click .login-facebook': function(e) {
		e.preventDefault();
		Meteor.loginWithFacebook(function(err){
		if (err) {
			console.log(err);
			alert(err.message);
            	}else{
		Router.go('/');
        	}});
    	}

})

Template.newAcc.events({
//e = event, t = instance
	'click #returnToLogin' : function(e,t){
		e.preventDefault();
		Session.set('logInScreen', true);
	},

	'click #lectSelect': function(e,t){
		console.log(t.find('#lectSelect').value);
	},

	'click #createAccount':function(e,t){

		e.preventDefault();


	  		if( ( Session.get('passwordsEqual') && Session.get('emailsEqual') )){ //&& Session.get('emailValid')
				
	  			if(Session.get('isLect')){
	  		
					var sel = t.find("#sel1");
					sel = parseInt(sel[sel.selectedIndex].getAttribute("cid"));
					console.log(sel);
		  			Meteor.call('newStudent', Session.get('email1'), Session.get('password'), sel, function(error, result){
						if(!!error) alert(error.reason);
						if(!!result) {
							console.log(result);
							Accounts.createUser(result, function(e2){ if(!!e2){ alert(e2.reason); }else{ Router.go('/');} });
						}
					});
	  			}
	  			else{
	  				Meteor.call('newLecturer', Session.get('email1'), Session.get('password'), Session.get('fname'), Session.get('lname'), function(error, result){
						if(!!error) alert(error.reason);
						if(!!result) {
							console.log(result);
							Accounts.createUser(result, function(e2){ if(!!e2){ alert(e2.reason); }else{ Router.go('/settings');} });
						}
					});

	  			}
			} 
			else{
				t.find('#invalid').innerHTML = "Please confirm that the emails and passwords match.";
			}
		
		
	},

	'input .inEmail': function(e,t){
		Session.set('emailConfimation', t.find('#emailConf').value);

		if((Session.get('emailConfimation') == Session.get('email1')) && Session.get('email1') != "")
		{
			$(t.find('#emailConf')).toggleClass('valid');
			Session.set('emailsEqual', true);
			//Session.set('emailValid', /(.+)@(.+){2,}\.(.+){2,}/.test(Session.get('emailConf')));
		}else if(Session.get('emailsEqual')){
			$(t.find('#emailConf')).toggleClass('valid');
			Session.set('emailsEqual', false);
		}
	},

	'input .inPwd': function(e,t){
		Session.set('passwordConfirmation', t.find('#pwdConf').value);
		if((Session.get('passwordConfirmation') == Session.get('password')) && Session.get('password') != "")
		{
			$(t.find('#pwdConf')).toggleClass('valid');
			Session.set('passwordsEqual', true);

		}else if(Session.get('passwordsEqual')){
			$(t.find('#pwdConf')).toggleClass('valid');
			Session.set('passwordsEqual', false);
		}
		
	},

	'click .courseCode' : function (e,t)
	{
		Session.set('courseChoice', e.target.cID);
	},

	'click #isStudent': function(e,t){
		e.preventDefault();
		Session.set('isLect', true);
	},

	'click #isLect': function(e,t){
		e.preventDefault();
		Session.set('isLect', false);

	},

	'change #isStudent': function(){
		console.log(1);
	},

	'click #isStudent': function(e,t){
		Session.set('isLect', true);
	},

	'click #isLect': function(e,t){
		Session.set('isLect', false);
	},

	'input #lectFName': function(e,t){
		Session.set('fname', t.find('#lectFName').value);
	},

	'input #lectLName': function(e,t){
		Session.set('lname', t.find('#lectLName').value);
	}
	
})

Template.details.events({

	'input #email' : function(e,t)
	{
		Session.set('email1', t.find('#email').value);
	},

	'input #pwd' : function(e,t)
	{
		Session.set('password', t.find('#pwd').value);
	},

})









