export const PROJECT_SECTIONS = {
  ishistagram: [
    {
      id: "profile",
      title: "プロフィール画面",
      img: "/img/works-detail/works-1-1.png",
      alt: "プロフィール画面",
      text:
        "ユーザーのプロフィール画面では、過去に投稿したことがあるものが表示されます。また、他のユーザーをフォローしたり、自分のプロフィールを編集することもできます。さらに、ラベル選択によりラベルのついた投稿のみを表示させることもできます。",
    },
    {
      id: "new-post",
      title: "新規投稿画面",
      img: "/img/works-detail/works-1-2.png",
      alt: "新規投稿画面",
      text:
        "画像と投稿文、ラベルをつけて投稿することができます。ラベルをつけることによって、プロフィール画面で、投稿の管理がしやすくなります。ラベルは最大2個まで設定することができます。",
    },
    {
      id: "edit-post",
      title: "投稿編集画面",
      img: "/img/works-detail/works-1-3.png",
      alt: "投稿編集画面",
      text:
        "過去の投稿を編集することができます。例えば、ラベルの変更や追加によってプロフィール画面で管理しやすくなります。",
    },
    {
      id: "search-result",
      title: "検索結果画面",
      img: "/img/works-detail/works-1-5.png",
      alt: "検索結果画面",
      text:
        "検索結果画面では、ハッシュタグやラベルで関連する他のユーザーの投稿を検索することができます。これにより、ユーザーが興味のある投稿のみを見つけることができます。",
    },
    {
      id: "edit-profile",
      title: "プロフィール編集画面",
      img: "/img/works-detail/works-1-6.png",
      alt: "プロフィール編集画面",
      text:
        "プロフィール編集画面では、プロフィール画像や名前、自己紹介など、ユーザーの基本情報を編集することができます。",
    },
  ],
  
  foodieScout: [
    {
      id: "top-view",
      title: "トップ画面",
      img: "/img/works-detail/works-2-1.png",
      alt: "トップ画面",
      text:
        "トップ画面では、ユーザーが「料理ジャンル」や「おすすめ店舗」、「注目の店舗」から、飲食店を探すことができます。ユーザーの信頼性を示すバッジや人気ユーザー欄も表示されます。",
    },
    {
      id: "restaurant-detail",
      title: "飲食店詳細画面",
      img: "/img/works-detail/works-2-2.png",
      alt: "飲食店詳細画面",
      text:
        "飲食店の基本情報やネット予約機能、口コミなどを掲載し、ユーザーが予約に必要な情報を確認できる画面です。",
    },
    {
      id: "search-result",
      title: "検索結果画面",
      img: "/img/works-detail/works-2-3.png",
      alt: "検索結果画面",
      text:
        "検索条件に合った店舗を表示します。星評価を取り入れ、ユーザーが質の高い店舗を簡単に見つけられるようにしています。",
    },
    {
      id: "profile",
      title: "プロフィール画面",
      img: "/img/works-detail/works-2-4.png",
      alt: "プロフィール画面",
      text:
        "ユーザーが投稿した口コミやランキングを表示します。ジャンルごとの評価が見られ、他のユーザーが参考にできます。",
    },
    {
      id: "review",
      title: "レビュー画面",
      img: "/img/works-detail/works-2-5.png",
      alt: "レビュー作成画面",
      text:
        "料理ジャンルごとの口コミ投稿やランキングを作成できる機能を提供しています。",
    },
  ],

  portfolio: [
    {
      id: "top-view",
      title: "トップページ",
      img: "/img/works-detail/works-3-1.png",
      alt: "トップページ",
      text:
        "トップページでは、視覚的に分かりやすいように配色にこだわりました。",
    },
    {
      id: "works-detail",
      title: "作品紹介ページ",
      img: "/img/works-detail/works-3-2.png",
      alt: "作品紹介ページ",
      text:
        "作品紹介ページでは、視覚的に分かりやすいように配色にこだわりました。",
    },
  ],
};

export const getSections = (project) => PROJECT_SECTIONS[project] ?? [];
