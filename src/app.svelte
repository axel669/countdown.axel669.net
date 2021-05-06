<script>
    import {
        AppStyle,
        Baseline as baseline,
        TronTheme as theme,

        Adornment,
        Button,
        TitleBar,

        Dialog,
        Alert,
    } from "svelte-doric"

    import NumberSelect from "./component/number-select.svelte"
    import SolutionDisplay from "./component/solution-display.svelte"
    import NewGameOptions from "./component/new-game-options.svelte"

    import genGame from "./numbers/gen.js"
    import solve from "./numbers/solve.js"

    let game = null
    let newGameOptions = null
    const newGame = async () => {
        const options = await newGameOptions.show()

        if (options === false) {
            return
        }

        console.log(options)
        checkScreen = null
        game = genGame(options)
    }

    let checkScreen = null
    const check = async (evt) => {
        const {path} = evt.detail
        const gameInfo = game
        const best = solve(game.target, game.numbers)
        const dist = Math.abs(
            game.target - path.slice(-1)[0].value
        )

        game = null
        checkScreen = {
            dist,
            path,
            gameInfo,
            best,
        }
    }
</script>

<style>
    guess-layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 4px;
        padding: 4px;
    }
</style>

<AppStyle {baseline} {theme} />

<TitleBar sticky>
    <title-text>
        {#if game}
            Target: {game.target}
        {:else}
            Countdown Numbers
        {/if}
    </title-text>

    <Adornment position="end">
        <Button on:tap={newGame}>
            New
        </Button>
    </Adornment>
</TitleBar>

{#if game}
    <guess-layout>
        {#key game.id}
            <NumberSelect numbers={game.numbers} on:check={check} />
        {/key}
    </guess-layout>
{/if}
{#if checkScreen}
    <SolutionDisplay {...checkScreen} />
{/if}

<Dialog bind:this={newGameOptions} let:close forceInteraction>
    <NewGameOptions {close} />
</Dialog>
