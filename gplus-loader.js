(function($){
  Handlebars.registerHelper('safeString', function(value) {
    return new Handlebars.SafeString(value);
  });
  
  Handlebars.registerHelper('school', function(value) {
    if(value.type === "school") {
      var source   = $("#school-template").html();
      var template = Handlebars.compile(source);
      var html     = template(value);
      return new Handlebars.SafeString(html);
    } else {
      return false;
    }
  });
  
  Handlebars.registerHelper('work', function(value) {
    if(value.type === "work") {
      var source   = $("#work-template").html();
      var template = Handlebars.compile(source);
      var html     = template(value);
      return new Handlebars.SafeString(html);
    } else {
      return false;
    }
  });
  
  Handlebars.registerHelper('activity', function(activity) {
    var source, template, html;
    switch(activity.verb) {
      case "share":
        source   = $("#reshare-template").html();
        template = Handlebars.compile(source);
        break;
      case "post":
        source   = $("#post-template").html();
        template = Handlebars.compile(source);
        break;
      case "checkin":
        break;
      default:
        break;
    }
    if(template) {
      html = template(activity);
      return new Handlebars.SafeString(html);
    }
  });
  
  Handlebars.registerHelper('stripQuerystring', function(url) {
    return url.split('?')[0];
  });
  
  $.get('https://www.googleapis.com/plus/v1/people/102147307918874735077?key=AIzaSyB14Ua7k5_wusxHTQEH3sqmglO7MHjHPCI&alt=json', function(data){
    var source, template, html;
    source   = $("#header-template").html();
    template = Handlebars.compile(source);
    html     = template(data);
    $("header.hero-unit").append(html);
  
    source   = $("#sidebar-template").html();
    template = Handlebars.compile(source);
    html     = template(data);
    $(".sidebar").append(html);
  }, "jsonp");
  
  $.get('https://www.googleapis.com/plus/v1/people/102147307918874735077/activities/public?alt=json&fields=items(address%2Cannotation%2Cobject(actor(displayName%2Cimage%2Curl)%2Cattachments%2Ccontent%2CobjectType%2CoriginalContent%2Cplusoners%2Creplies%2Cresharers%2Curl)%2CplaceId%2CplaceName%2Cplaceholder%2Cpublished%2Ctitle%2Cupdated%2Curl%2Cverb)%2CnextLink%2CnextPageToken&pp=1&key=AIzaSyB14Ua7k5_wusxHTQEH3sqmglO7MHjHPCI&alt=json', function(data){
    var source, template, html;
    source   = $("#activity-template").html();
    template = Handlebars.compile(source);
    html     = template(data);
    $(".column1").append(html);
  }, "jsonp");
  
  $("a[rel=popover]").popover({
    offset: 10,
    live: true
  });
})(jQuery); 