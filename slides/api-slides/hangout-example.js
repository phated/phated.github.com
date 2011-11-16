/**
 * @author phated
 */
var Participant = {
  gplusId: null,
  tabId: null,
  hangoutActivityIds: [],
  newTab: function(participant, tabSet) {
    return tabSet.addTab(participant.person.displayName);
  },
  getActivities: function() {
    $.get('https://www.googleapis.com/plus/v1/people/' + this.gplusId + '/activities/public?key=AIzaSyB14Ua7k5_wusxHTQEH3sqmglO7MHjHPCI&maxResults=5&pp=1&alt=json', this.findHangoutActivityIds(this), "jsonp");
  },
  findHangoutActivityIds: function(participant) {
    return function(data, textStatus) {
      $.each(data.items, function(index, item) {
        if(item.provider.title === "Hangout") {
			    participant.hangoutActivityIds.push(item.id);
          participant.getComments();
		    }
	    });
    };
  },
  getComments: function() {
    this.hangoutActivityIds.forEach(function(hangoutActivityId, index) {
      $.get('https://www.googleapis.com/plus/v1/activities/' + hangoutActivityId + '/comments?key=AIzaSyB14Ua7k5_wusxHTQEH3sqmglO7MHjHPCI&fields=items(actor%2Cobject%2Cpublished%2Cupdated)&alt=json', this.outputComments(this), "jsonp");
	  }, this);
  },
  outputComments: function(participant) {
    return function(data, textStatus) {
      var source, template, html;
      $.each(data.items, function(index, item) {
        source   = $("#comment-template").html();
        template = Handlebars.compile(source);
        html     = template(data);
        $("#" + participant.tabId).append(html);
      });
    }
  }
};
 
function init() {
	var tabSet = new gadgets.TabSet(); 
	var hangoutParticipants = gapi.hangout.getParticipants();
	
  var participants = [],
      tabIds = [];
      
  $.each(hangoutParticipants, function(index, hangoutParticipant) {
    participants[index] = Object.create(Participant);
    participants[index].gplusId = hangoutParticipant.person.id;
    tabIds[index] = (participants[index].newTab(hangoutParticipant, tabSet));
    participants[index].tabId = tabIds[index];
    if(participants[index].gplusId) {
      participants[index].activities = participants[index].getActivities();
    }   
  });
	//var tabIds = addTabForEachPerson(tabs, participants);
		
	//var gplusIds = getGPlusIds(participants);
	
	//getGPlusActivities(gplusIds, tabIds);
}

/*function addTabForEachPerson(tabs, participants) {
	var tabIds = [];
	$.each(participants, function(index, participant) {
		var tabId = tabs.addTab(participant.person.displayName);
		tabIds.push(tabId);
		tabs.setSelectedTab(index);
	});
	return tabIds;
}*/

/*function getGPlusIds(participants) {
	var gplusIds = [];
	$.each(participants, function(index, participant) {
		gplusIds.push(participant.person.id);
	});
	return gplusIds;
}*/

/*function getGPlusActivities(gplusIds, tabIds) {
	$.each(gplusIds, function(index, gplusId) {
		
	});
}*/

/*function findHangoutActivity(data, tabIds) {
	var activityIds = [];
	$.each(data.items, function(index, item) {
		if(item.provider.title === "Hangout") {
			activityIds.push(item.id);
			getHangoutActivityComments(activityIds, tabIds);
		}
	});
}*/

/*function getHangoutActivityComments(activityIds, tabIds) {

}*/

function outputStuff(data, tabIds, activityIndex) {
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
		$('#' + tabIds[activityIndex]).append(output);
	});
}
