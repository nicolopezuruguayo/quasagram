<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="constrain">
        <q-btn
          flat
          dense
          round
          color="primary"
          icon="eva-camera-outline"
          size="18px"
          class="large-screen-only q-mr-sm"
          to="/camera"
        />
        <q-separator vertical class="large-screen-only" spaced />
        <q-toolbar-title class="text-grand-hotel text-bold text-h5">
          Quasagram
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          color="primary"
          icon="eva-home-outline"
          size="18px"
          class="large-screen-only"
          to="/"
        />
      </q-toolbar>
    </q-header>
    <q-footer bordered class="bg-white small-screen-only">
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/" icon="eva-home-outline" />
        <q-route-tab to="/camera" icon="eva-camera-outline" />
      </q-tabs>
    </q-footer>
    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  }
};
</script>

<style lang="sass">
.q-toolbar
  @media (min-width: $breakpoint-sm-min)
    height: 77px
.q-footer
  .q-tab__icon
    font-size: 30px

.q-toolbar__title
  font-size: 30px
  @media (max-width: $breakpoint-xs-max)
    text-align: center
</style>
