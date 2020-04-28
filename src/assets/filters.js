import moment from 'moment';
import Vue from 'vue';

Vue.filter('formatTime', (value) => {
  return moment(value).fromNow();
});
