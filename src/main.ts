import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createIcons, Droplet, MapPin, Box, Play, X, Plus, Minus, LocateFixed, Compass, RotateCcw, MousePointer2, LoaderCircle } from 'lucide';
import { place } from './place';
import './style.css';

const icons = { Droplet, MapPin, Box, Play, X, Plus, Minus, LocateFixed, Compass, RotateCcw, MousePointer2, LoaderCircle };
const icon = (name: string, className = '') => `<i data-lucide="${name}" class="${className}" aria-hidden="true"></i>`;
const refreshIcons = () => createIcons({ icons, attrs: { 'stroke-width': 1.6 } });
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="/" aria-label="Mangragaad Dhara home">
      <span class="brand-symbol">${icon('droplet')}</span>
      <span>mangragaad<span class="brand-subtitle">DHARA</span></span>
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      <button class="nav-link active" id="explore-nav" aria-current="page">Explore</button>
      <button class="nav-link" data-open="model">The dhara</button>
    </nav>
    <div class="header-location">${icon('map-pin')}<span>Pauri, Uttarakhand</span><span class="version">v1</span></div>
  </header>

  <main class="explorer">
    <aside class="place-sidebar" aria-label="About Mangragaad Dhara">
      <div class="sidebar-content">
        <div class="eyebrow"><span class="small-line"></span> A PLACE IN THE HILLS</div>
        <h1>Mangragaad<br><em>Dhara.</em></h1>
        <p class="place-locality">${place.locality}</p>
        <figure class="spring-photo">
          <img src="${place.image}" alt="Water flowing through the stone basins at Mangragaad Dhara, surrounded by moss and greenery" width="480" height="640" fetchpriority="high" />
          <button class="photo-tour" data-open="tour" aria-label="Watch the spring tour">
            <span class="play-disc">${icon('play')}</span><span>Take a little tour<span class="tour-duration">0:24 · WITH SOUND</span></span>
          </button>
        </figure>
        <p class="place-description">A hillside spring, framed by stone<br class="desktop-break"> and flowing water.</p>
        <button class="primary-button" data-open="model">${icon('box')} Explore the dhara</button>
      </div>
      <div class="sidebar-bottom">${icon('compass')}<span>Rooted in the Pauri hills</span><span class="place-number">01</span></div>
    </aside>

    <section class="map-section" aria-label="Interactive map of the Pauri area">
      <div id="map" aria-label="Map. Use arrow keys to pan and plus or minus to zoom."></div>
      <div class="map-topline"><span class="map-area">${icon('map-pin')} The Pauri hills</span><span class="map-type">${icon('compass')} EXPLORE</span></div>
      <div class="map-controls" aria-label="Map controls">
        <button id="zoom-in" title="Zoom in" aria-label="Zoom in">${icon('plus')}</button>
        <button id="zoom-out" title="Zoom out" aria-label="Zoom out">${icon('minus')}</button>
        <span class="control-divider"></span>
        <button id="recenter" title="Return to the dhara" aria-label="Return to the dhara">${icon('locate-fixed')}</button>
      </div>
      <div class="map-hint">${icon('mouse-pointer-2')}<span>Select the spring. Step a little closer.</span></div>
      <div class="location-note">${icon('map-pin')}<span>${place.locationIsApproximate ? 'Pauri area · approximate pin' : place.locality}</span></div>
      <div class="map-error" role="status" hidden>Some map tiles couldn’t load. <button id="retry-map">Try again</button></div>
    </section>
  </main>

  <dialog id="place-dialog" class="place-dialog" aria-labelledby="dialog-title">
    <div class="dialog-header">
      <div><p class="eyebrow">A CLOSER LOOK</p><h2 id="dialog-title">Mangragaad Dhara<span class="dialog-title-dot">.</span></h2></div>
      <button id="close-dialog" class="icon-button" aria-label="Close details">${icon('x')}</button>
    </div>
    <div class="detail-layout">
      <div class="experience">
        <div class="experience-toolbar"><div class="view-tabs" role="tablist" aria-label="Explore the dhara">
          <button id="model-tab" role="tab" aria-controls="model-panel" aria-selected="true" tabindex="0">${icon('box')} 3D view</button>
          <button id="tour-tab" role="tab" aria-controls="tour-panel" aria-selected="false" tabindex="-1">${icon('play')} Video tour</button>
        </div><button id="reset-model" class="icon-button" aria-label="Reset 3D view" title="Reset view">${icon('rotate-ccw')}</button></div>
        <div id="model-panel" class="model-panel" role="tabpanel" aria-labelledby="model-tab">
          <div class="scene-orbit" aria-hidden="true"></div>
          <model-viewer id="detail-model" src="${place.model}" alt="Interactive 3D interpretation of Mangragaad Dhara with a bull-head water spout" camera-controls camera-orbit="35deg 65deg auto" field-of-view="35deg" min-camera-orbit="auto 20deg 70%" max-camera-orbit="auto 85deg 180%" shadow-intensity="1" shadow-softness="0.9" exposure="1.15" environment-image="neutral" interaction-prompt="none" disable-pan touch-action="pan-y" loading="lazy" reveal="auto"></model-viewer>
          <div class="model-loading" role="status">${icon('loader-circle')}<span>Bringing the spring into view</span></div>
          <div class="model-fallback" hidden><img src="${place.image}" alt="Mangragaad Dhara spring" /><p>3D view is unavailable on this device.</p></div>
          <div class="scene-caption">${icon('mouse-pointer-2')}<span>Drag to rotate · scroll to zoom</span></div>
          <span class="interpretation-label">3D INTERPRETATION</span>
        </div>
        <div id="tour-panel" class="tour-panel" role="tabpanel" aria-labelledby="tour-tab" hidden>
          <video id="tour-video" controls playsinline preload="none" poster="${place.image}" aria-label="24-second video tour of Mangragaad Dhara">
            <source src="${place.video}" type="video/mp4" />
            Your browser does not support this video. <a href="${place.video}">Open the tour</a>.
          </video>
          <div class="video-error" role="status" hidden>The tour couldn’t load. <a href="${place.video}" target="_blank" rel="noopener">Open the video</a></div>
        </div>
      </div>
      <aside class="detail-info">
        <span class="detail-index">01 / THE SPRING</span>
        <h3>Stone, water<br> <em>& the hills.</em></h3>
        <p>A hillside spring near Pauri. Explore the bull-head spout in 3D, or watch the tour.</p>
        <div class="detail-location">${icon('map-pin')}<div><strong>Bhatti Gaon · Pipal Dhar</strong><span>Near Pauri, Uttarakhand</span></div></div>
        <div class="detail-note">${icon('compass')}<span>${place.locationIsApproximate ? 'The map pin is approximate.' : 'Location pin confirmed.'}</span></div>
        <button id="secondary-view-action" class="secondary-button">${icon('play')} Watch the tour <span>0:24</span></button>
      </aside>
    </div>
    <div class="dialog-footer"><span>MANGRAGAAD DHARA</span><span>A place to pause.</span></div>
  </dialog>
