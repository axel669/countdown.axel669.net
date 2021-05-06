<script context="module">
    const defaultOptions = JSON.stringify({
        biggs: 0,
        weird: false,
    })
</script>

<script>
    import {
        Button,
        Card,
        Checkbox,
        Radio,
    } from "svelte-doric"

    export let close

    let {biggs, weird} = JSON.parse(
        localStorage.numbersGameOptions ?? defaultOptions
    )

    const cancel = () => close(false)
    const newGame = () => {
        const options = {biggs, weird}
        localStorage.numbersGameOptions = JSON.stringify(options)
        close(options)
    }
</script>

<style>
    new-game-display {
        position: absolute;
        top: 15%;
        left: 50%;
        width: 70vw;
        transform: translateX(-50%);
    }
    card-actions[fill] {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    biggs-options {
        display: flex;
        flex-direction: column;
    }
</style>

<new-game-display>
    <Card>
        <card-content>
            Big Numbers:
            <biggs-options>
                <Radio value={0} bind:group={biggs}>0</Radio>
                <Radio value={1} bind:group={biggs}>1</Radio>
                <Radio value={2} bind:group={biggs}>2</Radio>
                <Radio value={3} bind:group={biggs}>3</Radio>
                <Radio value={4} bind:group={biggs}>4</Radio>
            </biggs-options>
            <Checkbox bind:checked={weird}>
                Use Wierd Big Numbers
            </Checkbox>
        </card-content>
        <card-actions fill>
            <Button color="danger" on:tap={cancel}>
                Cancel
            </Button>
            <Button color="secondary" on:tap={newGame}>
                New Game
            </Button>
        </card-actions>
    </Card>
</new-game-display>
