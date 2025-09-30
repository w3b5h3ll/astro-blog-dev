// document.querySelector(".hamburger").addEventListener("click", () => {
//     document.querySelector(".nav-links").classList.toggle("expanded");
// });

// 获取汉堡按钮和导航菜单
const mobileNavToggle = document.getElementById("mobile-nav-toggle");
const mainNav = document.querySelector(".main-nav");

// 为汉堡按钮添加点击事件
if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener("click", function () {
        // 切换 'is-open' class 来显示或隐藏菜单
        mainNav.classList.toggle("is-open");
    });
}
