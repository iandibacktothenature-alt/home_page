// 運営者が更新する設定ファイル。null や空配列の項目は公開側で表示されません。

export const navItems = [
  { label: 'ホーム', to: '/' },
  { label: '農園', to: '/farm' },
  { label: 'スケジュール', to: '/schedule' },
  { label: '撮影会', to: '/photo' },
  { label: '事業者交流会', to: '/business' },
  { label: 'アヤナイについて', to: '/about' },
];

export const externalLinks: {
  note: string;
  timetree: string;
  timetreeEmbed: string;
  instagram: string | null;
  instagramInfo: string | null;
  line: string | null;
} = {
  note: 'https://note.com/iandi_kominka',
  timetree: 'https://timetreeapp.com/public_calendars/iandi_kominka',
  timetreeEmbed: 'https://timetreeapp.com/public_calendars/iandi_kominka/embed/monthly?calendar_name=true',
  instagram: 'https://www.instagram.com/iandi_backtothe_nature/?hl=ja',
  // お知らせ・最新情報の取得元（告知用アカウント）
  instagramInfo: 'https://www.instagram.com/iandi_inzai_info/',
  line: 'https://line.me/R/ti/p/@035qqrmm',
};

// 受付先（公式LINE・Googleフォーム・Form.run等）。確定したらURLを入れてください。
export const applyLinks = {
  farmVisit: null as string | null,
  event: null as string | null,
  photo: null as string | null,
  business: null as string | null,
  general: null as string | null,
};

/* =========================================================================
 * 運営者が更新する原稿データ（スマホからでもこのファイルを編集できます）
 * -------------------------------------------------------------------------
 * 1) notices : アヤナイからのお知らせ（新しい順に最大3件をトップに表示）
 * 2) voices  : 参加者の声（掲載許可を得た実際の感想のみ。星評価は使いません）
 * 3) records : アヤナイの活動風景・実績
 *
 * ・素材がまだ無い欄は配列を空（[]）にしてください。公開画面では自動で非表示になります。
 * ・いま入っている原稿はレイアウト確認用のサンプルです。実際の原稿に差し替えるときは
 *   sample: true を削除してください（「サンプル」の表示も消えます）。
 * ・写真は掲載許可を得たものだけを URL で入れてください（未設定は null）。
 * ========================================================================= */

export type NoticeItem = {
  date: string;
  type: '募集開始' | '満席' | '日程変更' | '中止' | 'お知らせ';
  title: string;
  body?: string;
  url?: string | null;
  sample?: boolean;
};

export const notices: NoticeItem[] = [
  {
    date: '2026.11.08',
    type: '募集開始',
    title: '12月の味噌仕込み会、参加者を募集します',
    body: '古民家の囲炉裏で、地元の大豆と米麹から味噌を仕込みます。持ち帰り用の容器はこちらで用意します。',
    url: '/schedule',
    sample: true,
  },
  {
    date: '2026.11.02',
    type: '満席',
    title: '11月の自然農体験デーは定員に達しました',
    body: 'キャンセルが出た場合は予定帖でお知らせします。次回は12月の開催を予定しています。',
    url: '/schedule',
    sample: true,
  },
  {
    date: '2026.10.25',
    type: '日程変更',
    title: '10月の家族撮影会を11月8日に変更します',
    body: '紅葉の時期に合わせて日程を変更しました。すでにお申込みいただいた方には個別にご連絡しています。',
    url: '/photo',
    sample: true,
  },
];

export type VoiceItem = {
  activity: string;
  text: string;
  name?: string | null;
  photo?: string | null;
  sample?: boolean;
};

