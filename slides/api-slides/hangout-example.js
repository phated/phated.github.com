/**
 * @author phated
 */
function init() {
	var tabs = new gadgets.TabSet(); 
	var participants = gapi.hangout.getParticipants();
	
	var tabIds = addTabForEachPerson(tabs, participants);
		
		  var gplusId = participant.person.id;
		  $.get('https://www.googleapis.com/plus/v1/people/' + gplusId + '/activities/public?key=AIzaSyB14Ua7k5_wusxHTQEH3sqmglO7MHjHPCI&maxResults=5&pp=1&alt=json', function(data){
			$.each(data.items, function(index, item) {
			  if(item.provider.title === "Hangout") {
			  	activityId = item.id;
			  	$.get('https://www.googleapis.com/plus/v1/activities/' + activityId + '/comments?key=AIzaSyB14Ua7k5_wusxHTQEH3sqmglO7MHjHPCI&fields=items(actor%2Cobject%2Cpublished%2Cupdated)&alt=json', function(data){
			      $.each(data.items, function(index, item) {
			        var postedDate = new Date(item.published);
			        var editedDate = new Date(item.updated);
			        var output = '<img src="' + item.actor.image.url + '" width="100" height="100" style="float:left; margin:10px;" />';
			        output += '<div style="float:left; margin:10px;">';
			        output += '<a href="' + item.actor.url + '" target="_blank">' + item.actor.displayName + '</a>';
			        output += ' - ' + item.object.content;
			        output += '<div style="margin:15px 0;">Posted on: ' + postedDate.toLocaleString() + '</div>';
			        output += '<div style="margin:15px 0;">Edited on: ' + editedDate.toLocaleString() + '</div>';
			        output += '</div>';
			        $('#' + tabId).append(output);
			      });
			    }, "jsonp");
			  }
			});
	      }, "jsonp");
}

function addTabForEachPerson(tabs, participants) {
	var tabIds;
	$.each(participants, function(index, participant) {
		var tabId = tabs.addTab(participant.person.displayName)
		tabIds.push(tabId);
		tabs.setSelectedTab(index);
	});
}
