var myApp = angular.module("myApp", []);
myApp.service("ContactService" , function(){
	var userId = 1;
	var contacts = [{
		  'id' : 0,
				 'name' : 'Vương Hoàng',
				 'email' : 'Brc@gmail.com',
				 'password': 'This_is.Boonrealcua',
				 'phone' : '0972-096-jqk'}];	
	
	// Saving new contact and saving existing edited contact.
	this.save = function(contact)  
	{
		if(contact.id == null)                       
		{
			contact.id = userId++;
			contacts.push(contact);
		}
		else
		{
			for(var i in contacts)
			{
				if(contacts[i].id == contact.id)
				{
					contacts[i] = contact;
				}
			}
		}
	};
	
	// Showing existing contacts
	
	this.get = function(id)
	{
		for(var i in contacts )
		{
			if( contacts[i].id == id)
			{
				return contacts[i];
			}
		}
	};
	
	//Delete a contact
	this.delete = function(id)
	{
		for(var i in contacts)
			{
				if(contacts[i].id == id)
				{
					contacts.splice(i,1);
				}
			}
	};	
	//Show all contacts
	this.list = function()
	{
		return contacts;
	}	;	
});
//// Editing data
	
myApp.controller("ContactController" , function($scope , ContactService){
    console.clear();
    
    $scope.ifShowUser = false;
    $scope.title ="List of Users";
    
		$scope.contacts = ContactService.list();
		
		$scope.saveContact = function()
		{
		  console.log($scope.newcontact);
		  if($scope.newcontact == null || $scope.newcontact == angular.undefined)
		  return;
			ContactService.save($scope.newcontact);
			$scope.newcontact = {};
		};		
		$scope.delete = function(id)
		{
			ContactService.delete(id);
			if($scope.newcontact != angular.undefined && $scope.newcontact.id == id)
				{
					$scope.newcontact = {};
				}
		};		
		$scope.edit = function(id)
		{
			$scope.newcontact = angular.copy(ContactService.get(id));
		};		
		$scope.showUser = function(){
		  if($scope.title == "List of Users"){
		    $scope.ifShowUser=true;
		    $scope.title = "Back";
		  }
		  else
		  {
		    $scope.ifShowUser = false;
		    $scope.title = "List of Users";
		  }		  
		};
});