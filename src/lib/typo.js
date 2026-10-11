/* Espace fine insécable avant ? ! : ; pour que la ponctuation haute ne tombe
   jamais seule en début de ligne sur mobile. */
export const fineSpaces = (s) => (typeof s === 'string' ? s.replace(/ ([?!:;])/g, ' $1') : s);
