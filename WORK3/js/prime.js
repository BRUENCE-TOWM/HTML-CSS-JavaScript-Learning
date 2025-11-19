// 粒子背景生成函数
function createParticles() {
    const container = document.getElementById('particle-container');
    const particleCount = 50; // 粒子数量
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // 随机大小、位置和动画延迟
        const size = Math.random() * 10 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        // 根据数字类型设置粒子颜色倾向
        const colors = [
            'rgba(75, 192, 192, 0.3)',    // 素数色调
            'rgba(255, 99, 132, 0.3)',    // 合数色调
            'rgba(255, 206, 86, 0.3)'     // 特殊数色调
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
    }
}

// 素数判断函数
function IsPrime(n) {
    if (typeof n !== 'number' || n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

// 创建表格函数
function TableCreate() {
    let tableHtml = '<table class="prime-table">';
    let cnt = 1;
    
    for (let row = 0; row < 10; row++) {
        tableHtml += '<tr>';
        for (let col = 0; col < 10; col++) {
            let classname, tooltip;
            
            if (cnt === 1) {
                classname = 'number-1';
                tooltip = '1既不是素数也不是合数';
            } else if (IsPrime(cnt)) {
                classname = 'prime';
                tooltip = `${cnt}是素数（只能被1和自身整除）`;
            } else {
                classname = 'composite';
                tooltip = `${cnt}是合数（除了1和自身还有其他因数）`;
            }
            
            const delay = (row * 10 + col) * 30;
            tableHtml += `
                <td 
                    class="${classname}" 
                    data-number="${cnt}"
                    data-tooltip="${tooltip}"
                    style="animation-delay: ${delay}ms"
                >
                    ${cnt}
                </td>
            `;
            cnt++;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    return tableHtml;
}

// 创建点击特效
function createClickEffect(x, y, color) {
    const container = document.getElementById('click-effects');
    const effect = document.createElement('div');
    effect.classList.add('click-effect');
    
    // 设置特效位置、大小和颜色
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    effect.style.width = '60px';
    effect.style.height = '60px';
    effect.style.border = `3px solid ${color}`;
    effect.style.boxShadow = `0 0 15px ${color}`;
    
    container.appendChild(effect);
    
    // 动画结束后移除元素
    setTimeout(() => {
        effect.remove();
    }, 800);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 创建粒子背景
    createParticles();
    
    // 生成表格
    const container = document.getElementById('tablecontainer');
    container.innerHTML = TableCreate();
    
    // 获取提示框元素
    const tooltip = document.getElementById('info-tooltip');
    
    // 为所有单元格添加交互事件
    document.querySelectorAll('td').forEach(cell => {
        // 鼠标悬停显示提示
        cell.addEventListener('mouseenter', function(e) {
            const text = this.getAttribute('data-tooltip');
            tooltip.textContent = text;
            tooltip.style.opacity = '1';
            
            // 定位提示框
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.right + 10}px`;
            tooltip.style.top = `${rect.top}px`;
        });
        
        // 鼠标离开隐藏提示
        cell.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
        });
        
        // 点击效果
        cell.addEventListener('click', function(e) {
            // 添加点击状态动画
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 500);
            
            // 获取元素颜色作为特效颜色
            let color;
            if (this.classList.contains('prime')) color = 'rgba(75, 192, 192, 0.8)';
            else if (this.classList.contains('composite')) color = 'rgba(255, 99, 132, 0.8)';
            else color = 'rgba(255, 206, 86, 0.8)';
            
            // 创建点击波纹特效
            createClickEffect(e.clientX, e.clientY, color);
        });
        
        // 鼠标移动时更新提示框位置
        cell.addEventListener('mousemove', function(e) {
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY - 20}px`;
        });
    });
});