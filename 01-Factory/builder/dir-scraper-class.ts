import * as fs from 'fs';
import * as path from 'path';

interface IFileReader {
  isJSONFile(file: string): boolean;
  readText(file: string): string;
  readJSON(file: string): unknown;
}

class DirectoryScrapper {
  constructor(public dirPath: string, public fileReader: IFileReader) {}
  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<Record<string, unknown>>((acc: Record<string, unknown>, file: string) => {
        if (this.fileReader.isJSONFile(file)) {
          acc[file] = this.fileReader.readJSON(`${this.dirPath}/${file}`);
        } else {
          acc[file] = this.fileReader.readText(`${this.dirPath}/${file}`);
        }
        return acc;
      }, {});
  }
}

class FileReader implements IFileReader {
  isJSONFile(file: string): boolean {
    return file.endsWith('.json');
  }

  readText(file: string): string {
    return fs.readFileSync(file, 'utf8').toString();
  }
  readJSON(file: string): unknown {
    return JSON.parse(fs.readFileSync(file, 'utf8').toString());
  }
}

const fileReader = new FileReader();
const dirScraper = new DirectoryScrapper(path.join(__dirname, './data'), fileReader);
const output = dirScraper.scanFiles();
console.log(output);
