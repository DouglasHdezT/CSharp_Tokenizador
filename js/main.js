const TOKENS = {
    //Primero verificar cadenas.
    t_string: /"(.*?)"/,
    t_character: /'(\\'|[^']){1}'/,
    t_textual_identifier: /(?<![a-zA-Z\d._])@(if|else|do|while|int|char|bool|public|private)(?![a-zA-Z\d._])/,
    t_dataype: /(?<![a-zA-Z\d._])(int|char|bool)(?![a-zA-Z\d._])/,
    t_access_mod: /(?<![a-zA-Z\d._])(public|private)(?![a-zA-Z\d._])/,
    t_statement: /(?<![a-zA-Z\d._])(if|else|do|while)(?![a-zA-Z\d._])/,
    t_identifier: /[_a-zA-Z][a-zA-Z\d_]*/,
    t_number: /(\d)+(.(\d)+)?/,
    t_arithmetic_op: /(\+|\-|\*|\/|\%|\+\+|\-\-)/,
    t_logic_op: /(\|\||\&\&|(!(?!=)))/,
    t_bits_op: /(>>|<<|\&|\||~|\^)/,
    t_relation_op: /(==|!=|>=|<=|<|>)/,
    t_assign: /=/,
    t_EOI: /;/,
    t_separator: /,/,
    t_access: /\./,
    t_block_start: /\{/,
    t_block_end: /\}/,
    t_exp_start: /\(/,
    t_exp_end: /\)/,
    t_whitespace: /\s+/,
    t_missingno: /[^¡]+/
}

const COMMENT_REGEX = {
    oneline: /(\/\/(.*?)$)/gm,
    multiline: /\/\*((.*(\n)*)*?)\*\//gm
}

const TOKENS_COLORS = {
    //Primero verificar cadenas.
    t_string: "#4CAF50",
    t_character: "#4CAF50",
    t_textual_identifier: "#3F51B5",
    t_dataype: "#FF5722",
    t_access_mod: "#FF5722",
    t_statement: "#FF5722",
    t_identifier: "#3F51B5",
    t_number: "#4CAF50",
    t_arithmetic_op: "#9C27B0",
    t_logic_op: "#9C27B0",
    t_bits_op: "#9C27B0",
    t_relation_op: "#9C27B0",
    t_assign: "#E91E63",
    t_EOI: "#E91E63",
    t_separator: "#E91E63",
    t_access: "#E91E63",
    t_block_start: "#931a25",
    t_block_end: "#931a25",
    t_exp_start: "#931a25",
    t_exp_end: "#931a25",
    t_whitespace: "#9E9E9E",
    t_missingno: "#F44336"
}


//GUI control
window.onload = () => { 
    const tokenizeButton = document.querySelector("#tokenize-button");
    const inputArea = document.querySelector("#input-textarea");

    tokenizeButton.onclick = () => { 
        const { value } = inputArea;
        createAllTokenSpans(value);
    }
}
 
const createTokenSpan = (token) => { 
    const span = document.createElement("span");
    span.style.backgroundColor = TOKENS_COLORS[token]

    span.innerText = `<${token}>`

    return span;
}

const createAllTokenSpans = (textInput) => {
    const container = document.querySelector(".result-area");
    container.innerHTML = "";

    const tokens = tokenizeAll(textInput);
    tokens.forEach(token => { 
        const span = createTokenSpan(token);
        container.appendChild(span);
    })
}

//Tokenizer logic

/**
 * 
 * @returns {Array<string>} 
 */
const tokenize = (wordToTokenize="") => {
    const tokens = Object.keys(TOKENS);
    
    let word = wordToTokenize;
    const tokensFound = [];
    
    let roundDone;

    do {
        roundDone = false;

        for(const token of tokens) {
            //console.log(TOKENS[token].exec(word));
            const result = TOKENS[token].exec(word);
            if (!result) continue;

            const [matchString] = result;
            const index = result.index;

            tokensFound[index] = token;
            word = word.replace(matchString, "¡".repeat(matchString.length));
            
            roundDone = true;
            break;
        }

    } while (roundDone);

    return tokensFound.flat();
}

const cleanUpComments = (textToClean) => { 
    let cleanText = textToClean;

    Object.keys(COMMENT_REGEX).forEach(regex => {
        cleanText = cleanText.replace(COMMENT_REGEX[regex], ""); 
    });

    return cleanText;
}

const tokenizeAll = (input = "") => {
    const inputWOComments = cleanUpComments(input);
    const cleanInput = inputWOComments.replace(/(\n)+/g, " ").replace(/(\t)+|(\s)+/g, " ").trim();
    //console.log(cleanInput);

    /* const splitedWords = cleanInput.split(/\s+/);
    console.log(splitedWords); */

    /* let tokensFound = [];

    splitedWords.forEach(word => { 
        const resultTokens = tokenize(word);
        tokensFound = [...tokensFound, ...resultTokens];
    }); */

    let tokensFound = tokenize(cleanInput)
    tokensFound = tokensFound.filter(token => token !== 't_whitespace');

    return tokensFound;
}

//tokenize('a="HI HELLO";');
//tokenize("a=2");
//tokenize("15.5");
//tokenize("\"Hola a todos putos int a = 2\"");
//tokenize(">>");
//tokenize(">=");
//tokenize("!");
//tokenize("!=");
//tokenize("&&");
//tokenize("a,b,c,r,g");
//tokenize('"a=2"');
//tokenize('a=2.2');
//tokenize('Console.log("Hola mundo"+"Hola"+ComoNo.toString());');

/* tokenizeAll(`
    Console.Write("Hola mundo");
    
    int a = 2;
    int intNumber=6.358;
    bool flag = 1;
    int b='c';

    int c=a + b;
                                            Console.Write("Respuesta
                                            " +c);
`);

tokenizeAll("int @int int") */

//console.log(cleanUpComments(`
/* Multine comment to clean
    Hola
    Hola
    Hola

    Equis de


*/

//int?
//int a = 4; //Comentario de fila

/* otro comentarios */
//Console.Write("Hola mundo")`));


