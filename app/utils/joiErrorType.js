function joiErrorType(wordList, error) {
  const targetedError = error.details[0];
  const wordIndex = targetedError.path ? targetedError.path[0] : undefined;
  const word = typeof wordIndex === "number" && wordIndex  >= 0 && wordList.length ? wordList[wordIndex].word : undefined;
  const contextLimit = targetedError.context && targetedError.context.limit ? targetedError.context.limit : undefined;
  
  const errorFormat = [
    {
      type: "string.min",
      message: `${word} dois contenir au moins ${contextLimit} caractère(s)`,
    },
    {
      type: "string.max",
      message: `${word} contient plus de ${contextLimit} caractère(s)`,
    },
    {
      type: "string.pattern",
      message: `${word} contient des caractères non autorisés`,
    },
    {
      type: "string.base",
      message: `${word} n'est pas au bon format`,
    },
    {
      type: "array.min",
      message: `La liste fournie doit contenir au moins ${contextLimit} mot(s)`,
    },
    {
      type: "array.max",
      message: `La liste fournie ne doit pas contenir plus de ${contextLimit} mot(s)`,
    },
    {
      type: "array.base",
      message: `Les données envoyées sont au mauvais format`,
    },
    {
      type: "object.unknown",
      message: `La liste fournie contient des données au mauvais format`,
    },
  ];

  return errorFormat.find((element) =>
    targetedError.type.includes(element.type)
  );
}

export { joiErrorType };
