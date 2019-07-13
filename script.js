$(function() {
  //変数の定義
  var container = $('#container'); //コンテナ
  var tarzan = $('#tarzan'); //ターザン
  var wood = $('.wood'); //木
  var wood_1 = $('#wood_1'); //上の木
  var wood_2 = $('#wood_2'); //下の木
  var score = $('#score'); //スコア
  var speed_span = $('#speed'); //スピード
  var upper = $('#upper'); //アップボタン
  var down = $('#down'); //ダウンボタン
  var restart = $('#restart'); //リスタート
  var quit = $('#quit'); //ゲームをやめる

  var container_width = parseInt(container.width()); //コンテナの幅
  var container_height = parseInt(container.height()); //コンテナの高さ
  var wood_initial_position = parseInt(wood.css('right')); //木の初期位置
  var wood_initial_height = parseInt(wood.css('height')); //木の初期高さ
  var tarzan_left = parseInt(tarzan.css('left')); //ターザンの左側
  var tarzan_height = parseInt(tarzan.height()); //ターザンの高さ
  var speed = 10; //木の向かってくるスピード

  var go_up = false; //ターザンが上がる
  var score_update = false; //スコアのアップデート
  var game_over = false; //ゲームオーバー


  var the_game = setInterval(function () {

    //ターザンが木またはコンテナに衝突したかどうかの確認
    if (collision(tarzan, wood_1) || collision(tarzan, wood_2) || parseInt(tarzan.css('top')) <= 0 || parseInt(tarzan.css('top')) > container_height - tarzan_height) {
      stop_the_game();

    } else {

      var wood_current_position = parseInt(wood.css('right')); //木の現在の位置(右から迫ってくる)

      //木を通過するとスコアのアップデート
      if (wood_current_position > container_width - tarzan_left) {
        if (score_update === false) {
          score.text(parseInt(score.text()) + 1);
          score_update = true;
        }
      }

      //木がコンテナから出たかどうかを確認
      if (wood_current_position > container_width) {
        var new_height = parseInt(Math.random() * 100); //木の高さがランダムに変わる

        //木の高さを変える
        wood_1.css('height', wood_initial_height + new_height); //現在の高さに新たな高さ分を加える
        wood_2.css('height', wood_initial_height - new_height); //現在の高さから新たな高さ分を引く

        //スピードが速くなる
        speed = speed + 1;

        score_update = false;
        wood_current_position = wood_initial_position; //コンテナ幅を超えて初期位置に戻るを繰り返す
      }

      //木を動かす
      wood.css('right', wood_current_position + speed);

      //ターザンが上がるか確認
      if (go_up === false) {
        go_down();
      }
    }

  }, 40);


  //ターザンが下がる
  function go_down() {
    tarzan.css('top', parseInt(tarzan.css('top')) + 5); //ターザンが下がるスピード
  }

  //ターザンが上がる
  function up() {
    tarzan.css('top', parseInt(tarzan.css('top')) - 5); //ターザンが上がるスピード
  }

  //ゲームオーバー
  function stop_the_game() {
    clearInterval(the_game);
    game_over = true; //ターザンを動かなくする
    restart.slideDown(); //リスタートボタンを出現させる
    quit.slideDown(); //終了ボタンを出現させる
    tarzan.fadeOut(); //ターザンをフェードアウトさせる
  }

  //アップボタンクリックでターザンを上げる
  upper.click(function() {
    if (go_up === false && game_over === false){
      go_up = setInterval(up, 40);
  }
  });

  //ダウンボタンクリックでターザンを下げる
  down.click(function() {
    clearInterval(go_up);
    go_up = false;
  });

  //ボタンクリックでリスタートさせる
  restart.click(function() {
    location.reload();
  });


  function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;

  }

});
