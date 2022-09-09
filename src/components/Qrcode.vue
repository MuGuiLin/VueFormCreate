<template>
  <div id="qrCode">
    <div id="code"></div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import QRCode from "qrcode";
export default {
  name: "Qrcode",
  props: {
    url: {
      type: String,
      default: "wwww.baidu.com",
    },
  },
  data() {
    return {
      msg: "hello vue",
      codes: "",
    };
  },

  components: {
    QRCode: QRCode,
  },

  methods: {
    useqrcode() {
      // var canvas = document.getElementById("canvas");
      // QRCode.toCanvas(canvas, this.url, function (error) {
      //   if (error) console.error(error);
      // });

      var qrcode = new QRCode(document.getElementById("code"), {
        width: 201,
        height: 201,
      });

      var url = location.href;
      qrcode.makeCode(url.replace("invitation", "main"));
    },
  },

  mounted() {
    this.useqrcode();
  },
};
</script>
<style lang="less" scoped>
#qrCode {
  text-align: center;
}
</style>