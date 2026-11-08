const CLOSE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
const ARROW_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m14 5-7 7 7 7"/></svg>';

export function reviewPhotos(value) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 3).filter((photo) => photo && typeof photo.src === 'string' && (
    /^assets\/img\/reviews\/[a-z-]+\.png$/.test(photo.src) ||
    /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(photo.src)
  )).map((photo) => {
    const panels = photo.panels === 3 ? 3 : 1;
    const rows = photo.rows === 2 ? 2 : 1;
    const panel = Number.isInteger(photo.panel) ? Math.min(panels - 1, Math.max(0, photo.panel)) : 0;
    const row = Number.isInteger(photo.row) ? Math.min(rows - 1, Math.max(0, photo.row)) : 0;
    return { src: photo.src, panels, rows, panel, row };
  });
}

function photoImage(photo, label, eager = false) {
  const img = document.createElement('img');
  img.src = photo.src;
  img.alt = label;
  img.loading = eager ? 'eager' : 'lazy';
  img.decoding = 'async';
  img.style.setProperty('--photo-panels', photo.panels || 1);
  img.style.setProperty('--photo-panel', photo.panel || 0);
  img.style.setProperty('--photo-rows', photo.rows || 1);
  img.style.setProperty('--photo-row', photo.row || 0);
  return img;
}

let viewer;
let currentGallery;
let currentIndex = 0;
let currentLabel;
let imageRequest = 0;

function displayViewerPhoto() {
  const photo = currentGallery[currentIndex];
  const stage = viewer.querySelector('.review-viewer-stage');
  const img = photoImage(photo, currentLabel, true);
  const request = ++imageRequest;
  stage.style.setProperty('--photo-ratio', photo.panels === 3 ? (photo.rows || 1) / 3 : 1);
  const sizePhoto = () => {
    if (request !== imageRequest || !img.naturalWidth) return;
    stage.style.setProperty('--photo-ratio', img.naturalWidth * (photo.rows || 1) / ((photo.panels || 1) * img.naturalHeight));
  };
  img.addEventListener('load', sizePhoto, { once: true });
  if (img.complete) sizePhoto();
  stage.replaceChildren(img);
  viewer.querySelector('.review-viewer-caption').textContent = currentLabel;
  viewer.querySelector('.review-viewer-count').textContent = `${currentIndex + 1} / ${currentGallery.length}`;
  viewer.querySelectorAll('.review-viewer-arrow').forEach((button) => { button.hidden = currentGallery.length < 2; });
}

function openViewer(photos, index, label) {
  if (!viewer) {
    viewer = document.createElement('dialog');
    viewer.className = 'review-viewer';
    viewer.setAttribute('aria-label', 'Fotos da avaliação');
    viewer.innerHTML = `
      <div class="review-viewer-head"><strong>Foto da avaliação</strong><button class="review-viewer-close" type="button" aria-label="Fechar foto">${CLOSE_ICON}</button></div>
      <div class="review-viewer-body">
        <button class="review-viewer-arrow review-viewer-prev" type="button" aria-label="Foto anterior">${ARROW_ICON}</button>
        <div class="review-viewer-stage"></div>
        <button class="review-viewer-arrow review-viewer-next" type="button" aria-label="Próxima foto">${ARROW_ICON}</button>
      </div>
      <p class="review-viewer-caption"></p><span class="review-viewer-count" aria-live="polite"></span>`;
    document.body.appendChild(viewer);
    viewer.querySelector('.review-viewer-close').addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', (event) => { if (event.target === viewer) viewer.close(); });
    const step = (direction) => {
      currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
      displayViewerPhoto();
    };
    viewer.querySelector('.review-viewer-prev').addEventListener('click', () => step(-1));
    viewer.querySelector('.review-viewer-next').addEventListener('click', () => step(1));
    viewer.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        step(event.key === 'ArrowLeft' ? -1 : 1);
      }
    });
    viewer.addEventListener('close', () => {
      imageRequest++;
      viewer.querySelector('.review-viewer-stage').replaceChildren();
    });
  }
  currentGallery = photos;
  currentIndex = index;
  currentLabel = label;
  displayViewerPhoto();
  if (!viewer.open) viewer.showModal();
}

export function reviewPhotoGallery(photos, label) {
  const gallery = document.createElement('div');
  gallery.className = 'review-photo-gallery';
  gallery.setAttribute('role', 'group');
  gallery.setAttribute('aria-label', label);
  photos.forEach((photo, index) => {
    const button = document.createElement('button');
    button.className = 'review-photo';
    button.type = 'button';
    button.setAttribute('aria-label', `Ampliar foto ${index + 1} de ${photos.length}: ${label}`);
    button.appendChild(photoImage(photo, label));
    button.addEventListener('click', () => openViewer(photos, index, label));
    gallery.appendChild(button);
  });
  return gallery;
}

export function reviewPhotoPreview(photos, onRemove) {
  const preview = document.createElement('div');
  preview.className = 'review-photo-previews';
  photos.forEach((photo, index) => {
    const item = document.createElement('div');
    item.className = 'review-photo-preview';
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'review-photo-remove';
    remove.setAttribute('aria-label', `Remover foto ${index + 1}`);
    remove.innerHTML = CLOSE_ICON;
    remove.addEventListener('click', () => onRemove(index));
    item.append(photoImage(photo, `Prévia da foto ${index + 1}`, true), remove);
    preview.appendChild(item);
  });
  return preview;
}

export async function prepareReviewPhoto(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error('Escolha fotos em JPG, PNG ou WebP.');
  }
  if (file.size > 5 * 1024 * 1024) throw new Error('Cada foto pode ter até 5 MB.');
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const scale = Math.min(1, 960 / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    const context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.8, 0.65, 0.5]) {
      const src = canvas.toDataURL('image/jpeg', quality);
      if (src.length <= 300000) return { src, panel: 0, panels: 1 };
    }
    throw new Error('Esta foto ficou muito grande. Escolha uma imagem menor.');
  } catch (error) {
    if (error instanceof DOMException) throw new Error('Não foi possível abrir esta foto. Tente outro arquivo.');
    throw error;
  } finally {
    URL.revokeObjectURL(url);
  }
}
