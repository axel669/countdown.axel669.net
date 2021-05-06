<script>
    import {
        Button,
        Card,
    } from "svelte-doric"

    import {ops} from "./number-select.svelte"

    export let best
    export let dist
    export let gameInfo
    export let path
</script>

<style>
    solution-display {
        display: grid;
        grid-template-columns: 1fr 1fr;

        padding: 4px;
        gap: 4px;
    }
    solution-header {
        display: grid;
        grid-column: span 2;
    }
</style>

<solution-display>
    <solution-header>
        <Card>
            <card-content>
                Target was: {gameInfo.target}
            </card-content>
        </Card>
    </solution-header>
    <Card>
        <card-content>
            You were {dist} away
            <hr />
            {#each path as {left, right, op, value}}
                <div>
                    {left} {op} {right} = {value}
                </div>
            {/each}
        </card-content>
    </Card>

    <Card>
        <card-content>
            Best was {best.dist} away
            <hr />
            {#each best.path as [left, right, op]}
                <div>
                    {left} {op} {right} = {ops[op](left, right)}
                </div>
            {/each}
        </card-content>
    </Card>
</solution-display>
