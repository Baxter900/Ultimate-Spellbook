AutoForm.addInputType("bootstrap-postthumbnail", {
  template: "afPostThumbnailTitle"
});

var fillEmbedlyData = function (instance) {
  
  // note: the following fields are *not* in the current template
  var $urlField = $('[name="picUrl"]');
  var $titleField = $('[name="title"]');
  var $bodyField = $('[name="body"]');
  var url = $urlField.val();

  var $thumbnailContainer = instance.$('.post-thumbnail-container');
  var $img = instance.$('.post-thumbnail-preview');
  var $thumbnailUrlField = instance.$('[name="thumbnailUrl"]');

  if (!!url) {
    $thumbnailContainer.addClass('loading');
    clearSeenMessages();
    console.log('Title: getting embedly data for '+url);
    Meteor.call('getEmbedlyData', url, function (error, data) {
      if (error) {
        console.log(error)
        flashMessage(error.message, 'error');
        $thumbnailContainer.removeClass('loading');
        return
      }
      if (data) {
        // set thumbnail and fill in thumbnailUrl field
        $img.attr('src', data.thumbnailUrl);
        $thumbnailUrlField.val(data.thumbnailUrl);

        // remove loading class
        $thumbnailContainer.removeClass('loading');

        if (!$titleField.val()) // if title field is empty, fill in title
          $titleField.val(data.title);
        if (!$bodyField.val()) // if body field is empty, fill in body
          $bodyField.val(data.description);
        
      }
    });
  }
}

Template.afPostThumbnailTitle.created = function () {
  var instance = this;
  instance.embedlyKeyExists = new ReactiveVar(false);
  // embedly key is not published to client, so we need a method to test if it has been provided or not
  Meteor.call('embedlyKeyExists', function (error, result) {
    if (result)
      instance.embedlyKeyExists.set(result);
  });
}

Template.afPostThumbnailTitle.helpers({
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    return atts;
  },
  style: function () {
    var thumbnailWidth = getSetting('thumbnailWidth', 200);
    var thumbnailHeight = getSetting('thumbnailHeight', 125);
    return "width: "+thumbnailWidth+"px; height: "+thumbnailHeight+"px;"
  },
  embedlyKeyExists: function () {
    // haven't found a better way to do this yet…
    return Template.instance().embedlyKeyExists.get();
  }
});

Template.afPostThumbnailTitle.rendered = function () {

  var instance = this;
  var $urlField = $('[name="picUrl"]');

  $urlField.change(function (e) {
    fillEmbedlyData(instance);
  });

}

Template.afPostThumbnailTitle.events({
  'click .remove-thumbnail-link': function (e, t) {
    e.preventDefault();
    t.$('.post-thumbnail-preview').attr('src', '');
    t.$('input').val('');
  },
  'click .regenerate-thumbnail-link': function (e, instance) {
    e.preventDefault();
    fillEmbedlyData(instance);
  }
})