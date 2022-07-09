<template>
  <form autocomplete="off" class="form" novalidate>
    <slot></slot>
  </form>
</template>

<script>
export default {};
</script>

<style>
.form {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

</style>