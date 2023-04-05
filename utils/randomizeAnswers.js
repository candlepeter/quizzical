function randomizeAnswers(arr) {
    let unshuffled = arr

    let shuffled = unshuffled
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    
    return shuffled
}

export default randomizeAnswers