`;

refreshIcons();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const map = L.map('map', {
  zoomControl: false,
  minZoom: 10,
  maxZoom: 18,
  scrollWheelZoom: true,
  zoomAnimation: !reducedMotion.matches,
  fadeAnimation: !reducedMotion.matches,
}).setView(place.position, place.zoom);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
}).addTo(map);
map.attributionControl.setPrefix(false);
L.control.scale({ imperial: false, position: 'bottomright' }).addTo(map);

if (place.locationIsApproximate) {
  L.circle(place.position, { radius: 700, color: '#376b58', weight: 1.3, dashArray: '5 10', fillColor: '#54795a', fillOpacity: 0.045, interactive: false }).addTo(map);
}

const markerElement = document.createElement('div');
markerElement.className = 'dhara-marker';
markerElement.innerHTML = `<button class="model-marker-button" aria-label="Explore Mangragaad Dhara in 3D">
  <span class="marker-ground"></span><span class="marker-ring"></span>
  <model-viewer id="map-model" src="${place.model}" alt="3D spring on the map" camera-orbit="30deg 60deg auto" field-of-view="35deg" shadow-intensity="1" exposure="1.2" environment-image="neutral" interaction-prompt="none" loading="eager" tabindex="-1" aria-hidden="true"></model-viewer>
  <span class="marker-photo-fallback" hidden><img src="${place.image}" alt="" /></span>
  <span class="marker-label"><span class="marker-label-title">Mangragaad Dhara</span><span class="marker-label-action">${icon('box')} Explore in 3D</span></span>
