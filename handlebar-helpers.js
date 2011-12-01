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