export const voices: VoiceItem[] = [
  {
    activity: '農園の見学・体験',
    text: '畑に立つのは久しぶりでしたが、草を敷く理由や種の採り方まで丁寧に教えてもらえて、家に帰ってからも野菜を見る目が変わりました。',
    name: '印西市・Oさん',
    photo: null,
    sample: true,
  },
  {
    activity: '季節のイベント（味噌仕込み）',
    text: '子どもと一緒に大豆を潰すところから参加しました。囲炉裏の食卓でいただいた汁物が忘れられません。また家族で伺います。',
    name: '千葉ニュータウン・Mさん',
    photo: null,
    sample: true,
  },
  {
    activity: '季節の家族撮影会',
    text: '写真が苦手な子どもが、畑を走り回りながら自然に笑っていて驚きました。古民家の縁側で撮ってもらった一枚がお気に入りです。',
    name: '印西市・Sさん',
    photo: null,
    sample: true,
  },
  {
    activity: '田んぼの生きもの観察会',
    text: '虫めがねを持って田んぼに入ったら、子どもより大人のほうが夢中になっていました。見つけた生きものの名前を一緒に調べた時間が楽しかったです。',
    name: '印西市・Kさん',
    photo: null,
    sample: true,
  },
  {
    activity: '焚き火の夕べ',
    text: '火を囲んでいると、初対面なのに昔からの知り合いのような気持ちになりました。帰り道の星空も含めて、いい一日でした。',
    name: '千葉市・Tさん',
    photo: null,
    sample: true,
  },
  {
    activity: '草マルチの手入れ',
    text: '刈った草を畝に敷くだけで、土の様子が変わるのが面白かったです。自分の区画でも真似してみたら、夏の水やりがぐっと楽になりました。',
    name: '白井市・Nさん',
    photo: null,
    sample: true,
  },
  {
    activity: 'プレーパーク',
    text: '遊具がない場所で、子どもが木の枝と石だけで半日遊んでいました。大人は縁側でお茶を飲みながら、ゆっくり話せました。',
    name: '印西市・Hさん',
    photo: null,
    sample: true,
  },
  {
    activity: '事業者交流会',
    text: '同じ地域で店や農園をやっている人と、肩書きを外して話せたのがよかったです。翌月には早速、共同で企画を立てることになりました。',
    name: '印西市・事業者の方',
    photo: null,
    sample: true,
  },
  {
    activity: '薪づくりと冬支度',
    text: '薪を割るのは初めてでしたが、道具の扱いから教えてもらえました。自分で用意した薪で焚き火をしたときは、少し誇らしい気持ちになりました。',
    name: '成田市・Aさん',
    photo: null,
    sample: true,
  },
];

export type RecordItem = {
  title: string;
  date: string;
  text: string;
  image: string | null;
  url?: string | null;
  sample?: boolean;
};

