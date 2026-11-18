const topics = [
  { category: '001 / İNTERNET ARKEOLOJİSİ', title: 'Bir meme’in soy ağacı olur mu?', description: 'Aynı görsel, bambaşka dertler. Bir internet şakasını ilk paylaşımından bizim aile grubuna kadar takip etme fikri.', questions: ['İlk paylaşımda aslında ne anlatılıyordu?', 'Görsel değişmeden şaka kaç kez değişebilir?', 'Biz hâlâ aynı şeye mi gülüyoruz?'] },
  { category: '002 / AKIM OTOPSİSİ', title: 'Hepimiz aynı anda niye bunu yapıyoruz?', description: 'Önce biri yapar. Sonra akışta başka hiçbir şey kalmamış gibi olur. O aradaki tuhaf yolculuğun peşine düşüyoruz.', questions: ['Bu akımı kim, hangi fikirle başlattı?', 'Taklitler nerede yepyeni bir şeye dönüştü?', 'Bitti sandığımız akım geri gelir mi?'] },
  { category: '003 / BEKLENMEDİK BAĞLANTILAR', title: 'Bu iki şeyin ne alakası var?', description: 'Bir eski video, bir yeni akım. Yan yana gelmeden fark etmediğimiz bağlantılar. Çapraz kurgunun en sevdiğimiz ihtimali: “Bir dakika ya…”', questions: ['Aynı fikir farklı zamanlarda nasıl karşımıza çıkıyor?', 'Ortak bir kök mü var, sadece benzerlik mi?', 'İki görüntüyü yan yana koyunca hikâye nasıl değişiyor?'] }
];
const dialog = document.getElementById('topic-dialog');
let activeTopic = -1;
let lastTrigger;
function showTopic(index, trigger) {
  activeTopic = index;
  if (trigger) lastTrigger = trigger;
  const topic = topics[index];
  document.getElementById('dialog-category').textContent = topic.category;
  document.getElementById('dialog-title').textContent = topic.title;
  document.getElementById('dialog-description').textContent = topic.description;
  document.getElementById('dialog-questions').replaceChildren(...topic.questions.map(question => {
    const item = document.createElement('li');
    item.textContent = question;
    return item;
  }));
  if (!dialog.open) dialog.showModal();
}
document.querySelectorAll('[data-topic]').forEach(button => button.addEventListener('click', () => showTopic(Number(button.dataset.topic), button)));
document.getElementById('random-topic').addEventListener('click', event => {
  const options = topics.map((_, index) => index).filter(index => index !== activeTopic);
  showTopic(options[Math.floor(Math.random() * options.length)], event.currentTarget);
});
document.getElementById('next-topic').addEventListener('click', () => showTopic((activeTopic + 1) % topics.length));
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
dialog.addEventListener('close', () => lastTrigger?.focus({preventScroll:true}));
const toggle = document.getElementById('suggest-button');
const panel = document.getElementById('suggest-panel');
const field = document.getElementById('suggestion');
const status = document.getElementById('suggest-status');
toggle.addEventListener('click', () => {
  panel.hidden = !panel.hidden;
  toggle.setAttribute('aria-expanded', String(!panel.hidden));
  if (!panel.hidden) field.focus();
});
document.getElementById('copy-button').addEventListener('click', async () => {
  if (!field.value.trim()) {
    status.textContent = 'Önce kafana takılan o meseleyi yaz.';
    field.focus();
    return;
  }
  try {
    await navigator.clipboard.writeText(field.value.trim());
    status.textContent = 'Notun kopyalandı! Kendine ayırabilirsin. Buradan herhangi bir yere gönderilmedi.';
  } catch {
    field.focus();
    field.select();
    status.textContent = 'Notun seçildi. Kopyalamak için Ctrl+C veya ⌘C kullanabilirsin.';
  }
});
