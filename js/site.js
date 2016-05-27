$(document).on('ready', function() {
  var now = moment();
  
  $('.ho-hours li').each(function() {
    var elem = $(this)
      , dateOpen = new Date()
      , dateClose = new Date()
      , schedule = {}
      , isOpen = false;
    schedule.days = elem.data('days');
    schedule.open = elem.data('open');
    schedule.openFor = elem.data('openFor');
    if (schedule.days === undefined || schedule.open === undefined || schedule.openFor === undefined) return;
    
    schedule.days = typeof(schedule.days) == 'string' ? schedule.days.split(',') : [schedule.days];
    schedule.open = schedule.open.split(':');
    schedule.openFor = schedule.openFor.split(':');
    
    schedule.days.forEach(function(d) {
      var open = moment().weekday(d).hour(schedule.open[0]).minute(schedule.open[1]).startOf('minute')
        , close = open.clone().add(schedule.openFor[0], 'hours').add(schedule.openFor[1], 'minutes')
      isOpen = now >= open && now < close;
      
      if (isOpen) {
        elem
          .prepend('<i class="fa fa-arrow-circle-right" style="margin-right:6px;"></i>')
          .append('<i class="fa fa-arrow-circle-left" style="margin-left:6px;"></i>');
      }
    });
    
    if (!isOpen && schedule.days.indexOf(now.day()) != -1) {
      elem
        .prepend('<i class="fa fa-arrow-circle-right" style="margin-right:6px;"></i>')
        .append('<i class="fa fa-arrow-circle-left" style="margin-left:6px;"></i>');
    }
    
  });
  
});