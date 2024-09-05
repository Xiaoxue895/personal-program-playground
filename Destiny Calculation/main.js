const yearWeights = {
    1970: 9, 1971: 17, 1972: 5, 1973: 7, 1974: 12, 1975: 8, 1976: 8, 1977: 6,
    1978: 19, 1979: 6, 1980: 8, 1981: 16, 1982: 10, 1983: 6, 1984: 12, 1985: 9,
    1986: 6, 1987: 7, 1988: 12, 1989: 5, 1990: 9, 1991: 8, 1992: 7, 1993: 8,
    1994: 15, 1995: 9, 1996: 16, 1997: 8, 1998: 8, 1999: 19, 2000: 12, 2001: 6,
    2002: 8, 2003: 7, 2004: 5, 2005: 15, 2006: 6, 2007: 16, 2008: 15, 2009: 7,
    2010: 9, 2011: 12, 2012: 10, 2013: 7, 2014: 15, 2015: 6, 2016: 5, 2017: 14,
    2018: 14, 2019: 9, 2020: 7, 2021: 7, 2022: 7, 2023: 8
};

function getYearWeight(year) {
    const yearStr = year.toString();
    return yearWeights[yearStr] || 0; 
}

function getWeightFromMonth(month) {
    const monthMap = {
        1: 6, 2: 7, 3: 18, 4: 9, 5: 5, 6: 16,
        7: 9, 8: 15, 9: 1.8, 10: 8, 11: 9, 12: 5
    };
    return monthMap[month] || 0;
}

function getWeightFromDay(day) {
    const dayMap = {
        1: 5, 2: 12, 3: 8, 4: 15, 5: 16, 6: 15,
        7: 8, 8: 16, 9: 8, 10: 16, 11: 9, 12: 12,
        13: 8, 14: 17, 15: 12, 16: 8, 17: 9, 18: 18,
        19: 5, 20: 15, 21: 10, 22: 9, 23: 8, 24: 9,
        25: 15, 26: 18, 27: 7, 28: 8, 29: 16, 30: 6
    };
    return dayMap[day] || 0;
}


function getWeightFromTime(time) {
    const timeMap = {
        0: 16, 1: 16, 2: 16, 3: 7, 4: 7, 5: 7,
        6: 10, 7: 9, 8: 10, 9: 16, 10: 16, 11: 10,
        12: 16, 13: 16, 14: 16, 15: 8, 16: 8, 17: 9,
        18: 16, 19: 16, 20: 16, 21: 6, 22: 6, 23: 6
    };
    return timeMap[time] || 0;
}



