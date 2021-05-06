const desc = (a, b) => b - a

const ops = [
    ["+", (a, b) => a + b],
    ["-", (a, b) => (a <= b) ? null : a - b],
    ["*", (a, b) => (a === 1 || b === 1) ? null : a * b],
    ["/", (a, b) => (a === 1 || b === 1 || a <= b || (a % b) !== 0) ? null : a / b],
    // ["|", (a, b) => `${a}${b}`]
]

const pairs = nums => {
    const list = []

    nums.forEach(
        (n, index) => list.push(
            ...nums.slice(index + 1).map(m => [n, m])
        )
    )

    return list
}

const choices = [
    pairs([0, 1]),
    pairs([0, 1, 2]),
    pairs([0, 1, 2, 3]),
    pairs([0, 1, 2, 3, 4]),
    pairs([0, 1, 2, 3, 4, 5]),
]

let _best = {
    dist: Infinity,
    path: Array.from({ length: 6 })
}
const solve = (target, nums, history = [], best = { ..._best }) => {
    if (nums.length === 1) {
        return
    }
    const pairs = choices[nums.length - 2]
    nums.sort(desc)

    for (const [firstIndex, secondIndex] of pairs) {
        for (const [opName, op] of ops) {
            const first = nums[firstIndex]
            const second = nums[secondIndex]
            const newNum = op(first, second)
            if (newNum !== null) {
                const set = [
                    newNum,
                    ...nums.filter(
                        (_, index) => (
                            index !== firstIndex
                            && index !== secondIndex
                        )
                    )
                ]
                const path = [
                    ...history,
                    [first, second, opName]
                ]
                const dist = Math.min(
                    ...set.map(n => Math.abs(target - n))
                )
                const isBetterSolution = (
                    dist < best.dist
                    || (
                        dist === best.dist
                        && path.length < best.path.length
                    )
                )
                if (isBetterSolution) {
                    best.dist = dist
                    best.path = path
                }
                if (set.includes(target) === false) {
                    solve(target, set, path, best)
                }
            }
        }
    }
    return best
}

export default solve
