export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const scrollToTop = (smooth = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};
