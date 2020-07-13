<template>
  <section class="container" style="background-color: white; width: 128px; height: 250px;">
    <div>
      <div style="font-size: 14px; text-align: center; margin-top: 3px;">
        {{this.$route.query.locale}}
      </div>
      <div style="font-size: 32px; margin-top: 3px; text-align: center;">
        {{ this.$route.query.temp}}
      </div>
      <div v-if="this.$route.query.humidex" style="font-size: 14px; margin-top: 3px; text-align: center;">
        Humidex {{ this.$route.query.humidex}}°C
      </div>
      <div style="font-size: 12px; margin-top: 3px; text-align: center;">
        Humidité {{ this.$route.query.humidity}}%
      </div>
      <div style="font-size: 12px; margin-top: 3px; text-align: center;">
        Vent {{ this.$route.query.wind}}
      </div>

      <div style="font-size: 16px; margin-top: 3px; background-color: black; color: white; padding: 3px;">
        {{ this.$route.query.prediction}}
      </div>


      <div style="font-size: 12px; margin-top: 0px; margin-left: 3px; margin-right: 3px; text-align: center;">
       {{ this.$route.query.sun }} - {{ this.$route.query.moon }}
      </div>
      <hr style="border: 1px solid black; margin: 0; padding: 0; margin-block-start: 0; margin-block-end: 0;" />

      <div style="font-size: 12px; margin-top: 1px; margin-left: 3px; margin-right: 3px;">
        {{ this.$route.query.date }}
      </div>

      <hr style="border: 1px solid black; margin: 0; padding: 0; margin-block-start: 0; margin-block-end: 0;" />
     
    </div>
  </section>
</template>

<script>

</script>

<style>

</style>
