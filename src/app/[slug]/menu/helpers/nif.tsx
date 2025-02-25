export const LEGAL_ENTITY_CONTROL_LETTERS = "JABCDEFGHI";
export const LEGAL_ENTITY_NIF_REGEX = /^[ABCDEFGHJNPQRSUVW\d][\d]{7}[\dA-J]$/i;
const HAS_CONTROL_LETTER_REGEX = /^[PQRSW]/;
const HAS_CONTROL_LETTER_IDENTIFIER = "00";
const HAS_CONTROL_NUMBER_REGEX = /^[ABEH]/;

function sumEvenPositions(numbers: string): number {
  return +numbers[1] + +numbers[3] + +numbers[5];
}

function calculateOddPosition(num: number): number {
  const doubledNum = num * 2;
  return doubledNum < 10
    ? doubledNum
    : Math.floor(doubledNum / 10) + (doubledNum % 10);
}

function calculateOddPositions(numbers: string): number {
  return (
    calculateOddPosition(+numbers[0]) +
    calculateOddPosition(+numbers[2]) +
    calculateOddPosition(+numbers[4]) +
    calculateOddPosition(+numbers[6])
  );
}

function getLegalEntityNumbers(nif: string): string {
  return nif.slice(1, -1);
}

function getLegalEntityNifControlNumber(nif: string): number {
  const numbers = getLegalEntityNumbers(nif);
  const sum =
    sumEvenPositions(numbers) + calculateOddPositions(numbers);
  const keyNumber = sum % 10;
  return keyNumber === 0 ? keyNumber : 10 - keyNumber;
}

function isControlCodeLetter(nif: string): boolean {
  return HAS_CONTROL_LETTER_REGEX.test(nif) || nif[0] === HAS_CONTROL_LETTER_IDENTIFIER;
}

function isControlCodeNumber(nif: string): boolean {
  return HAS_CONTROL_NUMBER_REGEX.test(nif);
}

function isValidLegalEntityNifControlCode(nif: string): boolean {
  const controlCodeToVerify = nif.slice(-1);
  const controlNumber = getLegalEntityNifControlNumber(nif);

  if (isControlCodeLetter(nif))
    return LEGAL_ENTITY_CONTROL_LETTERS[controlNumber] === controlCodeToVerify;

  if (isControlCodeNumber(nif))
    return controlNumber === +controlCodeToVerify;

  return isNaN(+controlCodeToVerify)
    ? LEGAL_ENTITY_CONTROL_LETTERS[controlNumber] === controlCodeToVerify
    : controlNumber === +controlCodeToVerify;
}

// 🔹 NOVA FUNÇÃO: Cálculo do dígito de controle para NIF de pessoa singular
function isValidPersonalNifControlCode(nif: string): boolean {
  const numbers = nif.slice(0, 8).split("").map(Number);
  const checkDigit = Number(nif[8]);

  const sum = numbers.reduce((acc, num, index) => acc + num * (9 - index), 0);
  const controlDigit = 11 - (sum % 11);

  return controlDigit === checkDigit || (controlDigit >= 10 && checkDigit === 0);
}

/**
 * Verifica se o NIF fornecido é válido (tanto para empresas quanto indivíduos).
 * @param nif Número de Identificação Fiscal
 * @returns true se for válido, false caso contrário.
 */
export function isValidNif(nif: string): boolean {
  if (!LEGAL_ENTITY_NIF_REGEX.test(nif)) return false;

  const firstChar = nif[0];

  // Se começa com 1, 2, 3 ou 4 → NIF de Pessoa Singular
  if (/^[1234]/.test(firstChar)) {
    return isValidPersonalNifControlCode(nif);
  }

  // Senão, assume que é um NIF de entidade legal
  return isValidLegalEntityNifControlCode(nif);
}

