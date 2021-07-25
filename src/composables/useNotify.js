import { Notify } from 'quasar';

export default function useNotify() {
  const showNotif = (props) => {
    Notify.create({
      color: props.color || '',
      textColor: props.textColor || '',
      icon: props.icon || null,
      message: props.message || '',
      position: props.position || '',
      avatar: props.avatar || '',
    });
  };
  return {
    showNotif,
  };
}
