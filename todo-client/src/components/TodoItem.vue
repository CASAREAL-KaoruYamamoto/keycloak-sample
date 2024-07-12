<script setup>
// properties
const props = defineProps({
    todoItem: Object
});
// events
const emit = defineEmits(['complete']);

// event handlers
const handleComplete = id => emit('complete', id);
</script>

<template>
    <li>
        <button @click="handleComplete(todoItem.id)">完了</button>
        <span>{{ todoItem.title }}</span>
    </li>
</template>

<style scoped>
li {
    list-style: none;
}
</style>