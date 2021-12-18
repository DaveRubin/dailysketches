export const blackList = [
    "-",
    "לא",
    "את",
    "זה",
    "של",
    "על",
    "כל",
    "עם",
    "רק",
    "אז",
    "או",
    "אם",
    "כך",
    "כי",
    "איזה",
    "שהוא",
    "שלא",
    "שם",
    "יותר",
    "פה",
    "אותו",
    "הזה",
    "זו",
    "בכל",
    "וגם",
    "הכי",
    "שזה",
    "לך",
    "ללא",
    "די",
    "עד",
    "אף",
    "היא",
    "היה",
    "גם",
    "מה",
    "לו",
    "אני",
    "עוד",
    "לי",
    "הוא",
    "לה",
    "הכל",
    "שלו",
    "שלי",
    "לפני",
    "מי",
    "שאני",
    "היו",
    "הייתי",
    "אחרי",
    "כזה",
    "איך",
    "מכל",
    "וזה",
    "יהיה",
    "איזו",
    "לכל",
    "בו",
    ",",
    "מן",
    "בין",
    "שאת",
    "למרות",
    "ואני",
    "אבל",
    "כבר",
    "יש",
    "שום",
    "הם",
    "אתה",
    "ולא",
    "היום",
    "הרי",
    "והוא",
    "קצת",
    "כמו",
    "כמה"
]
  Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
  }