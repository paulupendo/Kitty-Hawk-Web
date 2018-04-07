
import iziToast from 'izitoast';

const toaster = (message)=> {
  iziToast.success({
    title: 'SUCCESS',
    position: 'topRight',
    color: '#BBF3CA',
    message: message,
    progressBarColor: 'rgb(0, 255, 184)',
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
    timeout: 2000,
    titleSize: 'small'
  });
};
export default toaster