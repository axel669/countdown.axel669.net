const rand = n => Math.floor(
    Math.random() * n
)
const without = (array, index) => array.filter(
    (_, i) => i !== index
)
const select = (n, from) => {
    if (n === 0) {
        return []
    }

    const selected = rand(from.length)

    return [
        from[selected],
        ...select(
            n - 1,
            without(from, selected)
        )
    ]
}

const biggs = [25, 50, 75, 100]
const weirds = [12, 37, 62, 87]
const wedge = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
const genNormalGame = bigguns => {
    const jessie = rand(900) + 100
    const bigs = select(bigguns, biggs)
    const smalls = select(6 - bigguns, wedge)

    return {
        target: jessie,
        numbers: [...bigs, ...smalls],
        id: Date.now()
    }
}
const genWeirdGame = bigguns => {
    const jessie = rand(900) + 100
    const bigs = select(bigguns, weirds)
    const smalls = select(6 - bigguns, wedge)

    return {
        target: jessie,
        numbers: [...bigs, ...smalls],
        id: Date.now()
    }
}

const genGame = (options) => {
    const {biggs, weird} = options
    if (weird === true) {
        return genWeirdGame(biggs)
    }
    return genNormalGame(biggs)
}

export default genGame
// export {
//     genNormalGame,
//     genWeirdGame,
// }
