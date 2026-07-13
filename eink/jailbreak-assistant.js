(() => {
  const release = "https://github.com/lachlanchen/Kindle/releases/download/jailbreak-assistant-v0.1.0/";
  const assets = {
    windows: release + "Kindle-Jailbreak-Assistant-Windows-x64.exe",
    linuxX64: release + "Kindle-Jailbreak-Assistant-Linux-x64.tar.gz",
    linuxArm: release + "Kindle-Jailbreak-Assistant-Linux-arm64.tar.gz",
    macIntel: release + "Kindle-Jailbreak-Assistant-macOS-Intel.zip",
    macArm: release + "Kindle-Jailbreak-Assistant-macOS-Apple-Silicon.zip"
  };

  const copy = {
    en: {
      eyebrow: "Free desktop utility / open reading",
      title: "One careful path through almost every Kindle.",
      lead: "The LazyingArt Kindle Jailbreak Assistant detects a mounted device, matches model and firmware against the live community matrix, and automates every safe host-side step it can.",
      facts: ["28 model families", "Windows / Linux / macOS", "Current + legacy routes", "Backups before changes"],
      download: "Download for your computer",
      release: "Version 0.1.0 / unsigned community build",
      windows: "Windows x64",
      linuxX64: "Linux x64",
      linuxArm: "Linux ARM64",
      macIntel: "macOS Intel",
      macArm: "macOS Apple Silicon",
      recommended: "Recommended",
      source: "Source and documentation",
      matrix: "Live compatibility matrix",
      notice: "No app can jailbreak every firmware. Unsupported combinations stop safely and link to the authoritative guide; hardware-only routes remain guided. Jailbreaking can void a warranty, reduce security, or brick a device."
    },
    "zh-CN": {
      eyebrow: "免费桌面工具 / 开放阅读",
      title: "用一条谨慎的路径，覆盖几乎每一代 Kindle。",
      lead: "LazyingArt Kindle 越狱助手会发现已挂载的设备，根据实时社区矩阵匹配型号与固件，并尽可能自动完成安全的电脑端步骤。",
      facts: ["28 个型号家族", "Windows / Linux / macOS", "新旧越狱路线", "修改前自动备份"],
      download: "下载到你的电脑",
      release: "0.1.0 版 / 未签名社区构建",
      windows: "Windows x64",
      linuxX64: "Linux x64",
      linuxArm: "Linux ARM64",
      macIntel: "macOS Intel",
      macArm: "macOS Apple 芯片",
      recommended: "推荐",
      source: "源代码与文档",
      matrix: "实时兼容矩阵",
      notice: "没有任何程序能越狱所有固件。遇到不支持的组合时，助手会安全停止并打开权威指南；仅硬件路线仍以指导方式提供。越狱可能影响保修、安全性，甚至导致设备变砖。"
    },
    "zh-TW": {
      eyebrow: "免費桌面工具 / 開放閱讀",
      title: "用一條謹慎的路徑，涵蓋幾乎每一代 Kindle。",
      lead: "LazyingArt Kindle 越獄助手會尋找已掛載裝置，依即時社群矩陣比對型號與韌體，並盡可能自動完成安全的電腦端步驟。",
      facts: ["28 個型號家族", "Windows / Linux / macOS", "新舊越獄路線", "修改前自動備份"],
      download: "下載到你的電腦",
      release: "0.1.0 版 / 未簽署社群版本",
      windows: "Windows x64",
      linuxX64: "Linux x64",
      linuxArm: "Linux ARM64",
      macIntel: "macOS Intel",
      macArm: "macOS Apple 晶片",
      recommended: "建議",
      source: "原始碼與文件",
      matrix: "即時相容矩陣",
      notice: "沒有任何程式能越獄所有韌體。不支援的組合會安全停止並連到權威指南；僅硬體路線仍採引導方式。越獄可能影響保固、安全性，甚至使裝置變磚。"
    },
    ja: {
      eyebrow: "無料デスクトップツール / オープンリーディング",
      title: "ほぼすべての Kindle へ、慎重な一本の道を。",
      lead: "LazyingArt Kindle Jailbreak Assistant は接続された端末を検出し、モデルとファームウェアを最新のコミュニティ表と照合して、安全なホスト側作業を可能な限り自動化します。",
      facts: ["28 モデル系統", "Windows / Linux / macOS", "現行 + レガシー手法", "変更前にバックアップ"],
      download: "パソコン用をダウンロード",
      release: "バージョン 0.1.0 / 未署名コミュニティビルド",
      windows: "Windows x64",
      linuxX64: "Linux x64",
      linuxArm: "Linux ARM64",
      macIntel: "macOS Intel",
      macArm: "macOS Apple Silicon",
      recommended: "推奨",
      source: "ソースとドキュメント",
      matrix: "最新の互換性表",
      notice: "すべてのファームウェアを脱獄できるアプリはありません。未対応の組み合わせでは安全に停止し、公式ガイドへ案内します。脱獄は保証や安全性に影響し、端末を破損する可能性があります。"
    },
    ko: {
      eyebrow: "무료 데스크톱 도구 / 열린 독서",
      title: "거의 모든 Kindle을 위한 신중한 하나의 경로.",
      lead: "LazyingArt Kindle Jailbreak Assistant는 연결된 기기를 찾고 모델과 펌웨어를 최신 커뮤니티 표와 대조해 안전한 컴퓨터 측 작업을 최대한 자동화합니다.",
      facts: ["28개 모델 계열", "Windows / Linux / macOS", "최신 + 레거시 경로", "변경 전 백업"],
      download: "컴퓨터용 다운로드",
      release: "버전 0.1.0 / 서명되지 않은 커뮤니티 빌드",
      windows: "Windows x64",
      linuxX64: "Linux x64",
      linuxArm: "Linux ARM64",
      macIntel: "macOS Intel",
      macArm: "macOS Apple Silicon",
      recommended: "권장",
      source: "소스 및 문서",
      matrix: "실시간 호환성 표",
      notice: "모든 펌웨어를 탈옥할 수 있는 앱은 없습니다. 지원되지 않는 조합에서는 안전하게 멈추고 공식 가이드를 엽니다. 탈옥은 보증과 보안을 해치거나 기기를 벽돌로 만들 수 있습니다."
    },
    de: {
      eyebrow: "Kostenloses Desktop-Werkzeug / offenes Lesen",
      title: "Ein sorgsamer Weg durch fast jede Kindle-Generation.",
      lead: "Der LazyingArt Kindle Jailbreak Assistant erkennt das eingebundene Gerat, gleicht Modell und Firmware mit der aktuellen Community-Matrix ab und automatisiert sichere Schritte auf dem Computer.",
      facts: ["28 Modellfamilien", "Windows / Linux / macOS", "Aktuelle + alte Wege", "Backup vor Anderungen"],
      download: "Fur deinen Computer laden",
      release: "Version 0.1.0 / unsignierter Community-Build",
      windows: "Windows x64",
      linuxX64: "Linux x64",
      linuxArm: "Linux ARM64",
      macIntel: "macOS Intel",
      macArm: "macOS Apple Silicon",
      recommended: "Empfohlen",
      source: "Quellcode und Dokumentation",
      matrix: "Aktuelle Kompatibilitatsmatrix",
      notice: "Keine App kann jede Firmware jailbreaken. Nicht unterstutzte Kombinationen stoppen sicher und verweisen auf die maßgebliche Anleitung. Ein Jailbreak kann Garantie und Sicherheit beeintrachtigen oder das Gerat unbrauchbar machen."
    },
    fr: {
      eyebrow: "Utilitaire gratuit / lecture ouverte",
      title: "Un chemin prudent pour presque chaque Kindle.",
      lead: "L'assistant Kindle de LazyingArt detecte l'appareil monte, compare modele et firmware a la matrice communautaire en direct et automatise les etapes sures cote ordinateur.",
      facts: ["28 familles", "Windows / Linux / macOS", "Methodes recentes + anciennes", "Sauvegarde avant modification"],
      download: "Telecharger pour votre ordinateur",
      release: "Version 0.1.0 / build communautaire non signe",
      windows: "Windows x64",
      linuxX64: "Linux x64",
      linuxArm: "Linux ARM64",
      macIntel: "macOS Intel",
      macArm: "macOS Apple Silicon",
      recommended: "Recommande",
      source: "Code source et documentation",
      matrix: "Matrice de compatibilite en direct",
      notice: "Aucune application ne peut jailbreaker tous les firmwares. Les combinaisons non prises en charge s'arretent sans risque et ouvrent le guide officiel. Un jailbreak peut annuler la garantie, reduire la securite ou bloquer l'appareil."
    },
    es: {
      eyebrow: "Utilidad gratuita / lectura abierta",
      title: "Una ruta cuidadosa para casi todos los Kindle.",
      lead: "LazyingArt Kindle Jailbreak Assistant detecta el dispositivo montado, compara modelo y firmware con la matriz comunitaria actual y automatiza los pasos seguros del ordenador.",
      facts: ["28 familias", "Windows / Linux / macOS", "Rutas actuales + antiguas", "Copia antes de cambiar"],
      download: "Descargar para tu ordenador",
      release: "Version 0.1.0 / compilacion comunitaria sin firmar",
      windows: "Windows x64",
      linuxX64: "Linux x64",
      linuxArm: "Linux ARM64",
      macIntel: "macOS Intel",
      macArm: "macOS Apple Silicon",
      recommended: "Recomendado",
      source: "Codigo y documentacion",
      matrix: "Matriz de compatibilidad actual",
      notice: "Ninguna aplicacion puede liberar todos los firmwares. Las combinaciones incompatibles se detienen de forma segura y abren la guia oficial. El proceso puede anular la garantia, reducir la seguridad o bloquear el dispositivo."
    },
    it: {
      eyebrow: "Utility desktop gratuita / lettura aperta",
      title: "Un percorso prudente per quasi ogni Kindle.",
      lead: "LazyingArt Kindle Jailbreak Assistant rileva il dispositivo montato, confronta modello e firmware con la matrice aggiornata e automatizza i passaggi sicuri sul computer.",
      facts: ["28 famiglie", "Windows / Linux / macOS", "Metodi nuovi + legacy", "Backup prima delle modifiche"],
      download: "Scarica per il tuo computer",
      release: "Versione 0.1.0 / build community non firmata",
      windows: "Windows x64",
      linuxX64: "Linux x64",
      linuxArm: "Linux ARM64",
      macIntel: "macOS Intel",
      macArm: "macOS Apple Silicon",
      recommended: "Consigliato",
      source: "Sorgente e documentazione",
      matrix: "Matrice di compatibilita aggiornata",
      notice: "Nessuna app puo eseguire il jailbreak di ogni firmware. Le combinazioni non supportate si fermano in sicurezza e aprono la guida ufficiale. Il jailbreak puo invalidare la garanzia, ridurre la sicurezza o bloccare il dispositivo."
    },
    pt: {
      eyebrow: "Utilitario gratuito / leitura aberta",
      title: "Um caminho cuidadoso para quase todo Kindle.",
      lead: "O LazyingArt Kindle Jailbreak Assistant detecta o dispositivo montado, compara modelo e firmware com a matriz comunitaria atual e automatiza as etapas seguras no computador.",
      facts: ["28 familias", "Windows / Linux / macOS", "Rotas atuais + antigas", "Backup antes de alterar"],
      download: "Baixar para seu computador",
      release: "Versao 0.1.0 / build comunitaria nao assinada",
      windows: "Windows x64",
      linuxX64: "Linux x64",
      linuxArm: "Linux ARM64",
      macIntel: "macOS Intel",
      macArm: "macOS Apple Silicon",
      recommended: "Recomendado",
      source: "Codigo e documentacao",
      matrix: "Matriz de compatibilidade atual",
      notice: "Nenhum aplicativo desbloqueia todos os firmwares. Combinacoes sem suporte param com seguranca e abrem o guia oficial. O processo pode anular a garantia, reduzir a seguranca ou inutilizar o dispositivo."
    },
    ru: {
      eyebrow: "Besplatnaia programma / svobodnoe chtenie",
      title: "Odin ostorozhnyi put pochti dlia kazhdogo Kindle.",
      lead: "LazyingArt Kindle Jailbreak Assistant nakhodit podkliuchennoe ustroistvo, sveriaet model i proshivku s aktualnoi matritsei i avtomatiziruet bezopasnye shagi na kompiutere.",
      facts: ["28 semeistv modelei", "Windows / Linux / macOS", "Novye + starye metody", "Rezervnaia kopiia"],
      download: "Skachat dlia kompiutera",
      release: "Versiia 0.1.0 / nepodpisannaia sborka",
      windows: "Windows x64",
      linuxX64: "Linux x64",
      linuxArm: "Linux ARM64",
      macIntel: "macOS Intel",
      macArm: "macOS Apple Silicon",
      recommended: "Rekomenduetsia",
      source: "Kod i dokumentatsiia",
      matrix: "Aktualnaia sovmestimost",
      notice: "Ni odna programma ne podderzhivaet vse proshivki. Dlia nepodderzhivaemykh kombinatsii pomoshchnik bezopasno ostanovitsia i otkroet ofitsialnoe rukovodstvo. Jailbreak mozhet povredit ustroistvo i lishit garantii."
    }
  };

  function language() {
    const raw = (document.documentElement.lang || navigator.language || "en").toLowerCase();
    if (raw.startsWith("zh-tw") || raw.startsWith("zh-hk") || raw.includes("hant")) return "zh-TW";
    if (raw.startsWith("zh")) return "zh-CN";
    const base = raw.split("-")[0];
    return copy[base] ? base : "en";
  }

  function host() {
    const value = `${navigator.platform || ""} ${navigator.userAgent || ""}`.toLowerCase();
    if (value.includes("win")) return "windows";
    if (value.includes("mac")) return "macArm";
    if (value.includes("linux") && (value.includes("aarch64") || value.includes("arm64"))) return "linuxArm";
    if (value.includes("linux")) return "linuxX64";
    return "windows";
  }

  function render() {
    const t = copy[language()] || copy.en;
    const preferred = host();
    const section = document.getElementById("kindle-jailbreak-assistant") || document.createElement("section");
    section.id = "kindle-jailbreak-assistant";
    section.className = "jb-assistant";
    const links = [
      ["windows", t.windows, "x64 .exe"],
      ["linuxX64", t.linuxX64, "x64 .tar.gz"],
      ["linuxArm", t.linuxArm, "ARM64 .tar.gz"],
      ["macIntel", t.macIntel, "Intel .zip"],
      ["macArm", t.macArm, "Apple Silicon .zip"]
    ];
    section.innerHTML = `
      <div class="jb-assistant__shell">
        <div class="jb-assistant__grid">
          <div>
            <p class="jb-assistant__eyebrow">${t.eyebrow}</p>
            <h2>${t.title}</h2>
            <p class="jb-assistant__lead">${t.lead}</p>
            <ul class="jb-assistant__facts">${t.facts.map((fact) => `<li>${fact}</li>`).join("")}</ul>
          </div>
          <div class="jb-assistant__panel">
            <h3>${t.download}</h3>
            <p>${t.release}</p>
            <div class="jb-assistant__downloads">
              ${links.map(([key, label, meta]) => `<a class="jb-assistant__download ${key === preferred ? "is-primary" : ""}" href="${assets[key]}"><strong>${label}${key === preferred ? ` - ${t.recommended}` : ""}</strong><span>${meta}</span></a>`).join("")}
            </div>
            <div class="jb-assistant__links">
              <a href="https://github.com/lachlanchen/Kindle/tree/main/jailbreak-assistant">${t.source}</a>
              <a href="https://kindlemodding.org/kindle-models">${t.matrix}</a>
            </div>
          </div>
        </div>
        <p class="jb-assistant__notice">${t.notice}</p>
      </div>`;
    if (!section.isConnected) {
      (document.querySelector("main") || document.body).appendChild(section);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  document.addEventListener("change", () => window.setTimeout(render, 0));
})();