export const records: RecordItem[] = [
  {
    title: '古民家まわりの道普請と草刈り',
    date: '2026年9月',
    text: '敷地につながる小路の草を刈り、石を積み直しました。歩きやすくなった道は、来場の方にも使ってもらっています。',
    image:
      'https://readdy.ai/api/search-image?query=Japanese%20satoyama%20path%20maintenance%20scene%20with%20volunteers%20clearing%20grass%20and%20repairing%20a%20small%20stone%20edged%20lane%20beside%20an%20old%20wooden%20farmhouse%2C%20warm%20afternoon%20sunlight%2C%20muted%20earthy%20greens%2C%20documentary%20style%20photography%2C%20soft%20natural%20shadows%2C%20calm%20rural%20atmosphere&width=900&height=500&seq=record-sato-2026&orientation=landscape',
    url: null,
    sample: true,
  },
  {
    title: '自然農の畝づくりと草マルチ',
    date: '2026年7月',
    text: '共同の苗場で畝を立て、刈った草を敷きました。参加者それぞれの区画でも、同じやり方で夏野菜を育てています。',
    image:
      'https://readdy.ai/api/search-image?query=Close%20view%20of%20hands%20building%20raised%20vegetable%20beds%20covered%20with%20cut%20grass%20mulch%20in%20a%20small%20organic%20farm%20plot%2C%20rich%20dark%20soil%2C%20wooden%20tools%20leaning%20nearby%2C%20soft%20diffused%20daylight%2C%20muted%20green%20and%20brown%20palette%2C%20honest%20documentary%20photography%2C%20quiet%20rural%20mood&width=900&height=500&seq=record-farm-2026&orientation=landscape',
    url: null,
    sample: true,
  },
  {
    title: '田んぼの生きもの観察会',
    date: '2026年8月',
    text: '子どもたちと網と虫めがねを持って田んぼへ。見つけた生きものを図鑑で調べ、水の生きものとお米の関係を話しました。',
    image:
      'https://readdy.ai/api/search-image?query=Children%20crouching%20beside%20a%20small%20rice%20paddy%20observing%20insects%20with%20magnifying%20glasses%20and%20nets%2C%20green%20rice%20plants%2C%20warm%20summer%20light%2C%20muted%20natural%20colors%2C%20candid%20documentary%20photography%2C%20gentle%20rural%20scene%20with%20soft%20background%20blur&width=900&height=500&seq=record-kids-2026&orientation=landscape',
    url: null,
    sample: true,
  },
  {
    title: '味噌仕込みと囲炉裏の食卓',
    date: '2026年2月',
    text: '大豆を煮て潰し、麹と塩を合わせて樽へ。仕込みのあとは、季節の惣菜と一緒に囲炉裏を囲みました。',
    image:
      'https://readdy.ai/api/search-image?query=Long%20wooden%20table%20inside%20an%20old%20Japanese%20farmhouse%20kitchen%20with%20homemade%20miso%20bowls%2C%20seasonal%20vegetable%20dishes%20and%20irori%20hearth%2C%20warm%20lantern%20light%2C%20muted%20earthy%20palette%2C%20editorial%20food%20photography%2C%20cozy%20rustic%20atmosphere%20with%20soft%20shadows&width=900&height=500&seq=record-food-2026&orientation=landscape',
    url: null,
    sample: true,
  },
  {
    title: '古民家と畑の家族撮影会',
    date: '2026年5月',
    text: '縁側と畑を舞台に、家族の時間をそのまま撮影しました。走り回る子どもたちの表情を、無理につくらずに残しています。',
    image:
      'https://readdy.ai/api/search-image?query=Family%20of%20four%20standing%20in%20front%20of%20an%20old%20Japanese%20farmhouse%20surrounded%20by%20vegetable%20garden%2C%20photographer%20adjusting%20camera%2C%20golden%20late%20afternoon%20light%2C%20muted%20warm%20tones%2C%20candid%20documentary%20photography%2C%20nostalgic%20rural%20mood&width=900&height=500&seq=record-photo-2026&orientation=landscape',
    url: null,
    sample: true,
  },
  {
    title: '薪づくりと焚き火の夕べ',
    date: '2025年12月',
    text: '冬の支度として薪を割り、焚き火を囲んで一年を振り返りました。手入れの道具は、参加者で共有しています。',
    image:
      'https://readdy.ai/api/search-image?query=People%20splitting%20firewood%20and%20sitting%20around%20a%20small%20bonfire%20outside%20an%20old%20wooden%20farmhouse%20in%20late%20autumn%2C%20stacked%20logs%2C%20bare%20trees%2C%20warm%20firelight%2C%20muted%20brown%20and%20green%20palette%2C%20documentary%20photography%2C%20calm%20community%20atmosphere&width=900&height=500&seq=record-season-2026&orientation=landscape',
    url: null,
    sample: true,
  },
];

export const activities = [
  {
    key: 'farm',
    label: '農園',
    title: 'みんなの家庭菜園場',
    text: '3m×3mの個人区画で、自然農に取り組めます。共用農具や月例会の相談もあり、初めての方も見学・体験から始められます。',
    to: '/farm',
    icon: 'ri-plant-line',
    cta: '農園を見る',
    image:
      'https://storage.helloreaddy.io/project_files/8adf33d7-51d1-4e5d-be2d-c47a66cbdf47/f326a5fa-7209-45e2-aebd-93501a0640fe_compressed_IMG_2027.webp',
    alt: '自然農の個人区画と育つ夏野菜',
  },
  {
    key: 'event',
    label: '季節のイベント',
    title: '古民家のイベント情報',
    text: '食、手仕事、映画、語り、里づくり、プレーパークなど。開催日と募集状況は予定帖でご確認いただけます。',
    to: '/schedule',
    icon: 'ri-calendar-event-line',
    cta: '予定帖を見る',
    image:
      'https://storage.helloreaddy.io/project_files/8adf33d7-51d1-4e5d-be2d-c47a66cbdf47/06ae5aef-3994-4c60-9e54-205c4d07ca26_compressed_IMG_2649.webp',
    alt: '古民家で季節の食と手仕事を囲む集まり',
  },
  {
    key: 'photo',
    label: '季節の家族撮影会',
    title: '古民家で、記憶に残る一枚を',
    text: '日程を決めた撮影会を企画ごとにご案内します。撮影時間や料金は各企画でお知らせします。',
    to: '/photo',
    icon: 'ri-camera-3-line',
    cta: '撮影会を見る',
    image:
      'https://storage.helloreaddy.io/project_files/8adf33d7-51d1-4e5d-be2d-c47a66cbdf47/fff6e335-e231-4a0c-bb43-ab7fbfe0efb0_compressed_IMG_0768.webp',
    alt: '古民家と畑での家族撮影会の様子',
  },
];

