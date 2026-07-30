/* Tiện ích dùng chung cho các trang công cụ */

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

function setStatus(el, msg, type) {
  type = type || 'info';
  const colors = { info: 'text-slate-500', success: 'text-emerald-600', error: 'text-red-600' };
  const icon = type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-exclamation' : 'fa-spinner fa-spin';
  el.innerHTML = `<p class="${colors[type]}"><i class="fa-solid ${icon}"></i> ${escapeHtml(msg)}</p>`;
}

/**
 * Gắn sự kiện kéo-thả + click-chọn file cho 1 vùng drop-zone.
 * onFiles(fileArray) được gọi mỗi khi có file mới (từ input hoặc drop).
 */
function wireDropzone(dropZoneEl, fileInputEl, onFiles) {
  dropZoneEl.addEventListener('click', () => fileInputEl.click());
  dropZoneEl.addEventListener('dragover', (e) => { e.preventDefault(); dropZoneEl.classList.add('drag-over'); });
  dropZoneEl.addEventListener('dragleave', () => dropZoneEl.classList.remove('drag-over'));
  dropZoneEl.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZoneEl.classList.remove('drag-over');
    onFiles(Array.from(e.dataTransfer.files));
  });
  fileInputEl.addEventListener('change', (e) => {
    onFiles(Array.from(e.target.files));
    fileInputEl.value = '';
  });
}

function renderFileList(container, files, onRemove) {
  container.innerHTML = '';
  files.forEach((f, i) => {
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm';
    row.innerHTML = `
      <span class="truncate flex items-center gap-2"><i class="fa-solid fa-file text-slate-400"></i>${escapeHtml(f.name)}
        <span class="text-slate-400">(${formatBytes(f.size)})</span></span>
      <button data-idx="${i}" class="removeFileBtn text-red-500 hover:text-red-700"><i class="fa-solid fa-trash"></i></button>`;
    container.appendChild(row);
  });
  container.querySelectorAll('.removeFileBtn').forEach(btn => {
    btn.addEventListener('click', () => onRemove(Number(btn.dataset.idx)));
  });
}
