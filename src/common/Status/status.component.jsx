import React from 'react';
import iziToast from 'izitoast';

const toaster = (message)=> {
  iziToast.show({
    title: 'SUCCESS',
    position: 'topRight',
    color: 'green',
    message: message,
    progressBarColor: 'rgb(0, 255, 184)',
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
    timeout: 2000,
    titleSize: 'small'
  });
};
export default toaster