export const farmMonths = [
  {
    m: 1,
    work: '土の休息期。畝の見回り、落ち葉や枯れ草集め',
    exp: '堆肥づくりの材料集め・冬野菜の収穫例',
    img: 'https://readdy.ai/api/search-image?query=Winter%20resting%20vegetable%20field%20in%20a%20Japanese%20countryside%20farm%2C%20frost%20on%20bare%20soil%20ridges%2C%20gathered%20dry%20leaves%20and%20straw%20in%20a%20basket%2C%20soft%20low%20winter%20sunlight%2C%20calm%20quiet%20atmosphere%2C%20documentary%20photography%2C%20muted%20natural%20green%20and%20brown%20tones&width=800&height=500&seq=farm-month-01&orientation=landscape',
  },
  {
    m: 2,
    work: '春に向けた区画づくり、畝の整え',
    exp: '計画づくり・共同の苗場の準備',
    img: 'https://readdy.ai/api/search-image?query=Early%20spring%20farm%20preparation%20in%20Japan%2C%20person%20shaping%20soil%20ridges%20with%20a%20hoe%2C%20clean%20empty%20vegetable%20plots%2C%20nursery%20tables%20being%20set%20up%20in%20the%20background%2C%20clear%20cool%20blue%20sky%2C%20honest%20documentary%20photography%2C%20fresh%20natural%20light&width=800&height=500&seq=farm-month-02&orientation=landscape',
  },
  {
    m: 3,
    work: 'じゃがいもの植え付け、春まきの準備',
    exp: '種まきの基本を知る',
    img: 'https://readdy.ai/api/search-image?query=Hands%20planting%20seed%20potatoes%20into%20dark%20rich%20soil%20in%20a%20Japanese%20farm%20field%2C%20spring%20sowing%20season%2C%20small%20green%20sprouts%20nearby%2C%20gardening%20gloves%2C%20soft%20warm%20daylight%2C%20close%20documentary%20photography%2C%20natural%20earthy%20colors&width=800&height=500&seq=farm-month-03&orientation=landscape',
  },
  {
    m: 4,
    work: '夏野菜の苗づくり、葉物の種まき',
    exp: '苗場での育苗体験',
    img: 'https://readdy.ai/api/search-image?query=Rows%20of%20young%20summer%20vegetable%20seedlings%20in%20nursery%20trays%20at%20a%20small%20Japanese%20farm%2C%20hands%20sowing%20leafy%20green%20seeds%2C%20bright%20spring%20sunlight%20through%20a%20vinyl%20greenhouse%2C%20fresh%20green%20leaves%2C%20documentary%20photography%2C%20clean%20natural%20tones&width=800&height=500&seq=farm-month-04&orientation=landscape',
  },
  {
    m: 5,
    work: '夏野菜の植え付け、草との付き合い方',
    exp: '刈った草を敷く「草マルチ」',
    img: 'https://readdy.ai/api/search-image?query=Planting%20young%20summer%20vegetable%20seedlings%20into%20a%20lush%20Japanese%20farm%20field%2C%20cut%20grass%20used%20as%20mulch%20between%20rows%2C%20healthy%20green%20plants%2C%20rich%20soil%2C%20warm%20late%20spring%20sunlight%2C%20documentary%20photography%2C%20vivid%20but%20natural%20green%20palette&width=800&height=500&seq=farm-month-05&orientation=landscape',
  },
  {
    m: 6,
    work: '支柱立て、梅雨どきの手入れ',
    exp: '芽かき・誘引',
    img: 'https://readdy.ai/api/search-image?query=Tomato%20plants%20tied%20to%20bamboo%20stakes%20in%20a%20rainy%20season%20Japanese%20vegetable%20garden%2C%20wet%20green%20leaves%20with%20water%20droplets%2C%20person%20pinching%20side%20shoots%2C%20overcast%20soft%20light%2C%20documentary%20photography%2C%20calm%20muted%20green%20tones&width=800&height=500&seq=farm-month-06&orientation=landscape',
  },
  {
    m: 7,
    work: '夏野菜の収穫例、草刈り',
    exp: '採れたての野菜を味わう',
    img: 'https://readdy.ai/api/search-image?query=Summer%20harvest%20basket%20with%20tomatoes%2C%20cucumbers%20and%20eggplants%20on%20a%20wooden%20table%20at%20a%20Japanese%20farm%2C%20tall%20green%20field%20behind%2C%20strong%20summer%20sunlight%20and%20deep%20shadows%2C%20documentary%20food%20and%20farm%20photography%2C%20warm%20vivid%20natural%20colors&width=800&height=500&seq=farm-month-07&orientation=landscape',
  },
  {
    m: 8,
    work: '暑さ対策、秋冬野菜の準備',
    exp: '朝夕の作業の工夫',
    img: 'https://readdy.ai/api/search-image?query=Early%20morning%20watering%20of%20a%20Japanese%20farm%20field%20in%20midsummer%2C%20watering%20can%20and%20hose%2C%20prepared%20empty%20beds%20for%20autumn%20vegetables%2C%20long%20low%20sunlight%20and%20light%20mist%2C%20documentary%20photography%2C%20soft%20golden%20green%20tones&width=800&height=500&seq=farm-month-08&orientation=landscape',
  },
  {
    m: 9,
    work: '秋冬野菜の種まき・植え付け',
    exp: '大根・葉物の種まき',
    img: 'https://readdy.ai/api/search-image?query=Sowing%20daikon%20radish%20and%20leafy%20green%20seeds%20in%20straight%20rows%20on%20a%20Japanese%20farm%2C%20seed%20packets%20and%20small%20hand%20tools%20beside%20the%20bed%2C%20clear%20autumn%20sky%2C%20gentle%20daylight%2C%20documentary%20photography%2C%20fresh%20clean%20natural%20palette&width=800&height=500&seq=farm-month-09&orientation=landscape',
  },
  {
    m: 10,
    work: '間引き、さつまいも等の収穫例',
    exp: '間引き菜を食卓へ',
    img: 'https://readdy.ai/api/search-image?query=Harvesting%20sweet%20potatoes%20from%20the%20soil%20in%20a%20Japanese%20farm%20field%2C%20just%20dug%20purple%20potatoes%20in%20a%20wooden%20crate%2C%20thinned%20leafy%20greens%20in%20a%20basket%2C%20warm%20autumn%20afternoon%20light%2C%20documentary%20photography%2C%20earthy%20warm%20colors&width=800&height=500&seq=farm-month-10&orientation=landscape',
  },
  {
    m: 11,
    work: '玉ねぎ・豆類の植え付け、採種',
    exp: '種を採って次へつなぐ',
    img: 'https://readdy.ai/api/search-image?query=Planting%20onion%20sets%20and%20broad%20beans%20in%20a%20late%20autumn%20Japanese%20farm%20garden%2C%20dried%20seed%20pods%20collected%20in%20a%20paper%20envelope%2C%20fallen%20leaves%20around%20the%20beds%2C%20soft%20golden%20light%2C%20documentary%20photography%2C%20muted%20autumn%20tones&width=800&height=500&seq=farm-month-11&orientation=landscape',
  },
  {
    m: 12,
    work: '冬野菜の手入れ、区画の振り返り',
    exp: '一年の振り返りと来年の計画',
    img: 'https://readdy.ai/api/search-image?query=Winter%20vegetable%20plot%20with%20cabbage%20and%20broccoli%20in%20a%20Japanese%20farm%2C%20light%20frost%20on%20the%20leaves%2C%20notebook%20and%20pencil%20resting%20on%20a%20wooden%20bench%2C%20pale%20low%20winter%20sun%2C%20documentary%20photography%2C%20quiet%20cool%20natural%20tones&width=800&height=500&seq=farm-month-12&orientation=landscape',
  },
];