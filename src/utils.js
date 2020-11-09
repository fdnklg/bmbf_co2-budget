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