import { ToastsStore as DefaultToast } from 'react-toasts';

const TIMER = 5000;
const ToastsStore = {
  success: (message: string | HTMLElement) =>
    DefaultToast.success(message, TIMER),
  warning: (message: string | HTMLElement) =>
    DefaultToast.warning(message, TIMER),
  error: (message: string | HTMLElement) => DefaultToast.error(message, TIMER),
  info: (message: string | HTMLElement) => DefaultToast.info(message, TIMER),
};

export default ToastsStore;
