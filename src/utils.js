import { dsvFormat } from 'd3-dsv';
import { colorsSektoren } from './config';

export const lightenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = (num >> 8 & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
};

export const parseDataEmissionen = data => {
    const emissionKeys = Object.keys(data.emissionen);

	let parsed = {};

	emissionKeys.map(key => {
		let selectedData = data.emissionen[key];
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

export const parseDataSektoren = (data, config) => {
    config = config.sektoren;
    const keys = Object.keys(config);
    keys.map(key => {

        const d = data.map(sektor => {
            const years = Object.keys(sektor);
            years.length = years.length - 1

            const data = years.map(year => ({ x: parseFloat(year), y: 100 + parseFloat(sektor[year]) }));
            
            return {
                name: sektor.sector,
                data: data,
                highlight: config[key].highlight.includes(sektor.sector),
                color: colorsSektoren.find(d => d.name === sektor.sector).color
            }
        })
        
        config[key].d = d;
    })

    return config;
}

export const parseDataSzenarien = (config) => {
    return config.szenarien;
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

export const nextUntil = function(originalElement, selector, includeLast) {
  const siblings = [];
  let nextElement = originalElement.nextSibling;
  while (nextElement) {
    if (
      nextElement.nodeType === Node.ELEMENT_NODE &&
      nextElement.matches(selector)
    ) {
      if (includeLast) {
        siblings.push(nextElement);
      }
      break;
    }
    siblings.push(nextElement);
    nextElement = nextElement.nextSibling;
  }

  return siblings;
};


export const loadJson = async (filePath) => {
    const res = await fetch(filePath);
    return res.json();
}