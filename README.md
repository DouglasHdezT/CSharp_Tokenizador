# Software tokenizador para C#

Para el software se ha utilizado JavaScript como lenguaje de pregramación, y todo el sistema ha sido desarrollado sobre un sitio web estático. 

- [Software tokenizador para C](#software-tokenizador-para-c)
  - [Desarrolladores](#desarrolladores)
  - [Listado de tokens aceptado por el Analizador Lexicográfico.](#listado-de-tokens-aceptado-por-el-analizador-lexicográfico)
    - [Token de tipo de dato primitivo: *<t_dataype>*](#token-de-tipo-de-dato-primitivo-t_dataype)
    - [Token de Modificador de acceso: *<t_access_mod>*](#token-de-modificador-de-acceso-t_access_mod)
    - [Token de bloques de instrucción o sentencia: *<t_statement>*](#token-de-bloques-de-instrucción-o-sentencia-t_statement)
    - [Token de identificador: *<t_identifier>*](#token-de-identificador-t_identifier)
    - [Token de identificador textual: *<t_textual_identifier>*](#token-de-identificador-textual-t_textual_identifier)
    - [Token de constante numérica: *<t_number>*](#token-de-constante-numérica-t_number)
    - [Token de constantes cadenas: *<t_string>*](#token-de-constantes-cadenas-t_string)
    - [Token de constante caracter: *<t_character>*](#token-de-constante-caracter-t_character)
    - [Token de operador aritmético: *<t_arithmetic_op>*](#token-de-operador-aritmético-t_arithmetic_op)
    - [Token de operador lógico: *<t_logic_op>*](#token-de-operador-lógico-t_logic_op)
    - [Token de operador relacional: *<t_relation_op>*](#token-de-operador-relacional-t_relation_op)
    - [Token de operador de bits: *<t_bits_op>*](#token-de-operador-de-bits-t_bits_op)
    - [Token de asignacion: *<t_assign>*](#token-de-asignacion-t_assign)
    - [Token de fin de instrucción: *<t_EOI>*](#token-de-fin-de-instrucción-t_eoi)
    - [Token de separador: *<t_separator>*](#token-de-separador-t_separator)
    - [Token de acceso: *<t_access>*](#token-de-acceso-t_access)
    - [Token de inicio de bloque: *<t_block_start>*](#token-de-inicio-de-bloque-t_block_start)
    - [Token de fin de bloque: *<t_block_end>*](#token-de-fin-de-bloque-t_block_end)
    - [Token de inicio de expresión: *<t_exp_start>*](#token-de-inicio-de-expresión-t_exp_start)
    - [Token de fin de expresión: *<t_exp_end>*](#token-de-fin-de-expresión-t_exp_end)
    - [Token fallback: *<t_missingno>*](#token-fallback-t_missingno)
    - [Comentarios (one line):](#comentarios-one-line)
    - [Comentarios (multi line):](#comentarios-multi-line)

## Desarrolladores

- Douglas Antonio Hernández Torres
- Karla Beatriz Morales Alfaro
- Erika Stephanie Ramírez Mirón
- Carmen María Solano García

## Listado de tokens aceptado por el Analizador Lexicográfico.

### Token de tipo de dato primitivo: *<t_dataype>*
> **Regex:** /(int|char|bool)/

- int
- char
- bool

### Token de Modificador de acceso: *<t_access_mod>*
> **Regex:** /(public|private)/

- public
- private

### Token de bloques de instrucción o sentencia: *<t_statement>*
> **Regex:** /(if|else|do|while)/

- if
- else
- while
- do
- for

### Token de identificador: *<t_identifier>*
> **Regex:** /[_a-zA-Z][a-zA-Z\d_]*/

### Token de identificador textual: *<t_textual_identifier>*
> **Regex:** /@(if|else|do|while|int|char|bool|public|private)/

- int
- char
- bool
- public
- private
- if
- else
- while
- do
- for

### Token de constante numérica: *<t_number>*
> **Regex:** /(\d)+(.(\d)+)?/

- Enteros
- Decimales

### Token de constantes cadenas: *<t_string>*
> **Regex:** /"(.*?)"/

- " "

### Token de constante caracter: *<t_character>*
> **Regex:** /'(\\'|[^']){1}'/

- ' '

### Token de operador aritmético: *<t_arithmetic_op>*
> **Regex:** /(\+|\-|\*|\/|\%|\+\+|\-\-)/

- \+
- \-
- \*
- /
- %
- ++
- \--

### Token de operador lógico: *<t_logic_op>*
> **Regex:** /(\|\||\&\&|(!(?!=)))/

- && 
- || 
- !

### Token de operador relacional: *<t_relation_op>*
> **Regex:**: /(==|!=|<|>|>=|<=)/

- == 
- != 
- < 
- \> 
- \>= 
- <=

### Token de operador de bits: *<t_bits_op>*
> **Regex:** /(>>|<<|\&|\||~|\^)/

- \>> 
- << 
- & 
- |
- ~
- ^

### Token de asignacion: *<t_assign>*
> **Regex:** /=/

- =

### Token de fin de instrucción: *<t_EOI>*
> **Regex:** /;/

- ;

### Token de separador: *<t_separator>*
> **Regex:** /,/

- ,

### Token de acceso: *<t_access>*
> **Regex:** /\./

- .

### Token de inicio de bloque: *<t_block_start>*
> **Regex:** /\{/

- {

### Token de fin de bloque: *<t_block_end>*
> **Regex:** /\}/

- }

### Token de inicio de expresión: *<t_exp_start>*
> **Regex:** /\(/

- (

### Token de fin de expresión: *<t_exp_end>*
> **Regex:** /\)/

- )

### Token fallback: *<t_missingno>*
> **Regex:** /[^¡]+/

### Comentarios (one line): 
> **Regex:** /(\/\/(.*?)$)/gm

### Comentarios (multi line): 
> **Regex:** /\/\*((.(\n)* )*?)\*\//gm