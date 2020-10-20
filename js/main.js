const TOKENS = {
    //Primero verificar cadenas.
    t_string: /"(.*?)"/,
    t_character: /'(\\'|[^']){1}'/,
    t_textual_identifier: /@(if|else|do|while|int|char|bool|public|private)/,
    t_dataype: /(int|char|bool)/,
    t_access_mod: /(public|private)/,
    t_statement: /(if|else|do|while)/,
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
    multiline: /\/\*((.(\n)*)*?)\*\//gm
}

const TOKENS_COLORS = {
    //Primero verificar cadenas.
    t_string: /"(.*?)"/,
    t_character: /'(\\'|[^']){1}'/,
    t_textual_identifier: /@(if|else|do|while|int|char|bool|public|private)/,
    t_dataype: /(int|char|bool)/,
    t_access_mod: /(public|private)/,
    t_statement: /(if|else|do|while)/,
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


