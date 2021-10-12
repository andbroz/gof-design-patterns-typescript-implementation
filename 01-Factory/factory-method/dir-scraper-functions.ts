import * as fs from 'fs';
import * as path from 'path';

interface IFileReader {
  isJSONFile(file: string): boolean;
  readText(file: string): string;
  readJSON(file: string): unknown;
}

const createDirectoryScraper = (fileReader: IFileReader) => {
  return (dirPath: string) => {
    return fs
      .readdirSync(dirPath)
      .reduce<Record<string, unknown>>((acc: Record<string, unknown>, file: string) => {
        if (fileReader.isJSONFile(file)) {
          acc[file] = fileReader.readJSON(`${dirPath}/${file}`);
        } else {
          acc[file] = fileReader.readText(`${dirPath}/${file}`);
        }
        return acc;
      }, {});
  };
};

const fileReader = (): IFileReader => ({
  isJSONFile(file: string): boolean {
    return file.endsWith('.json');
  },

  readText(file: string): string {
    return fs.readFileSync(file, 'utf8').toString();
  },
  readJSON(file: string): unknown {
    return JSON.parse(fs.readFileSync(file, 'utf8').toString());
  },
});

const dirScraper = createDirectoryScraper(fileReader());
const output = dirScraper(path.join(__dirname, './data'));
console.log(output);
