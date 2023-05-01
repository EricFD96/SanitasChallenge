// Generar texto aleatorio utilizando lorem ipsum
export function generateRandomText(): string {
  const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  const words = loremIpsum.split(' ');
  const startIndex = randomNumberInRange(0, words.length - 10);
  const endIndex = startIndex + randomNumberInRange(5, 10);
  return words.slice(startIndex, endIndex).join(' ');
}

// Generar un número aleatorio entre un rango dado
export function randomNumberInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function dataToJSON(data: any): string | null {
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.error(`Error on transform to JSON`);
    return null;
  }
}

export function JSONtoData(json: string): any {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error(`Error on transform JSON to data`);
    return null;
  }
}
