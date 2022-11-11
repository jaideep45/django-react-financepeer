export const readFile = (filePath) => {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException('Problem parsing files'));
      }

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.readAsText(filePath);
    });
}