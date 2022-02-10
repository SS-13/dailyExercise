/*
完善下面函数，实现图片加载
function createImg(url){}
createImg(url).then(img=> {
    document.body.appendChild(value)
})
*/

function createImg(url) {
  return new Promise((resolve, reject) => {
    if (url) {
      let imgEle = document.createElement("img");
      imgEle.src = url;
      resolve(imgEle);
    } else {
      reject("Couldn't' read empty url");
    }
  });
}

createImg(
  "https://www.google.com/imgres?imgurl=https%3A%2F%2Frumenz.com%2Fstatic%2Fcimg%2Fimg%2Fdemo2.jpg&imgrefurl=https%3A%2F%2Frumenz.com%2Fcss%2Fcss_image_gallery.html&tbnid=-jU8YIo2rZ_g_M&vet=12ahUKEwih4o2f8av1AhWCTPUHHXsKDFUQMygAegUIARCyAQ..i&docid=2mdoKxGiyn1okM&w=1920&h=1080&itg=1&q=%E5%9B%BE%E7%89%87&ved=2ahUKEwih4o2f8av1AhWCTPUHHXsKDFUQMygAegUIARCyAQ"
).then((img) => {
  document.body.appendChild(img);
});

function createImg2(url, delay) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    setTimeout(() => {
      resolve(img);
    }, delay);
  });
}

createImg2("1.jpg", 1000)
  .then((img) => {
    document.body.appendChild(img);
    return createImg2("2.jpg", 2000);
  })
  .then((img) => {
    document.body.appendChild(img);
    return createImg2("3.jpg", 3000);
  })
  .then((img) => {
    document.body.appendChild(img);
  });
