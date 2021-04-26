# ディレクトリの話

## api
fetch使ってAPIからなんらかのものを取得するときに使う。
ここではエラーハンドリングを行わない。

## domCreator
エレメントの作成を行う。
実際のHTMLに対してDOMを追加することは行わない。

## index.js
すべての根源。
イベントリスナーをセットしたり、fetchを行ったりする。
UIに強く紐付いたプログラムなのでテスタブルにはしていない。

# テストを書くなら

api配下のプログラムはAPIリクエストを送って意図したレスポンスかどうかを確認できそうだけど、サーバーが無いと動かないのでテストを書くのはあまり考えてない
mockサーバーたてて、そこにリクエスト送ってもいいけど、あまりテストする意味がないと思う。リクエストのbodyが正しく形作られているか？？みたいなテストくらいしかかけなさそう。


テスト書くなら domCreatorディレクトリだと思っている。
todoListを渡したらそのtodoを使ったエレメントの配列が返ってくることを確認する感じ。

submitボタンを押したら意図した関数が走るか？みたいなテストを書くならindex.jsで、そうするとmain関数か、イベントリスナーをセットする関数を作成して、そこに関数を渡すようにすると良さそう。

```
exportconst addEventListenersForTodoList = (updateDonel deleteTodoAndUpdateList) => {
    // DONEのチェックボックス
    const checkBoxList = document.querySelectorAll('.todo-toggle');
    checkBoxList.forEach(el => {
      el.addEventListener('change', updateDone);
    })
    // DONEのチェックボックス
    const deleteButtonList = document.querySelectorAll('.todo-remove-button');
    deleteButtonList.forEach(el => {
      el.addEventListener('click', deleteTodoAndUpdateList);
    })
}
```

あまり費用帯効果はなさそうなのと、イベントが増えた時に渡す引数がめっちゃ多くなりそうなので今の僕に知識では「書かない」という選択になりそうw