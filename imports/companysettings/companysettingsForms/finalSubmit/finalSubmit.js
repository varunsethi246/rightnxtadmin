import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import './finalSubmit.html';

Template.body.events({ 

'click #submitHr': function(event) {
     $('#snow').show();
     $(".thankYouFirstLine").fadeIn(5000, 0.3);
   },
});
