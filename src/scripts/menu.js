// 确保脚本在 DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.getElementById("mobile-nav-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener("click", () => {
            mainNav.classList.toggle("is-open");
            // 添加 aria-expanded 属性以提高可访问性
            const isOpen = mainNav.classList.contains("is-open");
            mobileNavToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }
});
