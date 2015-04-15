function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}


$(function(){
  $('#loading-gif').hide();
  $('#modal-error').hide();
  $('.bsod').hide();

  $('.tech-stack').click(function(){
    $('#loading-gif').show();

    var stackName = $(this).attr('data-name');
    $.ajax({ url: '/tweets/'+stackName}).done(function(data){
      $('#results').html('');
      for(var i = 0; i < data.length; i++){
        var li = '<li>' +data[i].username+ ' says: '+ data[i].text + '</li>';
        $('#results').append(li);
      }
      $('#loading-gif').hide();
    }).fail(function(error){
      $('#modal-error').show();
      $('#error-sound')[0].play();
      $('#results').html('');
      throw "Error: " + error.responseText;
    });
  });
  $('#modal-error').click(function() {
    $('#beep-sound')[0].play();
    $('.bsod').show();
    launchIntoFullscreen($('.bsod')[0]);
  });
})
