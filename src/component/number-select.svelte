<script context="module">
    const ops = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    }
    const opList = [
        ["+", "+"],
        ["-", "-"],
        ["*", "×"],
        ["/", "÷"],
    ]

    export {ops}
</script>

<script>
    import {
        Button,
        Card,
    } from "svelte-doric"

    import {createEventDispatcher} from "svelte"

    import ToggleButton from "./number-select/toggle-button.svelte"

    export let numbers
    export let path = []

    let first = null
    let second = null
    let op = null

    const dispatch = createEventDispatcher()
    const checkSolution = () => dispatch(
        "check",
        {
            path,
        }
    )
    const clear = () => {
        first = null
        second = null
        op = null
    }
    const toggle = index => {
        if (first === null) {
            first = index
            return
        }

        if (second === null && first !== index) {
            second = index
            return
        }
    }

    const calc = (first, second, op) => {
        if (first === null || second === null || op === null) {
            return null
        }

        const left = numbers[first]
        const right = numbers[second]
        const value = ops[op](left, right)

        if (value < 0 || (value % 1) !== 0) {
            return null
        }

        return value
    }
    const mod = (first, second, numbers, next) => [
        ...numbers.filter(
            (_, i) => (
                i !== first
                && i !== second
            )
        ),
        next
    ]

    $: empty = (
        first === null
        && second === null
        && op === null
    )
    $: hasValue = (
        first !== null
        && second !== null
        && op !== null
    )
    $: next = calc(first, second, op)
    $: nextPath = [
        ...path,
        {
            op,
            value: next,
            left: numbers[first],
            right: numbers[second],
        }
    ]
</script>

<style>
    number-grid, op-grid {
        display: grid;
        gap: 4px;
        grid-auto-rows: 28px;
    }
    number-grid {
        grid-area: numbers;
        grid-template-columns: repeat(3, 1fr);
    }
    op-grid {
        grid-template-columns: 1fr 1fr;
        font-size: 20px;
        grid-area: ops;
    }

    .next {
        display: none;
    }

    controls-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "content numbers"
            "content ops"
        ;
        gap: 2px;
        padding: 2px;
    }
    content-area {
        display: grid;
        grid-area: content;
    }
</style>

{#if next !== null}
    <svelte:self
        numbers={mod(first, second, numbers, next)}
        path={nextPath}
        on:check
    />
{/if}

<Card>
    <controls-grid>
        <number-grid class:next={next !== null}>
            {#each numbers as number, index}
                <ToggleButton
                    text={number}
                    onColor="primary"
                    on={first === index || second === index}
                    action={() => toggle(index)}
                />
            {/each}
        </number-grid>
        <op-grid class:next={next !== null}>
            {#each opList as [operator, text]}
                <ToggleButton
                    {text}
                    onColor="secondary"
                    on={op === operator}
                    action={() => op = operator}
                />
            {/each}
        </op-grid>
        <content-area>
            {#if !empty}
                <div>
                    <Button color="danger" on:tap={clear}>
                        Clear
                    </Button>
                    {numbers[first] ?? ""} {op ?? ""} {numbers[second] ?? ""}
                    {#if hasValue}
                        {#if next !== null}
                            = {next}
                        {:else}
                            Not valid
                        {/if}
                    {/if}
                </div>
            {:else if path.length > 0}
                <Button color="secondary" on:tap={checkSolution}>
                    Check
                </Button>
            {/if}
        </content-area>
    </controls-grid>
</Card>
