function init(){
  // Load your API key from the Developer Console
  gapi.client.setApiKey('AIzaSyB14Ua7k5_wusxHTQEH3sqmglO7MHjHPCI');

  // Load the API
  gapi.client.load('plus', 'v1', function() {
    var profileRequest = gapi.client.plus.people.get({
        'userId': '102147307918874735077'
    });
    var activitiesRequest = gapi.client.plus.activities.list({
        'userId': '102147307918874735077',
        'collection': 'public',
        'fields': 'items(address,annotation,object(actor(displayName,image,url),attachments,content,objectType,originalContent,plusoners,replies,resharers,url),placeId,placeName,placeholder,published,title,updated,url,verb),nextLink,nextPageToken'
    });

    profileRequest.execute(function(resp) {
      var source, template, html;
      source   = $("#header-template").html();
      template = Handlebars.compile(source);
      html     = template(resp);
      $("header.hero-unit").append(html);

      source   = $("#sidebar-template").html();
      template = Handlebars.compile(source);
      html     = template(resp);
      $(".sidebar").append(html);
    });
    
    activitiesRequest.execute(function(resp) {
      var source, template, html;
      source   = $("#activity-template").html();
      template = Handlebars.compile(source);
      html     = template(resp);
      $(".column1").append(html);
    });
  });
  
  $("a[rel=popover]").popover({
    offset: 10,
    live: true
  });
}