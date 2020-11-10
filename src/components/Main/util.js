export const getId = (string) => {
  return string.match(/(?:-)(\d+)$/)[1]; // match number after last - (dash)
};

export const observe = (target, isCb, isNotCb = () => {return null}, options) => {
  const observer = new IntersectionObserver(
    (entries) => {
    if (entries[0].isIntersecting) {
      isCb(entries[0]);
    }
      
    if (!entries[0].isIntersecting) {
      isNotCb(entries[0]);
    }
    },
    options
  );
  return observer.observe(target);
};