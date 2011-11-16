/**
 * @author phated
 */
Handlebars.registerHelper('dateFormat', function(value) {
  var formattedDate = new Date(value).toLocaleString();
  return new Handlebars.SafeString(formattedDate);
});
 
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
      data.items.forEach(function(item, index) {
        source   = $("#comment-template").html();
        template = Handlebars.compile(source);
        html     = template(item);
        $("#" + this.tabId).append(html);
      }, participant);
    };
  }
};
 
function init() {
	var tabSet = new gadgets.TabSet(); 
	var hangoutParticipants = gapi.hangout.getParticipants();
	
  var participants = [],
      tabIds = [];
      
  hangoutParticipants.forEach(function(hangoutParticipant, index) {
    newParticipant(hangoutParticipant, index);
  });
  
  
}

function newParticipant(hangoutParticipant, index) {
  participants[index] = Object.create(Participant);
  participants[index].gplusId = hangoutParticipant.person.id;
  tabIds[index] = (participants[index].newTab(hangoutParticipant, tabSet));
  participants[index].tabId = tabIds[index];
  if(participants[index].gplusId) {
    participants[index].activities = participants[index].getActivities();
  }
}