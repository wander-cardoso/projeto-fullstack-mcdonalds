export const LEGAL_ENTITY_CONTROL_LETTERS = "JABCDEFGHI";
export const LEGAL_ENTITY_NIF_REGEX = /^[ABCDEFGHJNPQRSUVW][\d]{7}[\dA-J]$/i;
const HAS_CONTROL_LETTER_REGEX = /^[PQRSW]/;
const HAS_CONTROL_LETTER_IDENTIFIER = "00";
const HAS_CONTROL_NUMBER_REGEX = /^[ABEH]/;

function sumEvenPositions(legalEntityNumbers: string): number {
  return (
    +legalEntityNumbers[1] + +legalEntityNumbers[3] + +legalEntityNumbers[5]
  );
}

function calculateOddPosition(num: number): number {
  const doubledNum = num * 2;
  if (doubledNum < 10) return doubledNum;

  const splittedNum = `${doubledNum}`.split("");
  return +splittedNum[0] + +splittedNum[1];
}

function calculateOddPositions(legalEntityNumbers: string): number {
  return (
    calculateOddPosition(+legalEntityNumbers[0]) +
    calculateOddPosition(+legalEntityNumbers[2]) +
    calculateOddPosition(+legalEntityNumbers[4]) +
    calculateOddPosition(+legalEntityNumbers[6])
  );
}

function getLegalEntityNumbers(legalEntityNif: string): string {
  return legalEntityNif.slice(1, -1);
}

function getLegalEntityNifControlNumber(nif: string): number {
  const legalEntityNumbers = getLegalEntityNumbers(nif);
  const keyNumber = +`${
    sumEvenPositions(legalEntityNumbers) +
    calculateOddPositions(legalEntityNumbers)
  }`.slice(-1);
  return keyNumber === 0 ? keyNumber : 10 - keyNumber;
}

function isControlCodeLetter(legalEntityNif: string): boolean {
  return (
    HAS_CONTROL_LETTER_REGEX.test(legalEntityNif) ||
    legalEntityNif[0] === HAS_CONTROL_LETTER_IDENTIFIER
  );
}

function isControlCodeNumber(legalEntityNif: string): boolean {
  return HAS_CONTROL_NUMBER_REGEX.test(legalEntityNif);
}

/**
 *Verifica se o código de controle nif da entidade legal (letra ou número)
 * fornecido é válido.
 *
 * @WARNING Ele não verifica o `LEGAL_ENITY_NIF_REGEX`.
 * @throws Pode gerar um erro se a string não for longa o suficiente (9 caracteres)
 * @param legalEntityNif
 * @returns
 */
export function isValidLegalEntityNifControlCode(
  legalEntityNif: string,
): boolean {
  const controlCodeToVerify = legalEntityNif.slice(-1);
  const controlNumber = getLegalEntityNifControlNumber(legalEntityNif);

  if (isControlCodeLetter(legalEntityNif))
    return LEGAL_ENTITY_CONTROL_LETTERS[controlNumber] === controlCodeToVerify;

  if (isControlCodeNumber(legalEntityNif))
    return controlNumber === +controlCodeToVerify;

  return isNaN(+controlCodeToVerify)
    ? LEGAL_ENTITY_CONTROL_LETTERS[controlNumber] === controlCodeToVerify
    : controlNumber === +controlCodeToVerify;
}

/**
 * Verifica se o legalEntityNif fornecido é válido.
 *
 * Não inclui os antigos formatos K, L e M. *
 *  @param legalEntityNif
 * @returns verdadeiro para entrada válida e falso para entrada inválida.
 */
export function isValidLegalEntityNif(legalEntityNif: string): boolean {
  return (
    LEGAL_ENTITY_NIF_REGEX.test(legalEntityNif) &&
    isValidLegalEntityNifControlCode(legalEntityNif)
  );
}