document.getElementById('fortuneForm').addEventListener('submit', function(event) {
    event.preventDefault();


    const year = parseInt(document.getElementById('birthYear').value, 10);
    const month = parseInt(document.getElementById('birthMonth').value, 10);
    const day = parseInt(document.getElementById('birthDay').value, 10);
    const time = parseInt(document.getElementById('birthTime').value, 10); 

    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(time)) {
        document.getElementById('result').innerText = "input the real time";
        return;
    }


    const yearWeight = getYearWeight(year);
    const monthWeight = getWeightFromMonth(month);
    const dayWeight = getWeightFromDay(day);
    const timeWeight = getWeightFromTime(time);


    const totalWeight = yearWeight + monthWeight + dayWeight + timeWeight;

    const boneWeights = {
        21: "A short life without achievements, considered a major misfortune. Throughout life, disaster and hardship come in waves, with frequent adversity leading to a lifetime of failure and suffering.",
        22: "Born into cold and hardship, destined to be a beggar. Toilsome labor brings no respite, and life is filled with struggle and hardship until the end.",
        23: "This fate predicts a light burden, but plans and efforts rarely succeed. It's hard to rely on wife, children, or brothers, and one is likely to wander as an outcast.",
        24: "This fate comes without fortune or wealth, with constant family struggles and little glory. Relatives offer no support, and one is likely to live in a foreign land as an elder.",
        25: "The ancestral heritage is weak, and the family business seems unusual. Relatives are distant, like water and fire, and one must rely on their own efforts for a lifetime of hard work.",
        26: "A life filled with hardships, always working alone and never resting. It's wise to leave the family early, as in later years, fortune and wealth will eventually come.",
        27: "Throughout life, decisions are made without much consultation, and it's hard to rely on ancestral support. One fights alone, both in youth and old age, with no lasting gains.",
        28: "Life is as fleeting as a floating reed. Ancestral inheritance feels like a dream. Unless the family name is changed or one is adopted, they must migrate to find success elsewhere.",
        29: "Early life is full of misfortune, and even if success comes later, it's delayed. Only after turning forty can one rise in fortune, often needing to change residence or surname.",
        30: "A lifetime of toil and hardship, constantly wandering. If one can live a life of diligence and thrift, they can avoid worry in old age.",
        31: "A life of endless toil and hardship, always hoping for a better future. It's hard to build a family foundation, but by middle age, food and clothing will no longer be a worry.",
        32: "Early life is full of errors and difficulties, but gradually, wealth will flow like water. By middle age, life will prosper with both fame and fortune arriving together.",
        33: "In early years, things rarely succeed. Many plans fail and much effort is wasted. Half of life flows by like water, but eventually, fortune will arrive, bringing wealth.",
        34: "How is this fortune? A person is well-suited for the life of a monk, with abundant provisions in religious orders. Leaving the family and devoting oneself to spiritual life brings true success.",
        35: "The blessings of life are not fully realized. Ancestral roots feel weak. One should stay in their current business and await good fortune, which will improve clothing and food from earlier times.",
        36: "There is no need for excessive labor in this life, as one will succeed alone. Early in life, a star of fortune will often shine, allowing for a hundred paths to success.",
        37: "This fate predicts that most things will fail. With little help from siblings, one becomes self-reliant. Even if ancestral wealth exists, it fades as quickly as it comes.",
        38: "A person of high status, destined for scholarly success from an early age. By age thirty-six, blue clothes will be traded for red, signaling a rise in rank.",
        39: "This fate predicts a lifetime of misfortune and struggles. Hard work and effort will lead to nothing, and any success will feel like a fleeting dream.",
        40: "A life of abundant clothing and provisions. Every decision feels self-determined. After weathering the early storms, one will certainly enjoy peace and prosperity.",
        41: "This fate is different. A person is capable and stands out from the crowd. There will be happiness and good fortune in middle age, quite different from earlier cloudy days.",
        42: "When possible, keep a light heart, and don't let constant worries trouble you. If middle age brings good fortune, both fame and wealth will arrive together.",
        43: "A person of great intelligence, often close to those in power. Throughout life, provisions are guaranteed by fate, and there is no need for toil. A life of plenty.",
        44: "Fate is predetermined, so there's no need for excessive seeking. The blessings of wealth and fortune will come later, easing worries as old age approaches.",
        45: "A life of riches, with a search for truth and purity. Bright talent and ambition will flourish. With full blessings of fortune, family life will prosper, especially in later years.",
        46: "Traveling in all directions, success comes from changing names or adoption. Clothing and food are guaranteed by fate, with equal fortune in middle and late life.",
        47: "This fate prospers in the later years. Wives and children bring honor and happiness. A life of abundant fortune, with wealth flowing like water.",
        48: "Early life brings no fortune. The struggles of youth will lead to nothing. Family and relatives cannot be relied on, but personal success comes in later years.",
        49: "This fate is not light. Self-reliant, one achieves great success and respect. Wealth and nobility bring closeness to influential people, with servants and comfort throughout life.",
        50: "A lifetime of seeking fame and fortune, with much effort and little gain. However, middle age brings both blessings and hardship. In old age, wealth will shine brighter than before.",
        51: "A life of prosperity and ease, where everything falls into place. No hard labor is required, as family and relations thrive, with wealth and fortune filling the house.",
        52: "A life of abundance and success. Everything falls into place naturally. With peace and joy, one’s family thrives, and wealth brings comfort and happiness.",
        53: "This fate predicts great fortune, with the potential for both personal success and a thriving family. Wealth and prosperity are assured, and one may even become a wealthy leader.",
        54: "Blessed with both fortune and knowledge, a person is well-read and successful. With steady income and provisions, life is both comfortable and fulfilling, living as one of the fortunate.",
        55: "Chasing fame and fortune with great determination in youth, often without success. But one day, blessings of wealth will arrive, bringing honor and glory to the family.",
        56: "This fate predicts a refined and well-ordered life, with endless blessings. After tasting the hardships of life, wealth will flow steadily, bringing peace and abundance.",
        57: "A life of abundant fortune, bringing honor to parents and respect from others. Fame and prestige will be well-established, leading to a carefree and joyful existence.",
        58: "Fortune flows naturally through life. Both fame and wealth are achieved, with honors and positions bringing great joy and prosperity throughout life.",
        59: "A refined and distinguished fate. Intelligence and elegance lead to success. One is destined to be part of the highest ranks, with wealth and honor following naturally.",
        60: "Fortune arrives with a place on the gold-engraved lists, bringing honor to ancestors and great achievements. Clothing and food will be abundant, with wealth overflowing from the fields.",
        61: "Though not destined to rise to high office, one is bound to become a wealthy leader. With natural intelligence and mastery of books, success and recognition come easily.",
        62: "Born into great fortune, destined for scholarly success and the honor of ancestors. Clothed in purple and gold, one achieves both wealth and status.",
        63: "A life destined for high office and abundant blessings. Both wealth and success are assured, and one’s name will be known throughout the land as a great achiever.",
        64: "A fate of overwhelming power, with purple robes and gold sashes worn proudly. Wealth and fortune flow in abundance, with treasures stored in overflowing warehouses.",
        65: "This fate brings abundant fortune, with peace and prosperity. Grand mansions and wealth define this life, and great fame brings recognition from all corners of the world.",
        66: "A blessed and fortunate life, with riches and wealth filling the home. This fortune is determined by heaven, and one’s future holds great success and recognition from the emperor.",
        67: "Born into great fortune, with abundant land and property. Throughout life, provisions are plentiful, and wealth and honor fill the days.",
        68: "Fortune is determined by heaven, and there is no need for excessive seeking. Wealth flows in abundance, and success arrives in later years, though family foundations may feel unstable.",
        69: "You are a star of wealth and fortune. Throughout life, people admire your blessings. Though determined by heaven, life is filled with peace and prosperity.",
        70: "This fate predicts abundant fortune. There's no need for worry or toil. Throughout life, blessings of wealth and prosperity will flow in abundance, leading to a carefree and successful existence.",
        71: "Born into great fortune, destined for high office. A life of peace and joy, with great honor and wealth in abundance.",
        72: "This fate is rare in the world, born from ten generations of accumulated virtue. The stars align to guide this person, bringing peace and prosperity to the people."
    };
    

    // const boneWeights = {
    //     21: "短命非业谓大凶，平生灾难事重重，凶祸频临限逆境，终世困苦事不成",
    //     22: "身寒骨冷苦伶仃，此命推来行乞人，劳劳碌碌无度日，中年打拱过平生",
    //     23: "此命推来骨轻轻，求谋做事事难成，妻儿兄弟应难许，别处他乡作散人",
    //     24: "此命推来福禄无，门庭困苦总难荣，六亲骨肉皆无靠，流到他乡作老人",
    //     25: "此命推来祖业微，门庭营度似希奇，六亲骨肉如水炭，一世勤劳自把持",
    //     26: "平生一路苦中求，独自营谋事不休，离祖出门宜早计，晚来衣禄自无忧",
    //     27: "一生做事少商量，难靠祖宗作主张，独马单枪空作去，早年晚岁总无长",
    //     28: "一生作事似飘蓬，祖宗产业在梦中，若不过房并改姓，也当移徒二三通",
    //     29: "初年运限未曾亨，纵有功名在后成，须过四旬方可上，移居改姓使为良",
    //     30: "劳劳碌碌苦中求，东走西奔何日休，若能终身勤与俭，老来稍可免忧愁",
    //     31: "忙忙碌碌苦中求，何日云开见日头，难得祖基家可立，中年衣食渐无忧",
    //     32: "初年运错事难谋，渐有财源如水流，到的中年衣食旺，那时名利一齐来",
    //     33: "早年做事事难成，百计徒劳枉费心，半世自如流水去，后来运到始得金",
    //     34: "此命福气果如何，僧道门中衣禄多，离祖出家方得妙，终朝拜佛念弥陀",
    //     35: "生平福量不周全，祖业根基觉少传，营事生涯宜守旧，时来衣食胜从前",
    //     36: "不须劳碌过平生，独自成家福不轻，早有福星常照命，任君行去百般成",
    //     37: "此命般般事不成，弟兄少力自孤成，虽然祖业须微有，来的明时去的暗",
    //     38: "一生骨肉最清高，早入学门姓名标，待看年将三十六，蓝衣脱去换红袍",
    //     39: "此命终身运不通，劳劳做事尽皆空，苦心竭力成家计，到得那时在梦中",
    //     40: "平生衣禄是绵长，件件心中自主张，前面风霜都受过，从来必定享安泰",
    //     41: "此命推来事不同，为人能干异凡庸，中年还有逍遥福，不比前年云未通",
    //     42: "得宽怀处且宽怀，何用双眉总不开，若使中年命运济，那时名利一齐来",
    //     43: "为人心性最聪明，做事轩昂近贵人，衣禄一生天数定，不须劳碌是丰亨",
    //     44: "来事由天莫苦求，须知福禄胜前途，当年财帛难如意，晚景欣然便不忧",
    //     45: "福中取贵格求真，明敏才华志自伸，福禄寿全家道吉，桂兰毓秀晚荣臻",
    //     46: "东西南北尽皆通，出姓移名更觉隆，衣禄无亏天数定，中年晚景一般同",
    //     47: "此命推来旺末年，妻荣子贵自怡然，平生原有滔滔福，可有财源如水流",
    //     48: "幼年运道未曾享，苦是蹉跎再不兴，兄弟六亲皆无靠，一身事业晚年成",
    //     49: "此命推来福不轻，自立自成显门庭，从来富贵人亲近，使婢差奴过一生",
    //     50: "为利为名终日劳，中年福禄也多遭，老来是有财星照，不比前番目下高",
    //     51: "一世荣华事事通，不须劳碌自亨通，兄弟叔侄皆如意，家业成时福禄宏",
    //     52: "一世亨通事事能，不须劳思自然能，宗施欣然心皆好，家业丰亨自称心",
    //     53: "此格推来气象真，兴家发达在其中，一生福禄安排定，却是人间一富翁",
    //     54: "此命推来厚且清，诗书满腹看功成，丰衣足食自然稳，正是人间有福人",
    //     55: "走马扬鞭争名利，少年做事废筹论，一朝福禄源源至，富贵荣华显六亲",
    //     56: "此格推来礼仪通，一生福禄用无穷，甜酸苦辣皆尝过，财源滚滚稳且丰",
    //     57: "福禄盈盈万事全，一生荣耀显双亲，名扬威震人钦敬，处世逍遥似遇春",
    //     58: "平生福禄自然来，名利兼全福禄偕，雁塔提名为贵客，紫袍金带走金鞋",
    //     59: "细推此格妙且清，必定才高礼仪通，甲第之中应有分，扬鞭走马显威荣",
    //     60: "一朝金榜快题名，显祖荣宗立大功，衣食定然原欲足，田园财帛更丰盈",
    //     61: "不做朝中金榜客，定为世上一财翁，聪明天赋经书熟，名显高克自是荣",
    //     62: "此名生来福不穷，读书必定显亲荣，紫衣金带为卿相，富贵荣华皆可同",
    //     63: "命主为官福禄长，得来富贵定非常，名题金塔传金榜，定中高科天下扬",
    //     64: "此格权威不可当，紫袍金带坐高堂，荣华富贵谁能及，积玉堆金满储仓",
    //     65: "细推此命福不轻，安国安邦极品人，文绣雕梁政富贵，威声照耀四方闻",
    //     66: "此格人间一福人，堆金积玉满堂春，从来富贵由天定，正笏垂绅谒圣君",
    //     67: "此名生来福自宏，田园家业最高隆，平生衣禄丰盈足，一世荣华万事通",
    //     68: "富贵由天莫苦求，万金家计不须谋，十年不比前番事，祖业根基水上舟",
    //     69: "君是人间衣禄星，一生福贵众人钦，纵然福禄由天定，安享荣华过一生",
    //     70: "此命推来福不轻，不须愁虑苦劳心，一生天定衣与禄，富贵荣华过一生",
    //     71: "此名生来大不同，公侯卿相在其中，一生自有逍遥福，富贵荣华极品隆",
    //     72: "此格世界罕有生，十代积善产此人，天上紫微来照命，统治万民乐太平"
    // };
    
    


    let result;

    if (boneWeights[totalWeight]) {    
        result = boneWeights[totalWeight];

    }else{
        result = "error";
    }

    document.getElementById('result').innerText = `${totalWeight}:${result}`;
});
