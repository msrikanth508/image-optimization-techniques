export default (callback, config = {}) =>
 {
  const observer = new IntersectionObserver(entries => {
    entries.filter(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        // remove observer
        observer.unobserve(entry.target);
      }
    });
  }, config);

  return observer;
 };
