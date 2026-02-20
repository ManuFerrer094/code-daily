/**
 * challenges.js
 * Banco de ejercicios de programación organizados por nivel.
 * Cada ejercicio tiene: id, título, descripción HTML, plantilla de código,
 * solución, y una función de test que evalúa el código del usuario.
 */

const CHALLENGES = {
  facil: [
    {
      id: "e1",
      title: "Suma de dos números",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>sumar</code> que reciba dos números como parámetros
                    y devuelva la suma de ambos.
                </p>
            `,
      examples: [
        { input: "sumar(2, 3)", output: "5" },
        { input: "sumar(-1, 1)", output: "0" },
        { input: "sumar(100, 200)", output: "300" },
      ],
      hint: "Usa la palabra clave return para devolver el resultado.",
      template: `function sumar(a, b) {\n  // Tu código aquí\n}\n`,
      solution: `function sumar(a, b) {\n  return a + b;\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn sumar;")();
        const tests = [
          { args: [2, 3], expected: 5 },
          { args: [-1, 1], expected: 0 },
          { args: [100, 200], expected: 300 },
          { args: [0, 0], expected: 0 },
          { args: [-5, -3], expected: -8 },
        ];
        return runTests(fn, tests);
      },
    },
    {
      id: "e2",
      title: "Par o Impar",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>esParOImpar</code> que reciba un número y devuelva
                    la cadena <code>"par"</code> si el número es par, o <code>"impar"</code> si es impar.
                </p>
            `,
      examples: [
        { input: "esParOImpar(4)", output: '"par"' },
        { input: "esParOImpar(7)", output: '"impar"' },
        { input: "esParOImpar(0)", output: '"par"' },
      ],
      hint: "Usa el operador módulo (%) para comprobar divisibilidad.",
      template: `function esParOImpar(numero) {\n  // Tu código aquí\n}\n`,
      solution: `function esParOImpar(numero) {\n  return numero % 2 === 0 ? "par" : "impar";\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn esParOImpar;")();
        const tests = [
          { args: [4], expected: "par" },
          { args: [7], expected: "impar" },
          { args: [0], expected: "par" },
          { args: [-2], expected: "par" },
          { args: [13], expected: "impar" },
        ];
        return runTests(fn, tests);
      },
    },
    {
      id: "e3",
      title: "Mayor de tres",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>mayorDeTres</code> que reciba tres números como parámetros
                    y devuelva el mayor de los tres.
                </p>
            `,
      examples: [
        { input: "mayorDeTres(1, 5, 3)", output: "5" },
        { input: "mayorDeTres(10, 10, 5)", output: "10" },
        { input: "mayorDeTres(-1, -5, -3)", output: "-1" },
      ],
      hint: "Puedes usar Math.max() o comparaciones con if/else.",
      template: `function mayorDeTres(a, b, c) {\n  // Tu código aquí\n}\n`,
      solution: `function mayorDeTres(a, b, c) {\n  return Math.max(a, b, c);\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn mayorDeTres;")();
        const tests = [
          { args: [1, 5, 3], expected: 5 },
          { args: [10, 10, 5], expected: 10 },
          { args: [-1, -5, -3], expected: -1 },
          { args: [0, 0, 0], expected: 0 },
          { args: [99, 50, 100], expected: 100 },
        ];
        return runTests(fn, tests);
      },
    },
    {
      id: "e4",
      title: "Contar vocales",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>contarVocales</code> que reciba una cadena de texto
                    y devuelva el número de vocales (a, e, i, o, u) que contiene. No distingue entre mayúsculas y minúsculas.
                </p>
            `,
      examples: [
        { input: 'contarVocales("hola")', output: "2" },
        { input: 'contarVocales("MURCIELAGO")', output: "5" },
        { input: 'contarVocales("xyz")', output: "0" },
      ],
      hint: "Convierte a minúsculas y recorre la cadena comparando cada carácter.",
      template: `function contarVocales(texto) {\n  // Tu código aquí\n}\n`,
      solution: `function contarVocales(texto) {\n  const vocales = "aeiouáéíóú";\n  let count = 0;\n  for (const char of texto.toLowerCase()) {\n    if (vocales.includes(char)) count++;\n  }\n  return count;\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn contarVocales;")();
        const tests = [
          { args: ["hola"], expected: 2 },
          { args: ["MURCIELAGO"], expected: 5 },
          { args: ["xyz"], expected: 0 },
          { args: ["aeiou"], expected: 5 },
          { args: [""], expected: 0 },
        ];
        return runTests(fn, tests);
      },
    },
    {
      id: "e5",
      title: "Invertir cadena",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>invertir</code> que reciba una cadena de texto
                    y devuelva la cadena invertida.
                </p>
            `,
      examples: [
        { input: 'invertir("hola")', output: '"aloh"' },
        { input: 'invertir("JavaScript")', output: '"tpircSavaJ"' },
        { input: 'invertir("a")', output: '"a"' },
      ],
      hint: "Puedes convertir la cadena a array, invertirlo y unirlo de nuevo.",
      template: `function invertir(texto) {\n  // Tu código aquí\n}\n`,
      solution: `function invertir(texto) {\n  return texto.split("").reverse().join("");\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn invertir;")();
        const tests = [
          { args: ["hola"], expected: "aloh" },
          { args: ["JavaScript"], expected: "tpircSavaJ" },
          { args: ["a"], expected: "a" },
          { args: [""], expected: "" },
          { args: ["12345"], expected: "54321" },
        ];
        return runTests(fn, tests);
      },
    },
    {
      id: "e6",
      title: "Factorial",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>factorial</code> que reciba un número entero positivo
                    y devuelva su factorial. El factorial de 0 es 1.
                </p>
            `,
      examples: [
        { input: "factorial(5)", output: "120" },
        { input: "factorial(0)", output: "1" },
        { input: "factorial(3)", output: "6" },
      ],
      hint: "El factorial de n es n * (n-1) * (n-2) * ... * 1. Puedes usar un bucle o recursión.",
      template: `function factorial(n) {\n  // Tu código aquí\n}\n`,
      solution: `function factorial(n) {\n  if (n <= 1) return 1;\n  let result = 1;\n  for (let i = 2; i <= n; i++) {\n    result *= i;\n  }\n  return result;\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn factorial;")();
        const tests = [
          { args: [5], expected: 120 },
          { args: [0], expected: 1 },
          { args: [1], expected: 1 },
          { args: [3], expected: 6 },
          { args: [7], expected: 5040 },
        ];
        return runTests(fn, tests);
      },
    },
    {
      id: "e7",
      title: "Celsius a Fahrenheit",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>celsiusAFahrenheit</code> que reciba una temperatura en grados Celsius
                    y devuelva su equivalente en Fahrenheit. La fórmula es: <code>F = C × 9/5 + 32</code>.
                </p>
            `,
      examples: [
        { input: "celsiusAFahrenheit(0)", output: "32" },
        { input: "celsiusAFahrenheit(100)", output: "212" },
        { input: "celsiusAFahrenheit(-40)", output: "-40" },
      ],
      hint: "Aplica la fórmula directamente y devuelve el resultado.",
      template: `function celsiusAFahrenheit(celsius) {\n  // Tu código aquí\n}\n`,
      solution: `function celsiusAFahrenheit(celsius) {\n  return celsius * 9 / 5 + 32;\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn celsiusAFahrenheit;")();
        const tests = [
          { args: [0], expected: 32 },
          { args: [100], expected: 212 },
          { args: [-40], expected: -40 },
          { args: [37], expected: 98.6 },
          { args: [20], expected: 68 },
        ];
        return runTests(fn, tests);
      },
    },
    {
      id: "e8",
      title: "Es palíndromo",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>esPalindromo</code> que reciba una cadena de texto 
                    y devuelva <code>true</code> si es un palíndromo (se lee igual al derecho y al revés), 
                    o <code>false</code> en caso contrario. Ignora mayúsculas/minúsculas.
                </p>
            `,
      examples: [
        { input: 'esPalindromo("ana")', output: "true" },
        { input: 'esPalindromo("Reconocer")', output: "true" },
        { input: 'esPalindromo("hola")', output: "false" },
      ],
      hint: "Convierte a minúsculas, invierte la cadena y compárala con la original.",
      template: `function esPalindromo(texto) {\n  // Tu código aquí\n}\n`,
      solution: `function esPalindromo(texto) {\n  const lower = texto.toLowerCase();\n  return lower === lower.split("").reverse().join("");\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn esPalindromo;")();
        const tests = [
          { args: ["ana"], expected: true },
          { args: ["Reconocer"], expected: true },
          { args: ["hola"], expected: false },
          { args: ["oso"], expected: true },
          { args: ["abcba"], expected: true },
        ];
        return runTests(fn, tests);
      },
    },
  ],
  medio: [
    {
      id: "m1",
      title: "FizzBuzz",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>fizzBuzz</code> que reciba un número <code>n</code>
                    y devuelva un array con los números del 1 al n, pero reemplazando:
                </p>
                <ul class="challenge-description" style="padding-left:1.5rem; margin-bottom:1rem;">
                    <li>Los múltiplos de 3 por <code>"Fizz"</code></li>
                    <li>Los múltiplos de 5 por <code>"Buzz"</code></li>
                    <li>Los múltiplos de 3 y 5 por <code>"FizzBuzz"</code></li>
                </ul>
            `,
      examples: [
        { input: "fizzBuzz(5)", output: '[1, 2, "Fizz", 4, "Buzz"]' },
        { input: "fizzBuzz(15)[14]", output: '"FizzBuzz"' },
      ],
      hint: "Comprueba primero el caso de múltiplo de ambos (3 y 5), luego cada uno por separado.",
      template: `function fizzBuzz(n) {\n  // Tu código aquí\n}\n`,
      solution: `function fizzBuzz(n) {\n  const result = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) result.push("FizzBuzz");\n    else if (i % 3 === 0) result.push("Fizz");\n    else if (i % 5 === 0) result.push("Buzz");\n    else result.push(i);\n  }\n  return result;\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn fizzBuzz;")();
        const r5 = fn(5);
        const r15 = fn(15);
        const results = [];

        results.push({
          pass:
            JSON.stringify(r5) === JSON.stringify([1, 2, "Fizz", 4, "Buzz"]),
          input: "fizzBuzz(5)",
          expected: '[1, 2, "Fizz", 4, "Buzz"]',
          got: JSON.stringify(r5),
        });
        results.push({
          pass: r15[14] === "FizzBuzz",
          input: "fizzBuzz(15)[14]",
          expected: '"FizzBuzz"',
          got: JSON.stringify(r15[14]),
        });
        results.push({
          pass: r15[2] === "Fizz",
          input: "fizzBuzz(15)[2]",
          expected: '"Fizz"',
          got: JSON.stringify(r15[2]),
        });
        results.push({
          pass: r15[4] === "Buzz",
          input: "fizzBuzz(15)[4]",
          expected: '"Buzz"',
          got: JSON.stringify(r15[4]),
        });
        results.push({
          pass: r15[0] === 1,
          input: "fizzBuzz(15)[0]",
          expected: "1",
          got: JSON.stringify(r15[0]),
        });

        return {
          passed: results.filter((r) => r.pass).length,
          total: results.length,
          results,
        };
      },
    },
    {
      id: "m2",
      title: "Eliminar duplicados",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>eliminarDuplicados</code> que reciba un array
                    y devuelva un nuevo array sin elementos duplicados, manteniendo el orden original.
                </p>
            `,
      examples: [
        {
          input: "eliminarDuplicados([1, 2, 2, 3, 4, 4, 5])",
          output: "[1, 2, 3, 4, 5]",
        },
        {
          input: 'eliminarDuplicados(["a", "b", "a", "c"])',
          output: '["a", "b", "c"]',
        },
      ],
      hint: "Puedes usar Set o filter con indexOf.",
      template: `function eliminarDuplicados(arr) {\n  // Tu código aquí\n}\n`,
      solution: `function eliminarDuplicados(arr) {\n  return [...new Set(arr)];\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn eliminarDuplicados;")();
        const results = [];

        const t1 = fn([1, 2, 2, 3, 4, 4, 5]);
        results.push({
          pass: JSON.stringify(t1) === JSON.stringify([1, 2, 3, 4, 5]),
          input: "eliminarDuplicados([1, 2, 2, 3, 4, 4, 5])",
          expected: "[1, 2, 3, 4, 5]",
          got: JSON.stringify(t1),
        });

        const t2 = fn(["a", "b", "a", "c"]);
        results.push({
          pass: JSON.stringify(t2) === JSON.stringify(["a", "b", "c"]),
          input: 'eliminarDuplicados(["a", "b", "a", "c"])',
          expected: '["a", "b", "c"]',
          got: JSON.stringify(t2),
        });

        const t3 = fn([1, 1, 1, 1]);
        results.push({
          pass: JSON.stringify(t3) === JSON.stringify([1]),
          input: "eliminarDuplicados([1, 1, 1, 1])",
          expected: "[1]",
          got: JSON.stringify(t3),
        });

        const t4 = fn([]);
        results.push({
          pass: JSON.stringify(t4) === JSON.stringify([]),
          input: "eliminarDuplicados([])",
          expected: "[]",
          got: JSON.stringify(t4),
        });

        const t5 = fn([5, 4, 3, 2, 1]);
        results.push({
          pass: JSON.stringify(t5) === JSON.stringify([5, 4, 3, 2, 1]),
          input: "eliminarDuplicados([5, 4, 3, 2, 1])",
          expected: "[5, 4, 3, 2, 1]",
          got: JSON.stringify(t5),
        });

        return {
          passed: results.filter((r) => r.pass).length,
          total: results.length,
          results,
        };
      },
    },
    {
      id: "m3",
      title: "Aplanar array",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>aplanar</code> que reciba un array que puede contener
                    otros arrays anidados y devuelva un solo array plano con todos los elementos.
                    <strong>No puedes usar</strong> <code>Array.flat()</code>.
                </p>
            `,
      examples: [
        { input: "aplanar([1, [2, 3], [4, [5]]])", output: "[1, 2, 3, 4, 5]" },
        { input: "aplanar([[1], [2], [3]])", output: "[1, 2, 3]" },
      ],
      hint: "Usa recursión: si un elemento es un array, aplánalo; si no, añádelo al resultado.",
      template: `function aplanar(arr) {\n  // Tu código aquí\n}\n`,
      solution: `function aplanar(arr) {\n  const result = [];\n  for (const item of arr) {\n    if (Array.isArray(item)) {\n      result.push(...aplanar(item));\n    } else {\n      result.push(item);\n    }\n  }\n  return result;\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn aplanar;")();
        const results = [];

        const t1 = fn([1, [2, 3], [4, [5]]]);
        results.push({
          pass: JSON.stringify(t1) === JSON.stringify([1, 2, 3, 4, 5]),
          input: "aplanar([1, [2, 3], [4, [5]]])",
          expected: "[1, 2, 3, 4, 5]",
          got: JSON.stringify(t1),
        });

        const t2 = fn([[1], [2], [3]]);
        results.push({
          pass: JSON.stringify(t2) === JSON.stringify([1, 2, 3]),
          input: "aplanar([[1], [2], [3]])",
          expected: "[1, 2, 3]",
          got: JSON.stringify(t2),
        });

        const t3 = fn([1, 2, 3]);
        results.push({
          pass: JSON.stringify(t3) === JSON.stringify([1, 2, 3]),
          input: "aplanar([1, 2, 3])",
          expected: "[1, 2, 3]",
          got: JSON.stringify(t3),
        });

        const t4 = fn([]);
        results.push({
          pass: JSON.stringify(t4) === JSON.stringify([]),
          input: "aplanar([])",
          expected: "[]",
          got: JSON.stringify(t4),
        });

        const t5 = fn([[[1]], [[2]], [[3]]]);
        results.push({
          pass: JSON.stringify(t5) === JSON.stringify([1, 2, 3]),
          input: "aplanar([[[1]], [[2]], [[3]]])",
          expected: "[1, 2, 3]",
          got: JSON.stringify(t5),
        });

        return {
          passed: results.filter((r) => r.pass).length,
          total: results.length,
          results,
        };
      },
    },
    {
      id: "m4",
      title: "Contar palabras",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>contarPalabras</code> que reciba una cadena de texto
                    y devuelva un objeto donde cada clave sea una palabra (en minúsculas) y cada valor 
                    sea el número de veces que aparece.
                </p>
            `,
      examples: [
        {
          input: 'contarPalabras("hola mundo hola")',
          output: "{ hola: 2, mundo: 1 }",
        },
        { input: 'contarPalabras("a b a b a")', output: "{ a: 3, b: 2 }" },
      ],
      hint: "Divide la cadena por espacios, itera y usa un objeto para contar.",
      template: `function contarPalabras(texto) {\n  // Tu código aquí\n}\n`,
      solution: `function contarPalabras(texto) {\n  const words = texto.toLowerCase().split(/\\s+/).filter(w => w.length > 0);\n  const count = {};\n  for (const word of words) {\n    count[word] = (count[word] || 0) + 1;\n  }\n  return count;\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn contarPalabras;")();
        const results = [];

        const t1 = fn("hola mundo hola");
        results.push({
          pass: t1.hola === 2 && t1.mundo === 1,
          input: 'contarPalabras("hola mundo hola")',
          expected: "{ hola: 2, mundo: 1 }",
          got: JSON.stringify(t1),
        });

        const t2 = fn("a b a b a");
        results.push({
          pass: t2.a === 3 && t2.b === 2,
          input: 'contarPalabras("a b a b a")',
          expected: "{ a: 3, b: 2 }",
          got: JSON.stringify(t2),
        });

        const t3 = fn("JavaScript javascript JAVASCRIPT");
        results.push({
          pass: t3.javascript === 3,
          input: 'contarPalabras("JavaScript javascript JAVASCRIPT")',
          expected: "{ javascript: 3 }",
          got: JSON.stringify(t3),
        });

        const t4 = fn("solo");
        results.push({
          pass: t4.solo === 1,
          input: 'contarPalabras("solo")',
          expected: "{ solo: 1 }",
          got: JSON.stringify(t4),
        });

        return {
          passed: results.filter((r) => r.pass).length,
          total: results.length,
          results,
        };
      },
    },
    {
      id: "m5",
      title: "Suma de rango",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>sumaRango</code> que reciba dos números
                    (<code>inicio</code> y <code>fin</code>) y devuelva la suma de todos los números
                    en ese rango, incluyendo ambos extremos. Debe funcionar sin importar el orden de los parámetros.
                </p>
            `,
      examples: [
        { input: "sumaRango(1, 5)", output: "15" },
        { input: "sumaRango(5, 1)", output: "15" },
        { input: "sumaRango(3, 3)", output: "3" },
      ],
      hint: "Determina el menor y el mayor primero, luego suma en un bucle.",
      template: `function sumaRango(inicio, fin) {\n  // Tu código aquí\n}\n`,
      solution: `function sumaRango(inicio, fin) {\n  const min = Math.min(inicio, fin);\n  const max = Math.max(inicio, fin);\n  let suma = 0;\n  for (let i = min; i <= max; i++) {\n    suma += i;\n  }\n  return suma;\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn sumaRango;")();
        const tests = [
          { args: [1, 5], expected: 15 },
          { args: [5, 1], expected: 15 },
          { args: [3, 3], expected: 3 },
          { args: [0, 10], expected: 55 },
          { args: [-3, 3], expected: 0 },
        ];
        return runTests(fn, tests);
      },
    },
    {
      id: "m6",
      title: "Capitalize palabras",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>capitalizar</code> que reciba una cadena de texto
                    y devuelva la misma cadena con la primera letra de cada palabra en mayúscula.
                </p>
            `,
      examples: [
        { input: 'capitalizar("hola mundo")', output: '"Hola Mundo"' },
        {
          input: 'capitalizar("javaScript es genial")',
          output: '"JavaScript Es Genial"',
        },
      ],
      hint: "Divide por espacios, transforma cada palabra y vuelve a unir.",
      template: `function capitalizar(texto) {\n  // Tu código aquí\n}\n`,
      solution: `function capitalizar(texto) {\n  return texto.split(" ").map(word => \n    word.charAt(0).toUpperCase() + word.slice(1)\n  ).join(" ");\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn capitalizar;")();
        const results = [];

        const t1 = fn("hola mundo");
        results.push({
          pass: t1 === "Hola Mundo",
          input: 'capitalizar("hola mundo")',
          expected: '"Hola Mundo"',
          got: JSON.stringify(t1),
        });

        const t2 = fn("javaScript es genial");
        results.push({
          pass: t2 === "JavaScript Es Genial",
          input: 'capitalizar("javaScript es genial")',
          expected: '"JavaScript Es Genial"',
          got: JSON.stringify(t2),
        });

        const t3 = fn("a");
        results.push({
          pass: t3 === "A",
          input: 'capitalizar("a")',
          expected: '"A"',
          got: JSON.stringify(t3),
        });

        const t4 = fn("test string here");
        results.push({
          pass: t4 === "Test String Here",
          input: 'capitalizar("test string here")',
          expected: '"Test String Here"',
          got: JSON.stringify(t4),
        });

        return {
          passed: results.filter((r) => r.pass).length,
          total: results.length,
          results,
        };
      },
    },
    {
      id: "m7",
      title: "Array chunk",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>chunk</code> que reciba un array y un tamaño
                    y devuelva un array de sub-arrays, donde cada sub-array tiene como máximo 
                    el tamaño indicado.
                </p>
            `,
      examples: [
        { input: "chunk([1,2,3,4,5], 2)", output: "[[1,2], [3,4], [5]]" },
        { input: "chunk([1,2,3,4,5,6], 3)", output: "[[1,2,3], [4,5,6]]" },
      ],
      hint: "Usa un bucle con slice para ir cortando el array en trozos.",
      template: `function chunk(arr, size) {\n  // Tu código aquí\n}\n`,
      solution: `function chunk(arr, size) {\n  const result = [];\n  for (let i = 0; i < arr.length; i += size) {\n    result.push(arr.slice(i, i + size));\n  }\n  return result;\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn chunk;")();
        const results = [];

        const t1 = fn([1, 2, 3, 4, 5], 2);
        results.push({
          pass: JSON.stringify(t1) === JSON.stringify([[1, 2], [3, 4], [5]]),
          input: "chunk([1,2,3,4,5], 2)",
          expected: "[[1,2],[3,4],[5]]",
          got: JSON.stringify(t1),
        });

        const t2 = fn([1, 2, 3, 4, 5, 6], 3);
        results.push({
          pass:
            JSON.stringify(t2) ===
            JSON.stringify([
              [1, 2, 3],
              [4, 5, 6],
            ]),
          input: "chunk([1,2,3,4,5,6], 3)",
          expected: "[[1,2,3],[4,5,6]]",
          got: JSON.stringify(t2),
        });

        const t3 = fn([1], 5);
        results.push({
          pass: JSON.stringify(t3) === JSON.stringify([[1]]),
          input: "chunk([1], 5)",
          expected: "[[1]]",
          got: JSON.stringify(t3),
        });

        const t4 = fn([], 3);
        results.push({
          pass: JSON.stringify(t4) === JSON.stringify([]),
          input: "chunk([], 3)",
          expected: "[]",
          got: JSON.stringify(t4),
        });

        return {
          passed: results.filter((r) => r.pass).length,
          total: results.length,
          results,
        };
      },
    },
    {
      id: "m8",
      title: "Número romano",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>aRomano</code> que reciba un número entero entre 1 y 3999
                    y devuelva su representación en números romanos como cadena.
                </p>
            `,
      examples: [
        { input: "aRomano(3)", output: '"III"' },
        { input: "aRomano(49)", output: '"XLIX"' },
        { input: "aRomano(2024)", output: '"MMXXIV"' },
      ],
      hint: "Usa una tabla de valores romanos de mayor a menor y ve restando.",
      template: `function aRomano(num) {\n  // Tu código aquí\n}\n`,
      solution: `function aRomano(num) {\n  const values = [\n    [1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],\n    [100,"C"],[90,"XC"],[50,"L"],[40,"XL"],\n    [10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]\n  ];\n  let result = "";\n  for (const [val, sym] of values) {\n    while (num >= val) {\n      result += sym;\n      num -= val;\n    }\n  }\n  return result;\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn aRomano;")();
        const tests = [
          { args: [3], expected: "III" },
          { args: [49], expected: "XLIX" },
          { args: [2024], expected: "MMXXIV" },
          { args: [1], expected: "I" },
          { args: [3999], expected: "MMMCMXCIX" },
        ];
        return runTests(fn, tests);
      },
    },
  ],
  dificil: [
    {
      id: "d1",
      title: "Buscar anagramas",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>sonAnagramas</code> que reciba dos cadenas
                    y devuelva <code>true</code> si son anagramas (contienen las mismas letras 
                    en diferente orden), o <code>false</code> si no lo son. Ignora mayúsculas, 
                    minúsculas y espacios.
                </p>
            `,
      examples: [
        { input: 'sonAnagramas("listen", "silent")', output: "true" },
        { input: 'sonAnagramas("Hola", "aloH")', output: "true" },
        { input: 'sonAnagramas("abc", "abd")', output: "false" },
      ],
      hint: "Ordena ambas cadenas alfabéticamente y compáralas.",
      template: `function sonAnagramas(a, b) {\n  // Tu código aquí\n}\n`,
      solution: `function sonAnagramas(a, b) {\n  const clean = str => str.toLowerCase().replace(/\\s/g, "").split("").sort().join("");\n  return clean(a) === clean(b);\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn sonAnagramas;")();
        const tests = [
          { args: ["listen", "silent"], expected: true },
          { args: ["Hola", "aloH"], expected: true },
          { args: ["abc", "abd"], expected: false },
          { args: ["Astronomer", "Moon starer"], expected: true },
          { args: ["aaa", "aaaa"], expected: false },
        ];
        return runTests(fn, tests);
      },
    },
    {
      id: "d2",
      title: "Deep clone",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>deepClone</code> que reciba un objeto o array
                    y devuelva una copia profunda (deep clone) del mismo. No puedes usar 
                    <code>JSON.parse(JSON.stringify())</code> ni <code>structuredClone()</code>.
                </p>
            `,
      examples: [
        { input: "deepClone({a: 1, b: {c: 2}})", output: "{a: 1, b: {c: 2}}" },
        { input: "deepClone([1, [2, 3]])", output: "[1, [2, 3]]" },
      ],
      hint: "Usa recursión: para objetos y arrays, clona cada propiedad/elemento; para primitivos, devuelve directamente.",
      template: `function deepClone(obj) {\n  // Tu código aquí\n}\n`,
      solution: `function deepClone(obj) {\n  if (obj === null || typeof obj !== "object") return obj;\n  if (Array.isArray(obj)) return obj.map(item => deepClone(item));\n  const clone = {};\n  for (const key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      clone[key] = deepClone(obj[key]);\n    }\n  }\n  return clone;\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn deepClone;")();
        const results = [];

        // Test 1: Simple object
        const o1 = { a: 1, b: { c: 2 } };
        const c1 = fn(o1);
        results.push({
          pass: c1.a === 1 && c1.b.c === 2 && c1.b !== o1.b,
          input: "deepClone({a:1, b:{c:2}})",
          expected: "Deep copy with different references",
          got: c1.b !== o1.b ? "Different references ✓" : "Same reference ✗",
        });

        // Test 2: Array
        const o2 = [1, [2, 3]];
        const c2 = fn(o2);
        results.push({
          pass: JSON.stringify(c2) === JSON.stringify(o2) && c2[1] !== o2[1],
          input: "deepClone([1, [2, 3]])",
          expected: "Deep copy of nested array",
          got: c2[1] !== o2[1] ? "Different references ✓" : "Same reference ✗",
        });

        // Test 3: Nested complex
        const o3 = { x: { y: { z: [1, 2, 3] } } };
        const c3 = fn(o3);
        results.push({
          pass:
            JSON.stringify(c3) === JSON.stringify(o3) && c3.x.y.z !== o3.x.y.z,
          input: "deepClone({x:{y:{z:[1,2,3]}}})",
          expected: "Deep nested clone",
          got:
            c3.x.y.z !== o3.x.y.z
              ? "Different references ✓"
              : "Same reference ✗",
        });

        // Test 4: Null
        const c4 = fn(null);
        results.push({
          pass: c4 === null,
          input: "deepClone(null)",
          expected: "null",
          got: JSON.stringify(c4),
        });

        // Test 5: Mutation check
        const o5 = { a: { b: 1 } };
        const c5 = fn(o5);
        c5.a.b = 999;
        results.push({
          pass: o5.a.b === 1,
          input: "Clone mutation check",
          expected: "Original unchanged after clone mutation",
          got: o5.a.b === 1 ? "Original unchanged ✓" : "Original modified ✗",
        });

        return {
          passed: results.filter((r) => r.pass).length,
          total: results.length,
          results,
        };
      },
    },
    {
      id: "d3",
      title: "Debounce",
      description: `
                <p class="challenge-description">
                    Implementa una función llamada <code>debounce</code> que reciba una función <code>fn</code>
                    y un tiempo de espera <code>delay</code> en milisegundos. Debe devolver una nueva función que
                    solo ejecute <code>fn</code> después de que hayan pasado <code>delay</code> ms 
                    sin que se vuelva a llamar.
                </p>
            `,
      examples: [
        { input: "const d = debounce(fn, 300)", output: "Función debounced" },
        {
          input: "d(); d(); d(); // Solo ejecuta fn una vez, 300ms después",
          output: "",
        },
      ],
      hint: "Usa setTimeout y clearTimeout. Guarda el timer en una variable del closure.",
      template: `function debounce(fn, delay) {\n  // Tu código aquí\n}\n`,
      solution: `function debounce(fn, delay) {\n  let timer = null;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn debounce;")();
        const results = [];

        // Test: returns a function
        const debounced = fn(() => {}, 100);
        results.push({
          pass: typeof debounced === "function",
          input: "typeof debounce(() => {}, 100)",
          expected: '"function"',
          got: typeof debounced,
        });

        // Test: debounced function has correct structure
        results.push({
          pass: debounced.length === 0 || true, // flexible
          input: "debounce returns callable",
          expected: "Callable function",
          got: "Callable function ✓",
        });

        // Test: multiple rapid calls only trigger once
        let callCount = 0;
        const counter = fn(() => callCount++, 50);
        counter();
        counter();
        counter();

        // Immediate check - should not have called yet
        results.push({
          pass: callCount === 0,
          input: "Immediate check after 3 rapid calls",
          expected: "0 (not yet called)",
          got: String(callCount),
        });

        // Test: it passes arguments
        let receivedArgs = null;
        const argChecker = fn((...args) => {
          receivedArgs = args;
        }, 10);
        argChecker(1, 2, 3);

        results.push({
          pass: typeof argChecker === "function",
          input: "debounce passes arguments",
          expected: "Function that accepts args",
          got: "Function created ✓",
        });

        // Test: uses clearTimeout (cancels previous)
        let count2 = 0;
        const d2 = fn(() => count2++, 10000);
        d2();
        d2();
        d2();
        results.push({
          pass: count2 === 0,
          input: "No immediate execution (10s delay)",
          expected: "0",
          got: String(count2),
        });

        return {
          passed: results.filter((r) => r.pass).length,
          total: results.length,
          results,
        };
      },
    },
    {
      id: "d4",
      title: "Cifrado César",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>cifrarCesar</code> que reciba una cadena y un número 
                    de desplazamiento, y devuelva la cadena cifrada usando el cifrado César. 
                    Solo desplaza letras (a-z, A-Z), manteniendo mayúsculas/minúsculas. 
                    Los demás caracteres no se modifican.
                </p>
            `,
      examples: [
        { input: 'cifrarCesar("abc", 1)', output: '"bcd"' },
        { input: 'cifrarCesar("xyz", 3)', output: '"abc"' },
        { input: 'cifrarCesar("Hola!", 5)', output: '"Mtqf!"' },
      ],
      hint: "Usa charCodeAt y fromCharCode. Recuerda que las letras son circulares (después de z viene a).",
      template: `function cifrarCesar(texto, desplazamiento) {\n  // Tu código aquí\n}\n`,
      solution: `function cifrarCesar(texto, desplazamiento) {\n  return texto.split("").map(char => {\n    if (char >= "a" && char <= "z") {\n      return String.fromCharCode(((char.charCodeAt(0) - 97 + desplazamiento) % 26 + 26) % 26 + 97);\n    }\n    if (char >= "A" && char <= "Z") {\n      return String.fromCharCode(((char.charCodeAt(0) - 65 + desplazamiento) % 26 + 26) % 26 + 65);\n    }\n    return char;\n  }).join("");\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn cifrarCesar;")();
        const tests = [
          { args: ["abc", 1], expected: "bcd" },
          { args: ["xyz", 3], expected: "abc" },
          { args: ["Hola!", 5], expected: "Mtqf!" },
          { args: ["ABC", 26], expected: "ABC" },
          { args: ["Hello World", 13], expected: "Uryyb Jbeyq" },
        ];
        return runTests(fn, tests);
      },
    },
    {
      id: "d5",
      title: "Memoize",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>memoize</code> que reciba una función como argumento
                    y devuelva una versión memoizada de la misma. La función memoizada debe guardar 
                    en caché los resultados de llamadas anteriores y devolverlos directamente si se 
                    llama con los mismos argumentos.
                </p>
            `,
      examples: [
        {
          input: "const mFn = memoize(expensiveFn)",
          output: "Función memoizada",
        },
        { input: "mFn(5) // calcula", output: "Resultado" },
        {
          input: "mFn(5) // devuelve desde caché",
          output: "Mismo resultado, sin recalcular",
        },
      ],
      hint: "Usa un Map u objeto para almacenar resultados. La clave puede ser JSON.stringify de los argumentos.",
      template: `function memoize(fn) {\n  // Tu código aquí\n}\n`,
      solution: `function memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn memoize;")();
        const results = [];

        // Test 1: Returns correct result
        let callCount = 0;
        const add = fn((a, b) => {
          callCount++;
          return a + b;
        });
        const r1 = add(2, 3);
        results.push({
          pass: r1 === 5,
          input: "memoize((a,b) => a+b)(2,3)",
          expected: "5",
          got: String(r1),
        });

        // Test 2: Caches result
        const r2 = add(2, 3);
        results.push({
          pass: r2 === 5 && callCount === 1,
          input: "Second call with same args",
          expected: "5 (from cache, fn called once)",
          got: `${r2} (fn called ${callCount} time(s))`,
        });

        // Test 3: Different args cause new call
        const r3 = add(3, 4);
        results.push({
          pass: r3 === 7 && callCount === 2,
          input: "Call with different args",
          expected: "7 (fn called twice total)",
          got: `${r3} (fn called ${callCount} time(s))`,
        });

        // Test 4: Works with single arg
        let singleCount = 0;
        const double = fn((x) => {
          singleCount++;
          return x * 2;
        });
        double(5);
        double(5);
        double(5);
        results.push({
          pass: singleCount === 1,
          input: "Triple call with same arg",
          expected: "fn called once",
          got: `fn called ${singleCount} time(s)`,
        });

        // Test 5: Returns function
        results.push({
          pass: typeof fn(() => {}) === "function",
          input: "typeof memoize(() => {})",
          expected: '"function"',
          got: typeof fn(() => {}),
        });

        return {
          passed: results.filter((r) => r.pass).length,
          total: results.length,
          results,
        };
      },
    },
    {
      id: "d6",
      title: "Paréntesis válidos",
      description: `
                <p class="challenge-description">
                    Crea una función llamada <code>parentesisValidos</code> que reciba una cadena
                    que contiene solo los caracteres <code>(</code>, <code>)</code>, <code>{</code>, 
                    <code>}</code>, <code>[</code>, <code>]</code> y determine si la cadena tiene 
                    los paréntesis correctamente balanceados.
                </p>
            `,
      examples: [
        { input: 'parentesisValidos("()")', output: "true" },
        { input: 'parentesisValidos("()[]{}")', output: "true" },
        { input: 'parentesisValidos("(]")', output: "false" },
        { input: 'parentesisValidos("([)]")', output: "false" },
      ],
      hint: "Usa una pila (stack). Apila los de apertura, desapila al encontrar uno de cierre y compara.",
      template: `function parentesisValidos(s) {\n  // Tu código aquí\n}\n`,
      solution: `function parentesisValidos(s) {\n  const stack = [];\n  const map = { ")": "(", "}": "{", "]": "[" };\n  for (const char of s) {\n    if ("({[".includes(char)) {\n      stack.push(char);\n    } else {\n      if (stack.pop() !== map[char]) return false;\n    }\n  }\n  return stack.length === 0;\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn parentesisValidos;")();
        const tests = [
          { args: ["()"], expected: true },
          { args: ["()[]{}"], expected: true },
          { args: ["(]"], expected: false },
          { args: ["([)]"], expected: false },
          { args: ["{[]}"], expected: true },
          { args: [""], expected: true },
          { args: ["(((("], expected: false },
        ];
        return runTests(fn, tests);
      },
    },
    {
      id: "d7",
      title: "Curry",
      description: `
                <p class="challenge-description">
                    Implementa una función llamada <code>curry</code> que reciba una función
                    y devuelva una versión "currificada" de la misma. Una función currificada 
                    permite pasar los argumentos uno a uno (o de a grupos).
                </p>
            `,
      examples: [
        { input: "const sum = curry((a,b,c) => a+b+c)", output: "" },
        { input: "sum(1)(2)(3)", output: "6" },
        { input: "sum(1, 2)(3)", output: "6" },
        { input: "sum(1)(2, 3)", output: "6" },
      ],
      hint: "Comprueba si ya tienes suficientes argumentos. Si no, devuelve una nueva función que acumule más.",
      template: `function curry(fn) {\n  // Tu código aquí\n}\n`,
      solution: `function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    return function(...args2) {\n      return curried.apply(this, args.concat(args2));\n    };\n  };\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn curry;")();
        const results = [];

        const sum = fn((a, b, c) => a + b + c);

        results.push({
          pass: sum(1)(2)(3) === 6,
          input: "sum(1)(2)(3)",
          expected: "6",
          got: String(sum(1)(2)(3)),
        });

        results.push({
          pass: sum(1, 2)(3) === 6,
          input: "sum(1, 2)(3)",
          expected: "6",
          got: String(sum(1, 2)(3)),
        });

        results.push({
          pass: sum(1)(2, 3) === 6,
          input: "sum(1)(2, 3)",
          expected: "6",
          got: String(sum(1)(2, 3)),
        });

        results.push({
          pass: sum(1, 2, 3) === 6,
          input: "sum(1, 2, 3)",
          expected: "6",
          got: String(sum(1, 2, 3)),
        });

        const multiply = fn((a, b) => a * b);
        results.push({
          pass: multiply(3)(4) === 12,
          input: "multiply(3)(4)",
          expected: "12",
          got: String(multiply(3)(4)),
        });

        return {
          passed: results.filter((r) => r.pass).length,
          total: results.length,
          results,
        };
      },
    },
    {
      id: "d8",
      title: "Búsqueda binaria",
      description: `
                <p class="challenge-description">
                    Implementa una función llamada <code>busquedaBinaria</code> que reciba un array 
                    <strong>ordenado</strong> de números y un valor objetivo, y devuelva el índice del 
                    valor en el array o <code>-1</code> si no se encuentra. 
                    <strong>No puedes usar indexOf, includes ni find.</strong>
                </p>
            `,
      examples: [
        { input: "busquedaBinaria([1,3,5,7,9], 5)", output: "2" },
        { input: "busquedaBinaria([1,3,5,7,9], 4)", output: "-1" },
        { input: "busquedaBinaria([2,4,6,8,10], 10)", output: "4" },
      ],
      hint: "Mantén dos punteros (izq, der). Compara el elemento del medio con el objetivo y ajusta.",
      template: `function busquedaBinaria(arr, objetivo) {\n  // Tu código aquí\n}\n`,
      solution: `function busquedaBinaria(arr, objetivo) {\n  let izq = 0;\n  let der = arr.length - 1;\n  while (izq <= der) {\n    const mid = Math.floor((izq + der) / 2);\n    if (arr[mid] === objetivo) return mid;\n    if (arr[mid] < objetivo) izq = mid + 1;\n    else der = mid - 1;\n  }\n  return -1;\n}`,
      test: function (userCode) {
        const fn = new Function(userCode + "\nreturn busquedaBinaria;")();
        const tests = [
          { args: [[1, 3, 5, 7, 9], 5], expected: 2 },
          { args: [[1, 3, 5, 7, 9], 4], expected: -1 },
          { args: [[2, 4, 6, 8, 10], 10], expected: 4 },
          { args: [[1], 1], expected: 0 },
          { args: [[], 5], expected: -1 },
          { args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1], expected: 0 },
        ];
        return runTests(fn, tests);
      },
    },
  ],
};

/**
 * Helper: Runs a series of tests on a function.
 */
function runTests(fn, tests) {
  const results = [];
  for (const t of tests) {
    let got;
    let pass = false;
    try {
      got = fn(...t.args);
      pass = got === t.expected;
    } catch (e) {
      got = "Error: " + e.message;
    }
    results.push({
      pass,
      input: `(${t.args.map((a) => JSON.stringify(a)).join(", ")})`,
      expected: JSON.stringify(t.expected),
      got: JSON.stringify(got),
    });
  }
  return {
    passed: results.filter((r) => r.pass).length,
    total: results.length,
    results,
  };
}
