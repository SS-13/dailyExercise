async function handleChange(file) {
  const fileObj = file.raw;
  try {
    const buffer = await this.fileToBuffer(fileObj);
    console.log(buffer);
  } catch (e) {
    console.log(e);
  }
}

// 将 File 对象转为 ArrayBuffer
function fileToBuffer(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = (e) => {
      resolve(e.target.result);
    };
    fr.readAsArrayBuffer(file);
    fr.onerror = () => {
      reject(new Error('转换文件格式发生错误'));
    };
  });
}

const chunkSize = 2097152,
  chunkList = [], // 保存所有切片的数组
  chunkListLength = Math.ceil(fileObj.size / chunkSize), // 计算总共多个切片
  suffix = /\.([0-9A-z]+)$/.exec(fileObj.name)[1]; // 文件后缀名

// 根据文件内容生成 hash 值
const spark = new SparkMD5.ArrayBuffer();
spark.append(buffer);
const hash = spark.end();

// 生成切片，这里后端要求传递的参数为字节数据块（chunk）和每个数据块的文件名（fileName）
let curChunk = 0; // 切片时的初始位置
for (let i = 0; i < chunkListLength; i++) {
  const item = {
    chunk: fileObj.slice(curChunk, curChunk + chunkSize),
    fileName: `${hash}_${i}.${suffix}`, // 文件名规则按照 hash_1.jpg 命名
  };
  curChunk += chunkSize;
  chunkList.push(item);
}
console.log(chunkList);

function sendRequest() {
  const requestList = []; // 请求集合
  this.chunkList.forEach((item) => {
    const fn = () => {
      const formData = new FormData();
      formData.append('chunk', item.chunk);
      formData.append('filename', item.fileName);
      return axios({
        url: '/single3',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      }).then((res) => {
        if (res.data.code === 0) {
          // 成功
          if (this.percentCount === 0) {
            this.percentCount = 100 / this.chunkList.length;
          }
          this.percent += this.percentCount; // 改变进度
        }
      });
    };
    requestList.push(fn);
  });

  let i = 0; // 记录发送的请求个数
  const send = async () => {
    // if ('暂停') return
    if (i >= requestList.length) {
      // 发送完毕
      return;
    }
    await requestList[i]();
    i++;
    send();
  };
  send(); // 发送请求
}