</button>`;

const marker = L.marker(place.position, {
  icon: L.divIcon({ className: 'model-marker-container', html: markerElement, iconSize: [240, 224], iconAnchor: [120, 156] }),
  keyboard: false,
  interactive: true,
}).addTo(map);
L.DomEvent.disableClickPropagation(markerElement);
L.DomEvent.disableScrollPropagation(markerElement);
refreshIcons();

const dialog = document.querySelector<HTMLDialogElement>('#place-dialog')!;
const modelTab = document.querySelector<HTMLButtonElement>('#model-tab')!;
const tourTab = document.querySelector<HTMLButtonElement>('#tour-tab')!;
const modelPanel = document.querySelector<HTMLDivElement>('#model-panel')!;
const tourPanel = document.querySelector<HTMLDivElement>('#tour-panel')!;
const detailModel = document.querySelector<HTMLElement>('#detail-model')!;
const mapModel = document.querySelector<HTMLElement>('#map-model')!;
const video = document.querySelector<HTMLVideoElement>('#tour-video')!;
const secondaryAction = document.querySelector<HTMLButtonElement>('#secondary-view-action')!;
const resetButton = document.querySelector<HTMLButtonElement>('#reset-model')!;
let activeView: 'model' | 'tour' = 'model';
let returnFocus: HTMLElement | null = null;

function setView(view: 'model' | 'tour') {
  activeView = view;
  const isModel = view === 'model';
  modelTab.setAttribute('aria-selected', String(isModel));
  tourTab.setAttribute('aria-selected', String(!isModel));
  modelTab.tabIndex = isModel ? 0 : -1;
  tourTab.tabIndex = isModel ? -1 : 0;
  modelPanel.hidden = !isModel;
  tourPanel.hidden = isModel;
  resetButton.hidden = !isModel;
  if (isModel) video.pause();
  secondaryAction.innerHTML = isModel ? `${icon('play')} Watch the tour <span>0:24</span>` : `${icon('box')} Explore in 3D`;
  refreshIcons();
}

function openDetails(view: 'model' | 'tour' = 'model') {
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  setView(view);
  dialog.showModal();
  document.body.classList.add('dialog-open');
}

function closeDetails() { dialog.close(); }

document.querySelectorAll<HTMLButtonElement>('[data-open]').forEach(button => {
  button.addEventListener('click', () => openDetails(button.dataset.open as 'model' | 'tour'));
});
markerElement.querySelector('button')!.addEventListener('click', () => openDetails());
modelTab.addEventListener('click', () => setView('model'));
tourTab.addEventListener('click', () => setView('tour'));
secondaryAction.addEventListener('click', () => setView(activeView === 'model' ? 'tour' : 'model'));
document.querySelector('#close-dialog')!.addEventListener('click', closeDetails);
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDetails();
});
dialog.addEventListener('close', () => {
  video.pause();
  document.body.classList.remove('dialog-open');
  returnFocus?.focus();
});

document.querySelector('.view-tabs')!.addEventListener('keydown', event => {
  const key = (event as KeyboardEvent).key;
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return;
  event.preventDefault();
  const view = key === 'Home' ? 'model' : key === 'End' ? 'tour' : activeView === 'model' ? 'tour' : 'model';
  setView(view);
  (view === 'model' ? modelTab : tourTab).focus();
});

function recenter() {
  if (reducedMotion.matches) map.setView(place.position, place.zoom);
  else map.flyTo(place.position, place.zoom, { duration: 0.8 });
}
document.querySelector('#zoom-in')!.addEventListener('click', () => map.zoomIn());
document.querySelector('#zoom-out')!.addEventListener('click', () => map.zoomOut());
document.querySelector('#recenter')!.addEventListener('click', recenter);
document.querySelector('#explore-nav')!.addEventListener('click', recenter);
resetButton.addEventListener('click', () => {
  detailModel.setAttribute('camera-orbit', '35deg 65deg auto');
  detailModel.setAttribute('camera-target', 'auto auto auto');
  detailModel.setAttribute('field-of-view', '35deg');
});

const mapError = document.querySelector<HTMLDivElement>('.map-error')!;
let tileErrors = 0;
tiles.on('loading', () => { tileErrors = 0; mapError.hidden = true; });
tiles.on('load', () => { mapError.hidden = tileErrors === 0; });
tiles.on('tileerror', () => { tileErrors += 1; });
document.querySelector('#retry-map')!.addEventListener('click', () => tiles.redraw());
new ResizeObserver(() => map.invalidateSize({ pan: false })).observe(document.querySelector('.map-section')!);

video.addEventListener('error', () => {
  document.querySelector<HTMLElement>('.video-error')!.hidden = false;
});
video.querySelector('source')!.addEventListener('error', () => {
  document.querySelector<HTMLElement>('.video-error')!.hidden = false;
});

function modelFailed(model: HTMLElement) {
  model.hidden = true;
  if (model === detailModel) {
    document.querySelector<HTMLElement>('.model-loading')!.hidden = true;
    document.querySelector<HTMLElement>('.model-fallback')!.hidden = false;
    document.querySelector<HTMLElement>('.scene-caption')!.hidden = true;
    resetButton.disabled = true;
  } else {
    document.querySelector<HTMLElement>('.marker-photo-fallback')!.hidden = false;
  }
}
detailModel.addEventListener('load', () => {
  document.querySelector<HTMLElement>('.model-loading')!.hidden = true;
});
detailModel.addEventListener('error', () => modelFailed(detailModel));
mapModel.addEventListener('error', () => modelFailed(mapModel));

// Keep the large renderer out of the initial UI bundle.
import('@google/model-viewer').catch(() => {
  modelFailed(mapModel);
  modelFailed(detailModel);
});

// The map instance remains private; controls and the approximate position come from place.ts.
void marker;
