export const HebrewLetters = [
    {"hebrew": "א", "transliteration": "Aleph"},
    {"hebrew": "בּ", "transliteration": ["Bet", "Beit", "beis"]}, //beis veis
    {"hebrew": "ב", "transliteration": ["vet", "veit", "vase"]},
    {"hebrew": "ג", "transliteration": "Gimel"},
    {"hebrew": "ד", "transliteration": "Dalet"},
    {"hebrew": "ה", "transliteration": "He"},
    {"hebrew": "ו", "transliteration": "Vav"},
    {"hebrew": "ז", "transliteration": "Zayin"},
    {"hebrew": "ח", "transliteration": ["Chet", "ches"]},
    {"hebrew": "ט", "transliteration": ["Tet", "tes"]},
    {"hebrew": "י", "transliteration": "Yod"},
    {"hebrew": "כּ", "transliteration": "Kaf"},
    {"hebrew": "כ", "transliteration": "Chaf"},
    {"hebrew": "ך", "transliteration": ["Final Kaf", "Final Chaf"]},
    {"hebrew": "ל", "transliteration": "Lamed"},
    {"hebrew": "מ", "transliteration": "Mem"},
    {"hebrew": "ם", "transliteration": "Final Mem"},
    {"hebrew": "נ", "transliteration": "Nun"},
    {"hebrew": "ן", "transliteration": "Final Nun"},
    {"hebrew": "ס", "transliteration": "Samech"},
    {"hebrew": "ע", "transliteration": "Ayin"},
    {"hebrew": "פּ", "transliteration": "Pay"},
    {"hebrew": "פ", "transliteration": "Fey"},
    {"hebrew": "ף", "transliteration": ["Final Pey", "Final Fey"]},
    {"hebrew": "צ", "transliteration": ["Tsadi", "Zadi", "Sadik", "Tsadik"]},
    {"hebrew": "ץ", "transliteration": ["Final Tsadi", "Final Zadi"]},
    {"hebrew": "ק", "transliteration": "Kuf"},
    {"hebrew": "ר", "transliteration": "Resh"},
    {"hebrew": "ש", "transliteration": "Shin"},
    {"hebrew": "שׁ", "transliteration": "Shin"},
    {"hebrew": "שׂ", "transliteration": "Sin"},
    {"hebrew": "תּ", "transliteration": ["Tav", "tough"]},
    {"hebrew": "ת", "transliteration": "Saf"}
]
export const  ashkenazify = function(phrase) {
    const phrases = [phrase]
    let ashkenaz = phrase.replace("ו", "וי");
    ashkenaz = ashkenaz.replaceAll("ת", "ס");

    phrases.push(ashkenaz)
    return phrases;
}