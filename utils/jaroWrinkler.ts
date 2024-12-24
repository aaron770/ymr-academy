export function jaroWinkler(s1, s2, options = {}) {
    const { caseSensitive = true, p = 0.1, l = 4 } = options;
  
    if (!caseSensitive) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();
    }
  
    if (s1 === s2) return 1;
    if (s1.length === 0 || s2.length === 0) return 0;
  
    const matchDistance = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;
    const matches1 = new Array(s1.length).fill(false);
    const matches2 = new Array(s2.length).fill(false);
  
    let matches = 0;
    let transpositions = 0;
  
    for (let i = 0; i < s1.length; i++) {
      for (let j = Math.max(0, i - matchDistance); j < Math.min(s2.length, i + matchDistance + 1); j++) {
        if (s1[i] === s2[j] && !matches2[j]) {
          matches1[i] = true;
          matches2[j] = true;
          matches++;
          break;
        }
      }
    }
  
    if (matches === 0) return 0;
  
    for (let i = 0; i < s1.length; i++) {
      if (!matches1[i]) continue;
      let k = 0;
      while (k < s2.length && !matches2[k]) k++;
      if (s1[i] !== s2[k]) transpositions++;
      k++;
    }
  
    transpositions /= 2;
  
    const jaroDistance = (matches / s1.length + matches / s2.length + (matches - transpositions) / matches) / 3;
  
    let prefixLength = 0;
    for (let i = 0; i < Math.min(l, s1.length, s2.length); i++) {
      if (s1[i] === s2[i]) prefixLength++;
      else break;
    }
    console.log('jaro wrinkler', s1, s2, jaroDistance + prefixLength * p * (1 - jaroDistance))
    return jaroDistance + prefixLength * p * (1 - jaroDistance);
  }