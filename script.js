/**
 * @name id
 * @label osu!UserID
 * @type text
 * @positiveOnly true
 * @description osu!のユーザー名を入力してください。
 */
var id = "netman1221";
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
 * @label osu!Play Mode
 * @type select
 * @options osu||taiko||ctb||mania
 * @description osu!のモードを選択します
 */
var mode = "osu";
var d1 = "\"" + mode + "\":{\"data\":{\"rank\":{\"isRanked\":true,\"global\":";
var d2 = ",\"country\":";
var oldResponse;

function GetTextFromRemote() {
    $.ajax({
        url: "http://new.ppy.sh/u/" + id,
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
                b = "#" + b.substring(d, h) + " "
            }
            if (oldResponse != b) {
                SetText(b, id + "'s " + mode + " Ranking(" + b + ")")
            }
            oldResponse = b
        }
    })
}
if (smlTitleTimeouts && smlTitleTimeouts != null) {
    clearTimeout(smlTitleTimeouts)
}
GetTextFromRemote();
