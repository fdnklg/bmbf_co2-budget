export const getId = (string) => {
	return string.match(/(?:-)(\d+)$/)[1]; // match number after last - (dash)
};

export const observe = (target, isCb, isNotCb = () => {return null}) => {
	const observer = new IntersectionObserver(
		(entries) => {

			if (entries[0].isIntersecting) {
				isCb();
			}
				
			if (!entries[0].isIntersecting) {
				isNotCb();
			}
			
		},
		{
			threshold: [0.9],
			delay: 100,
			trackVisibility: true,
		}
	);
	return observer.observe(target);
};