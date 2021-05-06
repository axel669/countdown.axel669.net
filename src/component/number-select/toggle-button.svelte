<script context="module">
    const bool = condition =>
        condition
            ? (t, f) => t
            : (t, f) => f
</script>

<script>
    import {Button} from "svelte-doric"

    export let text
    export let on
    export let onColor
    export let action

    $: isOn = bool(on)
    $: variant = isOn("fill", "outline")
    $: color = isOn(onColor, null)
</script>

<Button {color} {variant} on:tap={action}>
    {text}
</Button>
