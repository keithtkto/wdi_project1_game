
// global var
var board = [],
    blueFirst = ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
                'red', 'red', 'red', 'red', 'red', 'red', 'red', 'white', 'white',
                 'white', 'white', 'white', 'white', 'white', 'white', 'white',
                  'white', 'white', 'white', 'white', 'white', 'white', 'black']

// Random word generator

for (var i = 0; i < 25; i++) {
board.push( wordArray[Math.floor(Math.random() * wordArray.length)]);
}
var wordArray = ["day", "millionaire", "mammoth", "comic", "head", "litter", "stream", "glove", "centaur", "shadow", "wave", "car", "engine", "Shakespeare", "microscope", "jet", "suit", "chocolate", "mug", "concert", "scorpion", "Canada", "Europe", "soul", "jack", "copper", "kangaroo", "strike", "fence", "capital", "bottle", "forest", "helicopter", "snowman", "crane", "trip", "palm", "Moscow", "teacher", "pumpkin", "thumb", "Antarctica", "octopus", "whip", "key", "alien",  "plastic", "dwarf", "web", "fan", "ambulance", "dress", "hospital", "Saturn", "spell", "grass", "lock", "brush", "death", "stock", "laser", "skyscraper", "pilot", "casino", "ruler", "bomb", "lab", "cliff", "boom", "bank", "force", "track", "phoenix", "drop", "buck", "agent", "ice cream", "rabbit", "van", "vet", "press", "spine", "hawk", "battery", "draft", "ham", "shark", "Jupiter", "calf", "air", "straw", "switch", "cloak", "board", "Mexico", "eye", "ship", "dice", "ghost", "boot", "scale", "fall", "rock", "London", "police", "lion", "kid", "wind", "leprechaun", "nurse", "bell", "lemon", "triangle", "cap", "light", "belt", "post", "ray", "hole", "beat", "theater", "Egypt", "model", "Tokyo", "rose", "change", "arm", "Bermuda", "watch", "lead", "cell", "cover", "knife", "church", "cargo", "jam", "horseshoe", "honey", "mouse", "war", "plate", "line", "contract", "march", "limousine", "Australia", "foot", "New York", "stadium", "dragon", "pass", "green", "knight", "pie", "slip", "tablet", "shop", "needle", "fighter", "wake", "bow", "degree", "mercury", "roulette", "ball", "doctor", "match", "iron", "olive", "grace", "point", "tube", "cotton", "fish", "date", "drill", "France", "block", "net", "moon", "cross", "seal", "diamond", "whale", "tie", "table", "court", "spring", "card", "horn", "hood", "heart", "duck", "ring", "band", "fire", "robin", "bridge", "pool", "star"];
