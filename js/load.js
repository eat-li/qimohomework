window.onload = function () {
  // 获取.box1元素，也就是动画加载元素
  const box1 = document.querySelector(".box1");
  const box = document.querySelector(".box");
  // 获取body元素
  const body = document.body;

  // 设置延迟时间，单位是毫秒，这里设置为3000毫秒，即3秒，你可以根据实际需求调整这个时间
  const delayTime = 3000;

  // 给box1元素添加动画结束的监听器
  box1.addEventListener("animationend", function () {
    // 动画结束后，移除body元素上的模糊类，使其恢复清晰并可交互
    body.classList.remove("blur");
  });

  // 使用setTimeout函数来设置延迟执行的代码块，同时添加模糊类
  setTimeout(function () {
    // 给body元素添加模糊类，使其呈现模糊效果
    box.style.filter = "blur(0)";
    box.style.tranform = "scale(1.1)";
    box.style.pointerEvents = "all";
    // 隐藏box1元素，通过修改它的display属性为none，使其不显示
    box1.style.display = "none";
  }, delayTime);
};
