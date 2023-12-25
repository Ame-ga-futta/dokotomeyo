# README

## dokotomeyo
https://www.dokotomeyo.com

## 概要
dokotomeyoは、無料で停められる駐車場を投稿、検索できるサービスです。  
目的地、時間、条件から、付近の駐車場をサジェストします。  
投稿された駐車場の情報は、誰でも追加・編集ができます。  
会員登録すると、駐車場のお気に入り登録、駐車場へのコメント投稿が可能になります。  

お試し用のゲストログイン機能もあります。投稿データは10分毎にリセットされます。
https://www.dokotomeyo.com/dokotomeyo/guest_login

## 開発の背景
車の維持費は高い！なるべくコストを抑えようと思った時に、無料で停められる場所を探すのがめんどくさいと思ったことから、開発に取り組みました。  

基本的にフロントエンドはReactのSPAになっていて、Railsはデータのやり取りのみを担当しています。  
googlemapAPIを利用した検索機能や駐車場情報の管理、データベースの絞り込みに力を入れました。  

データは自分の住んでいる多摩地域に偏っているので、検索の際は下記から検索するとわかりやすいかと思います。  
・多摩センター駅

## 使い方  
*検索機能*<br>
TOPページで完結するようになっています。左上の検索ボックスに必要な情報を入力すると、候補のリストと駐車場の位置が表示されます。  
候補を選択すると、その駐車場の詳細情報が表示されます。  
https://www.dokotomeyo.com/dokotomeyo
<img width="1440" alt="スクリーンショット 2022-05-15 18 58 55" src="https://user-images.githubusercontent.com/83625503/168467284-818eb823-e521-4836-b7d3-a3d49baef0bb.png">

*投稿機能*<br>
ヘッダー上のハンバーガーメニューから、駐車場情報投稿のページに遷移できます。  
地図から場所を選択して、必要な情報を入力します。問題がなければ、駐車場の情報がDBに保存されます。  
https://www.dokotomeyo.com/dokotomeyo/post
<img width="1440" alt="スクリーンショット 2022-05-15 18 59 36" src="https://user-images.githubusercontent.com/83625503/168467306-452ecc9a-84de-452a-a434-ee172398a58c.png">

*編集機能*<br>
TOPページの駐車場の詳細情報、もしくは投稿後のリダイレクトで駐車場情報の編集画面に遷移できます。  
追加と編集のタブに分かれており、誰でも編集ができます。  
https://www.dokotomeyo.com/dokotomeyo/parking/1
<img width="1440" alt="スクリーンショット 2022-05-15 19 00 29" src="https://user-images.githubusercontent.com/83625503/168467330-743db6c9-24fe-4951-85ef-336bddd5f45f.png">

*会員機能*<br>
ログイン状態でない場合、ヘッダー上のハンバーガーメニューから、新規登録・ログインのページに遷移できます。  
ログイン状態の場合、ヘッダー上のハンバーガーメニューから、マイページへの遷移とログアウトができます。  
https://www.dokotomeyo.com/dokotomeyo/signup

マイページでは、ユーザー情報の編集や退会、お気に入り駐車場の管理、投稿したコメントの管理ができます。  
https://www.dokotomeyo.com/dokotomeyo/mypage

*管理者機能*<br>
ログインしているユーザーが管理者の場合、管理者画面を開くことができます。  
管理者画面では全てのモデルの情報を取得、削除ができます。  

## モデル設計
*ER図*<br>
![erd](https://user-images.githubusercontent.com/83625503/168465073-21dde468-d406-46de-9f3d-13abb9873a94.jpg)

|テーブル|概要|
| ------------------ | ------------------ |
| parkings  | 駐車場情報  |
| requirement_frees  | 無料の条件についての情報 終日無料 |
| requirement_buys  | 無料の条件についての情報 買い物金額一定以上で無料 |
| requirement_facilities  | 無料の条件についての情報 施設利用で無料 |
| requirement_times  | 無料の条件についての情報 入庫後一定時間無料 |
| users  | ユーザー情報  |
| comments  | ユーザーの投稿コメント情報  |
| favorites  | ユーザーのお気に入り情報  |
| inquiries  | お問い合わせ情報 |


