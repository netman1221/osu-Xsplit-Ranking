/**
 * @name id
 * @label osu! userID
 * @type text
 * @description osu!のユーザーID(数字)を入力してください。
 */
var id = "751497";
/**
 * @name upd
 * @label 更新間隔
 * @type int
 * @positiveOnly true
 * @description ランキングの更新間隔(秒)です。
 */
var upd = 5;
/**
 * @name mode
 * @label osu!Play mode
 * @type select
 * @options osu||taiko||ctb||mania
 * @description osu!のモードを選択します。
 */
var mode = "osu";
var oldResponse;
var d1 = "pp (#";
var d2 = ")<\/b>";
var s = "https://osu.ppy.sh/pages/include/profile-general.php?u=";
if (mode == "osu") {
    m = "0"
}
if (mode == "taiko") {
    m = "1"
};
if (mode == "ctb") {
    m = "2"
}
if (mode == "mania") {
    m = "3"
}

function GetTextFromRemote() {
    $.ajax({
        url: s + id + "&m=" + m,
        type: "GET",
        dataType: "text",
        complete: function() {
            if (upd > 0) smlTitleTimeouts = setTimeout(function() {
                GetTextFromRemote()
            }, upd * 1000)
        },
        success: function(a) {
            var b;
            b = a;
            if (d1 != "" && d2 != "") {
                var c = b.length;
                var d = b.indexOf(d1) > -1 ? (b.indexOf(d1) + d1.length) : 0;
                var e = b.substring(d);
                var f = e.length;
                var g = e.indexOf(d2) > -1 ? e.indexOf(d2) : c;
                var h = c;
                if (g != c) {
                    h = g + (c - f)
                }
                if (h <= d) h = b.length - 1;
                b = b.substring(d, h)
            }
            if (oldResponse != b) {
                SetText("#" + b, id + "'s osu! ranking")
            }
            oldResponse = b
        }
    })
}
if (smlTitleTimeouts && smlTitleTimeouts != null) {
    clearTimeout(smlTitleTimeouts)
}
GetTextFromRemote();