// 获取页面上所有的图片元素
var imgs = document.querySelectorAll("img");
// 获取页面上所有的span元素，这里假设它们是轮播的控制按钮
var btns = document.querySelectorAll("span");
// 获取页面上的点选元素，用于指示当前播放的图片
var ul = document.querySelector(".points");
// 获取所有的li元素，这里假设它们是点选的列表项
var lis = document.getElementsByTagName("li");
// 定义一个定时器变量，用于控制自动播放
var timer;
// 当前播放图片的索引
var current = 0;
// 点击防抖节流的标记
var flag = true;
// 图片的总长度
var len = imgs.length;
// 初始化函数，加载页面时执行
function loadFirst() {
  imgMove();
  bind();
  btnClick();
  getDot();
  showDot();
  autoPlay();
}
// 调用初始化函数
loadFirst();

// 图片移动效果函数
function imgMove() {
  var mlen = Math.floor(len / 2); // 计算一半的长度，用于左右两边的图片
  for (var i = 0; i < mlen; i++) {
    // 计算当前播放图片的左右相邻图片的索引值
    var rimg = current + 1 + i;
    var limg = len + current - 1 - i;
    // 如果索引超出图片数组长度，循环回数组的开始
    if (rimg >= len) {
      rimg -= len;
    }
    if (limg >= len) {
      limg -= len;
    }
    // 设置左右两边图片的3D变换效果
    imgs[limg].style.transform = `translateX(${150 * (i + 1)}px) translateZ(${
      200 - i * 100
    }px) rotateY(-30deg)`;
    imgs[rimg].style.transform = `translateX(${-150 * (i + 1)}px) translateZ(${
      200 - i * 100
    }px) rotateY(30deg)`;
  }
  // 设置当前播放图片的3D变换效果
  imgs[current].style.transform = `translateZ(300px)`;
}

// 自动播放的函数
function autoPlay() {
  // 设置定时器，每隔3秒自动播放下一张图片
  timer = setInterval(function () {
    if (current >= len - 1) {
      current = 0;
    } else {
      current++;
    }
    imgMove();
    autoLi();
  }, 3000);
}

// 点击图片进行播放
function bind() {
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].onclick = function () {
      current = i; // 设置当前播放图片的索引
      imgMove();
      autoLi();
    };
    imgs[i].onmouseover = function () {
      clearInterval(timer); // 鼠标悬停在图片上时，停止自动播放
    };
    imgs[i].onmouseout = function () {
      autoPlay(); // 鼠标离开图片时，恢复自动播放
    };
  }
}

// 点击左右按钮
function btnClick() {
  for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
      // 防止狂点击
      if (!flag) {
        return;
      }
      flag = false;
      if (i == 0) {
        // 上一张
        if (current <= 0) {
          current = len - 1;
        } else {
          current--;
        }
      } else {
        // 下一张
        if (current >= len - 1) {
          current = 0;
        } else {
          current++;
        }
      }
      setTimeout(function () {
        flag = true;
      }, 1000); // 1秒后允许再次点击

      imgMove();
      autoLi();
    };
    btns[i].onmouseenter = function () {
      clearInterval(timer); // 鼠标悬停在按钮上时，停止自动播放
    };
    btns[i].onmouseout = function () {
      autoPlay(); // 鼠标离开按钮时，恢复自动播放
    };
  }
}

// 生成点选元素
function getDot() {
  for (var i = 0; i < len; i++) {
    ul.innerHTML += `<li></li>`; // 在点选容器中添加li元素
  }
  lis[0].classList.add("current"); // 默认第一个点选为当前
}

// 显示点选
function showDot() {
  for (let i = 0; i < len; i++) {
    lis[i].onclick = function () {
      for (var j = 0; j < len; j++) {
        lis[j].classList.remove("current"); // 移除所有点选的当前状态
      }
      this.classList.add("current"); // 设置当前点击的点选为当前状态
      current = i; // 设置当前播放图片的索引
      imgMove();
    };
  }
}

// 自动更新点选状态
function autoLi() {
  for (var i = 0; i < len; i++) {
    if (i == current) {
      lis[i].classList.add("current"); // 设置当前播放图片对应的点选为当前状态
      imgs[i].style.filter = "grayscale(0)";
    } else {
      lis[i].classList.remove("current"); // 移除其他点选的当前状态
      imgs[i].style.filter = "grayscale(100%)";
    }
  }
}
