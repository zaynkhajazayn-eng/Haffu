export type Category = "animals" | "birds" | "fruits" | "vehicles";
export type CategoryType = Category;

export interface QuizItem {
  id: string;
  english: string;
  hindi: string;
  category: Category;
  keyword: string;
  image: string;
  emoji: string;
  fact?: {
    english: string;
    hindi: string;
  };
}

export function buildDynamicImageUrl(keyword: string): string {
  const cleanNoun = keyword.toLowerCase().trim();
  // Primary dynamic keyword-based image URL as specified in prompt
  return `https://loremflickr.com/400/400/${encodeURIComponent(cleanNoun)}`;
}

export const items: QuizItem[] = [
  // ==================== ANIMALS (45) ====================
  {
    id: "lion",
    english: "Lion",
    hindi: "शेर",
    category: "animals",
    keyword: "lion",
    image: buildDynamicImageUrl("lion"),
    emoji: "🦁",
    fact: { english: "The king of the jungle!", hindi: "जंगल का राजा!" }
  },
  {
    id: "elephant",
    english: "Elephant",
    hindi: "हाथी",
    category: "animals",
    keyword: "elephant",
    image: buildDynamicImageUrl("elephant"),
    emoji: "🐘",
    fact: { english: "Has a long trunk and big ears!", hindi: "इसकी लंबी सूंड और बड़े कान होते हैं!" }
  },
  {
    id: "tiger",
    english: "Tiger",
    hindi: "बाघ",
    category: "animals",
    keyword: "tiger",
    image: buildDynamicImageUrl("tiger"),
    emoji: "🐯",
    fact: { english: "Has beautiful orange and black stripes!", hindi: "इसके शरीर पर सुंदर धारियां होती हैं!" }
  },
  {
    id: "monkey",
    english: "Monkey",
    hindi: "बंदर",
    category: "animals",
    keyword: "monkey",
    image: buildDynamicImageUrl("monkey"),
    emoji: "🐵",
    fact: { english: "Loves eating bananas and swinging on trees!", hindi: "केले खाना और पेड़ों पर झूलना पसंद है!" }
  },
  {
    id: "cow",
    english: "Cow",
    hindi: "गाय",
    category: "animals",
    keyword: "cow",
    image: buildDynamicImageUrl("cow"),
    emoji: "🐮",
    fact: { english: "Gives us fresh healthy milk!", hindi: "हमें पौष्टिक और मीठा दूध देती है!" }
  },
  {
    id: "dog",
    english: "Dog",
    hindi: "कुत्ता",
    category: "animals",
    keyword: "dog",
    image: buildDynamicImageUrl("dog"),
    emoji: "🐶",
    fact: { english: "Man's most loyal and playful friend!", hindi: "इंसान का सबसे वफादार दोस्त!" }
  },
  {
    id: "cat",
    english: "Cat",
    hindi: "बिल्ली",
    category: "animals",
    keyword: "cat",
    image: buildDynamicImageUrl("cat"),
    emoji: "🐱",
    fact: { english: "Says meow and loves gentle cuddles!", hindi: "म्याऊँ कहती है और दूध पीती है!" }
  },
  {
    id: "zebra",
    english: "Zebra",
    hindi: "ज़ेबरा",
    category: "animals",
    keyword: "zebra",
    image: buildDynamicImageUrl("zebra"),
    emoji: "🦓",
    fact: { english: "Unique black and white striped coat!", hindi: "काली और सफेद धारियों वाला जानवर!" }
  },
  {
    id: "giraffe",
    english: "Giraffe",
    hindi: "जिराफ़",
    category: "animals",
    keyword: "giraffe",
    image: buildDynamicImageUrl("giraffe"),
    emoji: "🦒",
    fact: { english: "The tallest animal in the world!", hindi: "दुनिया का सबसे लंबा जानवर!" }
  },
  {
    id: "bear",
    english: "Bear",
    hindi: "भालू",
    category: "animals",
    keyword: "bear",
    image: buildDynamicImageUrl("bear"),
    emoji: "🐻",
    fact: { english: "Loves sweet honey and catching fish!", hindi: "मीठा शहद खाना बहुत पसंद करता है!" }
  },
  {
    id: "horse",
    english: "Horse",
    hindi: "घोड़ा",
    category: "animals",
    keyword: "horse",
    image: buildDynamicImageUrl("horse"),
    emoji: "🐴",
    fact: { english: "Can run very fast with majestic speed!", hindi: "बहुत तेज़ और फुर्ती से दौड़ता है!" }
  },
  {
    id: "sheep",
    english: "Sheep",
    hindi: "भेड़",
    category: "animals",
    keyword: "sheep",
    image: buildDynamicImageUrl("sheep"),
    emoji: "🐑",
    fact: { english: "Gives us warm fluffy wool for sweaters!", hindi: "हमें सर्दियों के लिए ऊन देती है!" }
  },
  {
    id: "goat",
    english: "Goat",
    hindi: "बकरी",
    category: "animals",
    keyword: "goat",
    image: buildDynamicImageUrl("goat"),
    emoji: "🐐",
    fact: { english: "Playful animal that loves green leaves!", hindi: "हरी पत्तियां और घास खाने वाली!" }
  },
  {
    id: "kangaroo",
    english: "Kangaroo",
    hindi: "कंगारू",
    category: "animals",
    keyword: "kangaroo",
    image: buildDynamicImageUrl("kangaroo"),
    emoji: "🦘",
    fact: { english: "Carries its baby in a cozy front pouch!", hindi: "अपने बच्चे को पेट की थैली में रखता है!" }
  },
  {
    id: "panda",
    english: "Panda",
    hindi: "पांडा",
    category: "animals",
    keyword: "panda",
    image: buildDynamicImageUrl("panda"),
    emoji: "🐼",
    fact: { english: "Cute and loves chewing green bamboo!", hindi: "हरा बांस चबाने वाला प्यारा जानवर!" }
  },
  {
    id: "fox",
    english: "Fox",
    hindi: "लोमड़ी",
    category: "animals",
    keyword: "fox",
    image: buildDynamicImageUrl("fox"),
    emoji: "🦊",
    fact: { english: "Clever animal with a bushy tail!", hindi: "चालाक और सुंदर पूंछ वाला जानवर!" }
  },
  {
    id: "rabbit",
    english: "Rabbit",
    hindi: "खरगोश",
    category: "animals",
    keyword: "rabbit",
    image: buildDynamicImageUrl("rabbit"),
    emoji: "🐰",
    fact: { english: "Hops quickly and loves crunchy carrots!", hindi: "तेज़ी से फुदकता है और गाजर खाता है!" }
  },
  {
    id: "camel",
    english: "Camel",
    hindi: "ऊंट",
    category: "animals",
    keyword: "camel",
    image: buildDynamicImageUrl("camel"),
    emoji: "🐪",
    fact: { english: "Known as the ship of the desert!", hindi: "रेगिस्तान का जहाज़ कहा जाता है!" }
  },
  {
    id: "hippo",
    english: "Hippo",
    hindi: "दरियाई घोड़ा",
    category: "animals",
    keyword: "hippo",
    image: buildDynamicImageUrl("hippo"),
    emoji: "🦛",
    fact: { english: "Loves staying cool in river water!", hindi: "नदी के ठंडे पानी में रहना पसंद करता है!" }
  },
  {
    id: "rhino",
    english: "Rhino",
    hindi: "गैंडा",
    category: "animals",
    keyword: "rhino",
    image: buildDynamicImageUrl("rhino"),
    emoji: "🦏",
    fact: { english: "Strong animal with a powerful horn!", hindi: "मजबूत सींग वाला ताकतवर जानवर!" }
  },
  {
    id: "deer",
    english: "Deer",
    hindi: "हिरण",
    category: "animals",
    keyword: "deer",
    image: buildDynamicImageUrl("deer"),
    emoji: "🦌",
    fact: { english: "Graceful animal with beautiful antlers!", hindi: "सुंदर सींगों वाला फुर्तीला जानवर!" }
  },
  {
    id: "squirrel",
    english: "Squirrel",
    hindi: "गिलहरी",
    category: "animals",
    keyword: "squirrel",
    image: buildDynamicImageUrl("squirrel"),
    emoji: "🐿️",
    fact: { english: "Quick little creature that loves gathering nuts!", hindi: "पेड़ों पर दौड़ने वाली और मेवे खाने वाली!" }
  },
  {
    id: "frog",
    english: "Frog",
    hindi: "मेंढक",
    category: "animals",
    keyword: "frog",
    image: buildDynamicImageUrl("frog"),
    emoji: "🐸",
    fact: { english: "Says croak-croak and hops into ponds!", hindi: "टार्र-टार्र करता है और पानी में कूदता है!" }
  },
  {
    id: "crocodile",
    english: "Crocodile",
    hindi: "मगरमच्छ",
    category: "animals",
    keyword: "crocodile",
    image: buildDynamicImageUrl("crocodile"),
    emoji: "🐊",
    fact: { english: "Has powerful jaws and swims in rivers!", hindi: "नदियों में रहने वाला मजबूत जबड़े वाला जीव!" }
  },
  {
    id: "whale",
    english: "Whale",
    hindi: "व्हेल",
    category: "animals",
    keyword: "whale",
    image: buildDynamicImageUrl("whale"),
    emoji: "🐋",
    fact: { english: "The largest creature living in deep oceans!", hindi: "महासागर का सबसे बड़ा विशाल जीव!" }
  },
  {
    id: "dolphin",
    english: "Dolphin",
    hindi: "डॉल्फिन",
    category: "animals",
    keyword: "dolphin",
    image: buildDynamicImageUrl("dolphin"),
    emoji: "🐬",
    fact: { english: "Super intelligent and friendly ocean jumper!", hindi: "बहुत होशियार और इंसानों की दोस्त!" }
  },
  {
    id: "shark",
    english: "Shark",
    hindi: "शार्क",
    category: "animals",
    keyword: "shark",
    image: buildDynamicImageUrl("shark"),
    emoji: "🦈",
    fact: { english: "Fast sea predator with sharp teeth!", hindi: "तेज़ गति से तैरने वाली शिकारी मछली!" }
  },
  {
    id: "snake",
    english: "Snake",
    hindi: "सांप",
    category: "animals",
    keyword: "snake",
    image: buildDynamicImageUrl("snake"),
    emoji: "🐍",
    fact: { english: "Glides quietly without legs!", hindi: "बिना पैरों के रेंगने वाला जीव!" }
  },
  {
    id: "turtle",
    english: "Turtle",
    hindi: "कछुआ",
    category: "animals",
    keyword: "turtle",
    image: buildDynamicImageUrl("turtle"),
    emoji: "🐢",
    fact: { english: "Carries its protective shell wherever it goes!", hindi: "कठोर खोल में रहने वाला शांत जीव!" }
  },
  {
    id: "octopus",
    english: "Octopus",
    hindi: "ऑक्टोपस",
    category: "animals",
    keyword: "octopus",
    image: buildDynamicImageUrl("octopus"),
    emoji: "🐙",
    fact: { english: "Sea creature with eight flexible arms!", hindi: "आठ भुजाओं वाला समुद्री जीव!" }
  },
  {
    id: "butterfly",
    english: "Butterfly",
    hindi: "तितली",
    category: "animals",
    keyword: "butterfly",
    image: buildDynamicImageUrl("butterfly"),
    emoji: "🦋",
    fact: { english: "Flutters among flowers with colorful wings!", hindi: "फूलों पर मंडराने वाली रंग-बिरंगी तितली!" }
  },
  {
    id: "bee",
    english: "Bee",
    hindi: "मधुमक्खी",
    category: "animals",
    keyword: "bee",
    image: buildDynamicImageUrl("bee"),
    emoji: "🐝",
    fact: { english: "Collects sweet nectar to make pure honey!", hindi: "फूलों का रस चूसकर मीठा शहद बनाती है!" }
  },
  {
    id: "ant",
    english: "Ant",
    hindi: "चींटी",
    category: "animals",
    keyword: "ant",
    image: buildDynamicImageUrl("ant"),
    emoji: "🐜",
    fact: { english: "Hardworking tiny insect that works together!", hindi: "मेहनती और हमेशा कतार में चलने वाली!" }
  },
  {
    id: "spider",
    english: "Spider",
    hindi: "मकड़ी",
    category: "animals",
    keyword: "spider",
    image: buildDynamicImageUrl("spider"),
    emoji: "🕷️",
    fact: { english: "Weaves intricate silky webs with 8 legs!", hindi: "सुंदर जाला बुनने वाला आठ पैरों वाला जीव!" }
  },
  {
    id: "lioness",
    english: "Lioness",
    hindi: "शेरनी",
    category: "animals",
    keyword: "lioness",
    image: buildDynamicImageUrl("lioness"),
    emoji: "🦁",
    fact: { english: "Brave hunter and queen of the pride!", hindi: "जंगल की रानी और कुशल शिकारी!" }
  },
  {
    id: "cheetah",
    english: "Cheetah",
    hindi: "चीता",
    category: "animals",
    keyword: "cheetah",
    image: buildDynamicImageUrl("cheetah"),
    emoji: "🐆",
    fact: { english: "The fastest land animal on Earth!", hindi: "धरती का सबसे तेज़ दौड़ने वाला जानवर!" }
  },
  {
    id: "leopard",
    english: "Leopard",
    hindi: "तेंदुआ",
    category: "animals",
    keyword: "leopard",
    image: buildDynamicImageUrl("leopard"),
    emoji: "🐆",
    fact: { english: "Can easily climb high trees with spotted fur!", hindi: "पेड़ों पर आसानी से चढ़ने वाला चित्तीदार शिकारी!" }
  },
  {
    id: "wolf",
    english: "Wolf",
    hindi: "भेड़िया",
    category: "animals",
    keyword: "wolf",
    image: buildDynamicImageUrl("wolf"),
    emoji: "🐺",
    fact: { english: "Howls under the silver moon with its pack!", hindi: "चांदनी रात में आवाज़ निकालने वाला जंगली शिकारी!" }
  },
  {
    id: "pig",
    english: "Pig",
    hindi: "सूअर",
    category: "animals",
    keyword: "pig",
    image: buildDynamicImageUrl("pig"),
    emoji: "🐷",
    fact: { english: "Loves splashing in cool mud to stay happy!", hindi: "कीचड़ में नहाना पसंद करने वाला समझदार जानवर!" }
  },
  {
    id: "donkey",
    english: "Donkey",
    hindi: "गधा",
    category: "animals",
    keyword: "donkey",
    image: buildDynamicImageUrl("donkey"),
    emoji: "🫏",
    fact: { english: "Patient and hardworking animal with long ears!", hindi: "लंबे कानों वाला मेहनती और वफादार साथी!" }
  },
  {
    id: "buffalo",
    english: "Buffalo",
    hindi: "भैंस",
    category: "animals",
    keyword: "buffalo",
    image: buildDynamicImageUrl("buffalo"),
    emoji: "🐃",
    fact: { english: "Strong farm animal that loves swimming in ponds!", hindi: "पानी में तैरना पसंद करने वाली ताकतवर भैंस!" }
  },
  {
    id: "koala",
    english: "Koala",
    hindi: "कोआला",
    category: "animals",
    keyword: "koala",
    image: buildDynamicImageUrl("koala"),
    emoji: "🐨",
    fact: { english: "Cute furry animal that sleeps on eucalyptus trees!", hindi: "यूकेलिप्टस के पेड़ों पर सोने वाला प्यारा जानवर!" }
  },
  {
    id: "sloth",
    english: "Sloth",
    hindi: "स्लॉथ",
    category: "animals",
    keyword: "sloth",
    image: buildDynamicImageUrl("sloth"),
    emoji: "🦥",
    fact: { english: "Moves very slowly and hangs upside down!", hindi: "पेड़ों पर उल्टा लटकने वाला धीमा और शांत जीव!" }
  },
  {
    id: "hedgehog",
    english: "Hedgehog",
    hindi: "साही",
    category: "animals",
    keyword: "hedgehog",
    image: buildDynamicImageUrl("hedgehog"),
    emoji: "🦔",
    fact: { english: "Rolls into a prickly protective ball!", hindi: "कांटों वाली गेंद बनकर अपनी रक्षा करता है!" }
  },
  {
    id: "hamster",
    english: "Hamster",
    hindi: "हैम्स्टर",
    category: "animals",
    keyword: "hamster",
    image: buildDynamicImageUrl("hamster"),
    emoji: "🐹",
    fact: { english: "Stores yummy seeds in its chubby cheeks!", hindi: "अपने गालों में खाना छुपाने वाला नन्हा जीव!" }
  },

  // ==================== BIRDS (30) ====================
  {
    id: "parrot",
    english: "Parrot",
    hindi: "तोता",
    category: "birds",
    keyword: "parrot",
    image: buildDynamicImageUrl("parrot"),
    emoji: "🦜",
    fact: { english: "Bright green feathers and can mimic words!", hindi: "हरा पक्षी जो इंसानों जैसी बातें दोहरा सकता है!" }
  },
  {
    id: "peacock",
    english: "Peacock",
    hindi: "मोर",
    category: "birds",
    keyword: "peacock",
    image: buildDynamicImageUrl("peacock"),
    emoji: "🦚",
    fact: { english: "National bird of India with colorful dance!", hindi: "भारत का राष्ट्रीय पक्षी, बारिश में नाचता है!" }
  },
  {
    id: "pigeon",
    english: "Pigeon",
    hindi: "कबूतर",
    category: "birds",
    keyword: "pigeon",
    image: buildDynamicImageUrl("pigeon"),
    emoji: "🕊️",
    fact: { english: "Gentle bird that coos on rooftops!", hindi: "शांत पक्षी जो गुटर गूँ करता है!" }
  },
  {
    id: "duck",
    english: "Duck",
    hindi: "बत्तख",
    category: "birds",
    keyword: "duck",
    image: buildDynamicImageUrl("duck"),
    emoji: "🦆",
    fact: { english: "Swims in ponds and says quack quack!", hindi: "तालाब में तैरती है और क्वैक क्वैक करती है!" }
  },
  {
    id: "sparrow",
    english: "Sparrow",
    hindi: "गौरैया",
    category: "birds",
    keyword: "sparrow",
    image: buildDynamicImageUrl("sparrow"),
    emoji: "🐦",
    fact: { english: "Tiny sweet bird that chirps near our homes!", hindi: "छोटी चिड़िया जो चीं-चीं करती है!" }
  },
  {
    id: "owl",
    english: "Owl",
    hindi: "उल्लू",
    category: "birds",
    keyword: "owl",
    image: buildDynamicImageUrl("owl"),
    emoji: "🦉",
    fact: { english: "Wise night bird with large curious eyes!", hindi: "बड़ी आँखों वाला रात का बुद्धिमान पक्षी!" }
  },
  {
    id: "swan",
    english: "Swan",
    hindi: "हंस",
    category: "birds",
    keyword: "swan",
    image: buildDynamicImageUrl("swan"),
    emoji: "🦢",
    fact: { english: "Pure white bird gliding gracefully on lakes!", hindi: "सफेद और सुंदर, पानी पर तैरता हुआ!" }
  },
  {
    id: "eagle",
    english: "Eagle",
    hindi: "चील",
    category: "birds",
    keyword: "eagle",
    image: buildDynamicImageUrl("eagle"),
    emoji: "🦅",
    fact: { english: "Soars high in the blue sky with sharp eyes!", hindi: "आसमान में सबसे ऊँचा उड़ने वाला शिकारी पक्षी!" }
  },
  {
    id: "crow",
    english: "Crow",
    hindi: "कौआ",
    category: "birds",
    keyword: "crow",
    image: buildDynamicImageUrl("crow"),
    emoji: "🐦‍⬛",
    fact: { english: "Very smart black bird that says caw caw!", hindi: "चालाक काला पक्षी जो काँव-काँव करता है!" }
  },
  {
    id: "penguin",
    english: "Penguin",
    hindi: "पेंगुइन",
    category: "birds",
    keyword: "penguin",
    image: buildDynamicImageUrl("penguin"),
    emoji: "🐧",
    fact: { english: "Waddles cutely on ice and loves swimming!", hindi: "बर्फ पर मटक कर चलने वाला प्यारा पक्षी!" }
  },
  {
    id: "rooster",
    english: "Rooster",
    hindi: "मुर्गा",
    category: "birds",
    keyword: "rooster",
    image: buildDynamicImageUrl("rooster"),
    emoji: "🐓",
    fact: { english: "Wakes everyone up with cock-a-doodle-doo!", hindi: "सुबह कुकड़ूँ-कूँ करके सबको जगाता है!" }
  },
  {
    id: "flamingo",
    english: "Flamingo",
    hindi: "फ्लेमिंगो",
    category: "birds",
    keyword: "flamingo",
    image: buildDynamicImageUrl("flamingo"),
    emoji: "🦩",
    fact: { english: "Stands gracefully on one long pink leg!", hindi: "गुलाबी पंखों वाला एक पैर पर खड़ा रहने वाला पक्षी!" }
  },
  {
    id: "kingfisher",
    english: "Kingfisher",
    hindi: "किंगफिशर",
    category: "birds",
    keyword: "kingfisher",
    image: buildDynamicImageUrl("kingfisher"),
    emoji: "🐦",
    fact: { english: "Bright blue bird diving swiftly for fish!", hindi: "नीले पंखों वाला मछली पकड़ने वाला पक्षी!" }
  },
  {
    id: "woodpecker",
    english: "Woodpecker",
    hindi: "कठफोड़वा",
    category: "birds",
    keyword: "woodpecker",
    image: buildDynamicImageUrl("woodpecker"),
    emoji: "🐦",
    fact: { english: "Pecks on tree bark with a strong pointed beak!", hindi: "पेड़ों के तने पर चोंच मारने वाला पक्षी!" }
  },
  {
    id: "dove",
    english: "Dove",
    hindi: "कबूतर",
    category: "birds",
    keyword: "dove",
    image: buildDynamicImageUrl("dove"),
    emoji: "🕊️",
    fact: { english: "Gentle symbol of peace and love!", hindi: "शांति का प्रतीक सुंदर सफेद पक्षी!" }
  },
  {
    id: "hen",
    english: "Hen",
    hindi: "मुर्गी",
    category: "birds",
    keyword: "hen",
    image: buildDynamicImageUrl("hen"),
    emoji: "🐔",
    fact: { english: "Farm bird that clucks and lays eggs!", hindi: "अंडे देने वाली और कुड़कुड़ाने वाली घरेलू चिड़िया!" }
  },
  {
    id: "turkey",
    english: "Turkey",
    hindi: "टर्की",
    category: "birds",
    keyword: "turkey",
    image: buildDynamicImageUrl("turkey"),
    emoji: "🦃",
    fact: { english: "Large bird that spreads its big tail feathers!", hindi: "बड़ी पूंछ फैलाकर चलने वाला पक्षी!" }
  },
  {
    id: "pelican",
    english: "Pelican",
    hindi: "पेलिकन",
    category: "birds",
    keyword: "pelican",
    image: buildDynamicImageUrl("pelican"),
    emoji: "🦤",
    fact: { english: "Has a big pouch under its beak for scooping fish!", hindi: "चोंच के नीचे थैली वाला पानी का पक्षी!" }
  },
  {
    id: "seagull",
    english: "Seagull",
    hindi: "सीगल",
    category: "birds",
    keyword: "seagull",
    image: buildDynamicImageUrl("seagull"),
    emoji: "🕊️",
    fact: { english: "Coastal bird flying over ocean waves!", hindi: "समुद्र तट पर उड़ने वाली गंगा-चिल्ली!" }
  },
  {
    id: "hummingbird",
    english: "Hummingbird",
    hindi: "हमिंगबर्ड",
    category: "birds",
    keyword: "hummingbird",
    image: buildDynamicImageUrl("hummingbird"),
    emoji: "🐦",
    fact: { english: "Tiny bird that can flap wings backwards!", hindi: "दुनिया का सबसे छोटा और पीछे उड़ने वाला पक्षी!" }
  },
  {
    id: "vulture",
    english: "Vulture",
    hindi: "गिद्ध",
    category: "birds",
    keyword: "vulture",
    image: buildDynamicImageUrl("vulture"),
    emoji: "🦅",
    fact: { english: "Helps nature by cleaning the environment!", hindi: "प्रकृति की सफाई करने वाला बड़ा पक्षी!" }
  },
  {
    id: "crane",
    english: "Crane",
    hindi: "सारस",
    category: "birds",
    keyword: "crane bird",
    image: buildDynamicImageUrl("crane bird"),
    emoji: "🦩",
    fact: { english: "Tall bird that wades gently in wetlands!", hindi: "लंबी गर्दन और टांगों वाला सारस!" }
  },
  {
    id: "stork",
    english: "Stork",
    hindi: "सारस",
    category: "birds",
    keyword: "stork",
    image: buildDynamicImageUrl("stork"),
    emoji: "🦩",
    fact: { english: "Long-legged white bird that nests on high towers!", hindi: "ऊंचे घोंसले बनाने वाला सुंदर सफेद पक्षी!" }
  },
  {
    id: "macaw",
    english: "Macaw",
    hindi: "मकाओ",
    category: "birds",
    keyword: "macaw",
    image: buildDynamicImageUrl("macaw"),
    emoji: "🦜",
    fact: { english: "Large tropical parrot with rainbow feathers!", hindi: "इंद्रधनुषी पंखों वाला बड़ा रंगीन तोता!" }
  },
  {
    id: "cockatoo",
    english: "Cockatoo",
    hindi: "कॉकटू",
    category: "birds",
    keyword: "cockatoo",
    image: buildDynamicImageUrl("cockatoo"),
    emoji: "🦜",
    fact: { english: "White crest on head that raises when excited!", hindi: "सिर पर सुंदर कलगी वाला सफेद तोता!" }
  },
  {
    id: "canary",
    english: "Canary",
    hindi: "कैनरी",
    category: "birds",
    keyword: "canary bird",
    image: buildDynamicImageUrl("canary bird"),
    emoji: "🐤",
    fact: { english: "Sweet singing bright yellow little bird!", hindi: "मीठा गाना गाने वाली नन्ही पीली चिड़िया!" }
  },
  {
    id: "robin",
    english: "Robin",
    hindi: "रॉबिन",
    category: "birds",
    keyword: "robin bird",
    image: buildDynamicImageUrl("robin bird"),
    emoji: "🐦",
    fact: { english: "Has a lovely orange-red breast feathers!", hindi: "लाल सीने वाली चहकती छोटी चिड़िया!" }
  },
  {
    id: "bluejay",
    english: "Blue Jay",
    hindi: "ब्लू जे",
    category: "birds",
    keyword: "blue jay",
    image: buildDynamicImageUrl("blue jay"),
    emoji: "🐦",
    fact: { english: "Beautiful blue feathered woodland songbird!", hindi: "चमकीले नीले पंखों वाला प्यारा पक्षी!" }
  },
  {
    id: "cardinal",
    english: "Cardinal",
    hindi: "कार्डिनल",
    category: "birds",
    keyword: "cardinal bird",
    image: buildDynamicImageUrl("cardinal bird"),
    emoji: "🐦",
    fact: { english: "Stunning scarlet red bird singing in snowy trees!", hindi: "गहरे लाल रंग का चटक सुंदर पक्षी!" }
  },
  {
    id: "ostrich",
    english: "Ostrich",
    hindi: "शुतुरमुर्ग",
    category: "birds",
    keyword: "ostrich",
    image: buildDynamicImageUrl("ostrich"),
    emoji: "🦤",
    fact: { english: "The biggest bird in the world that runs super fast!", hindi: "दुनिया का सबसे बड़ा पक्षी जो बहुत तेज़ दौड़ता है!" }
  },

  // ==================== FRUITS (35) ====================
  {
    id: "apple",
    english: "Apple",
    hindi: "सेब",
    category: "fruits",
    keyword: "apple",
    image: buildDynamicImageUrl("apple"),
    emoji: "🍎",
    fact: { english: "An apple a day keeps the doctor away!", hindi: "रोज एक सेब खाओ और सेहतमंद रहो!" }
  },
  {
    id: "banana",
    english: "Banana",
    hindi: "केला",
    category: "fruits",
    keyword: "banana",
    image: buildDynamicImageUrl("banana"),
    emoji: "🍌",
    fact: { english: "Sweet yellow fruit full of energy!", hindi: "ताकत से भरपूर मीठा पीला फल!" }
  },
  {
    id: "mango",
    english: "Mango",
    hindi: "आम",
    category: "fruits",
    keyword: "mango",
    image: buildDynamicImageUrl("mango"),
    emoji: "🥭",
    fact: { english: "The juicy and delicious king of fruits!", hindi: "रसीला और सबका पसंदीदा फलों का राजा!" }
  },
  {
    id: "orange",
    english: "Orange",
    hindi: "संतरा",
    category: "fruits",
    keyword: "orange fruit",
    image: buildDynamicImageUrl("orange fruit"),
    emoji: "🍊",
    fact: { english: "Packed with juicy Vitamin C goodness!", hindi: "विटामिन सी से भरपूर खट्टा-मीठा फल!" }
  },
  {
    id: "grapes",
    english: "Grapes",
    hindi: "अंगूर",
    category: "fruits",
    keyword: "grapes",
    image: buildDynamicImageUrl("grapes"),
    emoji: "🍇",
    fact: { english: "Tiny sweet berries that grow in bunches!", hindi: "गुच्छों में उगने वाले मीठे दाने!" }
  },
  {
    id: "watermelon",
    english: "Watermelon",
    hindi: "तरबूज",
    category: "fruits",
    keyword: "watermelon",
    image: buildDynamicImageUrl("watermelon"),
    emoji: "🍉",
    fact: { english: "Big and refreshing with cool sweet juice!", hindi: "गर्मियों में ठंडक देने वाला रसीला फल!" }
  },
  {
    id: "strawberry",
    english: "Strawberry",
    hindi: "स्ट्रॉबेरी",
    category: "fruits",
    keyword: "strawberry",
    image: buildDynamicImageUrl("strawberry"),
    emoji: "🍓",
    fact: { english: "Heart-shaped red berry with tiny seeds!", hindi: "लाल और सुंदर, आइसक्रीम में खूब स्वादिष्ट!" }
  },
  {
    id: "papaya",
    english: "Papaya",
    hindi: "पपीता",
    category: "fruits",
    keyword: "papaya",
    image: buildDynamicImageUrl("papaya"),
    emoji: "🍈",
    fact: { english: "Bright orange fruit great for tummy health!", hindi: "पाचन के लिए बहुत अच्छा फल!" }
  },
  {
    id: "pineapple",
    english: "Pineapple",
    hindi: "अनानास",
    category: "fruits",
    keyword: "pineapple",
    image: buildDynamicImageUrl("pineapple"),
    emoji: "🍍",
    fact: { english: "Has a spiky crown and golden sweet slices!", hindi: "कांटेदार छिलका और अंदर मीठा रस!" }
  },
  {
    id: "pomegranate",
    english: "Pomegranate",
    hindi: "अनार",
    category: "fruits",
    keyword: "pomegranate",
    image: buildDynamicImageUrl("pomegranate"),
    emoji: "🍎",
    fact: { english: "Filled with ruby red jewel-like sweet seeds!", hindi: "लाल मोतियों जैसे दानों से भरा फल!" }
  },
  {
    id: "guava",
    english: "Guava",
    hindi: "अमरूद",
    category: "fruits",
    keyword: "guava",
    image: buildDynamicImageUrl("guava"),
    emoji: "🍐",
    fact: { english: "Crisp green fruit with fragrant pink or white inside!", hindi: "नमक के साथ खाने में बहुत स्वादिष्ट!" }
  },
  {
    id: "cherry",
    english: "Cherry",
    hindi: "चेरी",
    category: "fruits",
    keyword: "cherry",
    image: buildDynamicImageUrl("cherry"),
    emoji: "🍒",
    fact: { english: "Pair of shiny little red gems on a stem!", hindi: "केक और पेस्ट्री पर सजने वाली छोटी लाल चेरी!" }
  },
  {
    id: "coconut",
    english: "Coconut",
    hindi: "नारियल",
    category: "fruits",
    keyword: "coconut",
    image: buildDynamicImageUrl("coconut"),
    emoji: "🥥",
    fact: { english: "Hard shell with sweet refreshing water inside!", hindi: "अंदर मीठा ठंडा पानी और सफेद मलाई!" }
  },
  {
    id: "lemon",
    english: "Lemon",
    hindi: "नींबू",
    category: "fruits",
    keyword: "lemon",
    image: buildDynamicImageUrl("lemon"),
    emoji: "🍋",
    fact: { english: "Zesty yellow fruit that makes cool lemonade!", hindi: "स्वादिष्ट नींबू पानी बनाने के काम आता है!" }
  },
  {
    id: "kiwi",
    english: "Kiwi",
    hindi: "कीवी",
    category: "fruits",
    keyword: "kiwi fruit",
    image: buildDynamicImageUrl("kiwi fruit"),
    emoji: "🥝",
    fact: { english: "Fuzzy brown fruit with bright emerald green inside!", hindi: "अंदर से हरा और काले बीजों वाला अनोखा फल!" }
  },
  {
    id: "peach",
    english: "Peach",
    hindi: "आड़ू",
    category: "fruits",
    keyword: "peach fruit",
    image: buildDynamicImageUrl("peach fruit"),
    emoji: "🍑",
    fact: { english: "Soft velvety fruit with sweet golden pulp!", hindi: "मुलायम छिलके वाला मीठा और रसीला फल!" }
  },
  {
    id: "pear",
    english: "Pear",
    hindi: "नाशपाती",
    category: "fruits",
    keyword: "pear fruit",
    image: buildDynamicImageUrl("pear fruit"),
    emoji: "🍐",
    fact: { english: "Crisp and juicy bell-shaped sweet fruit!", hindi: "घंटी के आकार का कुरकुरा मीठा फल!" }
  },
  {
    id: "plum",
    english: "Plum",
    hindi: "आलूबुखारा",
    category: "fruits",
    keyword: "plum fruit",
    image: buildDynamicImageUrl("plum fruit"),
    emoji: "🫐",
    fact: { english: "Purple sweet fruit full of healthy vitamins!", hindi: "बैंगनी रंग का खट्टा-मीठा स्वादिष्ट फल!" }
  },
  {
    id: "blueberry",
    english: "Blueberry",
    hindi: "ब्लूबेरी",
    category: "fruits",
    keyword: "blueberry",
    image: buildDynamicImageUrl("blueberry"),
    emoji: "🫐",
    fact: { english: "Tiny round blue berries packed with antioxidants!", hindi: "छोटे गोल नीले दाने जो दिमाग तेज करते हैं!" }
  },
  {
    id: "raspberry",
    english: "Raspberry",
    hindi: "रास्पबेरी",
    category: "fruits",
    keyword: "raspberry",
    image: buildDynamicImageUrl("raspberry"),
    emoji: "🍓",
    fact: { english: "Delicate red berry with a hollow center!", hindi: "नाजुक लाल बेरी जो बहुत स्वादिष्ट होती है!" }
  },
  {
    id: "blackberry",
    english: "Blackberry",
    hindi: "ब्लैकबेरी",
    category: "fruits",
    keyword: "blackberry",
    image: buildDynamicImageUrl("blackberry"),
    emoji: "🫐",
    fact: { english: "Juicy dark berry that grows on sunny bushes!", hindi: "झाड़ियों में उगने वाली गहरी काली रसीली बेरी!" }
  },
  {
    id: "fig",
    english: "Fig",
    hindi: "अंजीर",
    category: "fruits",
    keyword: "fig fruit",
    image: buildDynamicImageUrl("fig fruit"),
    emoji: "🫒",
    fact: { english: "Sweet chewy fruit filled with tiny crunchy seeds!", hindi: "कुरकुरे बीजों वाला बहुत पौष्टिक मीठा फल!" }
  },
  {
    id: "date",
    english: "Date",
    hindi: "खजूर",
    category: "fruits",
    keyword: "dates fruit",
    image: buildDynamicImageUrl("dates fruit"),
    emoji: "🌴",
    fact: { english: "Sweet desert fruit giving instant energy!", hindi: "खजूर के पेड़ का फल, तुरंत ताकत देने वाला!" }
  },
  {
    id: "lychee",
    english: "Lychee",
    hindi: "लीची",
    category: "fruits",
    keyword: "lychee",
    image: buildDynamicImageUrl("lychee"),
    emoji: "🍓",
    fact: { english: "Rough pink shell with sweet translucent pulp!", hindi: "गुलाबी छिलके में बंद मीठा सफेद गूदा!" }
  },
  {
    id: "dragonfruit",
    english: "Dragon Fruit",
    hindi: "ड्रैगन फ्रूट",
    category: "fruits",
    keyword: "dragon fruit",
    image: buildDynamicImageUrl("dragon fruit"),
    emoji: "🐉",
    fact: { english: "Exotic fruit with bright magenta scales!", hindi: "गुलाबी छिलके और काले बीजों वाला अनोखा फल!" }
  },
  {
    id: "passionfruit",
    english: "Passion Fruit",
    hindi: "पैशन फ्रूट",
    category: "fruits",
    keyword: "passion fruit",
    image: buildDynamicImageUrl("passion fruit"),
    emoji: "🍈",
    fact: { english: "Aromatic fruit with tangy tropical pulp!", hindi: "खुशबूदार और खट्टा-मीठा ट्रॉपिकल फल!" }
  },
  {
    id: "avocado",
    english: "Avocado",
    hindi: "एवोकाडो",
    category: "fruits",
    keyword: "avocado",
    image: buildDynamicImageUrl("avocado"),
    emoji: "🥑",
    fact: { english: "Creamy green fruit rich in healthy oils!", hindi: "मक्खन जैसा पौष्टिक हरा फल!" }
  },
  {
    id: "tomato",
    english: "Tomato",
    hindi: "टमाटर",
    category: "fruits",
    keyword: "tomato",
    image: buildDynamicImageUrl("tomato"),
    emoji: "🍅",
    fact: { english: "Juicy red botanical fruit used in yummy salads!", hindi: "लाल रसीला टमाटर, सलाद में सबका पसंद!" }
  },
  {
    id: "cucumber",
    english: "Cucumber",
    hindi: "खीरा",
    category: "fruits",
    keyword: "cucumber",
    image: buildDynamicImageUrl("cucumber"),
    emoji: "🥒",
    fact: { english: "Cool and crunchy green refresher!", hindi: "गर्मियों में ठंडक देने वाला कुरकुरा खीरा!" }
  },
  {
    id: "carrot",
    english: "Carrot",
    hindi: "गाजर",
    category: "fruits",
    keyword: "carrot",
    image: buildDynamicImageUrl("carrot"),
    emoji: "🥕",
    fact: { english: "Sweet crunchy orange root great for eyesight!", hindi: "आंखों की रोशनी बढ़ाने वाली मीठी गाजर!" }
  },
  {
    id: "potato",
    english: "Potato",
    hindi: "आलू",
    category: "fruits",
    keyword: "potato",
    image: buildDynamicImageUrl("potato"),
    emoji: "🥔",
    fact: { english: "Versatile vegetable used to make crispy fries!", hindi: "सब्जियों का राजा, जिससे बनते हैं फ्रेंच फ्राइज!" }
  },
  {
    id: "onion",
    english: "Onion",
    hindi: "प्याज",
    category: "fruits",
    keyword: "onion",
    image: buildDynamicImageUrl("onion"),
    emoji: "🧅",
    fact: { english: "Adds wonderful flavor to our cooked meals!", hindi: "सब्जी का स्वाद बढ़ाने वाला प्याज!" }
  },
  {
    id: "garlic",
    english: "Garlic",
    hindi: "लहसुन",
    category: "fruits",
    keyword: "garlic",
    image: buildDynamicImageUrl("garlic"),
    emoji: "🧄",
    fact: { english: "Has white cloves that keep us healthy and strong!", hindi: "सेहतमंद रखने वाली सफेद लहसुन की कलियां!" }
  },
  {
    id: "corn",
    english: "Corn",
    hindi: "मक्का",
    category: "fruits",
    keyword: "corn",
    image: buildDynamicImageUrl("corn"),
    emoji: "🌽",
    fact: { english: "Golden kernels that pop into tasty popcorn!", hindi: "सुनहरे दाने जिससे बनता है मजेदार पॉपकॉर्न!" }
  },
  {
    id: "broccoli",
    english: "Broccoli",
    hindi: "ब्रोकली",
    category: "fruits",
    keyword: "broccoli",
    image: buildDynamicImageUrl("broccoli"),
    emoji: "🥦",
    fact: { english: "Looks like a little green tree full of vitamins!", hindi: "छोटे हरे पेड़ जैसी दिखने वाली सेहतमंद ब्रोकली!" }
  },

  // ==================== VEHICLES (40) ====================
  {
    id: "car",
    english: "Car",
    hindi: "कार",
    category: "vehicles",
    keyword: "car",
    image: buildDynamicImageUrl("car"),
    emoji: "🚗",
    fact: { english: "Has four wheels to take the family on a drive!", hindi: "चार पहियों वाली गाड़ी!" }
  },
  {
    id: "bus",
    english: "Bus",
    hindi: "बस",
    category: "vehicles",
    keyword: "bus",
    image: buildDynamicImageUrl("bus"),
    emoji: "🚌",
    fact: { english: "Takes students to school with friends!", hindi: "बच्चों को स्कूल ले जाने वाली बड़ी बस!" }
  },
  {
    id: "train",
    english: "Train",
    hindi: "रेलगाड़ी",
    category: "vehicles",
    keyword: "train",
    image: buildDynamicImageUrl("train"),
    emoji: "🚂",
    fact: { english: "Runs on iron tracks and goes chug-chug!", hindi: "पटरी पर छुक-छुक करके चलती है!" }
  },
  {
    id: "airplane",
    english: "Airplane",
    hindi: "हवाई जहाज",
    category: "vehicles",
    keyword: "airplane",
    image: buildDynamicImageUrl("airplane"),
    emoji: "✈️",
    fact: { english: "Flies high above the clouds across the sky!", hindi: "बादलों के ऊपर आसमान में उड़ता है!" }
  },
  {
    id: "bicycle",
    english: "Bicycle",
    hindi: "साइकिल",
    category: "vehicles",
    keyword: "bicycle",
    image: buildDynamicImageUrl("bicycle"),
    emoji: "🚲",
    fact: { english: "Pedal with your feet with a ringing bell!", hindi: "पैडल मारकर चलाने वाली प्यारी सवारी!" }
  },
  {
    id: "motorcycle",
    english: "Motorcycle",
    hindi: "मोटरसाइकिल",
    category: "vehicles",
    keyword: "motorcycle",
    image: buildDynamicImageUrl("motorcycle"),
    emoji: "🏍️",
    fact: { english: "Vroom vroom two-wheeler on the road!", hindi: "दो पहियों पर फर्राटा भरने वाली बाइक!" }
  },
  {
    id: "boat",
    english: "Boat",
    hindi: "नाव",
    category: "vehicles",
    keyword: "boat",
    image: buildDynamicImageUrl("boat"),
    emoji: "🛶",
    fact: { english: "Floats on gentle river and lake waters!", hindi: "नदी की लहरों पर तैरती है!" }
  },
  {
    id: "ship",
    english: "Ship",
    hindi: "पानी का जहाज़",
    category: "vehicles",
    keyword: "ship",
    image: buildDynamicImageUrl("ship"),
    emoji: "🚢",
    fact: { english: "Gigantic vessel that voyages across deep oceans!", hindi: "विशाल समुद्र को पार करने वाला बड़ा जहाज़!" }
  },
  {
    id: "truck",
    english: "Truck",
    hindi: "ट्रक",
    category: "vehicles",
    keyword: "truck",
    image: buildDynamicImageUrl("truck"),
    emoji: "🚛",
    fact: { english: "Carries heavy loads across long highways!", hindi: "भारी सामान ले जाने वाली बड़ी गाड़ी!" }
  },
  {
    id: "helicopter",
    english: "Helicopter",
    hindi: "हेलीकॉप्टर",
    category: "vehicles",
    keyword: "helicopter",
    image: buildDynamicImageUrl("helicopter"),
    emoji: "🚁",
    fact: { english: "Has spinning blades on top to hover in the air!", hindi: "ऊपर घूमते पंखों से हवा में उड़ता है!" }
  },
  {
    id: "ambulance",
    english: "Ambulance",
    hindi: "एम्बुलेंस",
    category: "vehicles",
    keyword: "ambulance",
    image: buildDynamicImageUrl("ambulance"),
    emoji: "🚑",
    fact: { english: "Emergency van with sirens helping people to hospital!", hindi: "मरीजों को जल्दी अस्पताल पहुंचाने वाली गाड़ी!" }
  },
  {
    id: "tractor",
    english: "Tractor",
    hindi: "ट्रैक्टर",
    category: "vehicles",
    keyword: "tractor",
    image: buildDynamicImageUrl("tractor"),
    emoji: "🚜",
    fact: { english: "Helps farmers plow green farm fields!", hindi: "खेतों में काम करने वाला किसान का सच्चा साथी!" }
  },
  {
    id: "scooter",
    english: "Scooter",
    hindi: "स्कूटर",
    category: "vehicles",
    keyword: "motor scooter",
    image: buildDynamicImageUrl("motor scooter"),
    emoji: "🛵",
    fact: { english: "Light two-wheeler with a step-through frame!", hindi: "शहर में घूमने के लिए सुविधाजनक स्कूटर!" }
  },
  {
    id: "autorickshaw",
    english: "Auto Rickshaw",
    hindi: "ऑटो रिक्शा",
    category: "vehicles",
    keyword: "auto rickshaw",
    image: buildDynamicImageUrl("auto rickshaw"),
    emoji: "🛺",
    fact: { english: "Three-wheeler that zips through city traffic!", hindi: "तीन पहियों वाला शहर का लोकप्रिय ऑटो रिक्शा!" }
  },
  {
    id: "fireengine",
    english: "Fire Engine",
    hindi: "दमकल",
    category: "vehicles",
    keyword: "fire engine",
    image: buildDynamicImageUrl("fire engine"),
    emoji: "🚒",
    fact: { english: "Red truck with sirens and water hoses to put out fires!", hindi: "आग बुझाने वाली लाल रंग की दमकल गाड़ी!" }
  },
  {
    id: "policecar",
    english: "Police Car",
    hindi: "पुलिस कार",
    category: "vehicles",
    keyword: "police car",
    image: buildDynamicImageUrl("police car"),
    emoji: "🚓",
    fact: { english: "Has flashing blue lights keeping our town safe!", hindi: "सायरन बजाकर शहर की सुरक्षा करने वाली पुलिस कार!" }
  },
  {
    id: "submarine",
    english: "Submarine",
    hindi: "पनडुब्बी",
    category: "vehicles",
    keyword: "submarine",
    image: buildDynamicImageUrl("submarine"),
    emoji: "🤿",
    fact: { english: "Travels deep underwater beneath the ocean surface!", hindi: "पानी के भीतर गहरे समुद्र में चलने वाली पनडुब्बी!" }
  },
  {
    id: "yacht",
    english: "Yacht",
    hindi: "याट",
    category: "vehicles",
    keyword: "luxury yacht",
    image: buildDynamicImageUrl("luxury yacht"),
    emoji: "🛥️",
    fact: { english: "Luxurious motor vessel cruising on the sea!", hindi: "समुद्र में सैर कराने वाली शानदार नौका!" }
  },
  {
    id: "sailboat",
    english: "Sailboat",
    hindi: "पाल वाली नाव",
    category: "vehicles",
    keyword: "sailboat",
    image: buildDynamicImageUrl("sailboat"),
    emoji: "⛵",
    fact: { english: "Glides on water pushed by gentle sea breezes!", hindi: "हवा के सहारे चलने वाली पालदार नाव!" }
  },
  {
    id: "skateboard",
    english: "Skateboard",
    hindi: "स्केटबोर्ड",
    category: "vehicles",
    keyword: "skateboard",
    image: buildDynamicImageUrl("skateboard"),
    emoji: "🛹",
    fact: { english: "A board with four small wheels for fun riding!", hindi: "चार छोटे पहियों वाला स्केटिंग बोर्ड!" }
  },
  {
    id: "hotairballoon",
    english: "Hot Air Balloon",
    hindi: "गरम हवा का गुब्बारा",
    category: "vehicles",
    keyword: "hot air balloon",
    image: buildDynamicImageUrl("hot air balloon"),
    emoji: "🎈",
    fact: { english: "Floats gently among the clouds with a basket!", hindi: "आसमान में तैरने वाला विशाल रंग-बिरंगा गुब्बारा!" }
  },
  {
    id: "rocket",
    english: "Rocket",
    hindi: "रॉकेट",
    category: "vehicles",
    keyword: "space rocket",
    image: buildDynamicImageUrl("space rocket"),
    emoji: "🚀",
    fact: { english: "Blasts into outer space to reach the moon and stars!", hindi: "चांद और तारों तक जाने वाला अंतरिक्ष रॉकेट!" }
  },
  {
    id: "tram",
    english: "Tram",
    hindi: "ट्राम",
    category: "vehicles",
    keyword: "city tram",
    image: buildDynamicImageUrl("city tram"),
    emoji: "🚊",
    fact: { english: "Runs on city street tracks powered by electricity!", hindi: "सड़क की पटरियों पर चलने वाली ट्राम गाड़ी!" }
  },
  {
    id: "metro",
    english: "Metro",
    hindi: "मेट्रो",
    category: "vehicles",
    keyword: "metro train",
    image: buildDynamicImageUrl("metro train"),
    emoji: "🚇",
    fact: { english: "Fast modern train running underground and above city bridges!", hindi: "शहर में दौड़ने वाली सुपरफास्ट आधुनिक मेट्रो!" }
  },
  {
    id: "forklift",
    english: "Forklift",
    hindi: "फोर्कलिफ्ट",
    category: "vehicles",
    keyword: "forklift",
    image: buildDynamicImageUrl("forklift"),
    emoji: "🏗️",
    fact: { english: "Lifts heavy pallets and crates in big warehouses!", hindi: "गोदामों में भारी सामान उठाने वाली फोर्कलिफ्ट!" }
  },
  {
    id: "bulldozer",
    english: "Bulldozer",
    hindi: "बुलडोज़र",
    category: "vehicles",
    keyword: "bulldozer",
    image: buildDynamicImageUrl("bulldozer"),
    emoji: "🚜",
    fact: { english: "Heavy construction machine with a wide blade pushing earth!", hindi: "मिट्टी और मलबा हटाने वाली भारी निर्माण मशीन!" }
  },
  {
    id: "cranettruck",
    english: "Crane Truck",
    hindi: "क्रेन ट्रक",
    category: "vehicles",
    keyword: "crane truck",
    image: buildDynamicImageUrl("crane truck"),
    emoji: "🏗️",
    fact: { english: "Has a long extending arm to lift materials up high!", hindi: "ऊंचाई पर भारी सामान उठाने वाली क्रेन गाड़ी!" }
  },
  {
    id: "cementmixer",
    english: "Cement Mixer",
    hindi: "सीमेंट मिक्सर",
    category: "vehicles",
    keyword: "cement mixer truck",
    image: buildDynamicImageUrl("cement mixer truck"),
    emoji: "🚚",
    fact: { english: "Spins round and round mixing concrete for buildings!", hindi: "घूम-घूम कर इमारतों के लिए सीमेंट मिलाने वाला ट्रक!" }
  },
  {
    id: "golfcart",
    english: "Golf Cart",
    hindi: "गोल्फ कार्ट",
    category: "vehicles",
    keyword: "golf cart",
    image: buildDynamicImageUrl("golf cart"),
    emoji: "🛺",
    fact: { english: "Quiet electric buggy used in golf courses and parks!", hindi: "पार्क और मैदानों में चलने वाली छोटी बिजली गाड़ी!" }
  },
  {
    id: "rollerskate",
    english: "Roller Skates",
    hindi: "रोलर स्केट्स",
    category: "vehicles",
    keyword: "roller skates",
    image: buildDynamicImageUrl("roller skates"),
    emoji: "🛼",
    fact: { english: "Shoes with small wheels to glide smoothly on pavements!", hindi: "पहियों वाले जूते जिन पर बच्चे फिसल कर चलते हैं!" }
  },
  {
    id: "canoe",
    english: "Canoe",
    hindi: "डोंगी",
    category: "vehicles",
    keyword: "canoe",
    image: buildDynamicImageUrl("canoe"),
    emoji: "🛶",
    fact: { english: "Narrow watercraft propelled by paddle strokes!", hindi: "चप्पू से चलाई जाने वाली हल्की संकरी नाव!" }
  },
  {
    id: "jetski",
    english: "Jet Ski",
    hindi: "जेट स्की",
    category: "vehicles",
    keyword: "jet ski",
    image: buildDynamicImageUrl("jet ski"),
    emoji: "🚤",
    fact: { english: "Speedy water bike splashing over sea waves!", hindi: "पानी पर तेज़ी से तैरने वाली वॉटर बाइक!" }
  },
  {
    id: "spacecraft",
    english: "Spacecraft",
    hindi: "अंतरिक्ष यान",
    category: "vehicles",
    keyword: "spacecraft",
    image: buildDynamicImageUrl("spacecraft"),
    emoji: "🛸",
    fact: { english: "Explores far-off planets and distant galaxies!", hindi: "दूर ग्रहों की खोज करने वाला अंतरिक्ष यान!" }
  },
  {
    id: "sportscar",
    english: "Sports Car",
    hindi: "स्पोर्ट्स कार",
    category: "vehicles",
    keyword: "sports car",
    image: buildDynamicImageUrl("sports car"),
    emoji: "🏎️",
    fact: { english: "Aerodynamic fast racing car built for high speed!", hindi: "तेज़ रफ्तार और शानदार डिजाइन वाली रेस कार!" }
  },
  {
    id: "convertible",
    english: "Convertible",
    hindi: "खुली छत कार",
    category: "vehicles",
    keyword: "convertible car",
    image: buildDynamicImageUrl("convertible car"),
    emoji: "🚗",
    fact: { english: "Car with a retractable roof to feel the fresh breeze!", hindi: "छत खोलकर ताजी हवा में चलने वाली कार!" }
  },
  {
    id: "doubledecker",
    english: "Double Decker Bus",
    hindi: "डबल डेकर बस",
    category: "vehicles",
    keyword: "double decker bus",
    image: buildDynamicImageUrl("double decker bus"),
    emoji: "🚍",
    fact: { english: "Has two levels of seating with stairs inside!", hindi: "दो मंजिला बस जिसमें ऊपर बैठकर शहर दिखता है!" }
  },
  {
    id: "carriage",
    english: "Horse Carriage",
    hindi: "घोड़ा गाड़ी",
    category: "vehicles",
    keyword: "horse carriage",
    image: buildDynamicImageUrl("horse carriage"),
    emoji: "🎠",
    fact: { english: "Traditional wheeled buggy pulled by a gentle horse!", hindi: "घोड़े द्वारा खींची जाने वाली शाही बग्गी!" }
  },
  {
    id: "van",
    english: "Van",
    hindi: "वैन",
    category: "vehicles",
    keyword: "minivan vehicle",
    image: buildDynamicImageUrl("minivan vehicle"),
    emoji: "🚐",
    fact: { english: "Spacious vehicle perfect for road trips with family!", hindi: "परिवार के साथ पिकनिक पर जाने वाली बड़ी वैन!" }
  },
  {
    id: "garbagetruck",
    english: "Garbage Truck",
    hindi: "कचरा गाड़ी",
    category: "vehicles",
    keyword: "garbage truck",
    image: buildDynamicImageUrl("garbage truck"),
    emoji: "🚛",
    fact: { english: "Keeps our neighborhoods clean and tidy!", hindi: "हमारे शहर और मोहल्ले को स्वच्छ रखने वाली गाड़ी!" }
  },
  {
    id: "hovercraft",
    english: "Hovercraft",
    hindi: "होवरक्राफ्ट",
    category: "vehicles",
    keyword: "hovercraft",
    image: buildDynamicImageUrl("hovercraft"),
    emoji: "🚤",
    fact: { english: "Glides on a cushion of air across both water and land!", hindi: "हवा के कुशन पर पानी और जमीन दोनों पर चलने वाला यान!" }
  }
];

export const ITEMS: QuizItem[] = items;

export const CATEGORIES: { id: Category; labelEn: string; labelHi: string; icon: string; color: string }[] = [
  { id: 'animals', labelEn: 'Animals', labelHi: 'जानवर', icon: '🦁', color: 'from-amber-400 to-orange-500' },
  { id: 'birds', labelEn: 'Birds', labelHi: 'पक्षी', icon: '🦜', color: 'from-sky-400 to-blue-600' },
  { id: 'fruits', labelEn: 'Fruits', labelHi: 'फल', icon: '🍎', color: 'from-emerald-400 to-teal-600' },
  { id: 'vehicles', labelEn: 'Vehicles', labelHi: 'वाहन', icon: '🚀', color: 'from-purple-400 to-pink-600' },
];
