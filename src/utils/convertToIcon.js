/** @format */

export const convertToIcon = (text) => {
  text = text.replace(/<3/g, '❤️');
  text = text.replace(/:\)/g, '😊');
  text = text.replace(/:D/g, '😄');
  text = text.replace(/:v/g, '😆');
  text = text.replace(/:o/g, '😮');
  text = text.replace(/:3/g, '😸');
  text = text.replace(/\(y\)/g, '👍');
  return text;
};

export default convertToIcon;
