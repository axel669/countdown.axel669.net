<script>
    import {
        Button,
        Card,
    } from "svelte-doric"

    import {ops} from "./number-select.svelte"

    export let close
    export let options

    $: best = options.best
</script>

<style>
    solution-display {
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translateX(-50%);
    }
    card-actions[fill] {
        display: grid;
    }
</style>

<solution-display>
    <Card>
        <card-content>
            You were {options.dist} away.
            <div>
                Best solution was {best.dist} away:
                {#each best.path as [left, right, op]}
                    <div>
                        {left} {op} {right} = {ops[op](left, right)}
                    </div>
                {/each}
            </div>
        </card-content>
        <card-actions fill>
            <Button color="secondary" on:tap={close}>
                New Game
            </Button>
        </card-actions>
    </Card>
</solution-display>
