const dictionaries = {
    en: () => import("./../app/dictionaries/en.json").then(r => r.default),
    ja: () => import("./../app/dictionaries/ja.json").then(r => r.default)
  }
  
  export const getDictionary = (lang) => {
    return dictionaries[lang]();
  }