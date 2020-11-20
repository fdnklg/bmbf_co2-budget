import {dsvFormat} from 'd3-dsv';

export const parseData = data => {
	const emissionKeys = ['start', 'transition', 'zoom'];

	let parsed = {
		emissions: {}
	};

	emissionKeys.map(key => {
		let selectedData = data.emissions[key];
		selectedData.d = selectedData.d
			.sort((a, b) => b.value - a.value)
			.map((d) => {
				d.x = parseFloat((d.value * 100).toFixed(1));
				d.y = 1;
				return d;
			});
		parsed.emissions[key] = selectedData;
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

export const loadFile = async (filePath, delimiter = ',') => {
  const csv = dsvFormat(delimiter);

  const res = await fetch(filePath);
  const text = await res.text();

  return csv.parse(text);
};