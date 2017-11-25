const codes = [
    "alpha",
    "beta",
    "delta",
    "sigma",
    "one",
    "monkey",
    "omega",
    "cat",
    "dog",
    "bird",
    "letter",
    "green",
    "blue",
    "red"
];

const codeGen = () => {
    let index = Math.floor(Math.random() * codes.length);
    let index2 = Math.floor(Math.random() * codes.length);
    return `${codes[index]}-${codes[index2]}`
}

export default codeGen