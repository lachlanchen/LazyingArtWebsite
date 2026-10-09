/* Selected, existing AYA artwork only. GIFs play in view, never in the background. */
(() => {
  const panel = document.querySelector('#characters');
  if (!panel) return;
  const copy = {
    en: ['THE LAZYINGART CHARACTERS', 'A little company for everyday life.', 'Meet Aya, Lala, Sasa and Zhuangzi. A good morning, a small thank-you, a friend who gets it—our characters turn little moments into animated stickers.', 'Explore the sticker shop', 'Chinese, English and Japanese stickers. Preview a GIF, find your favourites.', 'Little everyday joys', 'Your robot work buddy', 'Pause animations', 'Play animations'],
    ja: ['LAZYINGARTの仲間たち', 'いつもの一日に、小さな仲間を。', 'Aya、Lala、Sasa、Zhuangzi。おはようも、ありがとうも、わかるよの気持ちも。日々の小さな瞬間を、動くスタンプにしました。', 'スタンプショップへ', '中国語・英語・日本語のスタンプ。動きを見て、お気に入りを見つけよう。', '日々の小さな喜び', '仕事のおともにロボットを', 'アニメーションを停止', 'アニメーションを再生'],
    'zh-Hans': ['LAZYINGART 的小伙伴', '给平常的一天，添一点陪伴。', '阿芽、啦啦、飒飒和庄子，把早安、谢谢和「我懂你」变成会动的小表情。日常里的小心情，都有伙伴替你说。', '逛逛表情商店', '中文、英文、日文表情。先看看动图，再挑喜欢的。', '啦啦侠阿芽酱日常', '庄子上班啦', '暂停动画', '播放动画'],
    'zh-Hant': ['LAZYINGART 的小夥伴', '給平常的一天，添一點陪伴。', '阿芽、啦啦、颯颯和莊子，把早安、謝謝和「我懂你」變成會動的小貼圖。日常裡的小心情，都有夥伴替你說。', '逛逛貼圖商店', '中文、英文、日文貼圖。先看看動圖，再挑喜歡的。', '啦啦俠阿芽醬日常', '莊子上班啦', '暫停動畫', '播放動畫'],
    ko: ['LAZYINGART의 친구들', '평범한 하루에 작은 친구를.', 'Aya, Lala, Sasa, Zhuangzi를 만나 보세요. 아침 인사, 작은 고마움, 공감의 마음을 움직이는 스티커에 담았어요.', '스티커 숍 둘러보기', '중국어, 영어, 일본어 스티커. GIF를 보고 마음에 드는 친구를 찾아보세요.', '소소한 일상의 즐거움', '직장 생활의 로봇 친구', '애니메이션 일시 정지', '애니메이션 재생'],
    ar: ['شخصيات LAZYINGART', 'رفقة صغيرة في تفاصيل يومك.', 'تعرّف على Aya وLala وSasa وZhuangzi. تحية صباح، وشكر بسيط، وصديق يفهمك—لحظات يومية تتحول إلى ملصقات متحركة.', 'تصفّح متجر الملصقات', 'ملصقات بالصينية والإنجليزية واليابانية. شاهد الحركة واختر ما يعجبك.', 'أفراح يومية صغيرة', 'صديقك الروبوت في العمل', 'إيقاف الحركة مؤقتًا', 'تشغيل الحركة'],
    vi: ['NHỮNG NGƯỜI BẠN LAZYINGART', 'Thêm chút bầu bạn cho mỗi ngày.', 'Làm quen với Aya, Lala, Sasa và Zhuangzi. Một lời chào buổi sáng, một lời cảm ơn, một người bạn hiểu mình—những khoảnh khắc nhỏ thành nhãn dán động.', 'Khám phá cửa hàng nhãn dán', 'Nhãn dán tiếng Trung, Anh và Nhật. Xem GIF và chọn hình bạn thích.', 'Niềm vui nhỏ mỗi ngày', 'Bạn robot nơi làm việc', 'Tạm dừng chuyển động', 'Phát chuyển động'],
    fr: ['LES PERSONNAGES LAZYINGART', 'Un peu de compagnie au quotidien.', 'Voici Aya, Lala, Sasa et Zhuangzi. Un bonjour, un petit merci, un ami qui comprend : nos personnages donnent vie à ces petits moments en stickers animés.', 'Découvrir les stickers', 'Des stickers en chinois, anglais et japonais. Regardez les GIF et choisissez vos préférés.', 'Les petits bonheurs du quotidien', 'Un collègue robot à vos côtés', 'Mettre les animations en pause', 'Lire les animations'],
    es: ['LOS PERSONAJES DE LAZYINGART', 'Un poco de compañía para cada día.', 'Conoce a Aya, Lala, Sasa y Zhuangzi. Un buenos días, un pequeño gracias, un amigo que te entiende: nuestros personajes convierten esos momentos en stickers animados.', 'Explorar la tienda de stickers', 'Stickers en chino, inglés y japonés. Mira los GIF y elige tus favoritos.', 'Pequeñas alegrías cotidianas', 'Tu compañero robot de trabajo', 'Pausar animaciones', 'Reproducir animaciones'],
    pt: ['OS PERSONAGENS LAZYINGART', 'Um pouco de companhia no dia a dia.', 'Conheça Aya, Lala, Sasa e Zhuangzi. Um bom-dia, um pequeno obrigado, um amigo que entende: nossos personagens transformam esses momentos em figurinhas animadas.', 'Explorar as figurinhas', 'Figurinhas em chinês, inglês e japonês. Veja os GIFs e escolha suas favoritas.', 'Pequenas alegrias do dia a dia', 'Seu colega robô no trabalho', 'Pausar animações', 'Reproduzir animações'],
    de: ['DIE LAZYINGART-FIGUREN', 'Ein bisschen Gesellschaft im Alltag.', 'Das sind Aya, Lala, Sasa und Zhuangzi. Ein Morgengruß, ein kleines Danke, ein Freund, der dich versteht—unsere Figuren machen daraus animierte Sticker.', 'Zum Sticker-Shop', 'Sticker auf Chinesisch, Englisch und Japanisch. Schau dir die GIFs an und finde deine Favoriten.', 'Kleine Freuden im Alltag', 'Dein Roboter-Arbeitskollege', 'Animationen pausieren', 'Animationen abspielen'],
    ru: ['ПЕРСОНАЖИ LAZYINGART', 'Немного компании на каждый день.', 'Знакомьтесь: Aya, Lala, Sasa и Zhuangzi. Доброе утро, простое спасибо, друг, который понимает,—наши герои превращают эти моменты в анимированные стикеры.', 'Открыть магазин стикеров', 'Стикеры на китайском, английском и японском. Посмотрите GIF и выберите любимые.', 'Маленькие радости каждый день', 'Ваш робот-коллега', 'Приостановить анимацию', 'Включить анимацию'],
    tr: ['LAZYINGART KARAKTERLERİ', 'Günlük hayata küçük bir arkadaşlık.', 'Aya, Lala, Sasa ve Zhuangzi ile tanışın. Bir günaydın, küçük bir teşekkür, sizi anlayan bir arkadaş—karakterlerimiz bu anları hareketli çıkartmalara dönüştürüyor.', 'Çıkartma mağazasını keşfet', 'Çince, İngilizce ve Japonca çıkartmalar. GIF’lere bakın, favorilerinizi seçin.', 'Günlük küçük mutluluklar', 'Robot iş arkadaşınız', 'Animasyonları duraklat', 'Animasyonları oynat']
  };
  const keys = ['tag', 'title', 'intro', 'shop', 'languages', 'daily', 'work', 'pause', 'play'];
  const button = panel.querySelector('[data-ip-motion]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = motion.matches;
  const images = [...panel.querySelectorAll('[data-ip-gif]')].map(image => ({image, poster: image.getAttribute('src'), visible: false, failed: false}));
  function translate() {
    const values = copy[document.documentElement.lang] || copy.en;
    panel.querySelectorAll('[data-ip-label]').forEach(el => { el.textContent = values[keys.indexOf(el.dataset.ipLabel)]; });
    button.querySelector('[data-ip-motion-label]').textContent = values[keys.indexOf(paused ? 'play' : 'pause')];
    button.querySelector('[data-ip-motion-icon]').textContent = paused ? '▶' : 'Ⅱ';
    button.setAttribute('aria-pressed', String(paused));
  }
  function render() {
    images.forEach(item => {
      const animate = item.visible && !paused && !document.hidden && !item.failed;
      const src = animate ? item.image.dataset.ipGif : item.poster;
      if (item.image.getAttribute('src') !== src) item.image.src = src;
    });
    translate();
  }
  images.forEach(item => item.image.addEventListener('error', () => {
    if (item.image.getAttribute('src') === item.poster) return;
    item.failed = true;
    item.image.src = item.poster;
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { images.find(item => item.image === entry.target).visible = entry.isIntersecting; });
      render();
    });
    images.forEach(item => observer.observe(item.image));
  } else images.forEach(item => { item.visible = true; });
  button.hidden = false;
  button.addEventListener('click', () => { paused = !paused; render(); });
  motion.addEventListener('change', () => { paused = motion.matches; render(); });
  document.addEventListener('visibilitychange', render);
  new MutationObserver(translate).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  render();
})();
