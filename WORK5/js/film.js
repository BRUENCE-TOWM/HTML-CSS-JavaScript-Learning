// 主题切换
document.querySelectorAll('.theme-option').forEach(btn => {
	btn.addEventListener('click', function() {
		const theme = this.getAttribute('data-theme');
		document.body.className = `theme-${theme}`;
	});
});

// 图片预览
function previewImage(input) {
	const file = input.files[0];
	if (!file) return;
	const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
	if (!fileTypes.includes(file.type)) {
		alert('请上传图片文件（JPG/PNG/GIF）');
		input.value = '';
		return;
	}
	const reader = new FileReader();
	const previewContainer = document.getElementById('previewContainer');

	reader.onload = function(e) {
		// 清空
		previewContainer.innerHTML = '';
		// 创建预览图片
		const imgWrapper = document.createElement('div');
		imgWrapper.style.marginTop = '10px';

		const img = document.createElement('img');
		img.src = e.target.result;
		img.style.maxWidth = '200px';
		img.style.maxHeight = '200px';
		img.style.border = '1px solid #ddd';
		img.style.borderRadius = '4px';

		imgWrapper.appendChild(img);
		previewContainer.appendChild(imgWrapper);

		// 设置临时路径
		const thumbInput = document.getElementById('filmThumb');
		thumbInput.value = `temp_${Date.now()}_${file.name}`;
	}

	reader.readAsDataURL(file);
}

// 影视管理功能
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const filmId = document.getElementById('filmId');
const filmThumb = document.getElementById('filmThumb');
const filmName = document.getElementById('filmName');
const filmType = document.getElementById('filmType');
const filmDate = document.getElementById('filmDate');

// 显示编辑弹窗
function showEditModal(btn) {
	// 重置表单和预览
	document.getElementById('previewContainer').innerHTML = '';
	document.getElementById('fileUpload').value = '';
	editForm.reset();
	filmId.value = '';

	// 编辑已有记录
	if (btn) {
		const tr = btn.closest('tr');
		filmId.value = tr.querySelector('input[type="hidden"]').value;
		const imgElement = tr.querySelector('.film-thumb');
		const imgSrc = imgElement.src;
		const imgAlt = imgElement.alt;
		filmThumb.value = imgSrc.split('/').pop();
		filmName.value = tr.children[1].textContent;
		filmType.value = tr.children[2].textContent;
		filmDate.value = tr.children[3].textContent;
		const previewContainer = document.getElementById('previewContainer');
		const imgWrapper = document.createElement('div');
		imgWrapper.style.marginTop = '10px';

		const img = document.createElement('img');
		img.src = imgSrc;
		img.alt = imgAlt;
		img.style.maxWidth = '200px';
		img.style.maxHeight = '200px';
		img.style.border = '1px solid #ddd';
		img.style.borderRadius = '4px';

		imgWrapper.appendChild(img);
		previewContainer.appendChild(imgWrapper);
	}

	editModal.style.display = 'flex';
}

// 隐藏编辑弹窗
function hideEditModal() {
	editModal.style.display = 'none';
}

// 表单提交处理
editForm.addEventListener('submit', function(e) {
	e.preventDefault();

	// 简单验证
	if (!filmName.value || !filmType.value || !filmDate.value) {
		alert('请填写完整信息');
		return;
	}

	const id = filmId.value;
	const newData = {
		thumb: filmThumb.value,
		name: filmName.value,
		type: filmType.value,
		date: filmDate.value
	};

	if (id) {
		const tr = document.querySelector(`tr input[value="${id}"]`).closest('tr');
		const imgElement = tr.querySelector('.film-thumb');
		if (newData.thumb.startsWith('temp_')) {
			const previewImg = document.querySelector('.preview-container img');
			if (previewImg) {
				imgElement.src = previewImg.src;
			}
		} else {
			imgElement.src = `img/${newData.thumb}`;
		}

		imgElement.alt = newData.name;
		tr.children[1].textContent = newData.name;
		tr.children[2].textContent = newData.type;
		tr.children[3].textContent = newData.date;
	} else {
		const tbody = document.querySelector('.film-table tbody');
		const newTr = document.createElement('tr');
		const newId = Date.now();
		let imgSrc = `img/${newData.thumb}`;
		const previewImg = document.querySelector('.preview-container img');
		if (previewImg && newData.thumb.startsWith('temp_')) {
			imgSrc = previewImg.src;
		}

		newTr.innerHTML = `
            <td><img src="${imgSrc}" alt="${newData.name}" class="film-thumb"></td>
            <td>${newData.name}</td>
            <td>${newData.type}</td>
            <td>${newData.date}</td>
            <td>
                <input type="hidden" value="${newId}">
                <button class="edit-btn" onclick="event.stopPropagation();showEditModal(this)">编辑</button>
                <button class="del-btn" onclick="event.stopPropagation();confirmDelete(this)">删除</button>
            </td>
        `;
		tbody.appendChild(newTr);
	}

	hideEditModal();
});

function confirmDelete(btn) {
	if (confirm('确定要删除这条记录吗？')) {
		const tr = btn.closest('tr');
		tr.remove();
	}
}
window.addEventListener('click', function(e) {
	if (e.target === editModal) {
		hideEditModal();
	}
});
document.addEventListener('DOMContentLoaded', function() {
	if (!document.body.className) {
		document.body.className = 'theme-original';
	}
});