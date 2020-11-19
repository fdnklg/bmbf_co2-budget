export const parseData = data => {
	const dataKeys = ['emissions', 'emissionsDetail'];
	let parsed = {};

	dataKeys.map(key => {
		let selectedData = data[key];
		selectedData.d = selectedData.d
			.sort((a, b) => b.value - a.value)
			.map((d) => {
				d.x = parseFloat((d.value * 100).toFixed(1));
				d.y = 1;
				return d;
			});
		parsed[key] = selectedData;
	})

	return parsed;
}

export const observe = (target) => {
  const observer = new IntersectionObserver(entries => {
		if (entries[0].isIntersecting) {
      console.log(`${entries[0].target.id} INTERSECTING, Visible: ${entries[0].isVisible}`)
    } 
  }, {
    threshold: [.75],
    delay: 100,
    trackVisibility: true
  });
  return observer.observe(target);
};