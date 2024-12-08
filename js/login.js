// 获取表单元素
const form = document.querySelector("form");
// 获取用户名输入框元素
const usernameInput = document.getElementById("username");
// 获取密码输入框元素
const passwordInput = document.getElementById("password");
// 获取错误提示的div元素
const errorMessageDiv = document.getElementById("error-message");

const back = document.body;
// 为背景图片添加鼠标移动事件监听器
window.onmousemove = function (event) {
  let x = -event.clientX / 2;
  let y = -event.clientY / 3;
  back.style.backgroundPositionX = x + "px";
  back.style.backgroundPositionY = y + "px";
};
// 为表单的提交事件添加监听器
form.addEventListener("submit", function (e) {
  // 阻止表单默认的提交行为，这样可以先进行自定义验证
  e.preventDefault();

  // 获取用户输入的用户名和密码
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username === "1960341843" && password === "123456") {
    // 如果验证通过，使用window.location.href进行页面跳转
    window.location.href = "./html/home.html";
  } else {
    // 如果验证不通过，显示错误提示div，并设置提示内容
    errorMessageDiv.style.display = "block";
    errorMessageDiv.textContent = "用户名或密码错误，请重新输入";
  }
});

function hideErrorMessage() {
  errorMessageDiv.style.display = "none";
}

usernameInput.addEventListener("input", hideErrorMessage);
passwordInput.addEventListener("input", hideErrorMessage);
