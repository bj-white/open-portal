<template>
  <div>
    <div class="item_wrapper" :class="{ active: item.active }" v-for="item in tabs" :key="item.id">
      <i v-if="!item.disabled" @click="$emit('handleClose', item.id)">&times;</i>
      <span @click="$emit('handleSwitch', item.id)">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array
    }
  }
}
</script>

<style scoped lang="scss">
  .item_wrapper {
    height: 24px;
    line-height: 22px;
    border-radius: 4px;
    margin-right: 8px;
    padding: 0 10px;
    border: 1px solid #ddd;
    cursor: pointer;
    &.active {
      span {
        color: red;
      }
    }
    i {
      margin-right: 5px;
      font-style: normal;
      font-size: 16px;
    }
  }
</style>
