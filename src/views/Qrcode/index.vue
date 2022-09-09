<template>
  <Layout class="qrcode">
    <div class="create">
      <input type="text" v-model="text" />
      <button @click="create()">生成二维码</button>
      <div id="code-box" ref="qrcode"></div>
    </div>

    <div class="reader">
      <input type="text" v-model="result" />
      <button>
        <input type="file" @change="upload($event)" />
        识别二维码
      </button>
      <br>
      <img :src="img" alt="识别二维码" />
    </div>
  </Layout>
</template>

<script>
import QRCode from "qrcodejs2";
import jsQR from "jsqr";
import Jimp from "jimp";
import img from "@/assets/imgs/www.muguilin.com.png";

export default {
  name: "Qrcode",
  data() {
    return {
      text: "http://www.muguilin.com",
      qrcode: Object,
      img,
      result: 'http://www.muguilin.com'
    };
  },

  methods: {
    init() {
      this.qrcode = new QRCode("code-box", {
        width: 260,
        height: 260,
        border: 2,
        text: this.text,          // 二维码内容
        colorDark: "blueviolet",  //前景色
        colorLight: "#ffffff",    //背景色
      });
    },
    create() {
      this.qrcode.makeCode(this.text);
    },
    upload(e) {
      const file = e.target.files[0];
      const createObjectURL = window.createObjectURL || window.URL.createObjectURL || window.webkitURL.createObjectUR;
      this.img = createObjectURL(file);

      // https://developer.mozilla.org/en-US/docs/Web/API/ImageData
      // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader

      const reader = new FileReader();
      // reader.readAsDataURL(file); //Base64
      // reader.readAsBinaryString(file); // 原始二进制
      reader.readAsArrayBuffer(file); //ArrayBuffer
      reader.onload = () => {
        this.img2 = reader.result;
        console.log(reader.result);

        const jpegData = Buffer.from(reader.result, "base64");
        console.log(jpegData);

        Jimp.read(reader.result)
          .then((blockimg) => {
            let width = blockimg.bitmap.width,
              height = blockimg.bitmap.height,
              imgData = blockimg.bitmap.data;
            console.log(width);
            try {
              const { data } = jsQR(imgData, width, height);
              console.log("识别结果：", data);
              this.result = data;
              // window.open(code.data);
            } catch (error) {
              console.error("识别失败：", error);
            }
          })
          .catch(function (err2) {
            if (err2) {
              console.log(err2);
            }
          });
      };

      this.qrcode.decode(url);
      // this.qrcode.callback = function (imgMsg) {
      //   console.log("imgMsg", imgMsg);
      // };
    },
  },

  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.qrcode {
  box-sizing: border-box;
  margin: 30px auto;
  text-align: center;

  .create {
    #code-box {
      width: 300px;
      margin: 30px auto;
      padding: 20px;
      border: 2px solid blueviolet;
    }
  }


  .reader {
    button {
      position: relative;

      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }

    img {
      margin: 30px auto;
      width: 300px;
      height: 300px;
      padding: 20px;
      border: 2px solid blueviolet;
    }
  }
}
</style>
