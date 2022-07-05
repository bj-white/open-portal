<template>
  <div>
    <div><router-link to="/list">user-list</router-link></div>
    <div><router-link to="/detail">user-detail</router-link></div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
